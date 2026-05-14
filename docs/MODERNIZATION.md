# Modernization

## Goals

- Make the Node 26 + Vite + Preact path the canonical build and deploy flow.
- Preserve full gameplay and UI parity where the game needs it.
- Replace DendryNexus with typed JSON content plus TypeScript mechanics libraries.
- Keep upstream `.dry` content sync possible until authoring fully moves to JSON.
- Keep deployment static-first and leave desktop packaging as a future track.

## Current State

- DendryNexus is removed from the canonical scripts and CI path.
- `.dry` content compiles into `apps/web/src/content/generated/legacy-content.json`.
- Legacy generated scene TypeScript has been removed from `apps/web/src/content/scenes`.
- The engine hydrates JSON content through stable mechanics refs.
- Legacy `go-to`, tag targets, and special back targets are resolved by the modern engine; content validation currently reports zero migration warnings.
- `apps/web/src/content/generated/legacy-content.report.json` records import warnings for review.
- Legacy image assets referenced by the manifest are served from `apps/web/public/img`, and validation fails if a referenced asset is missing or escapes the public asset root.
- Qdisplay interpolation is handled by the modern engine from imported `.qdisplay.dry` records.
- Simple imported flag mutations are emitted as named `flags.patch` mechanics instead of generic legacy script evaluation.
- Simple imported flag conditions and pure `and` chains are emitted as named `flags.compare` mechanics instead of generic legacy expression evaluation.
- Legacy script execution includes a minimal Dendry-compatible `this`, `window`, `document`, and `dendryUI` context, and records non-blocking script failures for diagnostics.
- The frontend uses a restrained strategy-desk layout while preserving raw trusted content rendering.
- Node golden playthrough tests cover dynamic-mode boot, advisor return, government affairs return, election resolution, post-election coalition routing, failure menus, and ending menus.
- Vite+ has been evaluated as an alpha toolchain option. Keep plain Vite canonical for now; reconsider Vite+ after Vite 8 migration and alpha stabilization.

## Next Migration Work

- Continue replacing remaining `legacy.script` and `legacy.expression` refs with named TypeScript mechanics for elections, qdisplays, advisors, and recurring calculations.
- Move generated JSON toward hand-editable scene records once compiler parity is high.
- Extend golden playthrough snapshots with longer success/failure branches that exercise late-game choices rather than seeded menu reachability.
- Replace the four upstream-missing placeholder achievement images once canonical artwork is available.
- Evaluate Tauri or Electron only after the static web app is stable.

## Validation Commands

- `node --run compile:content`
- `node --run validate:content`
- `node --run validate:permissions`
- `node --run test`
- `node --run build`
- `node --run budget:bundle`
- `node --run test:e2e`
