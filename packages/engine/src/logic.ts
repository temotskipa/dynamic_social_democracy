import type { GameState } from "@dsd/contracts";

export type QDisplayFormatter = (value: unknown, state: Readonly<GameState>) => string;
export type QDisplayFormatters = Record<string, QDisplayFormatter>;

type LegacyRecord = Record<string, any>;

function isRecord(value: unknown): value is LegacyRecord {
  return typeof value === "object" && value !== null;
}

function ensureRecord(target: LegacyRecord, key: string, fallback: LegacyRecord): LegacyRecord {
  const value = target[key];
  if (isRecord(value)) {
    return value;
  }

  target[key] = fallback;
  return fallback;
}

function ensureLastPlayedCard(target: LegacyRecord): LegacyRecord {
  const value = target.lastPlayedCard;
  if (isRecord(value)) {
    return value;
  }

  const fallback = {
    id: "legacy-placeholder-card",
    cardImage: "",
    image: "",
  };
  target.lastPlayedCard = fallback;
  return fallback;
}

function createLegacySceneIndex() {
  return new Proxy<Record<string, LegacyRecord>>(
    {},
    {
      get(target, property) {
        if (typeof property !== "string") {
          return Reflect.get(target, property);
        }

        target[property] ??= {
          id: property,
          cardImage: "",
          image: "",
        };
        return target[property];
      },
    },
  );
}

function createNoopElement(): any {
  const element: any = {
    children: [],
    className: "",
    id: "",
    innerHTML: "",
    offsetHeight: 500,
    offsetWidth: 500,
    style: {},
    textContent: "",
    appendChild(child: unknown) {
      this.children.push(child);
      return child;
    },
    insertBefore(child: unknown) {
      this.children.push(child);
      return child;
    },
    prepend(child: unknown) {
      this.children.unshift(child);
      return child;
    },
    remove() {},
    setAttribute(name: string, value: unknown) {
      this[name] = value;
    },
    addEventListener() {},
    removeEventListener() {},
    querySelector() {
      return createNoopElement();
    },
    querySelectorAll() {
      return [];
    },
    classList: {
      add() {},
      remove() {},
      toggle() {
        return false;
      },
      contains() {
        return false;
      },
    },
  };
  element.parentNode = element;

  return element;
}

function createNoopDocument(): any {
  const rootElement = createNoopElement();

  return {
    body: rootElement,
    documentElement: rootElement,
    head: rootElement,
    addEventListener() {},
    removeEventListener() {},
    createElement() {
      return createNoopElement();
    },
    createTextNode(text: string) {
      return { textContent: text };
    },
    getElementById() {
      return rootElement;
    },
    querySelector() {
      return rootElement;
    },
    querySelectorAll() {
      return [];
    },
  };
}

function createNoopStorage(): Storage {
  const storage = new Map<string, string>();

  return {
    get length() {
      return storage.size;
    },
    clear() {
      storage.clear();
    },
    getItem(key: string) {
      return storage.get(key) ?? null;
    },
    key(index: number) {
      return Array.from(storage.keys())[index] ?? null;
    },
    removeItem(key: string) {
      storage.delete(key);
    },
    setItem(key: string, value: string) {
      storage.set(key, String(value));
    },
  };
}

function createNoopD3(): any {
  let chain: any;
  chain = new Proxy(
    () => chain,
    {
      get() {
        return chain;
      },
      apply() {
        return chain;
      },
    },
  );

  return chain;
}

function createLegacyDendryState(state: GameState) {
  const flags = state.flags;
  const currentHands = ensureRecord(flags, "currentHands", {
    main: [],
    "main.main_easy": [],
  });
  ensureRecord(flags, "visits", {});
  ensureLastPlayedCard(flags);

  return {
    qualities: flags,
    currentHands,
    visits: flags.visits,
    lastPlayedCard: flags.lastPlayedCard,
  };
}

function createLegacyRuntimeContext(state: GameState) {
  return {
    state: state.flags,
    game: {
      scenes: createLegacySceneIndex(),
    },
    ui: {},
    achieve(achievementId: string) {
      const normalizedId = achievementId.startsWith("achievement_")
        ? achievementId
        : `achievement_${achievementId}`;
      state.flags[normalizedId] = 1;
    },
    _compileChoices() {
      return [{ id: "legacy-continue", title: "Continue..." }];
    },
  };
}

function createLegacyRuntimeState(state: GameState): GameState {
  const flags = new Proxy(state.flags, {
    get(target, property) {
      if (typeof property !== "string") {
        return Reflect.get(target, property);
      }

      if (property === "currentHands") {
        return ensureRecord(target, "currentHands", {
          main: [],
          "main.main_easy": [],
        });
      }

      if (property === "visits") {
        return ensureRecord(target, "visits", {});
      }

      if (property === "lastPlayedCard") {
        return ensureLastPlayedCard(target);
      }

      return property in target ? target[property] : 0;
    },
    set(target, property, value) {
      if (typeof property === "string") {
        target[property] = value;
        return true;
      }

      return Reflect.set(target, property, value);
    },
  });

  return {
    ...state,
    flags,
  };
}

function createLegacyGlobals(state: GameState) {
  const globalObject = globalThis as typeof globalThis & {
    dendryUI?: any;
    d3?: any;
  };
  const dendryState = createLegacyDendryState(state);
  const dendryUI =
    globalObject.dendryUI ??
    {
      audioQueue: [],
      dendryEngine: {
        state: dendryState,
      },
    };

  dendryUI.audioQueue ??= [];
  dendryUI.dendryEngine ??= {};
  dendryUI.dendryEngine.state ??= dendryState;
  dendryUI.dendryEngine.state.qualities ??= state.flags;
  dendryUI.dendryEngine.state.currentHands ??= dendryState.currentHands;
  dendryUI.dendryEngine.state.visits ??= dendryState.visits;

  const runtimeWindow: any =
    typeof window === "undefined"
      ? {
          innerWidth: 1024,
          addEventListener() {},
          removeEventListener() {},
        }
      : window;
  runtimeWindow.dendryUI ??= dendryUI;

  const ImageConstructor =
    typeof Image === "undefined"
      ? class {
          className = "";
          src = "";
        }
      : Image;

  return {
    document: typeof document === "undefined" ? createNoopDocument() : document,
    window: runtimeWindow,
    Image: ImageConstructor,
    dendryUI,
    d3: globalObject.d3 ?? createNoopD3(),
    localStorage: typeof window === "undefined" ? createNoopStorage() : localStorage,
    console:
      typeof window === "undefined"
        ? {
            log() {},
            warn() {},
            error() {},
          }
        : console,
  };
}

export class LogicInterpreter {
  static evaluateExpression(code: string, state: GameState): unknown {
    if (!code || !code.trim()) {
      return true;
    }

    const runtimeState = createLegacyRuntimeState(state);
    const legacyGlobals = createLegacyGlobals(runtimeState);
    const func = new Function(
      "state",
      "document",
      "window",
      "Image",
      "dendryUI",
      "d3",
      "localStorage",
      "console",
      `const Q = state.flags; with(state.flags) { return (${code}); }`,
    );
    return func.call(
      createLegacyRuntimeContext(runtimeState),
      runtimeState,
      legacyGlobals.document,
      legacyGlobals.window,
      legacyGlobals.Image,
      legacyGlobals.dendryUI,
      legacyGlobals.d3,
      legacyGlobals.localStorage,
      legacyGlobals.console,
    );
  }

  static evaluateCondition(code: string, state: GameState): boolean {
    try {
      return Boolean(this.evaluateExpression(code, state));
    } catch {
      return false;
    }
  }

  static runScript(code: string, state: GameState): void {
    if (!code || !code.trim()) {
      return;
    }

    const runtimeState = createLegacyRuntimeState(state);
    const legacyGlobals = createLegacyGlobals(runtimeState);
    const func = new Function(
      "state",
      "document",
      "window",
      "Image",
      "dendryUI",
      "d3",
      "localStorage",
      "console",
      `const Q = state.flags; with(state.flags) { ${code} }`,
    );
    func.call(
      createLegacyRuntimeContext(runtimeState),
      runtimeState,
      legacyGlobals.document,
      legacyGlobals.window,
      legacyGlobals.Image,
      legacyGlobals.dendryUI,
      legacyGlobals.d3,
      legacyGlobals.localStorage,
      legacyGlobals.console,
    );
  }

  static interpolate(
    text: string,
    state: GameState,
    qdisplayFormatters: QDisplayFormatters = {},
  ): string {
    if (!text) {
      return "";
    }

    return text.replace(/\[\+(.*?)\+\]/g, (_, code) => {
      try {
        const rawCode = String(code);
        const qdisplaySeparatorIndex = rawCode.indexOf(":");
        const expression =
          qdisplaySeparatorIndex >= 0 ? rawCode.slice(0, qdisplaySeparatorIndex).trim() : rawCode.trim();
        const qdisplayId =
          qdisplaySeparatorIndex >= 0 ? rawCode.slice(qdisplaySeparatorIndex + 1).trim() : "";
        const value = this.evaluateExpression(expression, state);
        const formatter = qdisplayId ? qdisplayFormatters[qdisplayId] : undefined;

        return formatter ? formatter(value, state) : String(value);
      } catch {
        return "[ERROR]";
      }
    });
  }

  static parseConditionalText(
    text: string,
    state: GameState,
    qdisplayFormatters: QDisplayFormatters = {},
  ): string {
    if (!text) {
      return "";
    }

    return text.replace(/\[\?\s*if\s*(.*?)\s*:\s*(.*?)\s*\?\]/gs, (_, condition, content) => {
      try {
        let jsLogic = condition
          .replace(/\band\b/g, "&&")
          .replace(/\bor\b/g, "||")
          .replace(/\bnot\b/g, "!");

        jsLogic = jsLogic.replace(/([^!<>=])=([^=])/g, "$1==$2");

        return this.evaluateCondition(jsLogic, state)
          ? this.parseConditionalText(content, state, qdisplayFormatters)
          : "";
      } catch {
        return "";
      }
    });
  }

  static processText(
    text: string,
    state: GameState,
    qdisplayFormatters: QDisplayFormatters = {},
  ): string {
    return this.interpolate(this.parseConditionalText(text, state, qdisplayFormatters), state, qdisplayFormatters);
  }
}
