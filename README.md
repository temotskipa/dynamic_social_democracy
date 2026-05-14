# Social Democracy: An Alternate History

## Building the game

Use Node 26.

```powershell
npm install
node --run build
```

The build imports legacy `.dry` source into `apps/web/src/content/generated/legacy-content.json`, validates the generated content bundle, and emits the static site to `out/html`.

## Development

```powershell
node --run dev
```

Useful checks:

```powershell
node --run compile:content
node --run validate:content
node --run typecheck
node --run test
node --run test:e2e
```

See `docs/ARCHITECTURE.md` and `docs/MODERNIZATION.md` for the migration notes.
