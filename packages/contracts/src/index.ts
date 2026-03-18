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

export interface SessionChoiceSnapshot {
  id: string;
  text: string;
  nextSceneId: string | null;
}

export interface SessionSnapshot {
  sceneId: string;
  currentSceneId: string;
  title: string;
  subtitle: string | null;
  time: GameTime;
  visibleChoices: SessionChoiceSnapshot[];
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
}

export interface GameBundle {
  id: string;
  scenes: Record<string, Scene>;
  resolveInitialSceneId: (state: Readonly<GameState>) => string;
}

export interface GameSession {
  bundleId: string;
  state: GameState;
}

export interface SerializedGameSession {
  version: 1;
  bundleId: string;
  state: GameState;
}
