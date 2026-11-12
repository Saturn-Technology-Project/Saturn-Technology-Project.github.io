<div align="center">

<img src="public/favicon.png" alt="Saturn" width="112" height="112" />

# Saturn website

**The source of [saturn-core.com](https://saturn-core.com).**

The landing page, Saturn MCP, Saturn App, Trust (with the whitepaper), Pricing, Terms and Privacy, in English and 繁體中文, prerendered to static HTML.

![Vue](https://img.shields.io/badge/Vue-3.5-4FC08D.svg?logo=vuedotjs&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF.svg?logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6.svg?logo=typescript&logoColor=white)
![Cloudflare Pages](https://img.shields.io/badge/hosted%20on-Cloudflare%20Pages-F38020.svg?logo=cloudflarepages&logoColor=white)

[Pages](#pages) · [Quick start](#quick-start) · [Prerendering](#how-prerendering-works) · [i18n](#i18n) · [SEO](#seo-and-structured-data) · [Headers](#security-headers) · [Deploy](#deploy) · [中文](README_ZH.md)

</div>

---

Built with Vue 3, Vite and TypeScript. Every page is prerendered to static HTML and hosted on Cloudflare Pages. There is no server code: the build output in `dist/` is the whole site.

## Pages

Every page exists twice: once at its English path and once under `/zh` in 繁體中文. The routes are declared in [`src/router.ts`](src/router.ts).

| English | 中文 | Component | What it contains |
| --- | --- | --- | --- |
| `/` | `/zh` | `HomePage.vue` | What Saturn works on (AI security), its two products side by side (`#saturn-mcp`, `#saturn-app`), how it is built, the free plan, FAQ (`#faq`) and a call to action |
| `/mcp` | `/zh/mcp` | `McpPage.vue` | Saturn MCP, the gateway: an example policy, the four setup steps, use cases, capabilities, security, why a dedicated gateway and the console |
| `/app` | `/zh/app` | `AppPage.vue` | Saturn App, the AI research workbench: a link to the GitHub repository, a link to its releases, features and requirements |
| `/trust` | `/zh/trust` | `TrustPage.vue` | How keys, payloads and credentials are protected, FAQ, the system whitepaper (`#whitepaper`) and vulnerability disclosure (`#disclosure`) |
| `/pricing` | `/zh/pricing` | `PricingPage.vue` | Saturn is free; what is included, FAQ (`#faq`) and Donate through GitHub Sponsors |
| `/terms` | `/zh/terms` | `LegalPage.vue` | Terms of Service |
| `/privacy` | `/zh/privacy` | `LegalPage.vue` | Privacy Policy |

The App page links to the releases at `RELEASES_URL` in [`src/config.ts`](src/config.ts). Saturn App's releases are pre-releases with the version in their file names, so a stable `/releases/latest` address cannot point at one. The "Get started" buttons go to the console at `dashboard.saturn-core.com`.

Old paths are redirected in two places:

| Path | `public/_redirects` (Cloudflare, 301) | `src/router.ts` (in the browser) |
| --- | --- | --- |
| `/platform`, `/product`, `/cloud`, `/approach` | `/mcp` | `/mcp` |
| `/developers` | `/app` | `/app` |
| `/security` | `/mcp` | `/trust` |
| `/zh/security` | none | `/zh/trust` |
| `/demo`, `/zh/demo` | `/`, `/zh` | none |

The two disagree on `/security`. A visitor who types the address gets Cloudflare's answer, `/mcp`.

## Quick start

Requires [Node.js](https://nodejs.org) 22 (pinned in `.node-version`).

```bash
npm install
npm run dev
```

`npm run dev` serves the site with Vite's dev server and hot reload. In development the app renders in the browser only; prerendering happens in `npm run build`.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Starts the Vite dev server |
| `npm run build` | Type-checks (`vue-tsc -b`), builds the client into `dist/`, builds a server bundle from `src/entry-server.ts` into `dist-ssr/`, then runs `scripts/prerender.mjs`, which writes every page and `sitemap.xml` into `dist/` |
| `npm run preview` | Serves `dist/` locally with `vite preview`. Cloudflare's `_headers` and `_redirects` are not applied there |
| `npm run deploy` | Runs `npm run build`, then `wrangler pages deploy dist --project-name=saturn --commit-dirty=true` |

`dist/` and `dist-ssr/` are build output and are ignored by git.

## How prerendering works

1. `vite build` writes the client bundle and `dist/index.html`. The template [`index.html`](index.html) holds two markers: `<!--seo-->…<!--/seo-->` around the default title and description, and `<!--app-html-->` inside `<div id="app">`.
2. `vite build --ssr src/entry-server.ts --outDir dist-ssr` builds a Node bundle that exports `render(url)`, `prerenderPaths()` and `sitemapXml()`.
3. [`scripts/prerender.mjs`](scripts/prerender.mjs) loads that bundle and, for each path in `prerenderPaths()` (every page in both languages, fourteen in all):
   - renders the page with `renderToString` on a router in memory history, with the locale taken from the path;
   - replaces the `<!--seo-->` block with the page's head tags from `headTags()` in `src/seo.ts`;
   - sets `<html lang>` to `en` or `zh-Hant`, and puts the rendered HTML in place of `<!--app-html-->`;
   - writes `dist/index.html` for `/`, and `dist/<path>/index.html` for every other path;
   - converts the page's `<main>` to Markdown with [Turndown](https://github.com/mixmark-io/turndown) and writes it to the page's URL plus `.md` (`/mcp.md`, `/zh/trust.md`), or `index.md` for a home page.
4. It writes `dist/sitemap.xml` from `sitemapXml()`, and `dist/llms.txt` and `dist/llms-full.txt` from `llmsIndex()` and `llmsFull()` in [`src/llms.ts`](src/llms.ts).

The script stops with an error if the template lacks either marker, if a rendered page has no `<h1>`, or if a page's Markdown has no title, is shorter than 500 characters, still contains HTML, or names a Saturn App release version such as `v1.2.3` (Saturn App ships often, so the site links to the releases page instead).

In the browser, [`src/main.ts`](src/main.ts) uses `createSSRApp` in production, so Vue hydrates the prerendered HTML instead of drawing it again; the development server uses `createApp`. From then on the site navigates as a single-page app, and [`src/App.vue`](src/App.vue) calls `applyHead()` on every route or language change to keep the title, meta tags, canonical link and structured data in step.

## i18n

The two locales are `en` and `zh` (繁體中文, served as `zh-Hant`). The locale comes from the path: `/zh` and anything under `/zh/` is Chinese, the rest English. The language menu in the navigation bar switches to the same page in the other language with `localePath()`.

Copy lives in four files, each with an `en` and a `zh` side:

| File | What it holds |
| --- | --- |
| [`src/i18n.ts`](src/i18n.ts) | Page copy, navigation, footer, FAQs, and each page's title and description |
| [`src/free-pricing.ts`](src/free-pricing.ts) | Pricing and Donate copy, and the plan section of the home page |
| [`src/trust-paper.ts`](src/trust-paper.ts) | The whitepaper on the Trust page |
| [`src/legal.ts`](src/legal.ts) | Terms of Service and Privacy Policy |

**A new string.** Add the key in the same place under both `en` and `zh` in `src/i18n.ts`, then use it in a component through `useI18n()`:

```vue
<script setup lang="ts">
import { useI18n } from '../i18n'
const { t } = useI18n()
</script>

<template>
  <p>{{ t.appPage.newLine }}</p>
</template>
```

`t` is typed from both languages, so a key that exists in only one fails `vue-tsc` in `npm run build`.

**A new page.** Each step below is needed; the type checker catches some, not all:

1. Add its name to `PageName` in `src/i18n.ts`, and a `<name>Page` block with at least `title` and `description` under both `en` and `zh`.
2. Add a branch for it in `pageMeta()` in `src/i18n.ts`.
3. Create the component in `src/pages/`, and add `{ path, page, component }` to `pages` in `src/router.ts`. The `/zh` route is generated from it.
4. Add the name to `PAGES` in `src/seo.ts`, a priority in `sitemapXml()`, and, if it should appear in breadcrumbs, a label in `crumbLabel()`.
5. Add the name to the checks in `src/App.vue` and `src/entry-server.ts`. They fall back to `home` for an unknown name, so a missing entry gives the page the home page's head tags without any error.
6. Link it from `src/components/NavBar.vue` or `src/components/Footer.vue` with `localePath()`, and `llms.txt` and `llms-full.txt` pick it up from `PAGES`.

Chinese copy uses Taiwan terms and full-width punctuation, as the existing text does.

## SEO and structured data

[`src/seo.ts`](src/seo.ts) produces every page's head, for both the prerendered HTML (`headTags()`) and client-side navigation (`applyHead()`):

- **Canonical and alternates.** A canonical URL on `https://saturn-core.com`, `hreflang` links for `en` and `zh-Hant`, and `x-default` pointing at the English page.
- **Open Graph and Twitter cards.** Title, description, locale (`en_US` or `zh_TW`) and `og.png` at 1200 × 630, with alt text in the page's language.
- **Robots.** `index, follow, max-image-preview:large`.
- **JSON-LD.** One `@graph` per page with the `Organization` and `WebSite`, the page's `WebPage` (with a `BreadcrumbList` on every page but home), `FAQPage` on Home, Trust and Pricing built from the FAQ copy, and `SoftwareApplication` entries for Saturn MCP (Home, MCP, Pricing) and Saturn App (Home, App, Pricing).
- **Sitemap.** `sitemapXml()` lists all fourteen URLs with their alternates, a priority per page, and the build date as `lastmod`.

Files that serve crawlers and language models:

| File | Purpose |
| --- | --- |
| `public/robots.txt` | Allows every crawler, names the AI crawlers explicitly, and points to the sitemap, `llms.txt` and the Markdown copies |
| `llms.txt` (generated) | A summary of Saturn, key facts, and a link to every page's Markdown copy in English and 中文 |
| `llms-full.txt` (generated) | Every page's Markdown in one file, including the whitepaper, Terms and Privacy |
| `<page>.md` (generated) | A Markdown copy of each page, linked from its HTML with `<link rel="alternate" type="text/markdown">` |
| `public/site.webmanifest` | Name, colours and icon |
| `public/.well-known/security.txt` | Where to report a vulnerability |

The Markdown copies, `llms.txt` and `llms-full.txt` are built from the rendered pages, so they change with the page copy. Only the summary and the facts at the top of `llms.txt` and `llms-full.txt` are written by hand, in [`src/llms.ts`](src/llms.ts).

### The OG image

`public/og.png` is drawn by [`scripts/og.swift`](scripts/og.swift) with AppKit, so it runs on macOS only. It takes the output path and a logo image as arguments:

```bash
swift scripts/og.swift public/og.png public/favicon.png
```

The text on the image is set in the script.

## Security headers

[`public/_headers`](public/_headers) applies to every path:

| Header | Value |
| --- | --- |
| `Content-Security-Policy` | See below |
| `Strict-Transport-Security` | Two years, with subdomains |
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `no-referrer` |
| `Permissions-Policy` | Accelerometer, camera, geolocation, gyroscope, microphone, payment and USB turned off |

It also sets a `charset=utf-8` content type on `llms.txt`, `llms-full.txt`, `robots.txt`, `sitemap.xml` and `.well-known/security.txt`, and `text/markdown` on the `.md` copies.

The Content Security Policy allows scripts only from the site itself (`script-src 'self'`), styles from the site and Google Fonts, fonts from the site and `fonts.gstatic.com`, images from the site and `data:` URLs, and no frames, plugins or embedding in other sites. `connect-src` also allows `https://formsubmit.co`, which no current page uses.

**Changing it safely.** The policy has no `'unsafe-inline'`, hashes or nonces, and needs none today:

- The only inline `<script>` in the built pages is the JSON-LD block, `type="application/ld+json"`. Browsers do not execute it, so `script-src` does not apply to it.
- The app itself is the module script Vite emits as a separate file under `/assets/`.
- No template uses a `style="…"` attribute or a `:style` binding. Prerendering would write either into the HTML as an inline style attribute, which `style-src 'self'` blocks.

So keep scripts and styles in files. If something truly needs an inline script, add its SHA-256 hash to `script-src` instead of `'unsafe-inline'`, and recompute the hash whenever the script changes. Adding an outside service (analytics, a form endpoint, a font host) means adding its origin to the directive it uses, and nothing wider. After changing the policy, deploy and check the browser console on a few pages for CSP violations: `npm run preview` does not apply `_headers`.

## Editing legal text

The Terms of Service and the Privacy Policy are data in [`src/legal.ts`](src/legal.ts), rendered by `src/pages/LegalPage.vue`. Each document has a `title` and `description` for the head, a `crumb`, a `heading`, an `updated` date, a link to the other document, and `sections`. A section is a `heading` and a list of blocks:

| Block | Renders |
| --- | --- |
| `{ type: 'p', text }` | A paragraph |
| `{ type: 'ul', items }` · `{ type: 'ol', items }` | A bulleted or numbered list |
| `{ type: 'h3', text }` | A subheading |
| `{ type: 'table', head, rows }` | A table |

Text is plain: there is no HTML or Markdown in it. Status labels (`[Current]`, `[Fixed]`, `[Open]`, `[Planned]`, and 【現況】, 【已修正】, 【未解決】, 【規劃中】) are drawn as badges by `splitStatusBadges()`; the Trust whitepaper uses the same blocks and badges.

When you change one language, change the other in the same commit, and update `updated` in both.

## Deploy

```bash
npm run deploy
```

Builds and uploads `dist/` to the Cloudflare Pages project `saturn`. It needs a Wrangler login with access to that project (`npx wrangler login`). Pushing to `main` does not deploy.

The deploy passes `--commit-dirty=true`, so uncommitted changes go live without a warning. Commit first if the deployment should match a commit.

## github.io

The `gh-pages` branch serves saturn-technology-project.github.io, which only redirects to saturn-core.com. GitHub does not let an organization's `.github.io` repository turn Pages off. The site source on `main` is not published from GitHub.

## Project layout

| Path | What it holds |
| --- | --- |
| `index.html` | The HTML template, with the `<!--seo-->` and `<!--app-html-->` markers |
| `src/main.ts` | The browser entry: creates the app and hydrates the prerendered HTML |
| `src/entry-server.ts` | The prerender entry: `render(url)`, and the paths and sitemap from `seo.ts` |
| `src/router.ts` | The routes in both languages, and the old-path redirects |
| `src/App.vue` | The shell: navigation bar, page, footer, and head updates |
| `src/pages/` | One component per page; `LegalPage.vue` serves both Terms and Privacy |
| `src/components/` | Navigation bar, footer, breadcrumb, plan grid and the example policy |
| `src/i18n.ts` | Page copy in both languages, page titles and descriptions |
| `src/free-pricing.ts` | Pricing and Donate copy |
| `src/trust-paper.ts` | The system whitepaper shown on the Trust page |
| `src/legal.ts` | Terms of Service and Privacy Policy |
| `src/seo.ts` | Canonical URLs, structured data and the sitemap |
| `src/llms.ts` | The summary and facts for language models, and how `llms.txt` and `llms-full.txt` are put together |
| `src/config.ts` | Site, console, contact, GitHub, download and Donate links |
| `src/platform.ts` | Guesses the visitor's operating system for the download button |
| `src/style.css` | The site's styles |
| `public/` | Files served as-is: `_headers`, `_redirects`, `robots.txt`, `.well-known/security.txt`, the web manifest, icons and `og.png` |
| `scripts/prerender.mjs` | Writes the prerendered pages, their Markdown copies, the sitemap, `llms.txt` and `llms-full.txt` |
| `scripts/og.swift` | Draws `public/og.png` |

## License

This repository is not open-source licensed.
