# Module Ownership

Replace `@fe-dev-1` / `@fe-dev-2` in `CODEOWNERS` with real GitHub handles.

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
