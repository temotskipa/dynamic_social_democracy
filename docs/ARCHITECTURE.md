# Architecture

Dynamic Social Democracy is being migrated from a DendryNexus-generated game to a static Vite application.

## Workspaces

- `apps/web`: Preact frontend, local session adapter, Playwright smoke tests, and static Vite build.
- `apps/server`: optional future server experiments. Gameplay must not require it.
- `packages/contracts`: shared state, session, and typed content interfaces.
- `packages/engine`: pure gameplay/session/content hydration code.
- `packages/content-compiler`: source discovery and content-bundle validation.

## Content Flow

The current bridge is:

1. `source/**/*.dry`
2. `scripts/migrate.ts --json`
3. `apps/web/src/content/generated/legacy-content.json`
4. Vite emits the JSON bundle as a static asset
5. `hydrateContentBundle` in `@dsd/engine`
6. Preact renders the hydrated `GameBundle`

The JSON bundle stores scene records, stable mechanics references, and presentation metadata. Imported `is-hand`, `is-deck`, `is-card`, `is-pinned-card`, `card-image`, and `max-cards` fields hydrate into `SceneRecord.ui`, then into session board snapshots for the Preact card surface. Imported flag conditions now hydrate through `flags.compare` or structured `flags.expression` AST refs; obsolete Dendry chrome layout hints import as inert `ui.legacyLayout` refs; remaining legacy effect bodies are carried as parameters to `legacy.script`. Future work should replace high-value legacy effects with named TypeScript functions.

## Runtime

The web app is static-first and stores sessions in browser local storage. Session schema v2 is canonical, with migration support for v1 `legacy-generated-scenes` saves.

Raw HTML in content is trusted repo-authored game content. The engine resolves Dendry inline conditionals, interpolations, and qdisplay formatting before the frontend renders the text; the frontend only applies final markup shims for raw markers and basic legacy markdown.

UI work should preserve the original DendryNexus presentation as the default target. The Preact shell owns runtime structure because the app is static-first, but layout, text flow, status surfaces, and content styling should remain as close to the original game as practical unless a documented compatibility or product decision requires a change.

The main dynamic gameplay scene is a hand scene. Its board snapshot groups visible deck/card choices and visible pinned advisor scenes into `Decks`, `Hand`, and `Advisors`; the frontend should render those groups instead of exposing the same targets as plain choices.
