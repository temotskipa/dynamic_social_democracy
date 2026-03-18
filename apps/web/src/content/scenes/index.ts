// @ts-nocheck
import { Scene } from "../../engine/types";
import * as _advisors from "./advisors";
import * as _misc from "./misc";
import * as _credits from "./credits";
import * as _ending_slides from "./ending_slides";
import * as _game_over from "./game_over";
import * as _government_affairs from "./government_affairs";
import * as _library from "./library";
import * as _main from "./main";
import * as _modinfo from "./modinfo";
import * as _party_affairs from "./party_affairs";
import * as _post_event from "./post_event";
import * as _root from "./root";
import * as _status from "./status";

export const allScenes: Record<string, Scene> = {};

const register = (mod: any) => {
  Object.values(mod).forEach((scene: any) => {
    if(scene && scene.id) {
       allScenes[scene.id] = scene;
    }
  });
};
register(_advisors);
register(_misc);
register(_credits);
register(_ending_slides);
register(_game_over);
register(_government_affairs);
register(_library);
register(_main);
register(_modinfo);
register(_party_affairs);
register(_post_event);
register(_root);
register(_status);

