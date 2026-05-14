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
import { LogicInterpreter } from "./logic.ts";
import { cloneGameState, createInitialState, mutateGameSession } from "./state.ts";

export const SESSION_SCHEMA_VERSION = 2;
const LEGACY_BUNDLE_IDS_BY_VERSION: Record<number, string[]> = {
  1: ["legacy-generated-scenes"],
};
const MAX_HISTORY_LENGTH = 100;

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

function formatBundleText(
  bundle: GameBundle,
  text: string,
  state: Readonly<GameState>,
): string {
  return bundle.formatText?.(text, state) ?? LogicInterpreter.processText(text, state as GameState);
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

  if (parsedSession.version !== 1 && parsedSession.version !== SESSION_SCHEMA_VERSION) {
    return null;
  }

  const version = Number(parsedSession.version);
  const legacyBundleIds = LEGACY_BUNDLE_IDS_BY_VERSION[version] ?? [];
  const isCompatibleBundle =
    parsedSession.bundleId === bundle.id || legacyBundleIds.includes(String(parsedSession.bundleId));

  if (!isCompatibleBundle || !isRecord(parsedSession.state)) {
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
  const resolvedCurrentSceneId = session.state.currentSceneId
    ? bundle.resolveSceneId?.(session.state.currentSceneId, session.state) ?? session.state.currentSceneId
    : "";
  if (resolvedCurrentSceneId && bundle.scenes[resolvedCurrentSceneId]) {
    return resolvedCurrentSceneId;
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
    return formatBundleText(bundle, scene.render, session.state);
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
    title: scene ? formatBundleText(bundle, scene.title, session.state) : currentSceneId,
    subtitle: scene?.subtitle ? formatBundleText(bundle, scene.subtitle, session.state) : null,
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

  const currentSceneId = getCurrentSceneId(bundle, session);

  return mutateGameSession(session as GameSession, (nextState) => {
    choice.onChoose?.(nextState);
    if (choice.nextSceneId === "backSpecialScene") {
      const previousSceneId = nextState.history.pop();
      nextState.currentSceneId =
        previousSceneId && bundle.scenes[previousSceneId]
          ? previousSceneId
          : resolveInitialSceneId(bundle, nextState);
      return;
    }

    if (choice.nextSceneId) {
      const resolvedSceneId = bundle.resolveSceneId?.(choice.nextSceneId, nextState) ?? choice.nextSceneId;
      if (resolvedSceneId !== currentSceneId && bundle.scenes[resolvedSceneId]) {
        nextState.history = [...nextState.history, currentSceneId].slice(-MAX_HISTORY_LENGTH);
      }
      nextState.currentSceneId = resolvedSceneId;
    }
  });
}
