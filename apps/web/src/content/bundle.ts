import { hydrateContentBundle } from "@dsd/engine";
import type { ContentBundle, GameBundle } from "@dsd/contracts";
import legacyContent from "./generated/legacy-content.json";

export const legacyContentBundle = legacyContent as unknown as ContentBundle;

export const legacyGameBundle: GameBundle = hydrateContentBundle(legacyContentBundle);
