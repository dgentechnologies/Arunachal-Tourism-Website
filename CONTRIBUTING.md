# Contributing to Arunachal Explore

Thank you for contributing! This guide explains how multiple developers can work on separate pages **without causing merge conflicts** when pushing to `main`.

---

## Branch Strategy

### One Branch Per Page / Feature

Each contributor should work in a dedicated feature branch named after the page or feature they are working on:

| Page / Feature | Branch Name Example |
|---|---|
| Hotels page | `feature/hotels-page` |
| Transport page | `feature/transport-page` |
| Tribes page | `feature/tribes-page` |
| Entrepreneurs page | `feature/entrepreneurs-page` |
| Guides / Map page | `feature/guides-map` |
| Itinerary / AI chat | `feature/itinerary-ai` |
| Permit page | `feature/permit-page` |
| Safety page | `feature/safety-page` |
| Navigation / Footer | `feature/nav-footer` |
| Shared components | `feature/shared-components` |
| Bug fix | `fix/descriptive-bug-name` |

### Why this works

- Each person works on **their own branch** → no shared edits → no conflicts.
- Code is reviewed via a **Pull Request (PR)** before merging into `main`.
- The CI pipeline validates every PR before it is merged.

---

## Workflow

```bash
# 1. Always start from the latest main
git checkout main
git pull origin main

# 2. Create your feature branch
git checkout -b feature/your-page-name

# 3. Make your changes (only touch files for YOUR page/feature)
#    e.g. src/app/hotels/**  OR  src/components/hotel-card.tsx

# 4. Commit with a clear message
git add .
git commit -m "feat(hotels): add star-rating filter to listing page"

# 5. Push your branch
git push origin feature/your-page-name

# 6. Open a Pull Request on GitHub targeting `main`
#    The CI checks (lint + typecheck + build) must all pass before merging.
```

---

## File Ownership (avoid editing each other's files)

To prevent conflicts, follow the **"one person per directory"** rule:

| Contributor A | Contributor B |
|---|---|
| `src/app/hotels/**` | `src/app/transport/**` |
| `src/app/tribes/**` | `src/app/entrepreneurs/**` |

If you need to edit a **shared file** (e.g. `src/components/nav.tsx`, `src/app/layout.tsx`, `src/app/globals.css`), coordinate with the other contributor first so you don't create parallel edits.

---

## CI Pipeline

Every push and pull request against `main` runs the following checks automatically (see `.github/workflows/ci.yml`):

1. **ESLint** – `npm run lint`
2. **TypeScript** – `npm run typecheck`
3. **Next.js Build** – `npm run build`

All three checks **must pass** for a PR to be merged. Fix any errors locally before opening the PR.

---

## Commit Message Format

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

feat(hotels): add map view toggle
fix(nav): close mobile menu on route change
style(tribes): improve card grid spacing on mobile
refactor(itinerary): extract chat panel to its own component
```

Common types: `feat`, `fix`, `style`, `refactor`, `chore`, `docs`

---

## Code Style

- **Tailwind CSS** for all styling — use existing responsive prefixes (`sm:`, `md:`, `lg:`)
- Every new layout must work on **mobile (≥320 px), tablet (≥768 px), and desktop (≥1024 px)**
- Run `npm run lint` locally before pushing
