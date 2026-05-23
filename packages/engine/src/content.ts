import type {
  ContentBundle,
  ConditionRef,
  EffectRef,
  GameBundle,
  GameState,
  JsonValue,
  Scene,
} from "@dsd/contracts";
import { LogicInterpreter, type QDisplayFormatters } from "./logic.ts";

export type ConditionHandler = (
  state: Readonly<GameState>,
  params: Record<string, JsonValue>,
) => boolean;

export type EffectHandler = (
  state: GameState,
  params: Record<string, JsonValue>,
) => void;

export interface ContentMechanicsRegistry {
  conditions: Record<string, ConditionHandler>;
  effects: Record<string, EffectHandler>;
}

type TextFormatter = (text: string, state: Readonly<GameState>) => string;

type ExpressionAst =
  | { type: "literal"; value: string | number | boolean | null }
  | { type: "flag"; key: string }
  | { type: "unary"; operator: "!" | "-"; expression: ExpressionAst }
  | { type: "binary"; operator: string; left: ExpressionAst; right: ExpressionAst }
  | { type: "conditional"; condition: ExpressionAst; consequent: ExpressionAst; alternate: ExpressionAst }
  | { type: "call"; fn: "floor" | "round" | "ceil" | "roundTo" | "fixed"; args: ExpressionAst[] };

const BINARY_EXPRESSION_OPERATORS = new Set([
  "&&",
  "||",
  "==",
  "!=",
  "===",
  "!==",
  ">=",
  "<=",
  ">",
  "<",
  "+",
  "-",
  "*",
  "/",
  "%",
]);

const CALL_EXPRESSION_FUNCTIONS = new Set(["floor", "round", "ceil", "roundTo", "fixed"]);

function getStringParam(
  params: Record<string, JsonValue>,
  key: string,
  fallback = "",
): string {
  const value = params[key];
  return typeof value === "string" ? value : fallback;
}

function getGoToRoutes(params: Record<string, JsonValue>): Array<Record<string, JsonValue>> {
  const routes = params.routes;
  if (!Array.isArray(routes)) {
    return [];
  }

  return routes.filter(
    (route): route is Record<string, JsonValue> => typeof route === "object" && route !== null && !Array.isArray(route),
  );
}

function getFlagPatchOperations(params: Record<string, JsonValue>): Array<Record<string, JsonValue>> {
  const operations = params.operations;
  if (!Array.isArray(operations)) {
    return [];
  }

  return operations.filter(
    (operation): operation is Record<string, JsonValue> =>
      typeof operation === "object" && operation !== null && !Array.isArray(operation),
  );
}

function resolveFlagPatchValue(
  state: Readonly<GameState>,
  operation: Record<string, JsonValue>,
): unknown {
  const from = operation.from;
  if (typeof from === "string") {
    return state.flags[from] ?? 0;
  }

  const valueExpression = operation.valueExpression;
  if (isExpressionAst(valueExpression)) {
    return evaluateExpressionAstValue(state, valueExpression);
  }

  return operation.value;
}

function resolveFlagCompareValue(
  state: Readonly<GameState>,
  params: Record<string, JsonValue>,
): JsonValue | undefined {
  const from = params.from;
  if (typeof from === "string") {
    return state.flags[from] ?? 0;
  }

  return params.value;
}

function isJsonObject(value: JsonValue | undefined): value is Record<string, JsonValue> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isExpressionAst(value: JsonValue | undefined): value is ExpressionAst {
  if (!isJsonObject(value) || typeof value.type !== "string") {
    return false;
  }

  switch (value.type) {
    case "literal":
      return (
        value.value === null ||
        typeof value.value === "string" ||
        typeof value.value === "number" ||
        typeof value.value === "boolean"
      );
    case "flag":
      return typeof value.key === "string";
    case "unary":
      return (
        (value.operator === "!" || value.operator === "-") &&
        isExpressionAst(value.expression)
      );
    case "binary":
      return (
        typeof value.operator === "string" &&
        BINARY_EXPRESSION_OPERATORS.has(value.operator) &&
        isExpressionAst(value.left) &&
        isExpressionAst(value.right)
      );
    case "conditional":
      return (
        isExpressionAst(value.condition) &&
        isExpressionAst(value.consequent) &&
        isExpressionAst(value.alternate)
      );
    case "call":
      return (
        typeof value.fn === "string" &&
        CALL_EXPRESSION_FUNCTIONS.has(value.fn) &&
        Array.isArray(value.args) &&
        value.args.every((argument) => isExpressionAst(argument))
      );
    default:
      return false;
  }
}

function evaluateExpressionAstValue(
  state: Readonly<GameState>,
  expression: ExpressionAst,
): unknown {
  switch (expression.type) {
    case "literal":
      return expression.value;
    case "flag":
      return state.flags[expression.key] ?? 0;
    case "unary": {
      const value = evaluateExpressionAstValue(state, expression.expression);
      if (expression.operator === "!") {
        return !value;
      }

      return -Number(value ?? 0);
    }
    case "binary": {
      if (expression.operator === "&&") {
        const left = evaluateExpressionAstValue(state, expression.left);
        return left ? evaluateExpressionAstValue(state, expression.right) : left;
      }

      if (expression.operator === "||") {
        const left = evaluateExpressionAstValue(state, expression.left);
        return left ? left : evaluateExpressionAstValue(state, expression.right);
      }

      const left = evaluateExpressionAstValue(state, expression.left);
      const right = evaluateExpressionAstValue(state, expression.right);
      switch (expression.operator) {
        case "==":
          return left == right;
        case "!=":
          return left != right;
        case "===":
          return left === right;
        case "!==":
          return left !== right;
        case ">=":
          return Number(left ?? 0) >= Number(right ?? 0);
        case "<=":
          return Number(left ?? 0) <= Number(right ?? 0);
        case ">":
          return Number(left ?? 0) > Number(right ?? 0);
        case "<":
          return Number(left ?? 0) < Number(right ?? 0);
        case "+":
          return Number(left ?? 0) + Number(right ?? 0);
        case "-":
          return Number(left ?? 0) - Number(right ?? 0);
        case "*":
          return Number(left ?? 0) * Number(right ?? 0);
        case "/":
          return Number(left ?? 0) / Number(right ?? 0);
        case "%":
          return Number(left ?? 0) % Number(right ?? 0);
        default:
          return false;
      }
    }
    case "conditional":
      return evaluateExpressionAstValue(state, expression.condition)
        ? evaluateExpressionAstValue(state, expression.consequent)
        : evaluateExpressionAstValue(state, expression.alternate);
    case "call": {
      const [firstArgument, secondArgument] = expression.args.map((argument) =>
        evaluateExpressionAstValue(state, argument),
      );
      switch (expression.fn) {
        case "floor":
          return Math.floor(Number(firstArgument ?? 0));
        case "round":
          return Math.round(Number(firstArgument ?? 0));
        case "ceil":
          return Math.ceil(Number(firstArgument ?? 0));
        case "roundTo": {
          const decimals = Number(secondArgument ?? 0);
          const fixedDecimals = Number.isFinite(decimals)
            ? Math.max(0, Math.min(100, Math.trunc(decimals)))
            : 0;
          return Number(Number(firstArgument ?? 0).toFixed(fixedDecimals));
        }
        case "fixed": {
          const decimals = Number(secondArgument ?? 0);
          const fixedDecimals = Number.isFinite(decimals)
            ? Math.max(0, Math.min(100, Math.trunc(decimals)))
            : 0;
          return Number(firstArgument ?? 0).toFixed(fixedDecimals);
        }
        default:
          return false;
      }
    }
    default:
      return false;
  }
}

export const defaultContentMechanicsRegistry: ContentMechanicsRegistry = {
  conditions: {
    "flags.compare": (state, params) => {
      const key = params.key;
      const operator = params.operator;
      if (typeof key !== "string" || typeof operator !== "string") {
        return false;
      }

      const left = state.flags[key] ?? 0;
      const right = resolveFlagCompareValue(state, params);
      switch (operator) {
        case "truthy":
          return Boolean(left);
        case "falsy":
          return !left;
        case "==":
          return left == right;
        case "!=":
          return left != right;
        case ">=":
          return Number(left) >= Number(right ?? 0);
        case "<=":
          return Number(left) <= Number(right ?? 0);
        case ">":
          return Number(left) > Number(right ?? 0);
        case "<":
          return Number(left) < Number(right ?? 0);
        default:
          return false;
      }
    },
    "flags.expression": (state, params) => {
      const ast = params.ast;
      if (!isExpressionAst(ast)) {
        return false;
      }

      return Boolean(evaluateExpressionAstValue(state, ast));
    },
    "legacy.expression": (state, params) => {
      return LogicInterpreter.evaluateCondition(getStringParam(params, "code", "true"), state as GameState);
    },
  },
  effects: {
    "flags.patch": (state, params) => {
      for (const operation of getFlagPatchOperations(params)) {
        const key = operation.key;
        if (typeof key !== "string") {
          continue;
        }

        const condition = operation.condition;
        if (
          condition !== undefined &&
          (!isExpressionAst(condition) || !Boolean(evaluateExpressionAstValue(state, condition)))
        ) {
          continue;
        }

        const value = resolveFlagPatchValue(state, operation);
        if (operation.op === "set") {
          state.flags[key] = value;
          continue;
        }

        if (operation.op === "arrayPush") {
          const currentValue = state.flags[key];
          const currentArray = Array.isArray(currentValue) ? currentValue : [];
          state.flags[key] = [...currentArray, value];
          continue;
        }

        if (operation.op === "arrayRemove") {
          const currentValue = state.flags[key];
          const currentArray = Array.isArray(currentValue) ? currentValue : [];
          state.flags[key] = currentArray.filter((item) => item !== value);
          continue;
        }

        if (operation.op === "add") {
          const currentValue = Number(state.flags[key] ?? 0);
          const delta = Number(value ?? 0);
          state.flags[key] = currentValue + delta;
        }

        if (operation.op === "multiply") {
          const currentValue = Number(state.flags[key] ?? 0);
          const factor = Number(value ?? 1);
          state.flags[key] = currentValue * factor;
        }
      }
    },
    "ui.legacyLayout": () => {
      // The modern Preact shell owns layout; legacy Dendry chrome hints are imported for traceability only.
    },
    "legacy.script": (state, params) => {
      try {
        LogicInterpreter.runScript(getStringParam(params, "code"), state);
      } catch (error) {
        state.flags.__legacyScriptErrorCount = Number(state.flags.__legacyScriptErrorCount ?? 0) + 1;
        const legacyErrors = Array.isArray(state.flags.__legacyScriptErrors)
          ? state.flags.__legacyScriptErrors
          : [];
        state.flags.__legacyScriptErrors = [
          ...legacyErrors,
          error instanceof Error ? error.message : "Unknown legacy script error.",
        ].slice(-20);
      }
    },
    "legacy.goto": (state, params) => {
      for (const route of getGoToRoutes(params)) {
        const targetSceneId = route.targetSceneId;
        const condition = route.condition;
        if (typeof targetSceneId !== "string") {
          continue;
        }

        if (typeof condition === "string" && !LogicInterpreter.evaluateCondition(condition, state)) {
          continue;
        }

        state.currentSceneId = targetSceneId;
        return;
      }
    },
  },
};

function runConditions(
  refs: ConditionRef[] | undefined,
  state: Readonly<GameState>,
  registry: ContentMechanicsRegistry,
): boolean {
  if (!refs?.length) {
    return true;
  }

  return refs.every((ref) => {
    const handler = registry.conditions[ref.id];
    if (!handler) {
      return false;
    }

    try {
      return handler(state, ref.params ?? {});
    } catch {
      return false;
    }
  });
}

function runEffects(
  refs: EffectRef[] | undefined,
  state: GameState,
  registry: ContentMechanicsRegistry,
): void {
  if (!refs?.length) {
    return;
  }

  for (const ref of refs) {
    const handler = registry.effects[ref.id];
    if (!handler) {
      throw new Error(`Unknown content effect: ${ref.id}`);
    }

    handler(state, ref.params ?? {});
  }
}

function createQDisplayFormatters(contentBundle: ContentBundle): QDisplayFormatters {
  return Object.fromEntries(
    Object.values(contentBundle.qdisplays).map((qdisplay) => {
      const ranges = qdisplay.body
        .split(/\r?\n/)
        .map((line) => line.match(/^\s*\((.*?)\.\.(.*?)\)\s*(.+?)\s*$/))
        .filter((match): match is RegExpMatchArray => match !== null)
        .map((match) => ({
          min: match[1].trim() ? Number(match[1].trim()) : Number.NEGATIVE_INFINITY,
          max: match[2].trim() ? Number(match[2].trim()) : Number.POSITIVE_INFINITY,
          label: match[3],
        }));

      return [
        qdisplay.id,
        (value: unknown) => {
          const numericValue = typeof value === "number" ? value : Number(value);
          if (!Number.isFinite(numericValue)) {
            return String(value);
          }

          return ranges.find((range) => numericValue >= range.min && numericValue <= range.max)?.label ?? String(value);
        },
      ];
    }),
  );
}

function hydrateScene(
  sceneRecord: ContentBundle["scenes"][string],
  registry: ContentMechanicsRegistry,
  formatText: TextFormatter,
): Scene {
  return {
    id: sceneRecord.id,
    title: sceneRecord.titleHtml,
    subtitle: sceneRecord.subtitleHtml ?? undefined,
    tags: sceneRecord.tags,
    ui: sceneRecord.ui,
    viewIf: (state) => runConditions(sceneRecord.conditions, state, registry),
    onArrival: (state) => runEffects(sceneRecord.onArrival, state, registry),
    onDisplay: (state) => runEffects(sceneRecord.onDisplay, state, registry),
    render: (state) => formatText(sceneRecord.bodyHtml, state),
    choices: (state) =>
      sceneRecord.choices.map((choice) => ({
        id: choice.id,
        text: formatText(choice.labelHtml, state),
        nextSceneId: choice.nextSceneId,
        viewIf: (nextState) => runConditions(choice.conditions, nextState, registry),
        onChoose: (nextState) => runEffects(choice.effects, nextState, registry),
      })),
  };
}

export function hydrateContentBundle(
  contentBundle: ContentBundle,
  registry: ContentMechanicsRegistry = defaultContentMechanicsRegistry,
): GameBundle {
  const qdisplayFormatters = createQDisplayFormatters(contentBundle);
  const formatText: TextFormatter = (text, state) =>
    LogicInterpreter.processText(text, state as GameState, qdisplayFormatters);
  const scenes = Object.fromEntries(
    Object.values(contentBundle.scenes).map((sceneRecord) => [
      sceneRecord.id,
      hydrateScene(sceneRecord, registry, formatText),
    ]),
  );
  const sceneIdsByTag = Object.values(scenes).reduce<Record<string, string[]>>(
    (index, scene) => {
      for (const tag of scene.tags ?? []) {
        index[tag] = [...(index[tag] ?? []), scene.id];
      }

      return index;
    },
    {},
  );

  return {
    id: contentBundle.metadata.id,
    scenes,
    formatText,
    resolveSceneId: (sceneIdOrTag, state) => {
      if (scenes[sceneIdOrTag]) {
        return sceneIdOrTag;
      }

      const taggedSceneIds = sceneIdsByTag[sceneIdOrTag] ?? [];
      const visibleTaggedSceneId = taggedSceneIds.find((sceneId) => scenes[sceneId]?.viewIf?.(state) ?? true);
      return visibleTaggedSceneId ?? taggedSceneIds[0] ?? null;
    },
    resolveInitialSceneId: (state) => {
      if (state.currentSceneId && scenes[state.currentSceneId]) {
        return state.currentSceneId;
      }

      return state.flags.started ? "post_event" : contentBundle.initialSceneId;
    },
  };
}
