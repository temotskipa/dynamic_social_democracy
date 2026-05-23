import { signal } from "@preact/signals";
import { createLocalSessionAdapter } from "../session/localSessionAdapter";
import type { SessionView } from "@dsd/contracts";
import type { SessionAdapter } from "../session/adapter";
import { loadLegacyGameBundle } from "../content/bundle";

function createPlaceholderView(
  ready: boolean,
  persistenceError: string | null = null,
): SessionView {
  return {
    ready,
    adapterKind: "local",
    hasPersistedSession: false,
    persistenceError,
    sceneId: "loading",
    currentSceneId: "loading",
    title: ready && persistenceError ? "Unable to load content" : "",
    subtitle: null,
    time: {
      year: 1928,
      month: 1,
      week: 1,
    },
    visibleChoices: [],
    board: null,
    contentHtml: persistenceError ?? "",
    debugFlags: {},
  };
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Unknown content loading error.";
}

export const sessionView = signal<SessionView>(createPlaceholderView(false));

let sessionInitializationPromise: Promise<SessionView> | null = null;
let sessionAdapterPromise: Promise<SessionAdapter> | null = null;

async function getSessionAdapter(): Promise<SessionAdapter> {
  sessionAdapterPromise ??= loadLegacyGameBundle().then((bundle) => {
    const sessionAdapter = createLocalSessionAdapter(bundle);
    sessionAdapter.subscribe((nextView) => {
      sessionView.value = nextView;
    });
    return sessionAdapter;
  });

  return sessionAdapterPromise;
}

export function initializeSession() {
  if (sessionInitializationPromise) {
    return sessionInitializationPromise;
  }

  sessionInitializationPromise = getSessionAdapter()
    .then((sessionAdapter) => sessionAdapter.initialize())
    .catch((error: unknown) => {
      const view = createPlaceholderView(true, getErrorMessage(error));
      sessionView.value = view;
      return view;
    });
  return sessionInitializationPromise;
}

export async function chooseChoice(choiceId: string) {
  const sessionAdapter = await getSessionAdapter();
  return sessionAdapter.choose(choiceId);
}

export async function goToScene(sceneIdOrTag: string) {
  const sessionAdapter = await getSessionAdapter();
  return sessionAdapter.goToScene(sceneIdOrTag);
}

export async function goBack() {
  const sessionAdapter = await getSessionAdapter();
  return sessionAdapter.goBack();
}

export async function saveSession() {
  const sessionAdapter = await getSessionAdapter();
  return sessionAdapter.save();
}

export async function loadPersistedSession() {
  const sessionAdapter = await getSessionAdapter();
  return sessionAdapter.load();
}

export async function resetSession() {
  const sessionAdapter = await getSessionAdapter();
  return sessionAdapter.reset();
}
