# AGENTS.md

## Cursor Cloud specific instructions

This is a single-service app: **dmitryracing**, a track-days portfolio site built with
vinext (Next.js App Router on Vite + React Server Components), deployed to Cloudflare Workers.
There is no separate backend; one dev server serves SSR/RSC pages plus all `/api/*` routes.
Standard commands live in `README.md` and `package.json` `scripts`; only non-obvious notes are below.

### Running the app
- Dev server: `npm run dev` (Vite, port **3001**). The update script already runs `npm ci`.
- The dev server binds to `localhost` only (no `--host`). Use `http://localhost:3001`, NOT
  `http://127.0.0.1:3001`, when curling/hitting it during plain `npm run dev` — `127.0.0.1`
  refuses the connection. (`npm run dev:e2e` does bind `127.0.0.1` with `--strictPort`, which is
  what Playwright/Lighthouse use.)
- First request to a route triggers on-demand SSR compilation, so the very first `curl` may
  return empty/no-response; retry once after the page compiles.

### Bindings / data
- Cloudflare bindings (`DB` D1, `IMAGES`, `ASSETS`) are NOT present under `npm run dev`. The app
  intentionally falls back to seed JSON (`src/data/`) + an in-memory store
  (`src/lib/dev-memory-store.ts`). `/api/health` reports `"storage":"fallback"` — this is expected,
  not an error. No database/Redis/etc. is needed to run or test locally.

### Tests / build
- Unit: `npm test` (Vitest).
- Build: `npm run build`.
- E2E: `npm run test:e2e` (Playwright; auto-starts its own dev server on 127.0.0.1:3001).
  Requires the chromium browser (`npx playwright install chromium`).
- There is **no linter** configured (no ESLint/Prettier and no `lint` script); "quality" is
  enforced via TypeScript, Vitest, and Lighthouse only. Do not look for a lint step.

### Known pre-existing test failure (not an environment issue)
- `e2e/smoke.spec.ts` ("home loads and main regions are present") fails: it asserts
  `#guide` and `#story` are visible, but the current homepage (`src/app/page.tsx`) renders
  `#top`, `#tracks`, `#gallery`, and `#instructors` — there are no `#guide`/`#story` sections.
  This is a test/code drift in the repo, unrelated to setup. The other e2e test
  ("events API returns JSON") passes.
