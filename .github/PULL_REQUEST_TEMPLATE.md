# chore: Monorepo setup, lint, format, and pre-commit hooks

## Summary

Adds a proper monorepo layout and developer tooling for FOSS Hack 2026.

## Changes

### Monorepo

- **apps/web** — Next.js 15 app (layout + home page)
- **apps/api** — Express + TypeScript API with `/health` and CORS
- **packages/shared** — Shared TypeScript types (`User`, `NowPage`)

### Code quality

- **ESLint 9** (flat config) + TypeScript ESLint at root; `next lint` in apps/web
- **Prettier** for formatting (root config)
- **Husky + lint-staged** — pre-commit runs `eslint --fix` and `prettier --write` on staged files only

### CI

- **GitHub Actions** — on push/PR to `main`: install, lint, format check

### Docs & config

- `docs/getting-started.md` — install, run API + web, env, scripts
- `docs/contributing.md` — dev setup, lint/format, PR guidelines
- `CONTRIBUTING.md` — points to docs
- `.env.example` — PORT, DATABASE_URL, JWT_SECRET, NEXT_PUBLIC_API_URL

## How to test

```bash
npm install
npm run dev:api   # terminal 1 — API on :4000
npm run dev:web   # terminal 2 — Web on :3000
```

Run `npm run lint` and `npm run format:check` at root to verify CI.

## Checklist

- [x] Monorepo structure (apps/web, apps/api, packages/shared)
- [x] ESLint + Prettier configured
- [x] Pre-commit hook (lint-staged)
- [x] GitHub Actions lint workflow
- [x] Docs and .env.example
