# Getting started

## Prerequisites

- Node.js 20+
- npm (or pnpm / yarn)

## Install

From the repo root:

```bash
npm install
```

## Run locally

**API** (backend):

```bash
npm run dev:api
```

Runs at `http://localhost:4000`. Hit `/health` to confirm.

**Web** (frontend):

```bash
npm run dev:web
```

Runs at `http://localhost:3000`.

To run both in one go (in separate terminals): `npm run dev:api` and `npm run dev:web`.

## Env

Copy `.env.example` to `.env` in the root (or into each app if you prefer) and set values. Required for API: `DATABASE_URL`, `JWT_SECRET`. For web: `NEXT_PUBLIC_API_URL` if calling the API from the browser.

## Scripts (from root)

| Command        | Description                    |
|----------------|--------------------------------|
| `npm run dev`  | Run all workspaces that have dev |
| `npm run dev:web` | Start Next.js frontend        |
| `npm run dev:api`  | Start Express API            |
| `npm run build` | Build all workspaces          |
| `npm run lint`  | Lint all workspaces           |
| `npm run format` | Format with Prettier         |

## Project layout

- `apps/web` — Next.js frontend
- `apps/api` — Express backend
- `packages/shared` — Shared TypeScript types
