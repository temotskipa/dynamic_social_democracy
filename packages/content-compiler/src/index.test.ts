import * as assert from "node:assert/strict";
import { test } from "node:test";
import type { ContentBundle } from "@dsd/contracts";
import { validateContentBundle } from "./index.ts";

function createBundle(): ContentBundle {
  return {
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
        bodyHtml: "",
        choices: [{ id: "end", labelHtml: "End", nextSceneId: "end" }],
      },
      end: {
        id: "end",
        titleHtml: "End",
        bodyHtml: "",
        choices: [],
      },
    },
  };
}

test("validates content bundles without graph errors", () => {
  assert.deepEqual(validateContentBundle(createBundle()), []);
});

test("reports missing choice targets", () => {
  const bundle = createBundle();
  bundle.scenes.start.choices[0].nextSceneId = "missing";

  assert.deepEqual(validateContentBundle(bundle).map((issue) => issue.code), ["missing-choice-target"]);
});

test("accepts choice targets that resolve through tags", () => {
  const bundle = createBundle();
  bundle.scenes.start.choices[0].nextSceneId = "tagged-end";
  bundle.scenes.end.tags = ["tagged-end"];

  assert.deepEqual(validateContentBundle(bundle), []);
});

test("accepts legacy special back targets", () => {
  const bundle = createBundle();
  bundle.scenes.start.choices[0].nextSceneId = "backSpecialScene";

  assert.deepEqual(validateContentBundle(bundle), []);
});

test("accepts imported flag patch effects", () => {
  const bundle = createBundle();
  bundle.scenes.start.onArrival = [{
    id: "flags.patch",
    params: {
      operations: [{ op: "set", key: "started", value: 1 }],
    },
  }];

  assert.deepEqual(validateContentBundle(bundle), []);
});

test("accepts imported legacy layout effects", () => {
  const bundle = createBundle();
  bundle.scenes.start.onArrival = [{
    id: "ui.legacyLayout",
    params: {
      toolsWrapperDisplay: "block",
      maxWidth: "540px",
    },
  }];

  assert.deepEqual(validateContentBundle(bundle), []);
});

test("accepts imported flag compare conditions", () => {
  const bundle = createBundle();
  bundle.scenes.start.choices[0].conditions = [{
    id: "flags.compare",
    params: {
      key: "started",
      operator: "==",
      value: 1,
    },
  }];

  assert.deepEqual(validateContentBundle(bundle), []);
});

test("accepts imported flag expression conditions", () => {
  const bundle = createBundle();
  bundle.scenes.start.choices[0].conditions = [{
    id: "flags.expression",
    params: {
      ast: {
        type: "binary",
        operator: "||",
        left: { type: "flag", key: "cabinet_ready" },
        right: {
          type: "binary",
          operator: ">=",
          left: { type: "flag", key: "reform_votes" },
          right: { type: "literal", value: 50 },
        },
      },
    },
  }];

  assert.deepEqual(validateContentBundle(bundle), []);
});
