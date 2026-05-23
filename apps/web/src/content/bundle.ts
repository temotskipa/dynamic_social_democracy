import { hydrateContentBundle } from "@dsd/engine";
import type { ContentBundle, GameBundle } from "@dsd/contracts";
import legacyContentUrl from "./generated/legacy-content.json?url";

let legacyGameBundlePromise: Promise<GameBundle> | null = null;

export async function loadLegacyContentBundle(): Promise<ContentBundle> {
  const response = await fetch(legacyContentUrl);
  if (!response.ok) {
    throw new Error(`Unable to load legacy content bundle: ${response.status} ${response.statusText}`);
  }

  return await response.json() as ContentBundle;
}

export function loadLegacyGameBundle(): Promise<GameBundle> {
  legacyGameBundlePromise ??= loadLegacyContentBundle().then((contentBundle) =>
    hydrateContentBundle(contentBundle),
  );
  return legacyGameBundlePromise;
}
