import * as fs from 'fs';
import * as path from 'path';

// --- Configuration ---

const SOURCE_DIR = 'source/scenes';
const OUT_DIR = 'apps/web/src/content/scenes';

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
    tags?: string[];
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
            else if (key === 'tags') { scene.tags = content.split(',').map(s => s.trim()); currentField = 'tags'; }
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

// --- Main ---

const collectedScenes: { id: string; varName: string; importPath: string }[] = [];
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
                    const varName = getUniqueVarName(targetBucket, scene.id);
                    const snippet = generateTsSnippet(scene, varName);
                    addToBucket(targetBucket, snippet);
                    collectedScenes.push({
                        id: scene.id,
                        varName: varName,
                        importPath: `./${targetBucket}`
                    });
                    if (scene.sections) {
                        for (const sub of scene.sections) {
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
            } catch (e) {
                console.error(`Error processing ${file}:`, e);
            }
        }
    }
}

if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
}

console.log('Scanning source/scenes...');
processDir(SOURCE_DIR);

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
