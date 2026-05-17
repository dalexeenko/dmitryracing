# dmitryracing

A Next.js–compatible app on Vite for my track days. Deployed to Cloudflare Workers.

<img width="1124" height="1186" alt="Screenshot 2026-05-17 at 1 35 34 PM" src="https://github.com/user-attachments/assets/b1e601f6-8611-4321-af65-3c52eb198599" />

## Tech stack

| Layer | Technology |
|--------|------------|
| **Framework** | [vinext](https://github.com/cloudflare/vinext) — Next.js 16 App Router API on **Vite 7** with **React Server Components** (`@vitejs/plugin-rsc`) |
| **UI** | **React 19**, **Tailwind CSS 4**, **Framer Motion**, **react-swipeable** |
| **Runtime / deploy** | **Cloudflare Workers** (`wrangler`), **Workers Assets** (static client from `dist/client`) |
| **Edge** | Custom `worker/index.ts` — delegates to vinext + **Cloudflare Images** for `/_vinext/image` resizing & format negotiation (AVIF/WebP/JPEG) |
| **Data (optional)** | **D1** SQLite — newsletter, date-notify, events API (see `migrations/`). If `DB` is not bound, the app uses **seed JSON** + **in-memory** fallbacks for APIs |
| **Maps** | **MapLibre GL** + **GeoJSON** (`public/data/laps/`) |
| **i18n** | English / Portuguese via `src/i18n/messages.ts` and cookies (`lr_locale`, `lr_unit` for km/mi) |
| **Images (pipeline)** | **Sharp** — `scripts/process-images.mjs` (batch from source dirs), `scripts/enrich-photos.mjs` (dominant colors on existing thumbs) |
| **Types** | **TypeScript 5** |
| **Tests / quality** | **Vitest**, **Playwright**, **Lighthouse CI** (`lighthouserc.cjs`), **GitHub Actions** (`.github/workflows/ci.yml`) |

## Requirements

- **Node.js 22+** (recommended for vinext / Vite 7)
- npm 10+

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Vite dev server (port **3001**) |
| `npm run build` | Production build (`dist/client`, `dist/server`, SSR bundles) |
| `npm run start` | `vinext start` — local production server (port 3000); may not match all Workers-only behavior |
| `npm run dev:e2e` | Vite on `127.0.0.1:3001` for Playwright / Lighthouse |
| `npm test` | Vitest unit tests |
| `npm run test:e2e` | Playwright (starts dev server via config) |
| `npm run lhci` | Lighthouse CI (expects site at `http://127.0.0.1:3001`) |
| `npm run process-images` | Sharp pipeline from configured source folders → `public/photos/*` + `src/data/photos.json` |
| `npm run enrich-photos` | Adds `dominantColor` to each entry in `src/data/photos.json` from thumbnails |

## Deploy (Cloudflare)

1. `npm run build`
2. Upload with Wrangler (e.g. `npx wrangler versions upload` or your CI’s deploy step), using the generated config under `dist/server/wrangler.json` as in the Cloudflare / vinext flow.

**D1:** The repo ships **without** a D1 `database_id` so deploys do not fail on a missing database. To enable persisted newsletter / events, create a database, add the `d1_databases` block to `wrangler.jsonc` (see comments in that file), and run migrations.

## Project layout (high level)

- `src/app/` — App Router pages, layouts, API routes (`route.ts`)
- `src/components/` — Client and shared UI
- `src/data/` — JSON manifests (photos, events seed, track reference, story)
- `worker/index.ts` — Worker entry: image optimization + vinext handler
- `migrations/` — D1 SQL migrations (when D1 is enabled)

## License

ISC (see `package.json`).
