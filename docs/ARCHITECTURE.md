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
4. `hydrateContentBundle` in `@dsd/engine`
5. Preact renders the hydrated `GameBundle`

The JSON bundle stores scene records and stable mechanics references. Legacy condition/effect bodies are still carried as parameters to `legacy.expression` and `legacy.script`; future work should replace high-value mechanics with named TypeScript functions.

## Runtime

The web app is static-first and stores sessions in browser local storage. Session schema v2 is canonical, with migration support for v1 `legacy-generated-scenes` saves.

Raw HTML in content is trusted repo-authored game content. The frontend formats Dendry raw markers and basic legacy markup before rendering.
