# Refresh My Ride website

The website for Refresh My Ride Auto Detailing, 33115 Louise Ave, Clinton
Township, MI. Built by Modern Apex Strategies in October 2026 to replace their
WordPress site and to be the landing destination for their Google Ads.

- Preview: https://nradachy-web.github.io/refresh-my-ride/ (hidden from search)
- Production: https://refreshmyrideauto.com (after the steps in `docs/LAUNCH.md`)

## How it is built

[Astro](https://astro.build) 7, static output, no client framework. Every page
ships as plain HTML with its CSS inlined, one preloaded font and a handful of
small inline scripts. Photos are served as AVIF and WebP at several sizes.
Pushing to `main` builds and deploys through `.github/workflows/deploy.yml`.

```
npm install
npm run dev            # local dev server
npm run build          # production build into dist/, then the house-rules check
npm run build:preview  # the same, for the /refresh-my-ride/ preview path
npm run photos         # rebuild photo sources from _source/media (see below)
node scripts/check-content.mjs [file]   # check content JSON without building
```

## Where things are

| What | Where |
|---|---|
| Every business fact (phone, hours, links, tags) | `src/data/site.ts` |
| Services, towns, reviews, photos | `src/data/*.ts` |
| Page copy | `src/content/{services,towns,cities}/*.json` |
| The rules that copy must pass | `src/content.schema.mjs`, `scripts/check-content.mjs` |
| Page templates | `src/templates/`, `src/pages/` |
| Design system | `src/styles/global.css`, `docs/DESIGN.md` |
| Facts and writing rules | `docs/FACTS.md`, `docs/CONTENT-GUIDE.md` |
| Sources for local claims on town pages | `docs/research/` |
| What Josh still has to confirm | `docs/OPEN-QUESTIONS.md` |
| Going live | `docs/LAUNCH.md`, `docs/URLS.md` |

The build fails if a page breaks a house rule: an en or em dash, a missing
image size, a broken internal link, a claim the business cannot support. See
`scripts/postbuild.mjs`.

## Photos

Every photo is Refresh My Ride's own. The originals came from their media
library and are not in the repository. `scripts/photos.py` crops and sizes them
into `src/assets/photos/`, which is committed. To add one: put the original in
`_source/media/`, add it to `scripts/photos.py`, run `npm run photos`, then
describe it in `src/data/photos.ts`.
