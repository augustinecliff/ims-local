# Implementation Plan — Track A & B

**Project:** Arvocap IMS Frontend  
**Document version:** 1.0  
**Scope:** Week 1 — Structure, conventions, core infrastructure  
**Prerequisites:** None (no designs or backend endpoints required)  
**Estimated effort:** 4–5 dev-days total (2 devs can parallelise Tracks A and B)

---

## Table of contents

1. [Overview](#1-overview)
2. [Execution order](#2-execution-order)
3. [Track A — Structure & conventions](#3-track-a--structure--conventions)
4. [Track B — Core infrastructure](#4-track-b--core-infrastructure)
5. [Target file tree after completion](#5-target-file-tree-after-completion)
6. [PR strategy](#6-pr-strategy)
7. [Acceptance checklist](#7-acceptance-checklist)
8. [Out of scope](#8-out-of-scope)

---

## 1. Overview

### Purpose

Complete the **folder skeleton** and **core infrastructure** so two frontend developers can work in parallel on domain modules without merge conflicts, unclear conventions, or missing error/auth/schema patterns.

### Tracks

| Track | Focus | Owner suggestion | Effort |
|-------|-------|------------------|--------|
| **A** | Module subfolders, docs, CODEOWNERS | FE-2 (modules lead) | ~2 days |
| **B** | ErrorBoundary, ProtectedRoute, schemas, lib | FE-1 (core lead) | ~3 days |

### Dependencies between tracks

```
Track A (1.1) ──► no blockers, start immediately
Track A (1.2–1.4) ──► can run parallel with Track B
Track B (1.5–1.9) ──► no blockers, start immediately
Track B (1.7) ──► benefits from types/ in place (already exists)
```

Tracks A and B are **fully parallelisable** after a 30-minute kickoff to agree on naming in `CONVENTIONS.md`.

---

## 2. Execution order

### Day 1 (kickoff + parallel start)

| Time | FE-1 (Track B) | FE-2 (Track A) |
|------|----------------|----------------|
| AM | 1.5 ErrorBoundary | 1.1 Module subfolders |
| PM | 1.6 ProtectedRoute | 1.2 CONVENTIONS.md (draft) |

### Day 2

| FE-1 | FE-2 |
|------|------|
| 1.7 search-schemas | 1.3 MODULE_OWNERSHIP.md |
| 1.8 api/schemas | 1.4 CODEOWNERS |

### Day 3

| FE-1 | FE-2 |
|------|------|
| 1.9 core/lib | Review + merge both PRs |
| Wire exports in `core/index.ts` | Update README structure section |

### Pair session (30 min, Day 1)

Agree on:

- Import alias: `@/` only (no relative `../../` across modules)
- Query key format (already in `core/api/query-keys.ts`)
- Zod schema file naming: `<entity>.schema.ts`
- PR size limit: < 400 LOC

---

## 3. Track A — Structure & conventions

### Task A.1 — Module subfolders

**Goal:** Every domain module has an identical internal skeleton ready for feature work.

#### Modules to update (all 8)

- `foundation`
- `research`
- `investment`
- `portfolio`
- `risk`
- `engagement`
- `admin`
- `personalization`

#### Folders to create per module

```
modules/<name>/
├── pages/          # Route-level thin components (add when designs land)
├── features/       # User-facing capabilities (vertical slices)
├── components/     # Module-private UI only
├── hooks/          # Module-scoped React hooks
├── api/            # React Query hooks + service functions
├── stores/         # Module-scoped Zustand (if needed)
├── utils/          # Module-scoped pure functions
└── __tests__/      # Module tests
```

#### Implementation steps

1. Create each folder with a `.gitkeep` file (empty dirs are not tracked by git).
2. Do **not** add placeholder React components — structure only.
3. Update each module's `index.ts` to document exports (comment block is fine for now):

```ts
/**
 * Public API for the <module> module.
 * Export only what other modules need — never export from features/ directly.
 */
export { <name>Routes } from './routes'
```

4. Add a one-line `README.md` inside each module (optional but recommended):

```md
# <Module Name>
Phase: <N> · Owner: <FE-1 | FE-2>
See docs/frontend/MODULE_OWNERSHIP.md
```

#### Acceptance criteria

- [ ] All 8 modules have identical subfolder structure
- [ ] `npm run build` still passes
- [ ] No new UI components added

---

### Task A.2 — `docs/frontend/CONVENTIONS.md`

**Goal:** Single source of truth for how code is written in this repo.

#### File to create

`docs/frontend/CONVENTIONS.md`

#### Required sections

```markdown
# Frontend Conventions

## 1. Directory rules
- `core/` — cross-cutting infrastructure only (auth, api, routing, stores, lib)
- `modules/<name>/` — domain code; no cross-module deep imports
- `types/` — shared TypeScript types and constants
- `mocks/` — MSW handlers only

## 2. Import rules
- Use `@/` alias for all src imports
- Cross-module: import from `modules/<name>` barrel (`index.ts`) only
- Never: `import x from '@/modules/research/features/...'`

## 3. Naming
| Item | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `TradeTicketForm.tsx` |
| Hooks | camelCase, `use` prefix | `useTrades.ts` |
| Stores | camelCase, `use` prefix | `useTradeDraftStore.ts` |
| Zod schemas | `<entity>.schema.ts` | `trade.schema.ts` |
| Query hooks | `use<Entity>` or `use<Entity>List` | `useFunds.ts` |
| API functions | camelCase verb | `fetchTrades`, `createTrade` |
| Route files | `routes.tsx` at module root | — |

## 4. State management
| Data type | Tool | Location |
|-----------|------|----------|
| Server/API data | React Query | `modules/<name>/api/` |
| Global UI state | Zustand | `core/stores/` |
| Module UI state | Zustand | `modules/<name>/stores/` |
| URL filters | TanStack Router search params + Zod | `core/routing/search-schemas.ts` |

## 5. React Query keys
- Use factories in `core/api/query-keys.ts` for shared keys
- Module-specific keys: `modules/<name>/api/query-keys.ts` if needed
- Pattern: `['entity', 'action', ...params]` — hierarchical, never flat strings

## 6. Money & numbers
- Never use raw `number` for monetary values in business logic
- Use `parseMoney` / `formatMoney` from `@/core/math`
- Parse at API boundary (interceptor or endpoint normaliser)

## 7. Environment variables
- Read env only via helpers in `core/lib/env.ts` — never `import.meta.env` in modules
- All vars prefixed `VITE_`
- Document new vars in `.env.example`

## 8. PR checklist
- [ ] Types from Zod schema or shared `types/`
- [ ] Permission check on fund-scoped views (`usePermissions`)
- [ ] Loading, empty, and error states (when UI exists)
- [ ] Route registered in module `routes.tsx`
- [ ] MSW handler if new endpoint introduced
- [ ] No raw `number` for money
- [ ] `npm run lint` and `npm run build` pass
```

#### Acceptance criteria

- [ ] File committed to `docs/frontend/`
- [ ] Reviewed by both FE devs
- [ ] Referenced from root `README.md`

---

### Task A.3 — `docs/frontend/MODULE_OWNERSHIP.md`

**Goal:** Clear ownership before parallel module work begins.

#### File to create

`docs/frontend/MODULE_OWNERSHIP.md`

#### Content template

```markdown
# Module Ownership

| Module | Phase | Primary owner | Secondary |
|--------|-------|---------------|-----------|
| foundation | 1 | FE-1 | FE-2 |
| research | 2A | FE-2 | — |
| investment | 2B | FE-2 | — |
| portfolio | 2C | FE-1 | — |
| risk | 3 | FE-1 | FE-2 |
| engagement | 4 | FE-2 | FE-1 |
| admin | 1–2 | FE-1 | FE-2 |
| personalization | 5 | FE-1 | FE-2 |

## Core ownership
| Area | Owner |
|------|-------|
| `core/api/` | FE-1 |
| `core/auth/` | FE-1 |
| `core/routing/` | FE-1 |
| `core/stores/` | FE-1 |
| `core/errors/` | FE-1 |
| `core/lib/` | FE-1 |
| `mocks/` | FE-1 (handlers), FE-2 (domain data) |

## Rules
1. Changes to `core/` require review from FE-1
2. Changes to `modules/<name>/` require review from module owner
3. Cross-module interface changes: both devs review
4. Platform freeze: no `core/` changes during final 2 days of each phase without ADR
```

#### Acceptance criteria

- [ ] Names replaced with actual developer names
- [ ] Agreed in team standup

---

### Task A.4 — `CODEOWNERS`

**Goal:** GitHub auto-assigns reviewers per path.

#### File to create

`CODEOWNERS` (repo root)

#### Content template

```
# Default
* @fe-dev-1 @fe-dev-2

# Core infrastructure
/src/core/                    @fe-dev-1
/src/mocks/                   @fe-dev-1
/src/types/                   @fe-dev-1

# Modules
/src/modules/foundation/      @fe-dev-1
/src/modules/portfolio/       @fe-dev-1
/src/modules/risk/            @fe-dev-1
/src/modules/admin/           @fe-dev-1
/src/modules/personalization/ @fe-dev-1

/src/modules/research/        @fe-dev-2
/src/modules/investment/      @fe-dev-2
/src/modules/engagement/      @fe-dev-2

# Docs
/docs/                        @fe-dev-1 @fe-dev-2
```

Replace `@fe-dev-1` / `@fe-dev-2` with real GitHub handles.

#### Acceptance criteria

- [ ] File at repo root (or `.github/CODEOWNERS`)
- [ ] Tested on a sample PR — correct reviewers requested

---

## 4. Track B — Core infrastructure

### Task B.1 — Error boundary

**Goal:** Uncaught render errors are caught app-wide instead of white-screening.

#### Files to create

```
src/core/errors/
├── ErrorBoundary.tsx
├── ErrorFallback.tsx      # minimal, unstyled structural fallback
└── index.ts
```

#### Implementation spec

**`ErrorBoundary.tsx`**

- Class component or `react-error-boundary` package (prefer **no new dependency** — use class component)
- Catches render errors in children
- Logs to `console.error` in dev
- Renders `ErrorFallback` with `error` and `resetErrorBoundary` props
- Optional `onError` callback prop for future telemetry (Phase 5)

**`ErrorFallback.tsx`**

- Structural only — no design
- Display: `"Something went wrong"` + error message in dev only
- Button: `"Try again"` calling `resetErrorBoundary`
- Use `data-testid="error-fallback"` for future tests

**Wire into `AppProviders.tsx`**

```tsx
<QueryClientProvider client={queryClient}>
  <AuthProvider>
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  </AuthProvider>
</QueryClientProvider>
```

**Export from `core/index.ts`**

```ts
export { ErrorBoundary } from './errors'
```

#### Acceptance criteria

- [ ] Throwing in a child component shows fallback, not white screen
- [ ] "Try again" resets boundary
- [ ] `npm run build` passes

#### Test (manual, Day 1)

Add temporary throw in `RoutePlaceholder` behind `?debugError=1` search param; remove before merge.

---

### Task B.2 — Protected routes

**Goal:** Unauthenticated users cannot access module routes (ready for Keycloak swap).

#### Files to create

```
src/core/routing/
├── ProtectedRoute.tsx
└── (update) root-route.ts
```

#### Implementation spec

**`ProtectedRoute.tsx`**

```tsx
// Wraps route component; reads useAuthStore
// If isLoading → render null or minimal loading marker (data-testid="auth-loading")
// If !isAuthenticated → redirect to /login (or render login placeholder)
// If authenticated → render children / Outlet
```

**Login route stub**

Add to `core/routing/routes/login-route.tsx`:

```tsx
// path: '/login'
// component: RoutePlaceholder with routeId="login"
// No design — structural only
```

**Apply protection**

Option A (recommended for now): Wrap `rootRoute` component:

```tsx
// root-route.ts
export const rootRoute = createRootRoute({
  component: () => (
    <ProtectedRoute>
      <Outlet />
    </ProtectedRoute>
  ),
})
```

Exclude `/login` from protection inside `ProtectedRoute` by checking `location.pathname`.

**Mock auth behaviour**

| `VITE_MOCK_AUTH` | Behaviour |
|------------------|-----------|
| `true` | Always authenticated (current mock user) |
| `false` | `isAuthenticated = false` until Keycloak wired |

#### Acceptance criteria

- [ ] `VITE_MOCK_AUTH=true` → all routes accessible
- [ ] `VITE_MOCK_AUTH=false` → redirects to `/login`
- [ ] `/login` accessible without auth
- [ ] `usePermissions()` still works on protected routes

---

### Task B.3 — URL search param schemas

**Goal:** Type-safe, validated URL state for dashboard filters (fund, date, currency).

#### Files to create

```
src/core/routing/
├── search-schemas.ts
└── (update) create-placeholder-route.tsx — add validateSearch where needed
```

#### Schemas to define (Zod)

```ts
// search-schemas.ts
import { z } from 'zod'
import { FUND_IDS } from '@/types'

export const fundSearchSchema = z.object({
  fund: z.enum(FUND_IDS).optional(),
})

export const portfolioSearchSchema = z.object({
  fund: z.enum(FUND_IDS).optional(),
  date: z.string().date().optional(),       // ISO date string
  currency: z.enum(['KES', 'ZAR', 'USD']).optional(),
})

export type PortfolioSearch = z.infer<typeof portfolioSearchSchema>
```

#### Apply to portfolio routes (example)

Update `modules/portfolio/routes.tsx` — portfolio routes use `validateSearch: portfolioSearchSchema`.

Other modules: stub schemas returning `z.object({})` until filters are defined.

#### Acceptance criteria

- [ ] Invalid `?currency=GBP` fails validation (TanStack Router error state)
- [ ] Valid params typed in route context
- [ ] Schemas exported from `search-schemas.ts`

---

### Task B.4 — API Zod schemas

**Goal:** Shared request/response shapes ready for OpenAPI drop-in and form validation.

#### Files to create

```
src/core/api/schemas/
├── fund.schema.ts
├── instrument.schema.ts
├── trade.schema.ts
├── research-report.schema.ts
├── alert.schema.ts
└── index.ts
```

#### Schema specs (minimal stubs)

**`fund.schema.ts`**

```ts
import { z } from 'zod'
import { FUND_IDS } from '@/types'

export const fundSchema = z.object({
  id: z.enum(FUND_IDS),
  name: z.string(),
  currency: z.enum(['KES', 'ZAR', 'USD']),
  nav: z.string().optional(),          // string — parsed to BigNumber at boundary
  navDate: z.string().date().optional(),
})

export const fundListSchema = z.array(fundSchema)
export type Fund = z.infer<typeof fundSchema>
```

**`instrument.schema.ts`**

```ts
export const instrumentSchema = z.object({
  id: z.string(),
  code: z.string(),
  isin: z.string().optional(),
  name: z.string(),
  exchange: z.string(),
  sector: z.string().optional(),
  assetType: z.enum(['EQUITY', 'BOND', 'MMF', 'OTHER']),
})
```

**`trade.schema.ts`**

```ts
export const tradeDirectionSchema = z.enum(['BUY', 'SELL'])
export const tradeStatusSchema = z.enum([
  'DRAFT', 'PENDING_APPROVAL', 'APPROVED', 'REJECTED', 'EXECUTED',
])

export const tradeSchema = z.object({
  id: z.string(),
  fundId: z.enum(FUND_IDS),
  instrumentId: z.string(),
  direction: tradeDirectionSchema,
  quantity: z.string(),               // BigNumber as string from API
  price: z.string(),
  status: tradeStatusSchema,
  rationale: z.string().optional(),
  createdAt: z.string().datetime(),
})
```

**`research-report.schema.ts`** — id, title, authorId, status, publishedAt (stub)

**`alert.schema.ts`** — id, instrumentId, severity, status, threshold (stub)

#### Export pattern

```ts
// core/api/schemas/index.ts
export * from './fund.schema'
export * from './instrument.schema'
// ...
```

#### Reconcile with `types/`

- `types/funds.ts` keeps constants (`FUND_IDS`, `FUNDS`)
- `core/api/schemas/` owns **runtime validation** shapes
- Add comment in `types/index.ts`: *"For validated API shapes, use `@/core/api/schemas`"*

#### Acceptance criteria

- [ ] All 5 schema files exist with stub fields
- [ ] `z.infer<>` types usable in modules
- [ ] No duplicate enum definitions — import `FUND_IDS` from `@/types`

---

### Task B.5 — `core/lib/` utilities

**Goal:** Centralise env access and date formatting — no scattered `import.meta.env` or raw `date-fns` in modules.

#### Files to create

```
src/core/lib/
├── env.ts
├── dates.ts
├── features.ts
└── index.ts
```

#### Implementation spec

**`env.ts`**

```ts
function requireEnv(key: keyof ImportMetaEnv): string {
  const value = import.meta.env[key]
  if (value === undefined) throw new Error(`Missing env: ${key}`)
  return value
}

export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '/api',
  mockAuth: import.meta.env.VITE_MOCK_AUTH === 'true',
  mockApi: import.meta.env.VITE_MOCK_API === 'true',
  isDev: import.meta.env.DEV,
} as const
```

**`dates.ts`** (wraps `date-fns`)

```ts
import { format, parseISO, isValid } from 'date-fns'

export function formatDisplayDate(iso: string): string
export function formatDisplayDateTime(iso: string): string
export function parseApiDate(iso: string): Date  // throws if invalid
```

**`features.ts`**

```ts
export const features = {
  risk: import.meta.env.VITE_FEATURE_RISK === 'true',
  engagement: import.meta.env.VITE_FEATURE_ENGAGEMENT === 'true',
} as const
```

Add to `.env.example`:

```
VITE_FEATURE_RISK=false
VITE_FEATURE_ENGAGEMENT=false
```

#### Refactor (same PR)

- Update `core/api/axios-instance.ts` → use `env.apiBaseUrl`, `env.mockAuth`
- Update `core/auth/AuthProvider.tsx` → use `env.mockAuth`
- Update `mocks/browser.ts` → use `env.mockApi`

#### Export from `core/index.ts`**

```ts
export { env, features } from './lib'
export { formatDisplayDate, formatDisplayDateTime, parseApiDate } from './lib'
```

#### Acceptance criteria

- [ ] No direct `import.meta.env` outside `core/lib/env.ts` and `features.ts`
- [ ] Date helpers used in at least one schema comment or test
- [ ] `npm run build` passes

---

## 5. Target file tree after completion

```
arvocap-ims-frontend/
├── CODEOWNERS
├── docs/
│   └── frontend/
│       ├── CONVENTIONS.md
│       └── MODULE_OWNERSHIP.md
└── src/
    ├── app/
    │   └── AppProviders.tsx          # updated: ErrorBoundary wrapped
    ├── core/
    │   ├── api/
    │   │   └── schemas/              # NEW — Zod stubs
    │   ├── auth/
    │   ├── errors/                   # NEW — ErrorBoundary
    │   ├── lib/                      # NEW — env, dates, features
    │   ├── math/
    │   ├── routing/
    │   │   ├── ProtectedRoute.tsx    # NEW
    │   │   ├── search-schemas.ts     # NEW
    │   │   └── routes/
    │   │       └── login-route.tsx   # NEW
    │   └── stores/
    └── modules/
        └── <each>/
            ├── api/                  # NEW (empty)
            ├── components/           # NEW (empty)
            ├── features/             # NEW (empty)
            ├── hooks/                # NEW (empty)
            ├── pages/                # NEW (empty)
            ├── stores/               # NEW (empty)
            ├── utils/                # NEW (empty)
            ├── __tests__/            # NEW (empty)
            ├── index.ts
            └── routes.tsx            # updated: validateSearch on portfolio
```

---

## 6. PR strategy

| PR | Branch | Contents | Reviewer |
|----|--------|----------|----------|
| **PR-1** | `chore/module-skeleton` | Track A.1 only | FE-1 |
| **PR-2** | `chore/frontend-docs` | Track A.2, A.3, A.4 | Both |
| **PR-3** | `feat/core-error-auth` | Track B.1, B.2 | FE-2 |
| **PR-4** | `feat/core-schemas-lib` | Track B.3, B.4, B.5 | FE-2 |

Merge order: PR-1 → PR-2 → PR-3 → PR-4 (or PR-3 and PR-4 sequential).

Keep each PR under **400 LOC** — split B.3–B.5 if needed.

---

## 7. Acceptance checklist

### Track A complete when:

- [ ] All 8 modules have `pages/`, `features/`, `components/`, `hooks/`, `api/`, `stores/`, `utils/`, `__tests__/`
- [ ] `docs/frontend/CONVENTIONS.md` exists and is linked from README
- [ ] `docs/frontend/MODULE_OWNERSHIP.md` has real names
- [ ] `CODEOWNERS` triggers correct reviewers on a test PR

### Track B complete when:

- [ ] `ErrorBoundary` wraps app in `AppProviders`
- [ ] `ProtectedRoute` blocks unauthenticated access when `VITE_MOCK_AUTH=false`
- [ ] `/login` route exists (structural stub)
- [ ] `search-schemas.ts` validates portfolio URL params
- [ ] 5 Zod schema files exist in `core/api/schemas/`
- [ ] `core/lib/env.ts` is the only env reader (except `features.ts`)
- [ ] `core/index.ts` exports all new public APIs
- [ ] `npm run build` and `npm run lint` pass

### Both tracks complete when:

- [ ] README updated with new folders
- [ ] No page designs added
- [ ] Team demo: show protected route toggle + error boundary + folder tree

---

## 8. Out of scope

The following are **Track C and beyond** — do not include in Track A/B PRs:

- MSW handlers with real mock data
- React Query hooks (`useFunds`, etc.)
- `core/layout/` (AppShell, sidebar)
- shadcn / Tailwind
- Vitest / Playwright
- Keycloak real integration
- Page components in `modules/*/pages/`

---

*End of document.*
