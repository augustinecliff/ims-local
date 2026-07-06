# Document & Directory Structure Guide

**Project:** Arvocap IMS Frontend  
**Purpose:** Explain what is stored where and why — so any developer can navigate the codebase without guesswork.

> **Visual guide:**
> - PNG (open anywhere): `public/guide/images/frontend-lifecycle.png`
> - SVG (browser): `/guide/images/frontend-lifecycle.svg` when dev server is running

---

## Table of contents

1. [Top-level overview](#1-top-level-overview)
2. [src/app — application bootstrap](#2-srcapp--application-bootstrap)
3. [src/core — shared infrastructure](#3-srccore--shared-infrastructure)
4. [src/modules — domain features](#4-srcmodules--domain-features)
5. [src/types — shared types](#5-srctypes--shared-types)
6. [src/mocks — API mocking](#6-srcmocks--api-mocking)
7. [docs/ — team documentation](#7-docs--team-documentation)
8. [What goes where — decision guide](#8-what-goes-where--decision-guide)
9. [What is intentionally empty](#9-what-is-intentionally-empty)

---

## 1. Top-level overview

```
arvocap-ims-frontend/
├── docs/frontend/          # Team docs (conventions, ownership, plans)
├── public/                 # Static assets served as-is by Vite
├── src/
│   ├── app/                # React provider tree
│   ├── core/               # Cross-cutting infrastructure
│   ├── modules/            # Business domains (research, trades, …)
│   ├── mocks/              # MSW mock API
│   └── types/              # Shared constants & TypeScript types
├── CODEOWNERS              # GitHub auto-review rules
├── .env.example            # Documented environment variables
└── package.json
```

### Why this shape?

| Layer | Role | Analogy |
|-------|------|---------|
| `app/` | Wires providers once at startup | Power switch |
| `core/` | Everything modules share | Building utilities (plumbing, electric) |
| `modules/` | Business features | Rooms in the building |
| `types/` | Contracts everyone agrees on | Blueprint legends |
| `mocks/` | Fake backend for local dev | Staging props |

We deliberately **do not** use top-level `services/`, `libs/`, or `store/` folders. Those concerns live inside `core/` or per-module folders to keep ownership clear.

---

## 2. `src/app/` — application bootstrap

```
app/
└── AppProviders.tsx
```

**What lives here:** The React provider tree only.

**Why separate from `core/`:** Providers compose core pieces (Query, Auth, ErrorBoundary) but are not infrastructure themselves — they are the single entry wiring point called from `main.tsx`.

**What does NOT live here:** Routes, pages, business logic, API calls.

---

## 3. `src/core/` — shared infrastructure

Everything in `core/` is **shared across all modules**. If only one module needs it, it belongs in that module.

```
core/
├── api/                    # HTTP client & API contracts
│   ├── axios-instance.ts   # Axios + JWT interceptors
│   ├── query-client.ts     # React Query defaults
│   ├── query-keys.ts       # Shared query key factories
│   └── schemas/            # Zod validation for API shapes
├── auth/                   # Authentication & permissions
│   ├── AuthProvider.tsx    # Session bootstrap (mock or Keycloak)
│   ├── use-permissions.ts  # fund-level RBAC hook
│   └── mock-user.ts        # Dev user until Keycloak is ready
├── errors/                 # Global error handling
│   ├── ErrorBoundary.tsx   # Catches render crashes
│   └── ErrorFallback.tsx   # Structural fallback UI
├── lib/                    # Small shared utilities
│   ├── env.ts              # Single place to read env vars
│   ├── features.ts         # Feature flags (VITE_FEATURE_*)
│   └── dates.ts            # date-fns wrappers
├── math/                   # Financial precision (big.js)
│   └── money.ts            # parseMoney, formatMoney
├── routing/                # App-wide routing
│   ├── router.ts           # TanStack Router instance
│   ├── root-route.ts       # Root layout + ProtectedRoute
│   ├── ProtectedRoute.tsx  # Auth gate
│   ├── search-schemas.ts   # Zod URL param validation
│   ├── module-routes.ts    # Merges all module routes
│   └── routes/             # App-level routes (home, login)
└── stores/                 # Global Zustand stores only
    ├── auth-store.ts       # Session snapshot
    ├── workspace-store.ts  # Active fund, sidebar
    └── layout-store.ts     # Dashboard layouts (Phase 5)
```

### Subfolder rationale

| Folder | Stores | Why |
|--------|--------|-----|
| `api/` | HTTP plumbing + **schemas** | Client and contracts stay together; modules import schemas when validating responses |
| `auth/` | Identity & access | Auth is global — never duplicated per module |
| `errors/` | Crash recovery | One boundary protects the entire app |
| `lib/` | Env, dates, flags | Prevents `import.meta.env` scattered across 50 files |
| `math/` | Money helpers | Financial rules are app-wide, not per-module |
| `routing/` | URL structure | One router; modules register routes, not own the router |
| `stores/` | **Global** UI state only | Module-specific state goes in `modules/<name>/stores/` |

### `core/api/schemas/` vs `types/`

| | `types/` | `core/api/schemas/` |
|---|----------|---------------------|
| **Purpose** | Compile-time constants & interfaces | Runtime validation (Zod) |
| **Example** | `FUND_IDS`, `AuthUser` | `fundSchema`, `tradeSchema` |
| **Used by** | Everywhere | API layer, forms, MSW handlers |

When OpenAPI arrives, schemas will align with generated types. Until then, Zod stubs define the contract.

---

## 4. `src/modules/` — domain features

Each module is a **vertical slice** of the business. Modules mirror the IMS roadmap phases.

```
modules/
├── foundation/       Phase 1 — instrument search, fund context
├── research/         Phase 2A — reports, screener, coverage
├── investment/       Phase 2B — trades, approvals
├── portfolio/        Phase 2C — Looker-parity dashboards
├── risk/             Phase 3 — VaR, correlation, stress tests
├── engagement/       Phase 4 — alerts, watchlist, news, calendar
├── admin/            RBAC config, onboarding, approval chains
└── personalization/  Phase 5 — dashboard layout, researcher home
```

### Standard module layout

```
modules/<name>/
├── index.ts          # Public exports — other modules import ONLY from here
├── routes.tsx        # TanStack route definitions for this module
├── pages/            # Route-level page components (thin wrappers)
├── features/         # User-facing capabilities (vertical slices)
├── components/       # UI private to this module
├── hooks/            # Module-scoped React hooks
├── api/              # React Query hooks + API call functions
├── stores/           # Module-scoped Zustand (e.g. draft editor state)
├── utils/            # Module-scoped pure functions
└── __tests__/        # Module tests
```

### Why each subfolder exists

| Folder | What goes here | Example |
|--------|----------------|---------|
| `pages/` | Thin route targets; compose features | `PortfolioMmfPage.tsx` |
| `features/` | Complete user flows | `report-editor/`, `approval-chain/` |
| `components/` | Reusable within module only | `SignalBadge.tsx` |
| `hooks/` | Module hooks not tied to one feature | `usePortfolioFilters.ts` |
| `api/` | `useFunds()`, `fetchTrades()` | React Query + axios calls |
| `stores/` | UI state too local for `core/stores` | Trade wizard step index |
| `utils/` | Pure helpers | Screener filter logic |
| `__tests__/` | Tests for this module | `money.test.ts` |

### Cross-module rule

```
✅  import { researchRoutes } from '@/modules/research'
❌  import { ReportEditor } from '@/modules/research/features/report-editor'
```

Deep imports break encapsulation and cause merge conflicts between developers.

---

## 5. `src/types/` — shared types

```
types/
├── auth.ts       # ImsRole, AuthUser
├── funds.ts      # FUND_IDS, FUNDS constants
└── index.ts      # Barrel export
```

**What lives here:** Constants and TypeScript interfaces used across multiple modules.

**What does NOT live here:** Zod schemas (→ `core/api/schemas/`), module-specific types (→ `modules/<name>/types/` if needed).

---

## 6. `src/mocks/` — API mocking

```
mocks/
├── browser.ts      # MSW worker startup (reads env.mockApi)
└── handlers/       # Per-domain MSW handlers (add when OpenAPI lands)
    └── (empty — Track C)
```

**Why:** Frontend development continues when the backend is not ready. Handlers will mirror `core/api/schemas/` shapes.

**Enable:** `VITE_MOCK_API=true` in `.env.local`

---

## 7. `docs/` — team documentation

```
docs/frontend/
├── STRUCTURE-GUIDE.md              # This file
├── CONVENTIONS.md                  # Naming, imports, PR checklist
├── MODULE_OWNERSHIP.md             # Who owns which module
└── IMPLEMENTATION-PLAN-TRACK-A-B.md  # Completed setup plan
```

**Why in the repo:** Docs version with code. PRs that change structure should update the guide.

**Local guides (not in git):** `public/guide/` is gitignored for personal/archived copies.

---

## 8. What goes where — decision guide

```
┌─────────────────────────────────────────────────────────────┐
│  Adding something new? Ask:                                 │
├─────────────────────────────────────────────────────────────┤
│  Used by 2+ modules?          → core/                       │
│  Tied to one business area?   → modules/<name>/             │
│  Server data from API?        → modules/<name>/api/ + Query │
│  Global UI session state?     → core/stores/                │
│  Module UI draft/wizard?      → modules/<name>/stores/      │
│  URL/filter state?            → router search params + Zod   │
│  Validates API JSON?          → core/api/schemas/           │
│  Constant enum/list?          → types/                      │
│  Formats dates/money?         → core/lib/ or core/math/      │
│  Catches render errors?       → core/errors/                │
│  Fake API for dev?            → mocks/handlers/             │
└─────────────────────────────────────────────────────────────┘
```

---

## 9. What is intentionally empty

These exist as folders but have no feature code yet — **by design**:

| Location | Waiting for |
|----------|-------------|
| `modules/*/pages/` | Figma designs |
| `modules/*/features/` | Phase module kickoff |
| `modules/*/api/` | OpenAPI / backend endpoints |
| `core/layout/` | Design system + AppShell (not created yet) |
| `mocks/handlers/` | OpenAPI spec |
| `core/auth/keycloak.ts` | Keycloak dev environment |

Route stubs (`routes.tsx`) exist so the router is complete; they render hidden placeholders until real pages are built.

---

## Quick reference card

| I need to… | Go to… |
|------------|--------|
| Add a new route | `modules/<name>/routes.tsx` |
| Add a global store | `core/stores/` |
| Add a module store | `modules/<name>/stores/` |
| Call the API | `modules/<name>/api/` |
| Validate API response | `core/api/schemas/` |
| Read env vars | `core/lib/env.ts` |
| Check fund permission | `usePermissions()` in `core/auth/` |
| Add mock endpoint | `mocks/handlers/` |
| Understand naming rules | `docs/frontend/CONVENTIONS.md` |
| Know who reviews my PR | `CODEOWNERS` + `MODULE_OWNERSHIP.md` |

---

*Last updated: Track A & B implementation.*
