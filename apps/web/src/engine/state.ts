import { signal } from "@preact/signals";
import { createLocalSessionAdapter } from "../session/localSessionAdapter";
import type { SessionView } from "./types";

const sessionAdapter = createLocalSessionAdapter();
const defaultSessionView = sessionAdapter.getView();

export const sessionView = signal<SessionView>(defaultSessionView);

sessionAdapter.subscribe((nextView) => {
  sessionView.value = nextView;
});

let sessionInitializationPromise: Promise<SessionView> | null = null;

export function initializeSession() {
  if (sessionInitializationPromise) {
    return sessionInitializationPromise;
  }

  sessionInitializationPromise = sessionAdapter.initialize();
  return sessionInitializationPromise;
}

export async function chooseChoice(choiceId: string) {
  return sessionAdapter.choose(choiceId);
}

export async function saveSession() {
  return sessionAdapter.save();
}

export async function loadPersistedSession() {
  return sessionAdapter.load();
}

export async function resetSession() {
  return sessionAdapter.reset();
}
