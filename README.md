# Arvocap IMS Frontend

Investment Management System — Phase 1 front-end.

## Prerequisites

- Node.js 20+
- npm 10+

## Setup

```bash
cp .env.example .env.local
npm install
npm run dev
```

## Documentation

| Doc | Purpose |
|-----|---------|
| [STRUCTURE-GUIDE.md](docs/frontend/STRUCTURE-GUIDE.md) | What is stored where and why |
| [CONVENTIONS.md](docs/frontend/CONVENTIONS.md) | Naming, imports, PR checklist |
| [MODULE_OWNERSHIP.md](docs/frontend/MODULE_OWNERSHIP.md) | Module ownership map |

## Project structure

```
src/
├── app/              # Bootstrap & React providers
├── core/             # Auth, API, stores, routing, lib, errors
├── modules/          # Domain modules (8 vertical slices)
├── mocks/            # MSW handlers (VITE_MOCK_API=true)
├── preview/          # Living preview demo (auto-play, isolated from modules)
└── types/            # Shared types & fund constants
```

Each module contains: `pages/`, `features/`, `components/`, `hooks/`, `api/`, `stores/`, `utils/`, `__tests__/`

## Environment

| Variable | Default | Purpose |
|----------|---------|---------|
| `VITE_API_BASE_URL` | `http://localhost:8080/api` | Backend API |
| `VITE_MOCK_AUTH` | `true` | Mock user until Keycloak is ready |
| `VITE_MOCK_API` | `true` | MSW mock API |
| `VITE_FEATURE_RISK` | `false` | Enable risk module in staging |
| `VITE_FEATURE_ENGAGEMENT` | `false` | Enable engagement module in staging |
| `VITE_PREVIEW_SPEED` | `1` | Living preview loop speed multiplier |

## Living preview

Open **`/preview`** in the dev server for a fast ~12-second trailer loop across Portfolio, Research, Investment, Risk, and Engagement. Hover to pause. No login required.

Set `VITE_PREVIEW_SPEED=2` in `.env.local` for a faster loop.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Typecheck + production build |
| `npm run lint` | ESLint |
| `npm run preview` | Preview production build |

## Stores (Zustand)

| Store | Location | Purpose |
|-------|----------|---------|
| `useAuthStore` | `core/stores/` | Session & user |
| `useWorkspaceStore` | `core/stores/` | Active fund, sidebar |
| `useLayoutStore` | `core/stores/` | Dashboard layouts (Phase 5) |

Module-scoped stores go in `modules/<name>/stores/`.

## Next steps

1. Backend draft OpenAPI → MSW handlers + typed endpoints
2. Keycloak dev env → replace `VITE_MOCK_AUTH=false`
3. Design tokens + shadcn/ui → `core/layout/` shell
4. First real page in `modules/<name>/pages/`
