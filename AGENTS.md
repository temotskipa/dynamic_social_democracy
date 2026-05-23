# Agent Guide

This file is the short map for coding agents. Keep detailed design notes in `docs/` so this file stays current and compact.

## Project Direction

- The canonical app is the static Node 26 + Vite + Preact workspace path.
- DendryNexus is legacy-only. Do not add it back to CI, deployment, or normal development scripts.
- Long-term content should be JSON scene data plus TypeScript mechanics libraries. Avoid creating a new bespoke DSL.
- Keep upstream `.dry` imports viable while migration is incomplete.

## Where To Look

- `docs/ARCHITECTURE.md`: current package layout, runtime boundaries, and content flow.
- `docs/MODERNIZATION.md`: migration goals, staged work, and known gaps.
- `package.json`: canonical commands.
- `scripts/migrate.ts`: current `.dry` to JSON import path.

## Checks

Run these after code changes when practical:

- `node --run compile:content`
- `node --run validate:content`
- `node --run typecheck`
- `node --run test`
- `node --run build`
- `node --run budget:bundle`
- `node --run test:e2e` for frontend/runtime behavior changes.

## Style Notes

- Prefer pure TypeScript engine functions and JSON data boundaries.
- Keep generated content deterministic.
- Preserve scene IDs and local save compatibility unless a migration explicitly handles the change.
- Preserve the original DendryNexus UI presentation as much as practical; avoid broad visual redesign unless the user explicitly asks for it or a compatibility issue requires it.
- Raw repo-authored HTML is currently trusted content; do not add sanitization unless the product decision changes.
