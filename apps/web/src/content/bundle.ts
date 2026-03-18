import type { GameBundle } from "../engine/types";
import { allScenes } from "./scenes";

export const legacyGameBundle: GameBundle = {
  id: "legacy-generated-scenes",
  scenes: allScenes,
  resolveInitialSceneId: (state) => (state.flags.started ? "post_event" : "start_menu_2"),
};
