# Frontend Conventions

## 1. Directory rules

- `core/` — cross-cutting infrastructure only (auth, api, routing, stores, lib, errors)
- `modules/<name>/` — domain code; no cross-module deep imports
- `types/` — shared TypeScript types and constants
- `mocks/` — MSW handlers only
- `app/` — bootstrap and React providers only

## 2. Import rules

- Use `@/` alias for all `src/` imports
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

## 6. Money and numbers

- Never use raw `number` for monetary values in business logic
- Use `parseMoney` / `formatMoney` from `@/core/math`
- Parse at API boundary (interceptor or endpoint normaliser)

## 7. Environment variables

- Read env only via `core/lib/env.ts` and `core/lib/features.ts`
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
