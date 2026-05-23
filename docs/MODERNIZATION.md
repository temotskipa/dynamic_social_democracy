# Modernization

## Goals

- Make the Node 26 + Vite + Preact path the canonical build and deploy flow.
- Preserve original gameplay presentation and UI behavior as much as possible. Treat modernization as a runtime/tooling migration first; visual changes need a compatibility reason or an explicit product decision.
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
- Nested Dendry inline conditionals and interpolations are resolved by the modern formatter; a full generated-scene sweep currently finds no leaked `[? if ...]` or `[+ ... +]` markers under the default render pass.
- Simple imported flag mutations, static Dendry `Q` alias writes, expression-valued arithmetic and rounding updates, multipliers, achievements, postfix conditionals, and simple single- or multi-statement `if` mutations are emitted as named `flags.patch` mechanics instead of generic legacy script evaluation.
- Simple imported flag conditions and pure `and` chains are emitted as named `flags.compare` mechanics instead of generic legacy expression evaluation.
- Compound imported flag expressions are emitted as structured `flags.expression` AST mechanics; imported conditions no longer require `legacy.expression`.
- Simple imported image-append display scripts are folded into scene HTML, with the referenced upstream images served from `apps/web/public/img`.
- Obsolete Dendry chrome layout scripts are imported as inert `ui.legacyLayout` refs so the modern Preact shell owns layout without running legacy DOM code.
- Legacy script execution includes a minimal Dendry-compatible `this`, `window`, `document`, and `dendryUI` context, and records non-blocking script failures for diagnostics.
- The frontend target is preservation-first: keep the original DendryNexus content flow, reading rhythm, status affordances, and visual feel wherever technically viable while preserving raw trusted content rendering.
- Imported scene UI metadata now identifies hand scenes, deck/card scenes, pinned advisor cards, card images, and hand limits. The engine exposes that data as a board snapshot, and the Preact shell renders a first-pass `Decks`, `Hand`, and `Advisors` surface from the JSON bundle.
- Node golden playthrough tests cover dynamic-mode boot, advisor return, government affairs return, election resolution, post-election coalition routing, failure menus, and ending menus.
- Vite+ has been evaluated as an alpha toolchain option. Keep plain Vite canonical for now; reconsider Vite+ after Vite 8 migration and alpha stabilization.

## Observed Upstream UI Parity Targets

Playwright MCP was used against `https://originn0.github.io/dynamic_social_democracy/` to inspect the live upstream DendryNexus UI. The modern Preact shell should preserve these surfaces before any broad visual redesign:

- Persistent header with game title, author/mod credit, and `Library`, `Save/Load`, and `Options` navigation.
- Left-side tools/status rail with `Main`, `Politics`, `Defense`, and `Polls` tabs.
- `Main` tab status blocks for date, resources, government position, Prussian government, dissent, cabinet offices, Reichstag composition, election timing, inflation, and growth.
- `Politics`, `Defense`, and `Polls` tabs as dense text dashboards, including party relationships/leadership, paramilitary/military strength, projected election results, and demographic support.
- Central content flow using headings, paragraphs, lists, blockquotes, separators, raw colored HTML, and link-style choices.
- Main gameplay deck surface with `Decks`, `Hand`, and `Advisors` regions, image-backed cards, draw/play interactions, advisor action availability text, and leadership reshuffle access.
- Save/load overlay with autosaves, numbered slots, load/save/delete/export actions, import support, and close behavior.
- Options overlay with radio controls for backgrounds, event images, animations, music, color scheme, colored text, and mod loader access.
- Library pages with inline charts/images and tables for Reichstag composition, election history, party support history, and economic history.

## Next Migration Work

- Continue replacing remaining `legacy.script` refs with named TypeScript mechanics for elections, qdisplays, advisors, and recurring calculations.
- Audit the original DendryNexus UI output against the Preact shell and close presentation gaps before making stylistic redesigns. The fallback for uncertain UI choices is original-game parity, not a new strategy-desk redesign.
- Add E2E coverage for the upstream parity surfaces: top navigation, tabbed status rail, save/load/options overlays, card deck/hand/advisors, and chart-heavy library pages.
- Replace first-pass board rendering with fuller Dendry parity: draw mechanics, hand population, card availability states, advisor action availability text, and exact save/load slot behavior.
- Move generated JSON toward hand-editable scene records once compiler parity is high.
- Extend golden playthrough snapshots with longer success/failure branches that exercise late-game choices rather than seeded menu reachability.
- Replace the upstream-missing placeholder/fallback images once canonical artwork is available.
- Evaluate Tauri or Electron only after the static web app is stable.

## Validation Commands

- `node --run compile:content`
- `node --run validate:content`
- `node --run validate:permissions`
- `node --run test`
- `node --run build`
- `node --run budget:bundle`
- `node --run test:e2e`
