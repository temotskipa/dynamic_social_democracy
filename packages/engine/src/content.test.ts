import * as assert from "node:assert/strict";
import { test } from "node:test";
import type { ContentBundle } from "@dsd/contracts";
import {
  applyChoice,
  createSession,
  createSessionSnapshot,
  hydrateContentBundle,
  renderCurrentScene,
  runCurrentSceneArrival,
  runCurrentSceneDisplay,
} from "./index.ts";

test("hydrates typed JSON content into a playable bundle", () => {
  const contentBundle: ContentBundle = {
    metadata: {
      id: "test-content",
      title: "Test Content",
      version: "0.0.0",
      sourceFormat: "json",
      generatedAt: "1970-01-01T00:00:00.000Z",
    },
    initialSceneId: "start",
    mechanics: {
      conditions: ["legacy.expression"],
      effects: ["legacy.script"],
    },
    qdisplays: {},
    assets: {
      references: [],
    },
    scenes: {
      start: {
        id: "start",
        titleHtml: "Start",
        bodyHtml: "Hello [+ name +]",
        onArrival: [{ id: "legacy.script", params: { code: "Q.name = 'Weimar';" } }],
        choices: [
          {
            id: "next",
            labelHtml: "Continue",
            nextSceneId: "next",
            conditions: [{ id: "legacy.expression", params: { code: "name == 'Weimar'" } }],
          },
        ],
      },
      next: {
        id: "next",
        titleHtml: "Next",
        bodyHtml: "Done",
        choices: [],
      },
    },
  };

  const bundle = hydrateContentBundle(contentBundle);
  const session = runCurrentSceneArrival(bundle, createSession(bundle));
  const snapshot = createSessionSnapshot(bundle, session);

  assert.equal(bundle.id, "test-content");
  assert.equal(snapshot.sceneId, "start");
  assert.equal(snapshot.visibleChoices[0]?.id, "next");
});

test("resolves legacy tag choices to visible tagged scenes", () => {
  const contentBundle: ContentBundle = {
    metadata: {
      id: "tag-content",
      title: "Tag Content",
      version: "0.0.0",
      sourceFormat: "json",
      generatedAt: "1970-01-01T00:00:00.000Z",
    },
    initialSceneId: "start",
    mechanics: {
      conditions: ["legacy.expression"],
      effects: ["legacy.script"],
    },
    qdisplays: {},
    assets: {
      references: [],
    },
    scenes: {
      start: {
        id: "start",
        titleHtml: "Start",
        bodyHtml: "Choose",
        choices: [{ id: "tagged", labelHtml: "Tagged", nextSceneId: "topic" }],
      },
      firstTopic: {
        id: "firstTopic",
        titleHtml: "Hidden",
        bodyHtml: "No",
        conditions: [{ id: "legacy.expression", params: { code: "false" } }],
        tags: ["topic"],
        choices: [],
      },
      secondTopic: {
        id: "secondTopic",
        titleHtml: "Visible",
        bodyHtml: "Yes",
        tags: ["topic"],
        choices: [],
      },
    },
  };

  const bundle = hydrateContentBundle(contentBundle);
  const session = createSession(bundle);
  const nextSession = applyChoice(bundle, session, "tagged");

  assert.equal(nextSession.state.currentSceneId, "secondTopic");
});

test("uses session history for legacy special back choices", () => {
  const contentBundle: ContentBundle = {
    metadata: {
      id: "back-content",
      title: "Back Content",
      version: "0.0.0",
      sourceFormat: "json",
      generatedAt: "1970-01-01T00:00:00.000Z",
    },
    initialSceneId: "start",
    mechanics: {
      conditions: ["legacy.expression"],
      effects: ["legacy.script"],
    },
    qdisplays: {},
    assets: {
      references: [],
    },
    scenes: {
      start: {
        id: "start",
        titleHtml: "Start",
        bodyHtml: "Start",
        choices: [{ id: "library", labelHtml: "Library", nextSceneId: "library" }],
      },
      library: {
        id: "library",
        titleHtml: "Library",
        bodyHtml: "Library",
        choices: [{ id: "back", labelHtml: "Back", nextSceneId: "backSpecialScene" }],
      },
    },
  };

  const bundle = hydrateContentBundle(contentBundle);
  const librarySession = applyChoice(bundle, createSession(bundle), "library");
  const backSession = applyChoice(bundle, librarySession, "back");

  assert.equal(librarySession.state.currentSceneId, "library");
  assert.equal(backSession.state.currentSceneId, "start");
});

test("formats qdisplay interpolations from content bundles", () => {
  const contentBundle: ContentBundle = {
    metadata: {
      id: "qdisplay-content",
      title: "QDisplay Content",
      version: "0.0.0",
      sourceFormat: "json",
      generatedAt: "1970-01-01T00:00:00.000Z",
    },
    initialSceneId: "start",
    mechanics: {
      conditions: ["legacy.expression"],
      effects: ["legacy.script"],
    },
    qdisplays: {
      strength: {
        id: "strength",
        sourcePath: "strength.qdisplay.dry",
        body: "(0..10) weak\n(10..25) moderate",
      },
    },
    assets: {
      references: [],
    },
    scenes: {
      start: {
        id: "start",
        titleHtml: "Strength [+ score : strength +]",
        bodyHtml: "Score: [+ score : strength +]",
        onArrival: [{ id: "legacy.script", params: { code: "Q.score = 8;" } }],
        choices: [],
      },
    },
  };

  const bundle = hydrateContentBundle(contentBundle);
  const session = runCurrentSceneArrival(bundle, createSession(bundle));
  const snapshot = createSessionSnapshot(bundle, session);

  assert.equal(snapshot.title, "Strength weak");
  assert.equal(renderCurrentScene(bundle, session), "Score: weak");
  assert.equal(snapshot.sceneId, "start");
});

test("runs imported legacy go-to routes on scene arrival", () => {
  const contentBundle: ContentBundle = {
    metadata: {
      id: "goto-content",
      title: "GoTo Content",
      version: "0.0.0",
      sourceFormat: "json",
      generatedAt: "1970-01-01T00:00:00.000Z",
    },
    initialSceneId: "start",
    mechanics: {
      conditions: ["legacy.expression"],
      effects: ["legacy.script", "legacy.goto"],
    },
    qdisplays: {},
    assets: {
      references: [],
    },
    scenes: {
      start: {
        id: "start",
        titleHtml: "Start",
        bodyHtml: "Start",
        onArrival: [{
          id: "legacy.goto",
          params: {
            routes: [
              { targetSceneId: "blocked", condition: "false" },
              { targetSceneId: "next", condition: "true" },
            ],
          },
        }],
        choices: [],
      },
      blocked: {
        id: "blocked",
        titleHtml: "Blocked",
        bodyHtml: "Blocked",
        choices: [],
      },
      next: {
        id: "next",
        titleHtml: "Next",
        bodyHtml: "Next",
        choices: [],
      },
    },
  };

  const bundle = hydrateContentBundle(contentBundle);
  const session = runCurrentSceneArrival(bundle, createSession(bundle));

  assert.equal(session.state.currentSceneId, "next");
});

test("runs imported flag patch operations without legacy eval", () => {
  const contentBundle: ContentBundle = {
    metadata: {
      id: "flag-patch-content",
      title: "Flag Patch Content",
      version: "0.0.0",
      sourceFormat: "json",
      generatedAt: "1970-01-01T00:00:00.000Z",
    },
    initialSceneId: "start",
    mechanics: {
      conditions: ["legacy.expression"],
      effects: ["flags.patch"],
    },
    qdisplays: {},
    assets: {
      references: [],
    },
    scenes: {
      start: {
        id: "start",
        titleHtml: "Start",
        bodyHtml: "Start",
        onArrival: [{
          id: "flags.patch",
          params: {
            operations: [
              { op: "set", key: "resources", value: 3 },
              { op: "add", key: "resources", value: 2 },
              { op: "set", key: "budget", from: "resources" },
              { op: "set", key: "chancellor", value: "Braun" },
              { op: "set", key: "parties", value: ["spd", "kpd"] },
              { op: "arrayPush", key: "parties", value: "ddp" },
              { op: "arrayRemove", key: "parties", value: "kpd" },
              {
                op: "add",
                key: "resources",
                value: 1,
                condition: {
                  type: "binary",
                  operator: "==",
                  left: { type: "flag", key: "chancellor" },
                  right: { type: "literal", value: "Braun" },
                },
              },
              {
                op: "multiply",
                key: "resources",
                value: 2,
                condition: {
                  type: "binary",
                  operator: "==",
                  left: { type: "flag", key: "chancellor" },
                  right: { type: "literal", value: "Wirth" },
                },
              },
              { op: "set", key: "dvp_right", value: 7 },
              { op: "set", key: "dvp_left", value: 4 },
              {
                op: "set",
                key: "dvp_ideology",
                value: "Right",
                condition: {
                  type: "binary",
                  operator: "||",
                  left: {
                    type: "binary",
                    operator: ">",
                    left: { type: "flag", key: "dvp_right" },
                    right: {
                      type: "binary",
                      operator: "*",
                      left: { type: "flag", key: "dvp_left" },
                      right: { type: "literal", value: 1.5 },
                    },
                  },
                  right: {
                    type: "binary",
                    operator: ">",
                    left: { type: "flag", key: "dvp_right" },
                    right: {
                      type: "binary",
                      operator: "+",
                      left: { type: "flag", key: "dvp_left" },
                      right: { type: "literal", value: 4 },
                    },
                  },
                },
              },
              {
                op: "set",
                key: "dvp_ideology",
                value: "Moderate",
                condition: {
                  type: "unary",
                  operator: "!",
                  expression: {
                    type: "binary",
                    operator: "||",
                    left: {
                      type: "binary",
                      operator: ">",
                      left: { type: "flag", key: "dvp_right" },
                      right: {
                        type: "binary",
                        operator: "*",
                        left: { type: "flag", key: "dvp_left" },
                        right: { type: "literal", value: 1.5 },
                      },
                    },
                    right: {
                      type: "binary",
                      operator: ">",
                      left: { type: "flag", key: "dvp_right" },
                      right: {
                        type: "binary",
                        operator: "+",
                        left: { type: "flag", key: "dvp_left" },
                        right: { type: "literal", value: 4 },
                      },
                    },
                  },
                },
              },
              {
                op: "set",
                key: "score",
                valueExpression: {
                  type: "binary",
                  operator: "-",
                  left: {
                    type: "binary",
                    operator: "*",
                    left: { type: "flag", key: "resources" },
                    right: { type: "flag", key: "budget" },
                  },
                  right: { type: "literal", value: 4 },
                },
              },
              {
                op: "add",
                key: "score",
                valueExpression: {
                  type: "binary",
                  operator: "/",
                  left: { type: "flag", key: "resources" },
                  right: { type: "literal", value: 2 },
                },
              },
              {
                op: "set",
                key: "rounded",
                valueExpression: {
                  type: "call",
                  fn: "roundTo",
                  args: [
                    {
                      type: "binary",
                      operator: "/",
                      left: { type: "flag", key: "score" },
                      right: { type: "literal", value: 8 },
                    },
                    { type: "literal", value: 1 },
                  ],
                },
              },
              {
                op: "set",
                key: "floored",
                valueExpression: {
                  type: "call",
                  fn: "floor",
                  args: [{ type: "flag", key: "rounded" }],
                },
              },
              {
                op: "set",
                key: "resources_display",
                valueExpression: {
                  type: "call",
                  fn: "fixed",
                  args: [
                    { type: "flag", key: "resources" },
                    { type: "literal", value: 1 },
                  ],
                },
              },
              { op: "set", key: "z_relation", value: 42 },
              { op: "set", key: "z_r", value: 9 },
              {
                op: "set",
                key: "z_no_confidence",
                valueExpression: {
                  type: "conditional",
                  condition: {
                    type: "binary",
                    operator: "<",
                    left: { type: "flag", key: "z_relation" },
                    right: { type: "literal", value: 45 },
                  },
                  consequent: { type: "literal", value: 1 },
                  alternate: { type: "literal", value: 0 },
                },
              },
              {
                op: "add",
                key: "no_confidence_votes",
                valueExpression: {
                  type: "conditional",
                  condition: { type: "flag", key: "z_no_confidence" },
                  consequent: { type: "flag", key: "z_r" },
                  alternate: { type: "literal", value: 0 },
                },
              },
              { op: "set", key: "liberal_parliament", value: false },
              { op: "set", key: "bourgeois_parliament", value: true },
              { op: "set", key: "lvp_formed", value: false },
              {
                op: "set",
                key: "emergency_decree_mitigated",
                valueExpression: {
                  type: "binary",
                  operator: "||",
                  left: { type: "flag", key: "liberal_parliament" },
                  right: {
                    type: "binary",
                    operator: "||",
                    left: {
                      type: "binary",
                      operator: "&&",
                      left: { type: "flag", key: "bourgeois_parliament" },
                      right: {
                        type: "unary",
                        operator: "!",
                        expression: { type: "flag", key: "lvp_formed" },
                      },
                    },
                    right: { type: "flag", key: "lvp_formed" },
                  },
                },
              },
            ],
          },
        }],
        choices: [],
      },
    },
  };

  const bundle = hydrateContentBundle(contentBundle);
  const session = runCurrentSceneArrival(bundle, createSession(bundle));

  assert.equal(session.state.flags.resources, 6);
  assert.equal(session.state.flags.budget, 5);
  assert.equal(session.state.flags.score, 29);
  assert.equal(session.state.flags.rounded, 3.6);
  assert.equal(session.state.flags.floored, 3);
  assert.equal(session.state.flags.resources_display, "6.0");
  assert.equal(session.state.flags.z_no_confidence, 1);
  assert.equal(session.state.flags.no_confidence_votes, 9);
  assert.equal(session.state.flags.emergency_decree_mitigated, true);
  assert.equal(session.state.flags.chancellor, "Braun");
  assert.equal(session.state.flags.dvp_ideology, "Right");
  assert.deepEqual(session.state.flags.parties, ["spd", "ddp"]);
  assert.equal(session.state.flags.__legacyScriptErrorCount, undefined);
});

test("ignores imported legacy layout hints without legacy eval", () => {
  const contentBundle: ContentBundle = {
    metadata: {
      id: "legacy-layout-content",
      title: "Legacy Layout Content",
      version: "0.0.0",
      sourceFormat: "json",
      generatedAt: "1970-01-01T00:00:00.000Z",
    },
    initialSceneId: "start",
    mechanics: {
      conditions: ["legacy.expression"],
      effects: ["ui.legacyLayout"],
    },
    qdisplays: {},
    assets: {
      references: [],
    },
    scenes: {
      start: {
        id: "start",
        titleHtml: "Start",
        bodyHtml: "Start",
        onArrival: [{
          id: "ui.legacyLayout",
          params: {
            toolsWrapperDisplay: "block",
            maxWidth: "540px",
          },
        }],
        choices: [],
      },
    },
  };

  const bundle = hydrateContentBundle(contentBundle);
  const session = runCurrentSceneArrival(bundle, createSession(bundle));

  assert.equal(session.state.currentSceneId, "start");
  assert.equal(session.state.flags.__legacyScriptErrorCount, undefined);
});

test("runs imported flag compare conditions without legacy eval", () => {
  const contentBundle: ContentBundle = {
    metadata: {
      id: "flag-compare-content",
      title: "Flag Compare Content",
      version: "0.0.0",
      sourceFormat: "json",
      generatedAt: "1970-01-01T00:00:00.000Z",
    },
    initialSceneId: "start",
    mechanics: {
      conditions: ["flags.compare"],
      effects: ["flags.patch"],
    },
    qdisplays: {},
    assets: {
      references: [],
    },
    scenes: {
      start: {
        id: "start",
        titleHtml: "Start",
        bodyHtml: "Start",
        onArrival: [{
          id: "flags.patch",
          params: {
            operations: [
              { op: "set", key: "resources", value: 4 },
              { op: "set", key: "budget", value: 4 },
              { op: "set", key: "chancellor", value: "Braun" },
            ],
          },
        }],
        choices: [
          {
            id: "match-number",
            labelHtml: "Match Number",
            nextSceneId: "end",
            conditions: [{ id: "flags.compare", params: { key: "resources", operator: ">=", value: 4 } }],
          },
          {
            id: "match-copy",
            labelHtml: "Match Copy",
            nextSceneId: "end",
            conditions: [{ id: "flags.compare", params: { key: "resources", operator: "==", from: "budget" } }],
          },
          {
            id: "hidden",
            labelHtml: "Hidden",
            nextSceneId: "end",
            conditions: [{ id: "flags.compare", params: { key: "chancellor", operator: "!=", value: "Braun" } }],
          },
          {
            id: "missing-is-falsy",
            labelHtml: "Missing Is Falsy",
            nextSceneId: "end",
            conditions: [{ id: "flags.compare", params: { key: "missing", operator: "falsy" } }],
          },
        ],
      },
      end: {
        id: "end",
        titleHtml: "End",
        bodyHtml: "End",
        choices: [],
      },
    },
  };

  const bundle = hydrateContentBundle(contentBundle);
  const session = runCurrentSceneArrival(bundle, createSession(bundle));
  const snapshot = createSessionSnapshot(bundle, session);

  assert.deepEqual(snapshot.visibleChoices.map((choice) => choice.id), [
    "match-number",
    "match-copy",
    "missing-is-falsy",
  ]);
});

test("runs imported flag expression conditions without legacy eval", () => {
  const contentBundle: ContentBundle = {
    metadata: {
      id: "flag-expression-content",
      title: "Flag Expression Content",
      version: "0.0.0",
      sourceFormat: "json",
      generatedAt: "1970-01-01T00:00:00.000Z",
    },
    initialSceneId: "start",
    mechanics: {
      conditions: ["flags.expression"],
      effects: ["flags.patch"],
    },
    qdisplays: {},
    assets: {
      references: [],
    },
    scenes: {
      start: {
        id: "start",
        titleHtml: "Start",
        bodyHtml: "Start",
        onArrival: [{
          id: "flags.patch",
          params: {
            operations: [
              { op: "set", key: "resources", value: 4 },
              { op: "set", key: "budget", value: 3 },
              { op: "set", key: "cabinet", value: "Braun" },
            ],
          },
        }],
        choices: [
          {
            id: "compound",
            labelHtml: "Compound",
            nextSceneId: "end",
            conditions: [{
              id: "flags.expression",
              params: {
                ast: {
                  type: "binary",
                  operator: "||",
                  left: {
                    type: "binary",
                    operator: "==",
                    left: { type: "flag", key: "cabinet" },
                    right: { type: "literal", value: "Wirth" },
                  },
                  right: {
                    type: "binary",
                    operator: "&&",
                    left: {
                      type: "binary",
                      operator: ">=",
                      left: {
                        type: "binary",
                        operator: "+",
                        left: { type: "flag", key: "resources" },
                        right: { type: "flag", key: "budget" },
                      },
                      right: { type: "literal", value: 7 },
                    },
                    right: {
                      type: "unary",
                      operator: "!",
                      expression: { type: "flag", key: "missing" },
                    },
                  },
                },
              },
            }],
          },
          {
            id: "hidden",
            labelHtml: "Hidden",
            nextSceneId: "end",
            conditions: [{
              id: "flags.expression",
              params: {
                ast: {
                  type: "binary",
                  operator: ">",
                  left: {
                    type: "binary",
                    operator: "%",
                    left: { type: "flag", key: "resources" },
                    right: { type: "literal", value: 2 },
                  },
                  right: { type: "literal", value: 0 },
                },
              },
            }],
          },
        ],
      },
      end: {
        id: "end",
        titleHtml: "End",
        bodyHtml: "End",
        choices: [],
      },
    },
  };

  const bundle = hydrateContentBundle(contentBundle);
  const session = runCurrentSceneArrival(bundle, createSession(bundle));
  const snapshot = createSessionSnapshot(bundle, session);

  assert.deepEqual(snapshot.visibleChoices.map((choice) => choice.id), ["compound"]);
});

test("provides a minimal Dendry this-context for legacy scripts", () => {
  const contentBundle: ContentBundle = {
    metadata: {
      id: "this-content",
      title: "This Content",
      version: "0.0.0",
      sourceFormat: "json",
      generatedAt: "1970-01-01T00:00:00.000Z",
    },
    initialSceneId: "start",
    mechanics: {
      conditions: ["legacy.expression"],
      effects: ["legacy.script"],
    },
    qdisplays: {},
    assets: {
      references: [],
    },
    scenes: {
      start: {
        id: "start",
        titleHtml: "Start",
        bodyHtml: "Start",
        onArrival: [{
          id: "legacy.script",
          params: { code: "this.achieve('sample'); this.state.disableSaves = true;" },
        }],
        choices: [],
      },
    },
  };

  const bundle = hydrateContentBundle(contentBundle);
  const session = runCurrentSceneArrival(bundle, createSession(bundle));

  assert.equal(session.state.flags.achievement_sample, 1);
  assert.equal(session.state.flags.disableSaves, true);
});

test("records legacy script failures without blocking scene progression", () => {
  const contentBundle: ContentBundle = {
    metadata: {
      id: "script-error-content",
      title: "Script Error Content",
      version: "0.0.0",
      sourceFormat: "json",
      generatedAt: "1970-01-01T00:00:00.000Z",
    },
    initialSceneId: "start",
    mechanics: {
      conditions: ["legacy.expression"],
      effects: ["legacy.script"],
    },
    qdisplays: {},
    assets: {
      references: [],
    },
    scenes: {
      start: {
        id: "start",
        titleHtml: "Start",
        bodyHtml: "Start",
        onDisplay: [{
          id: "legacy.script",
          params: { code: "missingBrowserLibrary.call();" },
        }],
        choices: [],
      },
    },
  };

  const bundle = hydrateContentBundle(contentBundle);
  const session = runCurrentSceneDisplay(bundle, createSession(bundle));

  assert.equal(session.state.currentSceneId, "start");
  assert.equal(session.state.flags.__legacyScriptErrorCount, 1);
});

test("treats missing legacy flags as zero in imported route conditions", () => {
  const contentBundle: ContentBundle = {
    metadata: {
      id: "missing-flag-content",
      title: "Missing Flag Content",
      version: "0.0.0",
      sourceFormat: "json",
      generatedAt: "1970-01-01T00:00:00.000Z",
    },
    initialSceneId: "start",
    mechanics: {
      conditions: ["legacy.expression"],
      effects: ["legacy.goto"],
    },
    qdisplays: {},
    assets: {
      references: [],
    },
    scenes: {
      start: {
        id: "start",
        titleHtml: "Start",
        bodyHtml: "Start",
        onArrival: [{
          id: "legacy.goto",
          params: {
            routes: [{ targetSceneId: "next", condition: "state.flags['missing_flag'] == 0" }],
          },
        }],
        choices: [],
      },
      next: {
        id: "next",
        titleHtml: "Next",
        bodyHtml: "Next",
        choices: [],
      },
    },
  };

  const bundle = hydrateContentBundle(contentBundle);
  const session = runCurrentSceneArrival(bundle, createSession(bundle));

  assert.equal(session.state.currentSceneId, "next");
});
