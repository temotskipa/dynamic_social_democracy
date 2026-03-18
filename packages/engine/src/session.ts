import type {
  Choice,
  GameBundle,
  GameSession,
  GameState,
  Scene,
  SerializedGameSession,
  SessionChoiceSnapshot,
  SessionSnapshot,
} from "@dsd/contracts";
import { LogicInterpreter } from "./logic";
import { cloneGameState, createInitialState, mutateGameSession } from "./state";

export const SESSION_SCHEMA_VERSION = 1;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function mergeState(seedState?: Partial<GameState>): GameState {
  const baseState = createInitialState();

  return {
    ...baseState,
    ...seedState,
    time: {
      ...baseState.time,
      ...seedState?.time,
    },
    resources: {
      ...baseState.resources,
      ...seedState?.resources,
    },
    parties: {
      ...baseState.parties,
      ...seedState?.parties,
    },
    flags: {
      ...baseState.flags,
      ...seedState?.flags,
    },
    history: seedState?.history ? [...seedState.history] : [...baseState.history],
    currentSceneId: seedState?.currentSceneId ?? baseState.currentSceneId,
  };
}

export function resolveInitialSceneId(bundle: GameBundle, state: Readonly<GameState>): string {
  return bundle.resolveInitialSceneId(state);
}

export function toSerializedSession(
  session: Readonly<GameSession>,
): SerializedGameSession {
  return {
    version: SESSION_SCHEMA_VERSION,
    bundleId: session.bundleId,
    state: cloneGameState(session.state),
  };
}

export function serializeSession(session: Readonly<GameSession>): string {
  return JSON.stringify(toSerializedSession(session));
}

export function deserializeSession(
  bundle: GameBundle,
  serializedSession: string | SerializedGameSession,
): GameSession | null {
  let parsedSession: unknown = serializedSession;

  if (typeof serializedSession === "string") {
    try {
      parsedSession = JSON.parse(serializedSession);
    } catch {
      return null;
    }
  }

  if (!isRecord(parsedSession)) {
    return null;
  }

  if (parsedSession.version !== SESSION_SCHEMA_VERSION) {
    return null;
  }

  if (parsedSession.bundleId !== bundle.id || !isRecord(parsedSession.state)) {
    return null;
  }

  return createSession(bundle, parsedSession.state as Partial<GameState>);
}

export function createSession(
  bundle: GameBundle,
  seedState?: Partial<GameState>,
): GameSession {
  const state = mergeState(seedState);
  const currentSceneId = state.currentSceneId || resolveInitialSceneId(bundle, state);

  return {
    bundleId: bundle.id,
    state: {
      ...state,
      currentSceneId,
    },
  };
}

export function getCurrentSceneId(
  bundle: GameBundle,
  session: Readonly<GameSession>,
): string {
  if (session.state.currentSceneId && bundle.scenes[session.state.currentSceneId]) {
    return session.state.currentSceneId;
  }

  const resolvedInitialSceneId = resolveInitialSceneId(bundle, session.state);
  if (bundle.scenes[resolvedInitialSceneId]) {
    return resolvedInitialSceneId;
  }

  return Object.keys(bundle.scenes)[0] ?? "";
}

export function getCurrentScene(
  bundle: GameBundle,
  session: Readonly<GameSession>,
): Scene | undefined {
  const currentSceneId = getCurrentSceneId(bundle, session);
  return bundle.scenes[currentSceneId];
}

export function getSceneChoices(
  scene: Scene | undefined,
  state: Readonly<GameState>,
): Choice[] {
  if (!scene) {
    return [];
  }

  return Array.isArray(scene.choices) ? scene.choices : scene.choices(state);
}

export function getVisibleChoices(
  bundle: GameBundle,
  session: Readonly<GameSession>,
): Choice[] {
  const scene = getCurrentScene(bundle, session);
  const choices = getSceneChoices(scene, session.state);

  return choices.filter((choice) => {
    if (!choice.viewIf) {
      return true;
    }

    try {
      return choice.viewIf(session.state);
    } catch {
      return false;
    }
  });
}

export function createChoiceSnapshots(
  bundle: GameBundle,
  session: Readonly<GameSession>,
): SessionChoiceSnapshot[] {
  return getVisibleChoices(bundle, session).map((choice) => ({
    id: choice.id,
    text: choice.text,
    nextSceneId: choice.nextSceneId,
  }));
}

export function renderCurrentScene(
  bundle: GameBundle,
  session: Readonly<GameSession>,
): string {
  const scene = getCurrentScene(bundle, session);
  if (!scene) {
    return "";
  }

  if (typeof scene.render === "string") {
    return LogicInterpreter.processText(scene.render, session.state);
  }

  return scene.render(session.state);
}

export function createSessionSnapshot(
  bundle: GameBundle,
  session: Readonly<GameSession>,
): SessionSnapshot {
  const scene = getCurrentScene(bundle, session);
  const currentSceneId = getCurrentSceneId(bundle, session);

  return {
    sceneId: currentSceneId,
    currentSceneId,
    title: scene?.title ?? currentSceneId,
    subtitle: scene?.subtitle ?? null,
    time: { ...session.state.time },
    visibleChoices: createChoiceSnapshots(bundle, session),
  };
}

export function runCurrentSceneArrival(
  bundle: GameBundle,
  session: Readonly<GameSession>,
): GameSession {
  const scene = getCurrentScene(bundle, session);
  if (!scene?.onArrival) {
    return session as GameSession;
  }

  return mutateGameSession(session as GameSession, (nextState) => {
    scene.onArrival?.(nextState);
    nextState.currentSceneId = nextState.currentSceneId || getCurrentSceneId(bundle, session);
  });
}

export function runCurrentSceneDisplay(
  bundle: GameBundle,
  session: Readonly<GameSession>,
): GameSession {
  const scene = getCurrentScene(bundle, session);
  if (!scene?.onDisplay) {
    return session as GameSession;
  }

  return mutateGameSession(session as GameSession, (nextState) => {
    scene.onDisplay?.(nextState);
    nextState.currentSceneId = nextState.currentSceneId || getCurrentSceneId(bundle, session);
  });
}

export function applyChoice(
  bundle: GameBundle,
  session: Readonly<GameSession>,
  choiceId: string,
): GameSession {
  const choice = getVisibleChoices(bundle, session).find((candidate) => candidate.id === choiceId);
  if (!choice) {
    return session as GameSession;
  }

  return mutateGameSession(session as GameSession, (nextState) => {
    choice.onChoose?.(nextState);
    if (choice.nextSceneId) {
      nextState.currentSceneId = choice.nextSceneId;
    }
  });
}
