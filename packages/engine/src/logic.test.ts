import * as assert from "node:assert/strict";
import { test } from "node:test";
import { LogicInterpreter } from "./logic.ts";
import { createInitialState } from "./state.ts";

test("formats nested Dendry inline conditionals", () => {
  const state = createInitialState();
  state.flags.lvp_formed = 0;
  state.flags.dvp_exist = 1;
  state.flags.ddp_name = "DDP";

  const text =
    "Coalition [? if not lvp_formed: <span>[+ ddp_name +]</span>[? if dvp_exist: + DVP ?]?] ready";

  assert.equal(
    LogicInterpreter.processText(text, state),
    "Coalition  <span>DDP</span> + DVP  ready",
  );
});

test("removes nested Dendry inline conditionals when the outer condition is false", () => {
  const state = createInitialState();
  state.flags.lvp_formed = 1;
  state.flags.dvp_exist = 1;
  state.flags.ddp_name = "DDP";

  const text =
    "Coalition [? if not lvp_formed: <span>[+ ddp_name +]</span>[? if dvp_exist: + DVP ?]?] ready";

  assert.equal(LogicInterpreter.processText(text, state), "Coalition  ready");
});
