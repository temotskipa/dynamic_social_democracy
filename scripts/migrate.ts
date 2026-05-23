import * as fs from 'fs';
import * as path from 'path';

// --- Configuration ---

const SOURCE_DIR = 'source/scenes';
const OUT_DIR = 'out/legacy-scenes';
const CONTENT_OUT = 'apps/web/src/content/generated/legacy-content.json';
if (process.argv.includes('--typescript')) {
    throw new Error('Legacy TypeScript scene output has been removed from the canonical migration path. Use JSON content output.');
}
const OUTPUT_MODE: 'json' | 'typescript' = 'json';

// Files to keep separate (Basenames without extension)
const SEPARATE_FILES = new Set([
    'main', 'game_over', 'post_event', 'modinfo', 'library',
    'root', 'status', 'ending_slides', 'credits'
]);

// --- Types ---

interface DryScene {
    id: string;
    title?: string;
    subtitle?: string;
    viewIf?: string;
    onArrival?: string;
    onDisplay?: string;
    goTo?: string;
    tags?: string[];
    isCard?: boolean;
    isDeck?: boolean;
    isHand?: boolean;
    isPinnedCard?: boolean;
    cardImage?: string;
    maxCards?: number;
    content: string[];
    choices: DryChoice[];
    sections: DryScene[];
}

interface DryChoice {
    targetId: string;
    text?: string;
    type: 'goto' | 'jump';
    viewIf?: string;
    onChoose?: string;
}

interface MechanicsRef {
    id: string;
    params?: Record<string, unknown>;
}

interface FlagPatchOperation {
    op: 'set' | 'add' | 'multiply' | 'arrayPush' | 'arrayRemove';
    key: string;
    value?: StaticJsonValue;
    valueExpression?: ExpressionAst;
    from?: string;
    condition?: ExpressionAst;
}

interface FlagCompareCondition {
    key: string;
    operator: 'truthy' | 'falsy' | '==' | '!=' | '>=' | '<=' | '>' | '<';
    value?: string | number | boolean;
    from?: string;
}

type ExpressionAst =
    | { type: 'literal'; value: string | number | boolean | null }
    | { type: 'flag'; key: string }
    | { type: 'unary'; operator: '!' | '-'; expression: ExpressionAst }
    | { type: 'binary'; operator: string; left: ExpressionAst; right: ExpressionAst }
    | { type: 'conditional'; condition: ExpressionAst; consequent: ExpressionAst; alternate: ExpressionAst }
    | { type: 'call'; fn: 'floor' | 'round' | 'ceil' | 'roundTo' | 'fixed'; args: ExpressionAst[] };

type StaticJsonValue = string | number | boolean | null | StaticJsonValue[] | { [key: string]: StaticJsonValue };

interface ContentSceneRecord {
    id: string;
    titleHtml: string;
    subtitleHtml?: string | null;
    bodyHtml: string;
    conditions?: MechanicsRef[];
    onArrival?: MechanicsRef[];
    onDisplay?: MechanicsRef[];
    choices: Array<{
        id: string;
        labelHtml: string;
        nextSceneId: string | null;
        conditions?: MechanicsRef[];
        effects?: MechanicsRef[];
    }>;
    tags?: string[];
    ui?: {
        cardKind?: 'card' | 'deck' | 'hand' | 'pinned-card';
        cardImage?: string;
        maxCards?: number;
    };
    sourcePath?: string;
}

type ContentCardKind = NonNullable<ContentSceneRecord['ui']>['cardKind'];

type TokenType = 'identifier' | 'keyword' | 'number' | 'string' | 'operator' | 'punctuation' | 'whitespace' | 'comment';

interface Token {
    type: TokenType;
    value: string;
}

// --- Transpiler ---

class Transpiler {
    // Identifiers that should NEVER be prefixed with state.flags
    static PRESERVED_IDENTIFIERS = new Set([
        // Dendry / Logic
        'true', 'false', 'and', 'or', 'not',
        // JS Control Flow
        'if', 'else', 'endif', 'return', 'for', 'while', 'do', 'switch', 'case', 'default', 'break', 'continue', 'try', 'catch', 'throw', 'finally',
        // JS Declarations
        'var', 'let', 'const', 'function', 'class', 'new', 'this', 'super', 'extends', 'implements', 'interface', 'type', 'import', 'export', 'from', 'as', 'in', 'of', 'instanceof', 'typeof', 'void', 'delete',
        // JS Values
        'null', 'undefined', 'NaN', 'Infinity',
        // Globals and Math
        'Math', 'console', 'window', 'document', 'parseFloat', 'parseInt', 'isNaN', 'isFinite', 'String', 'Number', 'Boolean', 'Array', 'Object', 'Date', 'RegExp', 'Error', 'JSON', 'Image', 'navigator', 'location', 'history', 'screen',
        // Common DOM/Global identifiers
        'setTimeout', 'setInterval', 'Audio', 'localStorage', 'sessionStorage', 'event', 'arguments', 'dendryUI',
        // Engine Specific
        'Q', 'state', 'GameState', 'Scene', 'g', 'i', 'm', 's', 'u', 'y'
    ]);

    static transpile(code: string, type: 'condition' | 'script'): string {
        if (!code || !code.trim()) return type === 'condition' ? 'true' : '';

        // 1. Initial cleanup and line joining for continuations
        let lines = code.split(/\r?\n/);
        let joinedLines: string[] = [];
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            let trimmed = line.trim();
            if (!trimmed) continue;

            let isComment = trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('#');

            if (joinedLines.length > 0) {
                let lastIdx = joinedLines.length - 1;
                let prevLineTrimmed = joinedLines[lastIdx].trim();
                let prevIsComment = prevLineTrimmed.startsWith('//') || prevLineTrimmed.startsWith('/*') || prevLineTrimmed.startsWith('#');

                if (!prevIsComment && !isComment) {
                    let isCurrContinuation = /^([+\-*/%<>!&|?:]|=)/.test(trimmed);
                    let isPrevIncomplete = /([+\-*/%<>!&|?:]|=)$/.test(prevLineTrimmed);

                    if (isCurrContinuation || isPrevIncomplete) {
                        joinedLines[lastIdx] += ' ' + trimmed;
                        continue;
                    }
                }
            }
            joinedLines.push(line);
        }

        let js = joinedLines.join('\n');

        // 2. Pre-process Postfix Conditionals
        let segments = js.split(/([;]|\n)/);
        for (let i = 0; i < segments.length; i++) {
            let seg = segments[i];
            let trimmed = seg.trim();
            if (!trimmed || seg === ';' || seg === '\n') continue;
            if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('#')) continue;
            if (this.isControlFlow(trimmed) || trimmed.includes('{')) continue;

            const ifMatch = trimmed.match(/^(.+?)\s+if\s+([^;{}]+)$/i);
            if (ifMatch) {
                const body = ifMatch[1].trim();
                const rest = ifMatch[2].trim();
                const elseIdx = rest.toLowerCase().lastIndexOf(' else ');
                if (elseIdx > 0) {
                    const cond = rest.substring(0, elseIdx).trim();
                    const elseBody = rest.substring(elseIdx + 6).trim();
                    segments[i] = `if (${cond}) { ${body}; } else { ${elseBody}; }`;
                } else {
                    segments[i] = `if (${rest}) { ${body}; }`;
                }
            } else {
                // Try again without strict space after if (in case of parentheses)
                const ifMatch2 = trimmed.match(/^(.+?)\s+if(?:\s+|\()([^;{}]+)$/i);
                if (ifMatch2) {
                    const body = ifMatch2[1].trim();
                    let rest = ifMatch2[2].trim();
                    if (trimmed.includes('if(') && rest.endsWith(')')) rest = rest.substring(0, rest.length - 1);
                    segments[i] = `if (${rest}) { ${body}; }`;
                }
            }
        }
        js = segments.join('');

        // 3. Tokenization
        const tokens = this.tokenize(js);

        // 4. Collect Local Variables
        const localVars = new Set<string>();
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            const t = token.value;

            if (token.type === 'keyword' && (t === 'var' || t === 'let' || t === 'const' || t === 'function' || t === 'catch' || t === 'for')) {
                let j = i + 1;
                while (j < tokens.length && (tokens[j].type === 'whitespace' || tokens[j].type === 'comment' || (tokens[j].value === '(' && (t === 'catch' || t === 'function' || t === 'for')) || (t === 'for' && (tokens[j].value === 'var' || tokens[j].value === 'let' || tokens[j].value === 'const')))) j++;

                if (j < tokens.length && tokens[j].type === 'identifier') {
                    localVars.add(tokens[j].value);
                    let k = j + 1;
                    while (k < tokens.length) {
                        while (k < tokens.length && (tokens[k].type === 'whitespace' || tokens[k].type === 'comment')) k++;
                        if (k < tokens.length && tokens[k].value === ',') {
                            k++;
                            while (k < tokens.length && (tokens[k].type === 'whitespace' || tokens[k].type === 'comment')) k++;
                            if (k < tokens.length && tokens[k].type === 'identifier') {
                                localVars.add(tokens[k].value);
                                k++;
                                continue;
                            }
                        }
                        break;
                    }
                }
            }
            if (t === '=>') {
                for (let j = i - 1; j >= 0; j--) {
                    const pt = tokens[j];
                    if (pt.type === 'whitespace' || pt.type === 'comment') continue;
                    if (pt.type === 'identifier') {
                        localVars.add(pt.value);
                        let k = j - 1;
                        while (k >= 0 && (tokens[k].type === 'whitespace' || tokens[k].type === 'comment')) k--;
                        if (k >= 0 && tokens[k].value !== ',') break;
                    } else if (pt.value === ')') {
                        for (let k = j - 1; k >= 0; k--) {
                            if (tokens[k].value === '(') break;
                            if (tokens[k].type === 'identifier') localVars.add(tokens[k].value);
                        }
                        break;
                    } else if (pt.value !== ',') break;
                }
            }
        }

        // 5. Transformation
        const transformed: string[] = [];
        let inTernary = false;
        let inIfLevel = 0;
        let lastWasIf = false;
        let inDeclarationNaming = false;

        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            let t = token.value;

            if (token.type === 'keyword') {
                if (t === 'and') t = '&&';
                else if (t === 'or') t = '||';
                else if (t === 'not') t = '!';
            }

            if (t === 'if') {
                lastWasIf = true;
            } else if (lastWasIf && t === '(') {
                inIfLevel++;
                lastWasIf = false;
            } else if (inIfLevel > 0 && t === '(') {
                inIfLevel++;
            } else if (inIfLevel > 0 && t === ')') {
                inIfLevel--;
            } else if (token.type !== 'whitespace' && token.type !== 'comment') {
                lastWasIf = false;
            }

            if (t === '?') inTernary = true;
            if (t === ':') inTernary = false;

            if (t === 'var' || t === 'let' || t === 'const' || t === 'function' || t === 'catch') {
                inDeclarationNaming = true;
            }

            if ((type === 'condition' || inIfLevel > 0) && (t === '=' || t === '==')) {
                t = '==';
            }

            if (token.type !== 'identifier') {
                if (t === ';' || t === '{' || t === '}' || (t === ')' && inDeclarationNaming)) {
                    inDeclarationNaming = false;
                }
                transformed.push(t);
                continue;
            }

            let next = '';
            for (let j = i + 1; j < tokens.length; j++) {
                if (tokens[j].type !== 'whitespace' && tokens[j].type !== 'comment') {
                    next = tokens[j].value; break;
                }
            }
            let prev = '';
            for (let j = i - 1; j >= 0; j--) {
                if (tokens[j].type !== 'whitespace' && tokens[j].type !== 'comment') {
                    prev = tokens[j].value; break;
                }
            }

            let isObjectKey = (next === ':' && !inTernary);
            let isDeclaration = inDeclarationNaming || (prev === 'var' || prev === 'let' || prev === 'const' || prev === 'function' || prev === 'catch' || prev === 'for');

            if (Transpiler.PRESERVED_IDENTIFIERS.has(t) || localVars.has(t) || isObjectKey || isDeclaration || /^[0-9]/.test(t) || prev === '.') {
                transformed.push(t);
            } else if (next === '(' && ['rand', 'random', 'round', 'floor', 'ceil', 'abs', 'min', 'max', 'sqrt', 'pow'].includes(t)) {
                transformed.push('Math.' + (t === 'rand' ? 'random' : t));
            } else {
                transformed.push(`state.flags['${t}']`);
            }

            if (inDeclarationNaming && next === '=') inDeclarationNaming = false;
        }

        let result = transformed.join('');
        return result;
    }

    static isControlFlow(stmt: string): boolean {
        const s = stmt.trim();
        return s.startsWith('if') || s.startsWith('else') || s.startsWith('return') ||
            s.startsWith('var') || s.startsWith('let') || s.startsWith('const') ||
            s.startsWith('for') || s.startsWith('while') || s.startsWith('switch');
    }

    static tokenize(code: string): Token[] {
        const regex = /(\/\/.*)|(\/\*[\s\S]*?\*\/)|(#[^\n]*)|([a-zA-Z_][a-zA-Z0-9_]*)|([0-9]+(?:\.[0-9]+)?)|("(?:[^"\\]|\\.)*")|('(?:[^'\\]|\\.)*')|(\`(?:[^\`\\]|\\.)*\`)|(\+=|-=|\*=|\/=|\+\+|--|===|!==|==|!=|<=|>=|&&|\|\||=>)|([\+\-\*\/%=<>!&|(){}\[\]:,;.\\\/\?~^`$])|(\s+)/g;
        const tokens: Token[] = [];
        let match;
        while ((match = regex.exec(code)) !== null) {
            let type: TokenType = 'punctuation';
            if (match[1] || match[2] || match[3]) type = 'comment';
            else if (match[4]) type = Transpiler.PRESERVED_IDENTIFIERS.has(match[4]) ? 'keyword' : 'identifier';
            else if (match[5]) type = 'number';
            else if (match[6] || match[7] || match[8]) type = 'string';
            else if (match[9]) type = 'operator';
            else if (match[11]) type = 'whitespace';

            tokens.push({ type, value: match[0] });
        }
        return tokens;
    }
}

// --- Parser (Regex) ---

const RE_SECTION = /^@\s*(\S+)\s*$/;
const RE_FIELD = /^([a-z0-9-]+):\s*(.*)$/;
const RE_CHOICE = /^\s*-\s*((?:@|#)[a-zA-Z0-9_.]+)(?:\s*:\s*(.*))?$/;

function parseFile(filePath: string): DryScene[] {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const lines = raw.split(/\r?\n/);

    const rootScene: DryScene = {
        id: path.basename(filePath, '.scene.dry'),
        content: [],
        choices: [],
        sections: []
    };

    let currentScene = rootScene;
    let buffer: string[] = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const sectionMatch = line.match(RE_SECTION);
        if (sectionMatch) {
            parseBuffer(buffer, currentScene);
            buffer = [];
            const newScene: DryScene = {
                id: sectionMatch[1],
                content: [],
                choices: [],
                sections: []
            };
            rootScene.sections.push(newScene);
            currentScene = newScene;
            continue;
        }
        buffer.push(line);
    }
    parseBuffer(buffer, currentScene);
    return [rootScene];
}

function parseBuffer(lines: string[], scene: DryScene) {
    let inScript = false;
    let scriptBuffer = '';
    let currentField: string | null = null;
    let pendingFieldLabel: string | null = null;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let trimmed = line.trim();

        if (inScript) {
            if (line.includes('!}')) {
                inScript = false;
                const parts = line.split('!}');
                scriptBuffer += parts[0];
                const leftover = parts.slice(1).join('!}');

                const field = pendingFieldLabel || 'onArrival';
                if (field === 'onArrival') {
                    if (scene.onArrival === undefined) scene.onArrival = scriptBuffer;
                    else scene.onArrival += ';\n' + scriptBuffer;
                } else if (field === 'onDisplay') {
                    if (scene.onDisplay === undefined) scene.onDisplay = scriptBuffer;
                    else scene.onDisplay += ';\n' + scriptBuffer;
                } else if (field === 'viewIf') {
                    if (scene.viewIf === undefined) scene.viewIf = scriptBuffer;
                    else scene.viewIf += ' && (' + scriptBuffer + ')';
                }
                scriptBuffer = '';
                pendingFieldLabel = null;
                if (leftover.trim()) {
                    lines.splice(i + 1, 0, leftover);
                }
                continue;
            } else {
                scriptBuffer += line + '\n';
                continue;
            }
        }

        const choiceMatch = line.match(RE_CHOICE);
        if (choiceMatch) {
            scene.choices.push({
                targetId: choiceMatch[1].replace(/^(@|#)/, ''),
                type: choiceMatch[1].startsWith('@') ? 'goto' : 'jump',
                text: choiceMatch[2] ? choiceMatch[2].trim() : undefined
            });
            currentField = 'choice';
            continue;
        }

        const fieldMatch = line.match(RE_FIELD);
        if (fieldMatch) {
            const key = fieldMatch[1];
            const val = fieldMatch[2];

            const isMultilineMarker = val.includes('{!');
            const isSelfContained = isMultilineMarker && val.includes('!}');

            if (isMultilineMarker && !isSelfContained) {
                inScript = true;
                scriptBuffer = val.split('{!')[1].trim() + '\n';
                const f = (key === 'on-display' ? 'onDisplay' : (key === 'on-arrival' ? 'onArrival' : (key === 'view-if' ? 'viewIf' : null)));
                pendingFieldLabel = f;
                currentField = f;
                continue;
            }

            let content = val;
            if (isSelfContained) {
                content = val.split('{!')[1].split('!}')[0];
            }

            if (key === 'title') { scene.title = content; currentField = 'title'; }
            else if (key === 'subtitle') { scene.subtitle = content; currentField = 'subtitle'; }
            else if (key === 'view-if') { scene.viewIf = content; currentField = 'viewIf'; }
            else if (key === 'on-arrival') { scene.onArrival = content; currentField = 'onArrival'; }
            else if (key === 'on-display') { scene.onDisplay = content; currentField = 'onDisplay'; }
            else if (key === 'go-to') { scene.goTo = content; currentField = 'goTo'; }
            else if (key === 'tags') { scene.tags = content.split(',').map(s => s.trim()); currentField = 'tags'; }
            else if (key === 'is-card') { scene.isCard = content.trim() !== 'false'; currentField = 'isCard'; }
            else if (key === 'is-deck') { scene.isDeck = content.trim() !== 'false'; currentField = 'isDeck'; }
            else if (key === 'is-hand') { scene.isHand = content.trim() !== 'false'; currentField = 'isHand'; }
            else if (key === 'is-pinned-card') { scene.isPinnedCard = content.trim() !== 'false'; currentField = 'isPinnedCard'; }
            else if (key === 'card-image') { scene.cardImage = content.trim(); currentField = 'cardImage'; }
            else if (key === 'max-cards') { scene.maxCards = Number(content.trim()); currentField = 'maxCards'; }
            continue;
        }

        if (currentField === 'choice' && /^\s+[a-z-]+:/.test(line)) {
            const lastChoice = scene.choices[scene.choices.length - 1];
            const propMatch = line.trim().match(/^([a-z0-9-]+):\s*(.*)$/);
            if (propMatch) {
                const k = propMatch[1];
                const v = propMatch[2];
                if (k === 'view-if' || k === 'choose-if') lastChoice.viewIf = v;
                if (k === 'on-choose') lastChoice.onChoose = v;
                continue;
            }
        }

        if (line.startsWith('    ') || line.startsWith('\t')) {
            if (currentField === 'onArrival') scene.onArrival = (scene.onArrival || '') + '\n' + line.trim();
            else if (currentField === 'onDisplay') scene.onDisplay = (scene.onDisplay || '') + '\n' + line.trim();
            else if (currentField === 'viewIf') scene.viewIf = (scene.viewIf || '') + '\n' + line.trim();
            else if (trimmed) scene.content.push(line);
            continue;
        }

        if (trimmed) {
            scene.content.push(line);
            currentField = null;
        }
    }
}

function generateTsSnippet(scene: DryScene, varName: string): string {
    const escapeStr = (s: string) => s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');

    const viewIfTs = scene.viewIf ? Transpiler.transpile(scene.viewIf, 'condition') : 'true';
    const onArrivalTs = scene.onArrival ? Transpiler.transpile(scene.onArrival, 'script') : '';
    const onDisplayTs = scene.onDisplay ? Transpiler.transpile(scene.onDisplay, 'script') : '';

    const formatScript = (ts: string) => {
        if (!ts || !ts.trim()) return '';
        let result = ts.trim();
        if (!result.endsWith(';') && !result.endsWith('}')) result += ';';
        return result;
    };

    return `
export const ${varName}: Scene = {
  id: "${scene.id}",
  title: "${scene.title ? escapeStr(scene.title) : scene.id}",
  ${scene.subtitle ? `subtitle: "${escapeStr(scene.subtitle)}",` : ''}
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (${viewIfTs});
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             ${formatScript(onArrivalTs)} 
  },

  ${scene.onDisplay ? `onDisplay: (state: GameState): void => { 
             const Q = state.flags; 
             ${formatScript(onDisplayTs)} 
  },` : ''}

  render: \`
    ${scene.content.map(l => l.replace(/`/g, '\\`').replace(/\$/g, '\\$')).join('\n    ')}
  \`,
  choices: [
    ${scene.choices.map(c => {
        const cViewIf = c.viewIf ? Transpiler.transpile(c.viewIf, 'condition') : 'true';
        const cOnChoose = c.onChoose ? Transpiler.transpile(c.onChoose, 'script') : '';
        return `{
      id: "${c.targetId}",
      text: "${c.text ? escapeStr(c.text) : c.targetId}",
      nextSceneId: "${c.targetId}",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (${cViewIf}); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
         ${formatScript(cOnChoose)} 
      },
    }`;
    }).join(',\n    ')}
  ]
};`;
}

function formatScript(ts: string): string {
    if (!ts || !ts.trim()) return '';
    let result = ts.trim();
    if (!result.endsWith(';') && !result.endsWith('}')) result += ';';
    return result;
}

function splitScriptStatements(code: string): string[] {
    const withoutComments = Transpiler.tokenize(code)
        .filter((token) => token.type !== 'comment')
        .map((token) => token.value)
        .join('');

    const statements: string[] = [];
    let start = 0;
    let parenDepth = 0;
    let braceDepth = 0;
    let bracketDepth = 0;
    let quote: string | null = null;

    for (let index = 0; index < withoutComments.length; index += 1) {
        const char = withoutComments[index];
        if (quote) {
            if (char === '\\') {
                index += 1;
                continue;
            }
            if (char === quote) quote = null;
            continue;
        }

        if (char === '"' || char === "'" || char === '`') {
            quote = char;
            continue;
        }

        if (char === '(') parenDepth += 1;
        if (char === ')') parenDepth -= 1;
        if (char === '{') braceDepth += 1;
        if (char === '}') braceDepth -= 1;
        if (char === '[') bracketDepth += 1;
        if (char === ']') bracketDepth -= 1;

        if (char === '}' && parenDepth === 0 && braceDepth === 0 && bracketDepth === 0) {
            let nextIndex = index + 1;
            while (/\s/.test(withoutComments[nextIndex] ?? '')) {
                nextIndex += 1;
            }

            if (
                nextIndex < withoutComments.length &&
                withoutComments[nextIndex] !== ';' &&
                withoutComments.slice(nextIndex, nextIndex + 4) !== 'else'
            ) {
                const statement = withoutComments.slice(start, index + 1).trim();
                if (statement) {
                    statements.push(statement);
                }
                start = nextIndex;
                index = nextIndex - 1;
                continue;
            }
        }

        if ((char === ';' || char === '\n') && parenDepth === 0 && braceDepth === 0 && bracketDepth === 0) {
            const statement = withoutComments.slice(start, index).trim();
            if (statement) {
                statements.push(statement);
            }
            start = index + 1;
        }
    }

    const finalStatement = withoutComments.slice(start).trim();
    if (finalStatement) {
        statements.push(finalStatement);
    }

    return statements;
}

function parseLiteral(value: string): string | number | boolean | undefined {
    const trimmed = value.trim();
    if (trimmed === 'true') return true;
    if (trimmed === 'false') return false;
    if (/^-?\d+(?:\.\d+)?$/.test(trimmed)) return Number(trimmed);
    if (/^"[^"]*"$/.test(trimmed)) return JSON.parse(trimmed);
    if (/^'[^']*'$/.test(trimmed)) {
        return trimmed.slice(1, -1).replace(/\\'/g, "'").replace(/\\\\/g, '\\');
    }

    return undefined;
}

function parseStaticJsonValue(value: string): StaticJsonValue | undefined {
    const literal = parseLiteral(value);
    if (literal !== undefined) {
        return literal;
    }

    const trimmed = value.trim();
    if (trimmed === 'null') {
        return null;
    }

    if (!trimmed.startsWith('[') || !trimmed.endsWith(']')) {
        return undefined;
    }

    const body = trimmed.slice(1, -1).trim();
    if (!body) {
        return [];
    }

    const values: StaticJsonValue[] = [];
    let start = 0;
    let quote: string | null = null;
    for (let index = 0; index <= body.length; index += 1) {
        const char = body[index];
        if (quote) {
            if (char === '\\') {
                index += 1;
                continue;
            }
            if (char === quote) quote = null;
            continue;
        }

        if (char === '"' || char === "'") {
            quote = char;
            continue;
        }

        if (char === ',' || index === body.length) {
            const item = body.slice(start, index).trim();
            const parsed = parseStaticJsonValue(item);
            if (parsed === undefined) {
                return undefined;
            }
            values.push(parsed);
            start = index + 1;
        }
    }

    return values;
}

function parseFlagWriteTarget(statement: string): { key: string; operator: string; rawValue: string } | undefined {
    const match = statement.match(/^(?:state\.flags\['([a-zA-Z0-9_]+)'\]|Q\.([a-zA-Z0-9_]+)|this\.state\.([a-zA-Z0-9_]+))\s*(=|\+=|-=|\*=|\/=)\s*(.+)$/);
    if (!match) {
        return undefined;
    }

    const [, stateKey, qKey, thisStateKey, operator, rawValue] = match;
    return {
        key: stateKey ?? qKey ?? thisStateKey,
        operator,
        rawValue,
    };
}

function parseFlagReadTarget(value: string): string | undefined {
    const match = value.match(/^(?:state\.flags\['([a-zA-Z0-9_]+)'\]|Q\.([a-zA-Z0-9_]+)|this\.state\.([a-zA-Z0-9_]+))$/);
    return match?.[1] ?? match?.[2] ?? match?.[3];
}

function parseFlagListMutation(statement: string): FlagPatchOperation[] | undefined {
    const targetPattern = String.raw`(?:state\.flags\['([a-zA-Z0-9_]+)'\]|Q\.([a-zA-Z0-9_]+)|this\.state\.([a-zA-Z0-9_]+))`;
    const pushMatch = statement.match(new RegExp(`^${targetPattern}\\.push\\(([\\s\\S]+)\\)$`));
    if (pushMatch) {
        const value = parseStaticJsonValue(pushMatch[4]);
        if (value === undefined) {
            return undefined;
        }

        return [{
            op: 'arrayPush',
            key: pushMatch[1] ?? pushMatch[2] ?? pushMatch[3],
            value,
        }];
    }

    const filterMatch = statement.match(new RegExp(`^${targetPattern}\\s*=\\s*${targetPattern}\\.filter\\(\\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\\s*=>\\s*([\\s\\S]+)\\)$`));
    if (!filterMatch) {
        return undefined;
    }

    const leftKey = filterMatch[1] ?? filterMatch[2] ?? filterMatch[3];
    const rightKey = filterMatch[4] ?? filterMatch[5] ?? filterMatch[6];
    if (leftKey !== rightKey) {
        return undefined;
    }

    const iterator = filterMatch[7];
    const parts = filterMatch[8].split(/\s*&&\s*/);
    const operations: FlagPatchOperation[] = [];
    for (const part of parts) {
        const removeMatch = part.match(new RegExp(`^${iterator}\\s*!==\\s*([\\s\\S]+)$`));
        if (!removeMatch) {
            return undefined;
        }

        const value = parseStaticJsonValue(removeMatch[1]);
        if (value === undefined) {
            return undefined;
        }

        operations.push({
            op: 'arrayRemove',
            key: leftKey,
            value,
        });
    }

    return operations;
}

function isNumericPatchValueExpressionAst(expression: ExpressionAst): boolean {
    switch (expression.type) {
        case 'literal':
            return typeof expression.value === 'number';
        case 'flag':
            return true;
        case 'unary':
            return expression.operator === '-' && isNumericPatchValueExpressionAst(expression.expression);
        case 'binary':
            return (
                ['+', '-', '*', '/', '%'].includes(expression.operator) &&
                isNumericPatchValueExpressionAst(expression.left) &&
                isNumericPatchValueExpressionAst(expression.right)
            );
        case 'conditional':
            return (
                isNumericPatchValueExpressionAst(expression.consequent) &&
                isNumericPatchValueExpressionAst(expression.alternate)
            );
        case 'call':
            if (expression.fn === 'fixed') {
                return false;
            }
            return expression.args.every((argument) => isNumericPatchValueExpressionAst(argument));
        default:
            return false;
    }
}

function negateExpression(expression: ExpressionAst): ExpressionAst {
    return {
        type: 'unary',
        operator: '-',
        expression,
    };
}

function invertExpression(expression: ExpressionAst): ExpressionAst {
    return {
        type: 'binary',
        operator: '/',
        left: { type: 'literal', value: 1 },
        right: expression,
    };
}

function parsePatchValueExpression(
    rawValue: string,
    mode: 'set' | 'numeric',
    localExpressions: ReadonlyMap<string, ExpressionAst> = new Map(),
): ExpressionAst | undefined {
    const expression = parseExpressionAst(rawValue, localExpressions);
    if (!expression) {
        return undefined;
    }

    if (mode === 'numeric' && !isNumericPatchValueExpressionAst(expression)) {
        return undefined;
    }

    return expression;
}

function parseUnconditionalFlagPatchOperation(
    statement: string,
    localExpressions: ReadonlyMap<string, ExpressionAst> = new Map(),
): FlagPatchOperation | undefined {
    const normalizedStatement = statement.replace(/;$/, '').trim();
    const achievementMatch = normalizedStatement.match(/^this\.achieve\(['"]([a-zA-Z0-9_]+)['"]\)$/);
    if (achievementMatch) {
        const achievementId = achievementMatch[1].startsWith('achievement_')
            ? achievementMatch[1]
            : `achievement_${achievementMatch[1]}`;
        return {
            op: 'set',
            key: achievementId,
            value: 1,
        };
    }

    const target = parseFlagWriteTarget(normalizedStatement);
    if (!target) {
        return undefined;
    }

    const { key, operator, rawValue } = target;
    const flagReference = parseFlagReadTarget(rawValue);
    if (operator === '=' && flagReference) {
        return {
            op: 'set',
            key,
            from: flagReference,
        };
    }

    const value = parseStaticJsonValue(rawValue);
    if (value === undefined) {
        const valueExpression = parsePatchValueExpression(rawValue, operator === '=' ? 'set' : 'numeric', localExpressions);
        if (!valueExpression) {
            return undefined;
        }

        if (operator === '=') {
            return {
                op: 'set',
                key,
                valueExpression,
            };
        }

        if (operator === '+=' || operator === '-=') {
            return {
                op: 'add',
                key,
                valueExpression: operator === '+=' ? valueExpression : negateExpression(valueExpression),
            };
        }

        return {
            op: 'multiply',
            key,
            valueExpression: operator === '*=' ? valueExpression : invertExpression(valueExpression),
        };
    }

    if (operator === '=') {
        return {
            op: 'set',
            key,
            value,
        };
    }

    if (typeof value !== 'number') {
        return undefined;
    }

    if (operator === '*=' || operator === '/=') {
        return {
            op: 'multiply',
            key,
            value: operator === '*=' ? value : 1 / value,
        };
    }

    return {
        op: 'add',
        key,
        value: operator === '+=' ? value : -value,
    };
}

function applyConditionToOperations(
    operations: FlagPatchOperation[],
    condition: ExpressionAst,
): FlagPatchOperation[] {
    return operations.map((operation) => {
        if (!operation.condition) {
            return {
                ...operation,
                condition,
            };
        }

        return {
            ...operation,
            condition: {
                type: 'binary',
                operator: '&&',
                left: condition,
                right: operation.condition,
            },
        };
    });
}

function andExpressions(left: ExpressionAst, right: ExpressionAst): ExpressionAst {
    return {
        type: 'binary',
        operator: '&&',
        left,
        right,
    };
}

function orExpressions(left: ExpressionAst, right: ExpressionAst): ExpressionAst {
    return {
        type: 'binary',
        operator: '||',
        left,
        right,
    };
}

function notExpression(expression: ExpressionAst): ExpressionAst {
    return {
        type: 'unary',
        operator: '!',
        expression,
    };
}

function parseParenthesizedCondition(code: string, startIndex: number): { condition: string; nextIndex: number } | undefined {
    let index = startIndex;
    while (/\s/.test(code[index] ?? '')) index += 1;
    if (code[index] !== '(') {
        return undefined;
    }

    let depth = 0;
    let quote: string | null = null;
    const conditionStart = index + 1;
    for (; index < code.length; index += 1) {
        const char = code[index];
        if (quote) {
            if (char === '\\') {
                index += 1;
                continue;
            }
            if (char === quote) quote = null;
            continue;
        }

        if (char === '"' || char === "'" || char === '`') {
            quote = char;
            continue;
        }

        if (char === '(') depth += 1;
        if (char === ')') {
            depth -= 1;
            if (depth === 0) {
                return {
                    condition: code.slice(conditionStart, index).trim(),
                    nextIndex: index + 1,
                };
            }
        }
    }

    return undefined;
}

function parseBracedBlock(code: string, startIndex: number): { body: string; nextIndex: number } | undefined {
    let index = startIndex;
    while (/\s/.test(code[index] ?? '')) index += 1;
    if (code[index] !== '{') {
        return undefined;
    }

    let depth = 0;
    let quote: string | null = null;
    const bodyStart = index + 1;
    for (; index < code.length; index += 1) {
        const char = code[index];
        if (quote) {
            if (char === '\\') {
                index += 1;
                continue;
            }
            if (char === quote) quote = null;
            continue;
        }

        if (char === '"' || char === "'" || char === '`') {
            quote = char;
            continue;
        }

        if (char === '{') depth += 1;
        if (char === '}') {
            depth -= 1;
            if (depth === 0) {
                return {
                    body: code.slice(bodyStart, index).trim(),
                    nextIndex: index + 1,
                };
            }
        }
    }

    return undefined;
}

function updateLocalExpression(
    statement: string,
    localExpressions: Map<string, ExpressionAst>,
): boolean {
    const declarationMatch = statement.match(/^(?:let|var|const)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*([\s\S]+)$/);
    if (declarationMatch) {
        const expression = parseExpressionAst(declarationMatch[2], localExpressions);
        if (!expression) {
            return false;
        }

        localExpressions.set(declarationMatch[1], expression);
        return true;
    }

    const assignmentMatch = statement.match(/^([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(=|\+=|-=|\*=|\/=)\s*([\s\S]+)$/);
    if (!assignmentMatch || !localExpressions.has(assignmentMatch[1])) {
        return false;
    }

    const [, key, operator, rawValue] = assignmentMatch;
    const valueExpression = parseExpressionAst(rawValue, localExpressions);
    const currentExpression = localExpressions.get(key);
    if (!valueExpression || !currentExpression) {
        return false;
    }

    if (operator === '=') {
        localExpressions.set(key, valueExpression);
        return true;
    }

    const operatorMap: Record<string, string> = {
        '+=': '+',
        '-=': '-',
        '*=': '*',
        '/=': '/',
    };

    localExpressions.set(key, {
        type: 'binary',
        operator: operatorMap[operator],
        left: currentExpression,
        right: valueExpression,
    });
    return true;
}

function parseIfElseFlagPatchOperations(
    statement: string,
    previousBranchesCondition?: ExpressionAst,
    localExpressions: ReadonlyMap<string, ExpressionAst> = new Map(),
): FlagPatchOperation[] | undefined {
    let index = 0;
    while (/\s/.test(statement[index] ?? '')) index += 1;
    if (!statement.startsWith('if', index)) {
        return undefined;
    }

    const afterIf = index + 2;
    if (/[a-zA-Z0-9_]/.test(statement[afterIf] ?? '')) {
        return undefined;
    }

    const parsedCondition = parseParenthesizedCondition(statement, afterIf);
    if (!parsedCondition) {
        return undefined;
    }

    const condition = parseExpressionAst(parsedCondition.condition, localExpressions);
    if (!condition) {
        return undefined;
    }

    const parsedBody = parseBracedBlock(statement, parsedCondition.nextIndex);
    if (!parsedBody) {
        return undefined;
    }

    const branchCondition = previousBranchesCondition
        ? andExpressions(notExpression(previousBranchesCondition), condition)
        : condition;
    const bodyStatements = splitScriptStatements(parsedBody.body);
    if (bodyStatements.length === 0) {
        return undefined;
    }

    const operations: FlagPatchOperation[] = [];
    const branchLocalExpressions = new Map(localExpressions);
    for (const bodyStatement of bodyStatements) {
        if (updateLocalExpression(bodyStatement, branchLocalExpressions)) {
            continue;
        }

        const parsedOperations = parseFlagPatchOperationStatement(bodyStatement, branchLocalExpressions);
        if (!parsedOperations) {
            return undefined;
        }

        operations.push(...applyConditionToOperations(parsedOperations, branchCondition));
    }

    let tailIndex = parsedBody.nextIndex;
    while (/\s/.test(statement[tailIndex] ?? '')) tailIndex += 1;
    if (tailIndex >= statement.length) {
        return operations;
    }

    if (!statement.startsWith('else', tailIndex)) {
        return undefined;
    }

    tailIndex += 4;
    if (/[a-zA-Z0-9_]/.test(statement[tailIndex] ?? '')) {
        return undefined;
    }
    while (/\s/.test(statement[tailIndex] ?? '')) tailIndex += 1;

    const nextPreviousBranchesCondition = previousBranchesCondition
        ? orExpressions(previousBranchesCondition, condition)
        : condition;
    const elseText = statement.slice(tailIndex).trim();
    if (elseText.startsWith('if')) {
        const elseIfOperations = parseIfElseFlagPatchOperations(elseText, nextPreviousBranchesCondition, localExpressions);
        if (!elseIfOperations) {
            return undefined;
        }

        operations.push(...elseIfOperations);
        return operations;
    }

    const parsedElseBody = parseBracedBlock(statement, tailIndex);
    if (!parsedElseBody) {
        return undefined;
    }

    let afterElseBody = parsedElseBody.nextIndex;
    while (/\s/.test(statement[afterElseBody] ?? '')) afterElseBody += 1;
    if (afterElseBody < statement.length) {
        return undefined;
    }

    const elseStatements = splitScriptStatements(parsedElseBody.body);
    if (elseStatements.length === 0) {
        return undefined;
    }

    const elseCondition = notExpression(nextPreviousBranchesCondition);
    const elseLocalExpressions = new Map(localExpressions);
    for (const elseStatement of elseStatements) {
        if (updateLocalExpression(elseStatement, elseLocalExpressions)) {
            continue;
        }

        const parsedOperations = parseFlagPatchOperationStatement(elseStatement, elseLocalExpressions);
        if (!parsedOperations) {
            return undefined;
        }

        operations.push(...applyConditionToOperations(parsedOperations, elseCondition));
    }

    return operations;
}

function parseInlineIfFlagPatchOperations(
    statement: string,
    localExpressions: ReadonlyMap<string, ExpressionAst> = new Map(),
): FlagPatchOperation[] | undefined {
    let index = 0;
    while (/\s/.test(statement[index] ?? '')) index += 1;
    if (!statement.startsWith('if', index)) {
        return undefined;
    }

    const afterIf = index + 2;
    if (/[a-zA-Z0-9_]/.test(statement[afterIf] ?? '')) {
        return undefined;
    }

    const parsedCondition = parseParenthesizedCondition(statement, afterIf);
    if (!parsedCondition) {
        return undefined;
    }

    let bodyIndex = parsedCondition.nextIndex;
    while (/\s/.test(statement[bodyIndex] ?? '')) bodyIndex += 1;
    if (statement[bodyIndex] === '{') {
        return undefined;
    }

    const body = statement.slice(bodyIndex).trim();
    if (!body || /\belse\b/.test(body)) {
        return undefined;
    }

    const condition = parseExpressionAst(parsedCondition.condition, localExpressions);
    const operation = parseUnconditionalFlagPatchOperation(body, localExpressions);
    const operations = parseFlagListMutation(body) ?? (operation ? [operation] : undefined);
    if (!condition || !operations) {
        return undefined;
    }

    return applyConditionToOperations(operations, condition);
}

function parseFlagPatchOperationStatement(
    statement: string,
    localExpressions: ReadonlyMap<string, ExpressionAst> = new Map(),
): FlagPatchOperation[] | undefined {
    const ifElseOperations = parseIfElseFlagPatchOperations(statement, undefined, localExpressions);
    if (ifElseOperations) {
        return ifElseOperations;
    }

    const conditionalMatch = statement.match(/^if\s*\(([\s\S]+)\)\s*\{\s*([\s\S]*?)\s*;?\s*\}$/);
    if (!conditionalMatch) {
        const inlineIfOperations = parseInlineIfFlagPatchOperations(statement, localExpressions);
        if (inlineIfOperations) {
            return inlineIfOperations;
        }

        const postfixMatch = statement.match(/^([\s\S]+?)\s+if\s+([\s\S]+)$/);
        if (postfixMatch && !postfixMatch[1].includes('{') && !postfixMatch[2].includes('{')) {
            const operation = parseUnconditionalFlagPatchOperation(postfixMatch[1], localExpressions);
            const operations = parseFlagListMutation(postfixMatch[1]) ?? (operation ? [operation] : undefined);
            const condition = parseExpressionAst(postfixMatch[2], localExpressions);
            if (operations && condition) {
                return applyConditionToOperations(operations, condition);
            }
        }

        const operation = parseUnconditionalFlagPatchOperation(statement, localExpressions);
        if (operation) {
            return [operation];
        }

        if (/^console\.log\([\s\S]*\)$/.test(statement)) {
            return [];
        }

        const listMutationOperations = parseFlagListMutation(statement);
        if (listMutationOperations) {
            return listMutationOperations;
        }

        const pureExpression = parseExpressionAst(statement, localExpressions);
        return pureExpression ? [] : undefined;
    }

    const condition = parseExpressionAst(conditionalMatch[1], localExpressions);
    if (!condition) {
        return undefined;
    }

    const bodyStatements = splitScriptStatements(conditionalMatch[2]);
    if (bodyStatements.length === 0) {
        return undefined;
    }

    const operations: FlagPatchOperation[] = [];
    const bodyLocalExpressions = new Map(localExpressions);
    for (const bodyStatement of bodyStatements) {
        if (updateLocalExpression(bodyStatement, bodyLocalExpressions)) {
            continue;
        }

        const parsedOperations = parseFlagPatchOperationStatement(bodyStatement, bodyLocalExpressions);
        if (!parsedOperations) {
            return undefined;
        }

        operations.push(...parsedOperations);
    }

    return applyConditionToOperations(operations, condition);
}

function parseSimpleFlagPatch(code: string): FlagPatchOperation[] | undefined {
    const statements = splitScriptStatements(code);
    if (statements.length === 0) {
        return undefined;
    }

    const operations: FlagPatchOperation[] = [];
    const localExpressions = new Map<string, ExpressionAst>();
    for (const statement of statements) {
        if (updateLocalExpression(statement, localExpressions)) {
            continue;
        }

        const parsedOperations = parseFlagPatchOperationStatement(statement, localExpressions);
        if (!parsedOperations) {
            return undefined;
        }

        operations.push(...parsedOperations);
    }

    return operations;
}

function stripOuterParentheses(code: string): string {
    let trimmed = code.trim();
    while (trimmed.startsWith('(') && trimmed.endsWith(')')) {
        let depth = 0;
        let enclosesEntireExpression = true;

        for (let index = 0; index < trimmed.length; index += 1) {
            const char = trimmed[index];
            if (char === '(') depth += 1;
            if (char === ')') depth -= 1;
            if (depth === 0 && index < trimmed.length - 1) {
                enclosesEntireExpression = false;
                break;
            }
        }

        if (!enclosesEntireExpression) {
            break;
        }

        trimmed = trimmed.slice(1, -1).trim();
    }

    return trimmed;
}

function splitTopLevelAnd(code: string): string[] | undefined {
    const parts: string[] = [];
    let depth = 0;
    let quote: string | null = null;
    let start = 0;

    for (let index = 0; index < code.length; index += 1) {
        const char = code[index];
        if (quote) {
            if (char === '\\') {
                index += 1;
                continue;
            }
            if (char === quote) quote = null;
            continue;
        }

        if (char === '"' || char === "'") {
            quote = char;
            continue;
        }

        if (char === '(') depth += 1;
        if (char === ')') depth -= 1;
        if (depth === 0 && code.slice(index, index + 2) === '&&') {
            parts.push(code.slice(start, index).trim());
            index += 1;
            start = index + 1;
        }
    }

    if (parts.length === 0) {
        return undefined;
    }

    parts.push(code.slice(start).trim());
    return parts;
}

function parseSimpleFlagCondition(code: string): FlagCompareCondition | undefined {
    const trimmed = stripOuterParentheses(code);
    const truthyMatch = trimmed.match(/^state\.flags\['([a-zA-Z0-9_]+)'\]$/);
    if (truthyMatch) {
        return {
            key: truthyMatch[1],
            operator: 'truthy',
        };
    }

    const falsyMatch = trimmed.match(/^!\s*state\.flags\['([a-zA-Z0-9_]+)'\]$/);
    if (falsyMatch) {
        return {
            key: falsyMatch[1],
            operator: 'falsy',
        };
    }

    const compareMatch = trimmed.match(/^state\.flags\['([a-zA-Z0-9_]+)'\]\s*(==|!=|>=|<=|>|<)\s*(.+)$/);
    if (!compareMatch) {
        return undefined;
    }

    const [, key, operator, rawValue] = compareMatch;
    const flagReference = rawValue.match(/^state\.flags\['([a-zA-Z0-9_]+)'\]$/);
    if (flagReference) {
        return {
            key,
            operator: operator as FlagCompareCondition['operator'],
            from: flagReference[1],
        };
    }

    const value = parseLiteral(rawValue);
    if (value === undefined) {
        return undefined;
    }

    return {
        key,
        operator: operator as FlagCompareCondition['operator'],
        value,
    };
}

class ExpressionAstParser {
    private index = 0;
    private readonly tokens: Token[];
    private readonly localExpressions: ReadonlyMap<string, ExpressionAst>;

    constructor(tokens: Token[], localExpressions: ReadonlyMap<string, ExpressionAst> = new Map()) {
        this.tokens = tokens;
        this.localExpressions = localExpressions;
    }

    parse(): ExpressionAst | undefined {
        const expression = this.parseConditional();
        if (!expression || this.index < this.tokens.length) {
            return undefined;
        }

        return expression;
    }

    private peek(): Token | undefined {
        return this.tokens[this.index];
    }

    private match(...values: string[]): string | undefined {
        const token = this.peek();
        if (!token || !values.includes(token.value)) {
            return undefined;
        }

        this.index += 1;
        return token.value;
    }

    private parseConditional(): ExpressionAst | undefined {
        const condition = this.parseLogicalOr();
        if (!condition) {
            return undefined;
        }

        if (!this.match('?')) {
            return condition;
        }

        const consequent = this.parseConditional();
        if (!consequent || !this.match(':')) {
            return undefined;
        }

        const alternate = this.parseConditional();
        if (!alternate) {
            return undefined;
        }

        return {
            type: 'conditional',
            condition,
            consequent,
            alternate,
        };
    }

    private parseLogicalOr(): ExpressionAst | undefined {
        let expression = this.parseLogicalAnd();
        while (expression) {
            const operator = this.match('||');
            if (!operator) break;
            const right = this.parseLogicalAnd();
            if (!right) return undefined;
            expression = { type: 'binary', operator, left: expression, right };
        }

        return expression;
    }

    private parseLogicalAnd(): ExpressionAst | undefined {
        let expression = this.parseComparison();
        while (expression) {
            const operator = this.match('&&');
            if (!operator) break;
            const right = this.parseComparison();
            if (!right) return undefined;
            expression = { type: 'binary', operator, left: expression, right };
        }

        return expression;
    }

    private parseComparison(): ExpressionAst | undefined {
        let expression = this.parseAdditive();
        while (expression) {
            const operator = this.match('==', '!=', '===', '!==', '>=', '<=', '>', '<');
            if (!operator) break;
            const right = this.parseAdditive();
            if (!right) return undefined;
            expression = { type: 'binary', operator, left: expression, right };
        }

        return expression;
    }

    private parseAdditive(): ExpressionAst | undefined {
        let expression = this.parseMultiplicative();
        while (expression) {
            const operator = this.match('+', '-');
            if (!operator) break;
            const right = this.parseMultiplicative();
            if (!right) return undefined;
            expression = { type: 'binary', operator, left: expression, right };
        }

        return expression;
    }

    private parseMultiplicative(): ExpressionAst | undefined {
        let expression = this.parseUnary();
        while (expression) {
            const operator = this.match('*', '/', '%');
            if (!operator) break;
            const right = this.parseUnary();
            if (!right) return undefined;
            expression = { type: 'binary', operator, left: expression, right };
        }

        return expression;
    }

    private parseUnary(): ExpressionAst | undefined {
        const operator = this.match('!', '-');
        if (operator) {
            const expression = this.parseUnary();
            if (!expression) return undefined;
            return { type: 'unary', operator: operator as '!' | '-', expression };
        }

        return this.parsePrimary();
    }

    private parsePrimary(): ExpressionAst | undefined {
        if (this.match('(')) {
            const expression = this.parseConditional();
            if (!expression || !this.match(')')) {
                return undefined;
            }

            return expression;
        }

        const callExpression = this.parseCallExpression();
        if (callExpression) {
            return callExpression;
        }

        const flagReference = this.parseFlagReference();
        if (flagReference) {
            return flagReference;
        }

        const localReference = this.parseLocalReference();
        if (localReference) {
            return localReference;
        }

        const token = this.peek();
        if (!token) {
            return undefined;
        }

        if (token.type === 'number') {
            this.index += 1;
            return { type: 'literal', value: Number(token.value) };
        }

        if (token.type === 'string') {
            this.index += 1;
            const value = parseLiteral(token.value);
            if (typeof value === 'string') {
                return { type: 'literal', value };
            }

            return undefined;
        }

        if (token.value === 'true' || token.value === 'false') {
            this.index += 1;
            return { type: 'literal', value: token.value === 'true' };
        }

        if (token.value === 'null') {
            this.index += 1;
            return { type: 'literal', value: null };
        }

        return undefined;
    }

    private parseCallExpression(): ExpressionAst | undefined {
        const startIndex = this.index;
        if (this.match('Math') && this.match('.')) {
            const fn = this.match('floor', 'round', 'ceil');
            if (!fn || !this.match('(')) {
                this.index = startIndex;
                return undefined;
            }

            const argument = this.parseConditional();
            if (!argument || !this.match(')')) {
                this.index = startIndex;
                return undefined;
            }

            return {
                type: 'call',
                fn: fn as 'floor' | 'round' | 'ceil',
                args: [argument],
            };
        }

        this.index = startIndex;
        if (this.match('parseFloat') && this.match('(')) {
            const argument = this.parseRoundToArgument();
            if (!argument || !this.match(')')) {
                this.index = startIndex;
                return undefined;
            }

            return argument;
        }

        this.index = startIndex;
        return undefined;
    }

    private parseRoundToArgument(): ExpressionAst | undefined {
        const startIndex = this.index;
        const expression = this.parseConditional();
        if (!expression) {
            this.index = startIndex;
            return undefined;
        }

        if (!this.match('.') || !this.match('toFixed') || !this.match('(')) {
            this.index = startIndex;
            return undefined;
        }

        const decimalsToken = this.peek();
        if (!decimalsToken || decimalsToken.type !== 'number') {
            this.index = startIndex;
            return undefined;
        }
        this.index += 1;

        if (!this.match(')')) {
            this.index = startIndex;
            return undefined;
        }

        return {
            type: 'call',
            fn: 'roundTo',
            args: [
                expression,
                { type: 'literal', value: Number(decimalsToken.value) },
            ],
        };
    }

    private parseFlagReference(): ExpressionAst | undefined {
        const startIndex = this.index;
        if (this.match('Q') && this.match('.')) {
            const keyToken = this.peek();
            if (keyToken?.type === 'identifier' || keyToken?.type === 'keyword') {
                this.index += 1;
                return { type: 'flag', key: keyToken.value };
            }

            this.index = startIndex;
            return undefined;
        }

        if (this.match('this') && this.match('.') && this.match('state') && this.match('.')) {
            const keyToken = this.peek();
            if (keyToken?.type === 'identifier' || keyToken?.type === 'keyword') {
                this.index += 1;
                return { type: 'flag', key: keyToken.value };
            }

            this.index = startIndex;
            return undefined;
        }

        this.index = startIndex;
        if (!this.match('state') || !this.match('.') || !this.match('flags') || !this.match('[')) {
            this.index = startIndex;
            return undefined;
        }

        const keyToken = this.peek();
        if (!keyToken || keyToken.type !== 'string') {
            this.index = startIndex;
            return undefined;
        }
        this.index += 1;

        if (!this.match(']')) {
            this.index = startIndex;
            return undefined;
        }

        const key = parseLiteral(keyToken.value);
        if (typeof key !== 'string') {
            this.index = startIndex;
            return undefined;
        }

        return { type: 'flag', key };
    }

    private parseLocalReference(): ExpressionAst | undefined {
        const token = this.peek();
        if (token?.type !== 'identifier') {
            return undefined;
        }

        const expression = this.localExpressions.get(token.value);
        if (!expression) {
            return undefined;
        }

        this.index += 1;
        return expression;
    }
}

function parseExpressionAst(
    code: string,
    localExpressions: ReadonlyMap<string, ExpressionAst> = new Map(),
): ExpressionAst | undefined {
    const strippedCode = stripOuterParentheses(code);
    const toFixedMatch = strippedCode.match(/^([\s\S]+)\.toFixed\((\d+)\)$/);
    if (toFixedMatch) {
        const expression = parseExpressionAst(toFixedMatch[1], localExpressions);
        if (!expression) {
            return undefined;
        }

        return {
            type: 'call',
            fn: 'fixed',
            args: [
                expression,
                { type: 'literal', value: Number(toFixedMatch[2]) },
            ],
        };
    }

    const tokens = Transpiler.tokenize(code).filter((token) => token.type !== 'whitespace' && token.type !== 'comment');
    return new ExpressionAstParser(tokens, localExpressions).parse();
}

function legacyConditionRef(code?: string): MechanicsRef[] | undefined {
    if (!code || !code.trim()) return undefined;
    const transpiledCode = Transpiler.transpile(code, 'condition');
    const comparison = parseSimpleFlagCondition(transpiledCode);
    if (comparison) {
        return [{
            id: 'flags.compare',
            params: comparison,
        }];
    }

    const andParts = splitTopLevelAnd(transpiledCode);
    if (andParts) {
        const comparisons = andParts.map((part) => parseSimpleFlagCondition(part));
        if (comparisons.every((part): part is FlagCompareCondition => Boolean(part))) {
            return comparisons.map((part) => ({
                id: 'flags.compare',
                params: part,
            }));
        }
    }

    const ast = parseExpressionAst(transpiledCode);
    if (ast) {
        return [{
            id: 'flags.expression',
            params: {
                ast,
            },
        }];
    }

    return [{
        id: 'legacy.expression',
        params: {
            code: transpiledCode,
        },
    }];
}

function escapeHtmlAttribute(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function parseOnDisplayAppendHtml(code?: string): string | undefined {
    if (!code || !code.trim()) {
        return undefined;
    }

    const imageSources = [...code.matchAll(/image\.src\s*=\s*["']([^"']+)["']/g)];
    if (imageSources.length !== 1) {
        return undefined;
    }

    const wrapperClass = code.match(/cardEl\.className\s*=\s*["']([^"']+)["']/)?.[1];
    const imageClass = code.match(/image\.className\s*=\s*["']([^"']+)["']/)?.[1];
    const imageSource = imageSources[0][1];
    if (!wrapperClass || !imageClass || !imageSource.startsWith('img/')) {
        return undefined;
    }

    const normalized = code.replace(/\s+/g, ' ');
    const requiredPatterns = [
        /document\.createElement\(['"]div['"]\)/,
        /new Image\(\)/,
        /cardEl\.appendChild\(image\)/,
        /document\.querySelector\(["']#page #mid_panel #content["']\)/,
        /contentDiv\.appendChild\(cardEl\)/,
    ];
    if (!requiredPatterns.every((pattern) => pattern.test(normalized))) {
        return undefined;
    }

    return `<div class="${escapeHtmlAttribute(wrapperClass)}"><img class="${escapeHtmlAttribute(imageClass)}" src="${escapeHtmlAttribute(imageSource)}" alt=""></div>`;
}

function parseLegacyLayoutEffect(code: string): MechanicsRef[] | undefined {
    const layoutMatch = code.match(/^const toolsWrapper = document\.getElementById\('tools_wrapper'\);\s*if \(toolsWrapper\) \{\s*toolsWrapper\.style\.display = '([^']+)';\s*\}\s*const elements = document\.querySelectorAll\('header, #content, footer'\);\s*elements\.forEach\(el => \{\s*el\.style\.maxWidth = '([^']+)';\s*\}\);?$/);
    if (!layoutMatch) {
        return undefined;
    }

    return [{
        id: 'ui.legacyLayout',
        params: {
            toolsWrapperDisplay: layoutMatch[1],
            maxWidth: layoutMatch[2],
        },
    }];
}

function extractLegacyUiNoOpEffects(code: string): { code: string; refs: MechanicsRef[] } {
    let remainingCode = code;
    const refs: MechanicsRef[] = [];

    const replaceWithTrace = (
        pattern: RegExp,
        buildParams: (...matches: string[]) => Record<string, unknown>,
    ) => {
        remainingCode = remainingCode.replace(pattern, (...args: string[]) => {
            refs.push({
                id: 'ui.legacyLayout',
                params: buildParams(...args),
            });
            return '\n';
        });
    };

    replaceWithTrace(
        /const toolsWrapper = document\.getElementById\('tools_wrapper'\);\s*if \(toolsWrapper\) \{\s*toolsWrapper\.style\.display = '([^']+)';\s*\}\s*;?/g,
        (_match, display) => ({
            toolsWrapperDisplay: display,
        }),
    );

    replaceWithTrace(
        /const rightTools = document\.querySelector\('\.tools\.right'\);\s*if \(rightTools\) \{\s*rightTools\.style\.display = '([^']+)';\s*\}\s*;?/g,
        (_match, display) => ({
            rightToolsDisplay: display,
        }),
    );

    replaceWithTrace(
        /const contentElement = document\.getElementById\('content'\);\s*contentElement\.style\.backgroundColor = '([^']+)';\s*;?/g,
        (_match, backgroundColor) => ({
            contentBackgroundColor: backgroundColor,
        }),
    );

    replaceWithTrace(
        /const header = document\.querySelector\('header'\);\s*header\.style\.color = '([^']+)';\s*;?/g,
        (_match, color) => ({
            headerColor: color,
        }),
    );

    replaceWithTrace(
        /(?:window\.)?dendryUI\.audio(Queue|Playlist)\s*=\s*\[\]\s*;?/g,
        (_match, target) => ({
            audioTarget: target,
            action: 'clear',
        }),
    );

    replaceWithTrace(
        /if \(Q\.difficulty >= 0\) \{\s*window\.dendryUI\.dendryEngine\.state\.currentHands\['main'\] = \[\];\s*\} else \{\s*window\.dendryUI\.dendryEngine\.state\.currentHands\['main\.main_easy'\] = \[\];\s*\}\s*;?/g,
        () => ({
            hand: 'main',
            action: 'clear',
        }),
    );

    return {
        code: formatScript(remainingCode),
        refs,
    };
}

function legacyEffectRef(code?: string): MechanicsRef[] | undefined {
    if (!code || !code.trim()) return undefined;
    const transpiledCode = formatScript(Transpiler.transpile(code, 'script'));
    const layoutEffect = parseLegacyLayoutEffect(transpiledCode);
    if (layoutEffect) {
        return layoutEffect;
    }

    const extractedUiEffects = extractLegacyUiNoOpEffects(transpiledCode);
    const scriptToParse = extractedUiEffects.refs.length > 0 ? extractedUiEffects.code : transpiledCode;

    const operations = parseSimpleFlagPatch(scriptToParse);
    if (operations) {
        return [{
            id: 'flags.patch',
            params: {
                operations,
            },
        }, ...extractedUiEffects.refs];
    }

    if (extractedUiEffects.refs.length > 0 && splitScriptStatements(extractedUiEffects.code).length === 0) {
        return extractedUiEffects.refs;
    }

    return [{
        id: 'legacy.script',
        params: {
            code: transpiledCode,
        },
    }];
}

function normalizeTargetId(targetId: string): string {
    return targetId.trim().replace(/^(@|#)/, '');
}

function shouldDropLegacyGoToRoute(sourcePath: string, route: { targetSceneId: string; condition?: string }): boolean {
    const normalizedSourcePath = sourcePath.replace(/\\/g, '/');
    // Library subsections use `go-to: menu` as Dendry menu continuation, not as
    // an immediate redirect away from the detail content.
    return normalizedSourcePath.endsWith('source/scenes/library.scene.dry') && route.targetSceneId === 'menu';
}

function legacyGoToRef(code: string | undefined, sourcePath: string): MechanicsRef[] | undefined {
    if (!code || !code.trim()) return undefined;

    const routes = code
        .split(';')
        .map((route) => route.trim())
        .filter(Boolean)
        .map((route) => {
            const match = route.match(/^(.+?)\s+if\s+(.+)$/);
            if (!match) {
                return {
                    targetSceneId: normalizeTargetId(route),
                };
            }

            return {
                targetSceneId: normalizeTargetId(match[1]),
                condition: Transpiler.transpile(match[2], 'condition'),
            };
        })
        .filter((route) => !shouldDropLegacyGoToRoute(sourcePath, route));

    if (routes.length === 0) {
        return undefined;
    }

    return [{
        id: 'legacy.goto',
        params: {
            routes,
        },
    }];
}

function compactRefs(...refs: Array<MechanicsRef[] | undefined>): MechanicsRef[] | undefined {
    const compactedRefs = refs.flatMap((ref) => ref ?? []);
    return compactedRefs.length > 0 ? compactedRefs : undefined;
}

function compactRecord<T extends Record<string, unknown>>(record: T): T {
    for (const key of Object.keys(record)) {
        const value = record[key];
        if (value === undefined || value === null) {
            delete record[key];
        }
    }
    return record;
}

function resolveGeneratedChoiceTarget(
    choiceTargetId: string,
    parentSceneId: string | undefined,
    siblingSectionIds: ReadonlySet<string> | undefined,
): string {
    if (!parentSceneId || !siblingSectionIds?.has(choiceTargetId)) {
        return choiceTargetId;
    }

    return `${parentSceneId}.${choiceTargetId}`;
}

function getSceneCardKind(scene: DryScene): ContentCardKind | undefined {
    if (scene.isHand) return 'hand';
    if (scene.isPinnedCard) return 'pinned-card';
    if (scene.isDeck) return 'deck';
    if (scene.isCard) return 'card';
    return undefined;
}

function getSceneUi(scene: DryScene): ContentSceneRecord['ui'] | undefined {
    const ui = compactRecord({
        cardKind: getSceneCardKind(scene),
        cardImage: scene.cardImage,
        maxCards: Number.isFinite(scene.maxCards) ? scene.maxCards : undefined,
    });

    return Object.keys(ui).length > 0 ? ui : undefined;
}

function generateJsonScene(
    scene: DryScene,
    sourcePath: string,
    idOverride?: string,
    parentSceneId?: string,
    siblingSectionIds?: ReadonlySet<string>,
): ContentSceneRecord {
    const appendHtml = parseOnDisplayAppendHtml(scene.onDisplay);
    const bodyHtml = [scene.content.join('\n'), appendHtml].filter(Boolean).join('\n');

    return compactRecord({
        id: idOverride ?? scene.id,
        titleHtml: scene.title || scene.id,
        subtitleHtml: scene.subtitle ?? null,
        bodyHtml,
        conditions: legacyConditionRef(scene.viewIf),
        onArrival: compactRefs(legacyEffectRef(scene.onArrival), legacyGoToRef(scene.goTo, sourcePath)),
        onDisplay: appendHtml ? undefined : legacyEffectRef(scene.onDisplay),
        choices: scene.choices.map((choice) => compactRecord({
            id: choice.targetId,
            labelHtml: choice.text || choice.targetId,
            nextSceneId: resolveGeneratedChoiceTarget(choice.targetId, parentSceneId, siblingSectionIds),
            conditions: legacyConditionRef(choice.viewIf),
            effects: legacyEffectRef(choice.onChoose),
        })),
        tags: scene.tags,
        ui: getSceneUi(scene),
        sourcePath: sourcePath.replace(/\\/g, '/'),
    });
}

function walkFiles(dir: string, predicate: (filePath: string) => boolean): string[] {
    if (!fs.existsSync(dir)) {
        return [];
    }

    const results: string[] = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const entryPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            results.push(...walkFiles(entryPath, predicate));
            continue;
        }

        if (entry.isFile() && predicate(entryPath)) {
            results.push(entryPath);
        }
    }

    return results.sort((left, right) => left.localeCompare(right));
}

function sleepSync(milliseconds: number): void {
    const deadline = Date.now() + milliseconds;
    while (Date.now() < deadline) {
        // Keep the migration script dependency-free and synchronous.
    }
}

function writeTextFileWithRetry(filePath: string, content: string): void {
    const attempts = 5;
    for (let attempt = 0; attempt < attempts; attempt++) {
        try {
            fs.writeFileSync(filePath, content);
            return;
        } catch (error) {
            if (attempt === attempts - 1) {
                throw error;
            }

            sleepSync(75 * (attempt + 1));
        }
    }
}

function collectQDisplays() {
    return Object.fromEntries(
        walkFiles('source/qdisplays', (filePath) => filePath.endsWith('.qdisplay.dry')).map((filePath) => {
            const id = path.basename(filePath, '.qdisplay.dry');
            return [id, {
                id,
                sourcePath: filePath.replace(/\\/g, '/'),
                body: fs.readFileSync(filePath, 'utf-8'),
            }];
        }),
    );
}

function collectAssetReferences(scenes: Record<string, ContentSceneRecord>): string[] {
    const references = new Set<string>();
    const assetPattern = /(?:src=["']|href=["']|\b)(img\/[^"'\s)<>]+|audio\/[^"'\s)<>]+|css\/[^"'\s)<>]+)/g;

    for (const scene of Object.values(scenes)) {
        const fields = [
            scene.titleHtml,
            scene.subtitleHtml ?? '',
            scene.bodyHtml,
            scene.ui?.cardImage ?? '',
            ...scene.choices.map((choice) => choice.labelHtml),
        ];

        for (const field of fields) {
            for (const match of field.matchAll(assetPattern)) {
                references.add(match[1]);
            }
        }
    }

    return Array.from(references).sort((left, right) => left.localeCompare(right));
}

function isProtectedAdvisorRootScene(scene: ContentSceneRecord | undefined): boolean {
    return Boolean(
        scene?.ui?.cardKind === 'pinned-card'
            && scene.tags?.includes('advisor')
            && scene.sourcePath?.startsWith('source/scenes/advisors/'),
    );
}

// --- Main ---

const collectedScenes: { id: string; varName: string; importPath: string }[] = [];
const contentScenes: Record<string, ContentSceneRecord> = {};
const buckets: Record<string, string[]> = {};
const bucketVarNames: Record<string, Set<string>> = {};

function addToBucket(name: string, content: string) {
    if (!buckets[name]) buckets[name] = [];
    buckets[name].push(content);
}

function getUniqueVarName(bucket: string, baseId: string): string {
    if (!bucketVarNames[bucket]) bucketVarNames[bucket] = new Set();
    let safeId = '_' + baseId.replace(/[.]/g, '_').replace(/[^a-zA-Z0-9_]/g, '_');
    if (!safeId.startsWith('_')) safeId = '_' + safeId;
    let finalVarName = safeId;
    let counter = 2;
    while (bucketVarNames[bucket].has(finalVarName)) {
        finalVarName = `${safeId}_${counter}`;
        counter++;
    }
    bucketVarNames[bucket].add(finalVarName);
    return finalVarName;
}

function processDir(dir: string, category: string = 'misc') {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath, file);
        } else if (file.endsWith('.scene.dry')) {
            const basename = path.basename(file, '.scene.dry');
            let targetBucket = category === 'events' ? 'ev' : category;
            if (category === 'misc' && SEPARATE_FILES.has(basename)) {
                targetBucket = basename;
            }
            try {
                const scenes = parseFile(fullPath);
                for (const scene of scenes) {
                    if (OUTPUT_MODE === 'json') {
                        contentScenes[scene.id] = generateJsonScene(scene, fullPath);
                    } else {
                        const varName = getUniqueVarName(targetBucket, scene.id);
                        const snippet = generateTsSnippet(scene, varName);
                        addToBucket(targetBucket, snippet);
                        collectedScenes.push({
                            id: scene.id,
                            varName: varName,
                            importPath: `./${targetBucket}`
                        });
                    }
                    if (scene.sections) {
                        const siblingSectionIds = new Set(scene.sections.map((section) => section.id));
                        const shouldQualifySectionChoices = fullPath.replace(/\\/g, '/').endsWith('source/scenes/library.scene.dry');
                        const protectedCollidingSectionIds = new Set(
                            scene.sections
                                .map((section) => section.id)
                                .filter((sectionId) => isProtectedAdvisorRootScene(contentScenes[sectionId])),
                        );
                        const qualifiedChoiceTargetIds = shouldQualifySectionChoices
                            ? siblingSectionIds
                            : protectedCollidingSectionIds;
                        const qualifiedChoiceParentId = qualifiedChoiceTargetIds.size > 0 ? scene.id : undefined;
                        for (const sub of scene.sections) {
                            if (OUTPUT_MODE === 'json') {
                                const generatedSubScene = generateJsonScene(
                                    sub,
                                    fullPath,
                                    undefined,
                                    qualifiedChoiceParentId,
                                    qualifiedChoiceTargetIds,
                                );
                                if (!isProtectedAdvisorRootScene(contentScenes[sub.id])) {
                                    contentScenes[sub.id] = generatedSubScene;
                                }
                                const qualifiedSubId = `${scene.id}.${sub.id}`;
                                if (!contentScenes[qualifiedSubId]) {
                                    contentScenes[qualifiedSubId] = generateJsonScene(
                                        sub,
                                        fullPath,
                                        qualifiedSubId,
                                        qualifiedChoiceParentId,
                                        qualifiedChoiceTargetIds,
                                    );
                                }
                            } else {
                                const subVarName = getUniqueVarName(targetBucket, sub.id);
                                const subSnippet = generateTsSnippet(sub, subVarName);
                                addToBucket(targetBucket, subSnippet);
                                collectedScenes.push({
                                    id: sub.id,
                                    varName: subVarName,
                                    importPath: `./${targetBucket}`
                                });
                            }
                        }
                    }
                }
            } catch (e) {
                console.error(`Error processing ${file}:`, e);
            }
        }
    }
}

console.log('Scanning source/scenes...');
processDir(SOURCE_DIR);

if (OUTPUT_MODE === 'json') {
    const contentBundle = {
        metadata: {
            id: 'legacy-json-content',
            title: 'Dynamic Social Democracy',
            version: '0.11.1',
            sourceFormat: 'dry',
            generatedAt: new Date(0).toISOString(),
        },
        scenes: Object.fromEntries(Object.entries(contentScenes).sort(([left], [right]) => left.localeCompare(right))),
        qdisplays: collectQDisplays(),
        assets: {
            references: collectAssetReferences(contentScenes),
        },
        mechanics: {
            conditions: ['flags.compare', 'flags.expression', 'legacy.expression'],
            effects: ['flags.patch', 'ui.legacyLayout', 'legacy.script', 'legacy.goto'],
        },
        initialSceneId: 'start_menu_2',
    };

    fs.mkdirSync(path.dirname(CONTENT_OUT), { recursive: true });
    writeTextFileWithRetry(CONTENT_OUT, `${JSON.stringify(contentBundle, null, 2)}\n`);
    console.log(`Wrote typed JSON content bundle to ${CONTENT_OUT}.`);
} else {
    if (!fs.existsSync(OUT_DIR)) {
        fs.mkdirSync(OUT_DIR, { recursive: true });
    }

    console.log(`Writing consolidated files to ${OUT_DIR}...`);

    for (const [bucketName, contents] of Object.entries(buckets)) {
        const outPath = path.join(OUT_DIR, `${bucketName}.ts`);
        const header = `import { Scene, GameState } from "../../engine/types";\n\n`;
        const fileContent = header + contents.join('\n');
        fs.writeFileSync(outPath, fileContent);
    }

    const indexLines = [`import { Scene } from "../../engine/types";`];
    const distinctModules = Array.from(new Set(collectedScenes.map(s => s.importPath)));
    for (const modPath of distinctModules) {
        const modName = '_' + path.basename(modPath).replace(/[^a-zA-Z0-9_]/g, '_');
        indexLines.push(`import * as ${modName} from "${modPath}";`);
    }
    indexLines.push(`\nexport const allScenes: Record<string, Scene> = {};`);
    indexLines.push(`\nconst register = (mod: any) => {`);
    indexLines.push(`  Object.values(mod).forEach((scene: any) => {`);
    indexLines.push(`    if(scene && scene.id) {`);
    indexLines.push(`       allScenes[scene.id] = scene;`);
    indexLines.push(`    }`);
    indexLines.push(`  });`);
    indexLines.push(`};`);
    for (const modPath of distinctModules) {
        const modName = '_' + path.basename(modPath).replace(/[^a-zA-Z0-9_]/g, '_');
        indexLines.push(`register(${modName});`);
    }
    fs.writeFileSync(path.join(OUT_DIR, 'index.ts'), indexLines.join('\n'));
    console.log('Migration Complete.');
}
