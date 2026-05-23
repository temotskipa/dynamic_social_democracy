import {
  applyChoice,
  createChoiceSnapshots,
  createSession,
  createSessionSnapshot,
  deserializeSession,
  getCurrentSceneId,
  navigateBack,
  navigateToScene,
  renderCurrentScene,
  runCurrentSceneArrival,
  runCurrentSceneDisplay,
  serializeSession,
} from "@dsd/engine";
import type {
  GameBundle,
  GameSession,
  SessionView,
} from "@dsd/contracts";
import type { SessionAdapter } from "./adapter";

const SESSION_STORAGE_PREFIX = "dsd:session:";
const LEGACY_SESSION_STORAGE_KEYS = ["dsd:session:legacy-generated-scenes"];
const MAX_SCENE_EFFECT_PASSES = 25;

function getStorage(): Storage | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function getSessionStorageKey(bundleId: string): string {
  return `${SESSION_STORAGE_PREFIX}${bundleId}`;
}

function getReadableSessionStorageKeys(bundleId: string): string[] {
  return Array.from(new Set([getSessionStorageKey(bundleId), ...LEGACY_SESSION_STORAGE_KEYS]));
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Unknown session persistence error.";
}

export function createLocalSessionAdapter(bundle: GameBundle): SessionAdapter {
  const storageKey = getSessionStorageKey(bundle.id);
  const readableStorageKeys = getReadableSessionStorageKeys(bundle.id);
  const listeners = new Set<(view: SessionView) => void>();

  let currentSession = createSession(bundle);
  let ready = false;
  let hasPersistedSession = false;
  let persistenceError: string | null = null;

  function emit(): SessionView {
    const view = createView();
    for (const listener of listeners) {
      listener(view);
    }
    return view;
  }

  function createView(): SessionView {
    const snapshot = createSessionSnapshot(bundle, currentSession);

    return {
      ...snapshot,
      ready,
      adapterKind: "local",
      hasPersistedSession,
      persistenceError,
      contentHtml: renderCurrentScene(bundle, currentSession),
      visibleChoices: createChoiceSnapshots(bundle, currentSession),
      debugFlags: { ...currentSession.state.flags },
    };
  }

  async function refreshPersistedSessionFlag() {
    const storage = getStorage();
    hasPersistedSession = Boolean(readableStorageKeys.some((key) => storage?.getItem(key)));
  }

  async function loadPersistedSession(): Promise<GameSession | null> {
    const storage = getStorage();
    const persistedSessionEntry = readableStorageKeys
      .map((key) => ({ key, value: storage?.getItem(key) ?? null }))
      .find((entry) => entry.value);

    if (!persistedSessionEntry?.value) {
      return null;
    }

    const session = deserializeSession(bundle, persistedSessionEntry.value);
    if (!session) {
      storage?.removeItem(persistedSessionEntry.key);
    }

    return session;
  }

  async function persistSession(session: Readonly<GameSession>) {
    const storage = getStorage();
    if (!storage) {
      throw new Error("Local storage is unavailable in this browser.");
    }

    storage.setItem(storageKey, serializeSession(session));
  }

  function stabilizeSession(session: GameSession): GameSession {
    let nextSession = session;

    for (let pass = 0; pass < MAX_SCENE_EFFECT_PASSES; pass += 1) {
      const currentSceneId = getCurrentSceneId(bundle, nextSession);
      const afterArrival = runCurrentSceneArrival(bundle, nextSession);
      const afterDisplay = runCurrentSceneDisplay(bundle, afterArrival);
      const nextSceneId = getCurrentSceneId(bundle, afterDisplay);

      nextSession = afterDisplay;

      if (nextSceneId === currentSceneId) {
        return nextSession;
      }
    }

    throw new Error("Scene lifecycle did not stabilize.");
  }

  async function hydrateSession(nextSession: GameSession): Promise<SessionView> {
    currentSession = stabilizeSession(nextSession);
    await refreshPersistedSessionFlag();
    return emit();
  }

  return {
    kind: "local",
    getView() {
      return createView();
    },
    async initialize() {
      try {
        persistenceError = null;
        const persistedSession = await loadPersistedSession();
        await hydrateSession(persistedSession ?? createSession(bundle));
      } catch (error) {
        persistenceError = getErrorMessage(error);
        await hydrateSession(createSession(bundle));
      } finally {
        ready = true;
      }

      return emit();
    },
    async choose(choiceId: string) {
      persistenceError = null;
      return hydrateSession(applyChoice(bundle, currentSession, choiceId));
    },
    async goToScene(sceneIdOrTag: string) {
      persistenceError = null;
      return hydrateSession(navigateToScene(bundle, currentSession, sceneIdOrTag));
    },
    async goBack() {
      persistenceError = null;
      return hydrateSession(navigateBack(bundle, currentSession));
    },
    async save() {
      persistenceError = null;

      try {
        await persistSession(currentSession);
      } catch (error) {
        persistenceError = getErrorMessage(error);
      }

      await refreshPersistedSessionFlag();
      return emit();
    },
    async load() {
      persistenceError = null;

      try {
        const persistedSession = await loadPersistedSession();
        if (!persistedSession) {
          await refreshPersistedSessionFlag();
          return emit();
        }

        return hydrateSession(persistedSession);
      } catch (error) {
        persistenceError = getErrorMessage(error);
        await refreshPersistedSessionFlag();
        return emit();
      }
    },
    async reset() {
      persistenceError = null;

      const storage = getStorage();
      for (const key of readableStorageKeys) {
        storage?.removeItem(key);
      }
      return hydrateSession(createSession(bundle));
    },
    subscribe(listener) {
      listeners.add(listener);
      listener(createView());

      return () => {
        listeners.delete(listener);
      };
    },
  };
}
