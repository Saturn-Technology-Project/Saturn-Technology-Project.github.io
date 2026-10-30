# Saturn website

Source for [saturn-core.com](https://saturn-core.com): the landing page, Saturn MCP, Saturn App, Trust (with the whitepaper), Pricing, Terms and Privacy, in English and 繁體中文.

Built with Vue 3, Vite and TypeScript. Every page is prerendered to static HTML and hosted on Cloudflare Pages.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Type-checks, builds the client and a server bundle, then prerenders every page and `sitemap.xml` into `dist/`.

## Deploy

```bash
npm run deploy
```

Builds and uploads `dist/` to the Cloudflare Pages project `saturn`. It needs a Wrangler login with access to that project (`npx wrangler login`). Pushing to `main` does not deploy.

## Layout

| Path | What it holds |
| --- | --- |
| `src/i18n.ts` | Page copy in both languages, page titles and descriptions |
| `src/free-pricing.ts` | Pricing and Donate copy |
| `src/trust-paper.ts` | The system whitepaper shown on the Trust page |
| `src/legal.ts` | Terms of Service and Privacy Policy |
| `src/seo.ts` | Canonical URLs, structured data and the sitemap |
| `src/config.ts` | Console, GitHub, download and Donate links |
| `public/` | Files served as-is: `_headers`, `_redirects`, `llms.txt`, `robots.txt`, icons |
| `scripts/prerender.mjs` | Writes the prerendered pages |
| `scripts/og.swift` | Draws `public/og.png` |

## github.io

The `gh-pages` branch serves saturn-technology-project.github.io, which only redirects to saturn-core.com. GitHub does not let an organization's `.github.io` repository turn Pages off.
