export interface DendryWindowState {
  currentHands?: Record<string, unknown[]>;
}

declare global {
  interface Window {
    dendryUI?: {
      dendryEngine?: {
        state?: DendryWindowState;
      };
    };
    render_game_to_text?: () => string;
    advanceTime?: (ms: number) => void;
  }
}

export interface GameTime {
  year: number;
  month: number;
  week: number;
}

export interface GameResources {
  budget: number;
  politicalCapital: number;
}

export interface GameState {
  time: GameTime;
  resources: GameResources;
  parties: Record<string, number>;
  flags: Record<string, any>;
  history: string[];
  currentSceneId: string;
}

export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };

export interface ContentMetadata {
  id: string;
  title: string;
  version: string;
  sourceFormat: "dry" | "json";
  generatedAt: string;
}

export interface MechanicsRef {
  id: string;
  params?: Record<string, JsonValue>;
}

export type ConditionRef = MechanicsRef;
export type EffectRef = MechanicsRef;

export type SceneCardKind = "card" | "deck" | "hand" | "pinned-card";

export interface SceneUiMetadata {
  cardKind?: SceneCardKind;
  cardImage?: string;
  maxCards?: number;
}

export interface ChoiceRecord {
  id: string;
  labelHtml: string;
  nextSceneId: string | null;
  conditions?: ConditionRef[];
  effects?: EffectRef[];
}

export interface SceneRecord {
  id: string;
  titleHtml: string;
  subtitleHtml?: string | null;
  bodyHtml: string;
  conditions?: ConditionRef[];
  onArrival?: EffectRef[];
  onDisplay?: EffectRef[];
  choices: ChoiceRecord[];
  tags?: string[];
  ui?: SceneUiMetadata;
  sourcePath?: string;
}

export interface QDisplayRecord {
  id: string;
  sourcePath: string;
  body: string;
}

export interface AssetManifest {
  references: string[];
}

export interface ContentBundle {
  metadata: ContentMetadata;
  scenes: Record<string, SceneRecord>;
  qdisplays: Record<string, QDisplayRecord>;
  assets: AssetManifest;
  mechanics: {
    conditions: string[];
    effects: string[];
  };
  initialSceneId: string;
}

export interface SessionChoiceSnapshot {
  id: string;
  text: string;
  nextSceneId: string | null;
  target?: SessionCardSnapshot | null;
}

export interface SessionCardSnapshot {
  id: string;
  title: string;
  tags?: string[];
  ui?: SceneUiMetadata;
  choiceId?: string;
}

export interface SessionBoardSnapshot {
  decks: SessionCardSnapshot[];
  hand: SessionCardSnapshot[];
  pinnedCards: SessionCardSnapshot[];
  pinnedDescription?: string;
  maxCards?: number;
}

export interface SessionSnapshot {
  sceneId: string;
  currentSceneId: string;
  title: string;
  subtitle: string | null;
  time: GameTime;
  visibleChoices: SessionChoiceSnapshot[];
  board?: SessionBoardSnapshot | null;
}

export type SessionAdapterKind = "local" | "remote";

export interface SessionView extends SessionSnapshot {
  ready: boolean;
  adapterKind: SessionAdapterKind;
  hasPersistedSession: boolean;
  persistenceError: string | null;
  contentHtml: string;
  debugFlags: Record<string, any>;
}

export interface Choice {
  id: string;
  text: string;
  tooltip?: string;
  viewIf?: (state: GameState) => boolean;
  onChoose?: (state: GameState) => void;
  nextSceneId: string | null;
}

export type SceneContent = string | ((state: GameState) => string);

export interface Scene {
  id: string;
  title: string;
  subtitle?: string;
  viewIf?: (state: GameState) => boolean;
  onArrival?: (state: GameState) => void;
  onDisplay?: (state: GameState) => void;
  render: SceneContent;
  choices: ((state: GameState) => Choice[]) | Choice[];
  tags?: string[];
  ui?: SceneUiMetadata;
}

export interface GameBundle {
  id: string;
  scenes: Record<string, Scene>;
  formatText?: (text: string, state: Readonly<GameState>) => string;
  resolveInitialSceneId: (state: Readonly<GameState>) => string;
  resolveSceneId?: (sceneIdOrTag: string, state: Readonly<GameState>) => string | null;
}

export interface GameSession {
  bundleId: string;
  state: GameState;
}

export interface SerializedGameSession {
  version: 1 | 2;
  bundleId: string;
  state: GameState;
}
