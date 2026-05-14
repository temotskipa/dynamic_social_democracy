import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import type { ContentBundle, GameBundle, GameSession } from "@dsd/contracts";
import {
  applyChoice,
  createChoiceSnapshots,
  createSession,
  getCurrentSceneId,
  hydrateContentBundle,
  mutateGameSession,
  runCurrentSceneArrival,
  runCurrentSceneDisplay,
} from "@dsd/engine";

const content = JSON.parse(
  readFileSync("apps/web/src/content/generated/legacy-content.json", "utf8"),
) as ContentBundle;
const bundle = hydrateContentBundle(content);

function stabilizeSession(
  gameBundle: GameBundle,
  session: GameSession,
): GameSession {
  let nextSession = session;

  for (let pass = 0; pass < 25; pass += 1) {
    const currentSceneId = getCurrentSceneId(gameBundle, nextSession);
    const afterArrival = runCurrentSceneArrival(gameBundle, nextSession);
    const afterDisplay = runCurrentSceneDisplay(gameBundle, afterArrival);
    const nextSceneId = getCurrentSceneId(gameBundle, afterDisplay);

    nextSession = afterDisplay;

    if (nextSceneId === currentSceneId) {
      return nextSession;
    }
  }

  throw new Error(`Scene lifecycle did not stabilize from ${getCurrentSceneId(gameBundle, nextSession)}.`);
}

function visibleChoiceIds(session: GameSession): string[] {
  return createChoiceSnapshots(bundle, session).map((choice) => choice.id);
}

function choose(session: GameSession, choiceId: string): GameSession {
  const stableSession = stabilizeSession(bundle, session);
  assert.ok(
    visibleChoiceIds(stableSession).includes(choiceId),
    `Expected choice '${choiceId}' to be visible in ${getCurrentSceneId(bundle, stableSession)}.`,
  );

  return stabilizeSession(bundle, applyChoice(bundle, stableSession, choiceId));
}

function capture(label: string, session: GameSession) {
  const stableSession = stabilizeSession(bundle, session);

  return {
    label,
    sceneId: getCurrentSceneId(bundle, stableSession),
    choices: visibleChoiceIds(stableSession),
    legacyScriptErrors: stableSession.state.flags.__legacyScriptErrorCount ?? 0,
  };
}

function createDynamicModeSession() {
  const records = [];
  let session = stabilizeSession(bundle, createSession(bundle));

  for (const choiceId of [
    "start_1",
    "modinfo.infotext",
    "flavors",
    "root.start",
    "1928_mod_mode",
  ]) {
    session = choose(session, choiceId);
    records.push(capture(choiceId, session));
  }

  return { session, records };
}

test("golden playthrough: dynamic mode reaches the main strategy deck", () => {
  const { session, records } = createDynamicModeSession();

  assert.deepEqual(records, [
    {
      label: "start_1",
      sceneId: "pls_player",
      choices: ["modinfo.infotext"],
      legacyScriptErrors: 0,
    },
    {
      label: "modinfo.infotext",
      sceneId: "modinfo.infotext",
      choices: ["flavors"],
      legacyScriptErrors: 0,
    },
    {
      label: "flavors",
      sceneId: "flavors",
      choices: [
        "infotext",
        "faq",
        "paths",
        "changelog",
        "discord",
        "source",
        "root.start",
        "root",
      ],
      legacyScriptErrors: 0,
    },
    {
      label: "root.start",
      sceneId: "root.start",
      choices: [
        "1928_mod_mode",
        "1928_easy",
        "1928_main",
        "1928_hard",
        "1928_historical",
        "1928_challenge",
      ],
      legacyScriptErrors: 0,
    },
    {
      label: "1928_mod_mode",
      sceneId: "main.main_easy",
      choices: [
        "party",
        "govt",
        "eco",
        "time",
        "time_2",
        "advisor",
        "shuffle_leadership_pinned",
      ],
      legacyScriptErrors: 0,
    },
  ]);
  assert.equal(session.state.flags.started, 1);
  assert.equal(session.state.flags.dynamic_mode, 1);
  assert.equal(session.state.flags.difficulty, -1);
});

test("golden playthrough: advisor and government paths return to the main deck", () => {
  let { session } = createDynamicModeSession();

  session = choose(session, "advisor");
  assert.deepEqual(capture("advisor", session), {
    label: "advisor",
    sceneId: "hilferding",
    choices: [
      "against_right_and_left",
      "toleration",
      "finance_ministry_",
      "economic_democracy_",
      "root",
    ],
    legacyScriptErrors: 0,
  });

  session = choose(session, "root");
  assert.equal(getCurrentSceneId(bundle, session), "main.main_easy");

  session = choose(session, "govt");
  assert.deepEqual(capture("govt", session), {
    label: "govt",
    sceneId: "govt",
    choices: ["govt_affairs"],
    legacyScriptErrors: 0,
  });

  session = choose(session, "govt_affairs");
  assert.deepEqual(capture("govt_affairs", session), {
    label: "govt_affairs",
    sceneId: "prussian_affairs",
    choices: [
      "police_loyalty",
      "police_strength",
      "bureaucracy",
      "ban_sa",
      "prosecute_sa",
      "unban_sa",
      "ban_rfb",
      "unban_rfb",
      "ban_sh",
      "unban_sh",
      "negotiate_concordat",
      "sign_concordat",
      "root",
      "easy_discard",
      "cancel_advisor_action",
    ],
    legacyScriptErrors: 0,
  });

  session = choose(session, "root");
  assert.equal(getCurrentSceneId(bundle, session), "main.main_easy");
});

test("golden playthrough: election resolution and post-election coalition routing stay reachable", () => {
  let { session } = createDynamicModeSession();

  session = mutateGameSession(session, (state) => {
    state.currentSceneId = "election_1928";
    state.flags.has_event = 1;
  });
  session = stabilizeSession(bundle, session);
  assert.deepEqual(capture("election_1928", session), {
    label: "election_1928",
    sceneId: "election_1928",
    choices: ["election_algorithm", "cancel_elections", "boycott_elections"],
    legacyScriptErrors: 0,
  });

  session = choose(session, "election_algorithm");
  assert.deepEqual(capture("election_algorithm", session), {
    label: "election_algorithm",
    sceneId: "main.main_easy",
    choices: [
      "party",
      "govt",
      "eco",
      "time",
      "time_2",
      "advisor",
      "shuffle_leadership_pinned",
    ],
    legacyScriptErrors: 0,
  });

  session = mutateGameSession(session, (state) => {
    state.currentSceneId = "post_election_1928";
  });
  session = stabilizeSession(bundle, session);
  const postElection = capture("post_election_1928", session);

  assert.equal(postElection.sceneId, "coalition_menu");
  assert.equal(postElection.legacyScriptErrors, 0);
  assert.ok(postElection.choices.includes("spd_majority"));
  assert.ok(postElection.choices.includes("grand_coalition_prussia"));
  assert.ok(postElection.choices.includes("call_new_elections"));
});

test("golden playthrough: failure and ending menus stay reachable", () => {
  const { session: baseSession } = createDynamicModeSession();

  const gameOverSession = stabilizeSession(
    bundle,
    mutateGameSession(baseSession, (state) => {
      state.currentSceneId = "game_over";
    }),
  );
  assert.deepEqual(capture("game_over", gameOverSession), {
    label: "game_over",
    sceneId: "eg_menu",
    choices: ["endings", "ending_slides", "modinfo.paths", "end_game"],
    legacyScriptErrors: 0,
  });

  const endingSlidesSession = stabilizeSession(
    bundle,
    mutateGameSession(baseSession, (state) => {
      state.currentSceneId = "ending_slides";
    }),
  );
  assert.deepEqual(capture("ending_slides", endingSlidesSession), {
    label: "ending_slides",
    sceneId: "ending_slides",
    choices: [
      "taming_lose",
      "dnef_win",
      "weimar_win",
      "weimar_mega_win",
      "civil_war_win",
      "civil_war_long",
      "monarchy_win",
      "papen_win",
      "left_win",
    ],
    legacyScriptErrors: 0,
  });

  const achievementsSession = stabilizeSession(
    bundle,
    mutateGameSession(baseSession, (state) => {
      state.currentSceneId = "game_over.achievements";
    }),
  );
  assert.deepEqual(capture("game_over.achievements", achievementsSession), {
    label: "game_over.achievements",
    sceneId: "fun_zone",
    choices: ["go_back"],
    legacyScriptErrors: 0,
  });
});
