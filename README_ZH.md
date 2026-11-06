<div align="center">

<img src="public/favicon.png" alt="Saturn" width="112" height="112" />

# Saturn 網站

**[saturn-core.com](https://saturn-core.com) 的原始碼。**

首頁、Saturn MCP、Saturn App、Trust（含白皮書）、方案與定價、服務條款與隱私權政策，提供英文與繁體中文，並預先渲染成靜態 HTML。

![Vue](https://img.shields.io/badge/Vue-3.5-4FC08D.svg?logo=vuedotjs&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF.svg?logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6.svg?logo=typescript&logoColor=white)
![Cloudflare Pages](https://img.shields.io/badge/hosted%20on-Cloudflare%20Pages-F38020.svg?logo=cloudflarepages&logoColor=white)

[頁面](#頁面) · [快速開始](#快速開始) · [預先渲染](#預先渲染的運作方式) · [多語系](#多語系) · [SEO](#seo-與結構化資料) · [安全標頭](#安全標頭) · [部署](#部署) · [English](README.md)

</div>

---

以 Vue 3、Vite 與 TypeScript 建置。每個頁面都預先渲染成靜態 HTML，託管在 Cloudflare Pages。網站沒有伺服器端程式碼：`dist/` 的建置產出就是整個網站。

## 頁面

每個頁面都有兩份：一份在英文路徑，一份在 `/zh` 底下，為繁體中文。路由宣告在 [`src/router.ts`](src/router.ts)。

| 英文 | 中文 | 元件 | 內容 |
| --- | --- | --- | --- |
| `/` | `/zh` | `HomePage.vue` | 主視覺、效益、為什麼需要 Gateway、功能、比較、主控台、免費方案、常見問題（`#faq`）與行動呼籲 |
| `/mcp` | `/zh/mcp` | `McpPage.vue` | Saturn MCP，也就是 Gateway：政策範例、四個設定步驟、使用情境、功能與安全 |
| `/app` | `/zh/app` | `AppPage.vue` | Saturn App，AI 研究工作台：GitHub 儲存庫連結、發行版本連結、功能與系統需求 |
| `/trust` | `/zh/trust` | `TrustPage.vue` | 金鑰、原始內容與憑證如何受到保護、常見問題、系統白皮書（`#whitepaper`）與漏洞回報（`#disclosure`） |
| `/pricing` | `/zh/pricing` | `PricingPage.vue` | Saturn 完全免費；包含的內容、常見問題（`#faq`），以及透過 GitHub Sponsors 贊助 |
| `/terms` | `/zh/terms` | `LegalPage.vue` | 服務條款 |
| `/privacy` | `/zh/privacy` | `LegalPage.vue` | 隱私權政策 |

App 頁連到 [`src/config.ts`](src/config.ts) 的 `RELEASES_URL`。Saturn App 的版本都是 pre-release，檔名也含版本號，所以固定的 `/releases/latest` 網址指不到它們。「開始使用」按鈕連到 `dashboard.saturn-core.com` 的主控台。

舊路徑在兩個地方轉址：

| 路徑 | `public/_redirects`（Cloudflare，301） | `src/router.ts`（瀏覽器端） |
| --- | --- | --- |
| `/platform`、`/product`、`/cloud`、`/approach` | `/mcp` | `/mcp` |
| `/developers` | `/app` | `/app` |
| `/security` | `/mcp` | `/trust` |
| `/zh/security` | 無 | `/zh/trust` |
| `/demo`、`/zh/demo` | `/`、`/zh` | 無 |

兩邊對 `/security` 的處理不一致。直接輸入網址的訪客會得到 Cloudflare 的結果，也就是 `/mcp`。

## 快速開始

需要 [Node.js](https://nodejs.org) 22（版本固定在 `.node-version`）。

```bash
npm install
npm run dev
```

`npm run dev` 以 Vite 開發伺服器提供網站，支援熱更新。開發模式只在瀏覽器端渲染；預先渲染只在 `npm run build` 進行。

## 指令

| 指令 | 作用 |
| --- | --- |
| `npm run dev` | 啟動 Vite 開發伺服器 |
| `npm run build` | 型別檢查（`vue-tsc -b`）、把用戶端建置到 `dist/`、從 `src/entry-server.ts` 建置伺服器端套件到 `dist-ssr/`，再執行 `scripts/prerender.mjs`，把每個頁面與 `sitemap.xml` 寫入 `dist/` |
| `npm run preview` | 以 `vite preview` 在本機提供 `dist/`。這裡不會套用 Cloudflare 的 `_headers` 與 `_redirects` |
| `npm run deploy` | 執行 `npm run build`，再執行 `wrangler pages deploy dist --project-name=saturn --commit-dirty=true` |

`dist/` 與 `dist-ssr/` 是建置產出，git 會忽略。

## 預先渲染的運作方式

1. `vite build` 寫出用戶端套件與 `dist/index.html`。範本 [`index.html`](index.html) 有兩個標記：包住預設標題與描述的 `<!--seo-->…<!--/seo-->`，以及 `<div id="app">` 裡的 `<!--app-html-->`。
2. `vite build --ssr src/entry-server.ts --outDir dist-ssr` 建置一個 Node 套件，匯出 `render(url)`、`prerenderPaths()` 與 `sitemapXml()`。
3. [`scripts/prerender.mjs`](scripts/prerender.mjs) 載入這個套件，對 `prerenderPaths()` 的每個路徑（每個頁面的兩種語言，共十四個）：
   - 以記憶體歷程的路由器、依路徑決定的語系，用 `renderToString` 渲染頁面；
   - 以 `src/seo.ts` 的 `headTags()` 產生的 head 標籤取代 `<!--seo-->` 區塊；
   - 把 `<html lang>` 設為 `en` 或 `zh-Hant`，並以渲染出的 HTML 取代 `<!--app-html-->`；
   - `/` 寫到 `dist/index.html`，其他路徑寫到 `dist/<路徑>/index.html`。
4. 以 `sitemapXml()` 寫出 `dist/sitemap.xml`，取代 Vite 從 `public/` 複製過來的那份。

範本缺少任一標記，或渲染出的頁面沒有 `<h1>`，指令碼都會報錯停止。

在瀏覽器裡，[`src/main.ts`](src/main.ts) 在正式環境使用 `createSSRApp`，因此 Vue 會 hydrate 預先渲染的 HTML，而不是重新繪製；開發伺服器則用 `createApp`。之後網站以單頁應用程式的方式切換頁面，[`src/App.vue`](src/App.vue) 在每次路由或語言改變時呼叫 `applyHead()`，讓標題、meta 標籤、canonical 連結與結構化資料保持一致。

## 多語系

兩個語系是 `en` 與 `zh`（繁體中文，以 `zh-Hant` 提供）。語系由路徑決定：`/zh` 及 `/zh/` 底下的路徑是中文，其餘是英文。導覽列的語言選單以 `localePath()` 切換到另一種語言的同一頁。

文案放在四個檔案，每個都有 `en` 與 `zh` 兩邊：

| 檔案 | 內容 |
| --- | --- |
| [`src/i18n.ts`](src/i18n.ts) | 頁面文案、導覽、頁尾、常見問題，以及每頁的標題與描述 |
| [`src/free-pricing.ts`](src/free-pricing.ts) | 方案與定價、贊助文案，以及首頁的方案區塊 |
| [`src/trust-paper.ts`](src/trust-paper.ts) | Trust 頁面上的白皮書 |
| [`src/legal.ts`](src/legal.ts) | 服務條款與隱私權政策 |

**新增一段文字。** 在 `src/i18n.ts` 的 `en` 與 `zh` 底下、相同位置加上同一個鍵，再在元件裡透過 `useI18n()` 使用：

```vue
<script setup lang="ts">
import { useI18n } from '../i18n'
const { t } = useI18n()
</script>

<template>
  <p>{{ t.appPage.newLine }}</p>
</template>
```

`t` 的型別取自兩種語言，因此只存在於一種語言的鍵，會讓 `npm run build` 裡的 `vue-tsc` 失敗。

**新增一個頁面。** 以下每一步都需要；型別檢查只抓得到其中一部分：

1. 在 `src/i18n.ts` 的 `PageName` 加上頁面名稱，並在 `en` 與 `zh` 底下各加一個 `<名稱>Page` 區塊，至少要有 `title` 與 `description`。
2. 在 `src/i18n.ts` 的 `pageMeta()` 加上對應的分支。
3. 在 `src/pages/` 建立元件，並在 `src/router.ts` 的 `pages` 加上 `{ path, page, component }`。`/zh` 路由會自動產生。
4. 在 `src/seo.ts` 的 `PAGES` 加上名稱、在 `sitemapXml()` 設定優先順序；若要出現在麵包屑，再在 `crumbLabel()` 加上標籤。
5. 在 `src/App.vue` 與 `src/entry-server.ts` 的檢查裡加上名稱。遇到不認得的名稱時它們會退回 `home`，所以漏掉時頁面會拿到首頁的 head 標籤，而且不會報錯。
6. 以 `localePath()` 從 `src/components/NavBar.vue` 或 `src/components/Footer.vue` 連過去；若希望語言模型找得到，也列進 `public/llms.txt`。

中文文案沿用現有用法：台灣用語、全形標點。

## SEO 與結構化資料

[`src/seo.ts`](src/seo.ts) 產生每一頁的 head，預先渲染的 HTML 用 `headTags()`，瀏覽器端切換頁面用 `applyHead()`：

- **Canonical 與替代語言。** 以 `https://saturn-core.com` 為準的 canonical URL、`en` 與 `zh-Hant` 的 `hreflang` 連結，以及指向英文頁的 `x-default`。
- **Open Graph 與 Twitter 卡片。** 標題、描述、語系（`en_US` 或 `zh_TW`），以及 1200 × 630 的 `og.png`，替代文字使用該頁的語言。
- **Robots。** `index, follow, max-image-preview:large`。
- **JSON-LD。** 每頁一個 `@graph`，包含 `Organization` 與 `WebSite`、該頁的 `WebPage`（首頁以外都附 `BreadcrumbList`）、首頁、Trust 與方案頁由常見問題文案產生的 `FAQPage`，以及 Saturn MCP（首頁、MCP、方案頁）與 Saturn App（首頁、App、方案頁）的 `SoftwareApplication`。
- **Sitemap。** `sitemapXml()` 列出全部十四個網址及其替代語言、每頁的優先順序，並以建置日期作為 `lastmod`。

[`public/`](public) 裡提供給搜尋引擎爬蟲與語言模型的檔案：

| 檔案 | 用途 |
| --- | --- |
| `robots.txt` | 允許所有爬蟲、逐一列出 AI 爬蟲，並指向 sitemap 與 `llms.txt` |
| `llms.txt` | 網站的簡短摘要與連結，英文與中文 |
| `llms-full.txt` | 給語言模型的完整產品說明 |
| `site.webmanifest` | 名稱、顏色與圖示 |
| `.well-known/security.txt` | 漏洞回報的聯絡方式 |

`llms.txt` 與 `llms-full.txt` 是手寫的。頁面文案改動時，請確認兩者仍然一致。

### OG 圖片

`public/og.png` 由 [`scripts/og.swift`](scripts/og.swift) 以 AppKit 繪製，因此只能在 macOS 上執行。它接受輸出路徑與一張 logo 圖片作為參數：

```bash
swift scripts/og.swift public/og.png public/favicon.png
```

圖片上的文字寫在指令碼裡。

## 安全標頭

[`public/_headers`](public/_headers) 套用到所有路徑：

| 標頭 | 值 |
| --- | --- |
| `Content-Security-Policy` | 見下方 |
| `Strict-Transport-Security` | 兩年，含子網域 |
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `no-referrer` |
| `Permissions-Policy` | 關閉加速度計、相機、定位、陀螺儀、麥克風、付款與 USB |

它也為 `llms.txt`、`llms-full.txt`、`robots.txt`、`sitemap.xml` 與 `.well-known/security.txt` 設定 `charset=utf-8` 的內容類型。

Content Security Policy 只允許來自網站本身的指令碼（`script-src 'self'`）、來自網站本身與 Google Fonts 的樣式、來自網站本身與 `fonts.gstatic.com` 的字型、來自網站本身與 `data:` 網址的圖片，並禁止 frame、外掛，以及被其他網站嵌入。`connect-src` 另外允許 `https://formsubmit.co`，目前沒有任何頁面使用。

**安全地修改。** 這份政策沒有 `'unsafe-inline'`、雜湊值或 nonce，目前也都不需要：

- 建置出的頁面裡唯一的內嵌 `<script>` 是 JSON-LD 區塊，`type="application/ld+json"`。瀏覽器不會執行它，所以 `script-src` 不適用。
- 應用程式本身是 Vite 輸出到 `/assets/` 底下的獨立 module 指令碼。
- 沒有任何範本使用 `style="…"` 屬性或 `:style` 綁定。預先渲染會把兩者都寫成 HTML 的內嵌樣式屬性，而 `style-src 'self'` 會擋下它。

所以請把指令碼與樣式放在檔案裡。如果真的需要內嵌指令碼，請把它的 SHA-256 雜湊加進 `script-src`，不要用 `'unsafe-inline'`，而且指令碼每次修改都要重新計算雜湊。加入外部服務（分析、表單端點、字型來源）時，只把它的來源加到它用到的那一項指令，不要放寬更多。修改政策後，請部署並在幾個頁面的瀏覽器主控台檢查有沒有 CSP 違規：`npm run preview` 不會套用 `_headers`。

## 編輯法律條文

服務條款與隱私權政策是 [`src/legal.ts`](src/legal.ts) 裡的資料，由 `src/pages/LegalPage.vue` 渲染。每份文件有 head 用的 `title` 與 `description`、`crumb`、`heading`、`updated` 日期、另一份文件的連結，以及 `sections`。每個章節是一個 `heading` 加上一串區塊：

| 區塊 | 渲染為 |
| --- | --- |
| `{ type: 'p', text }` | 段落 |
| `{ type: 'ul', items }` · `{ type: 'ol', items }` | 項目符號或編號清單 |
| `{ type: 'h3', text }` | 小標題 |
| `{ type: 'table', head, rows }` | 表格 |

內文是純文字：不含 HTML 或 Markdown。狀態標籤（`[Current]`、`[Fixed]`、`[Open]`、`[Planned]`，以及【現況】、【已修正】、【未解決】、【規劃中】）由 `splitStatusBadges()` 繪製成徽章；Trust 白皮書使用相同的區塊與徽章。

改了一種語言，請在同一個 commit 裡改另一種，並更新兩邊的 `updated`。

## 部署

```bash
npm run deploy
```

建置並把 `dist/` 上傳到 Cloudflare Pages 專案 `saturn`。需要有權存取該專案的 Wrangler 登入（`npx wrangler login`）。推送到 `main` 不會部署。

部署時帶有 `--commit-dirty=true`，所以未 commit 的變更會直接上線，不會有警告。若部署內容應該對應某個 commit，請先 commit。

## github.io

`gh-pages` 分支提供 saturn-technology-project.github.io，它只會轉址到 saturn-core.com。GitHub 不允許組織的 `.github.io` 儲存庫關閉 Pages。`main` 上的網站原始碼不由 GitHub 發佈。

## 專案結構

| 路徑 | 內容 |
| --- | --- |
| `index.html` | HTML 範本，含 `<!--seo-->` 與 `<!--app-html-->` 標記 |
| `src/main.ts` | 瀏覽器端進入點：建立應用程式並 hydrate 預先渲染的 HTML |
| `src/entry-server.ts` | 預先渲染的進入點：`render(url)`，以及來自 `seo.ts` 的路徑與 sitemap |
| `src/router.ts` | 兩種語言的路由，以及舊路徑的轉址 |
| `src/App.vue` | 外框：導覽列、頁面、頁尾，以及 head 更新 |
| `src/pages/` | 每個頁面一個元件；`LegalPage.vue` 同時負責服務條款與隱私權政策 |
| `src/components/` | 導覽列、頁尾、麵包屑、方案卡片與政策範例 |
| `src/i18n.ts` | 兩種語言的頁面文案、頁面標題與描述 |
| `src/free-pricing.ts` | 方案與定價、贊助文案 |
| `src/trust-paper.ts` | Trust 頁面上的系統白皮書 |
| `src/legal.ts` | 服務條款與隱私權政策 |
| `src/seo.ts` | Canonical URL、結構化資料與 sitemap |
| `src/config.ts` | 網站、主控台、聯絡信箱、GitHub、下載與贊助連結 |
| `src/platform.ts` | 為下載按鈕判斷訪客的作業系統 |
| `src/style.css` | 網站樣式 |
| `public/` | 原樣提供的檔案：`_headers`、`_redirects`、`llms.txt`、`llms-full.txt`、`robots.txt`、`.well-known/security.txt`、web manifest、圖示與 `og.png` |
| `scripts/prerender.mjs` | 寫出預先渲染的頁面與 sitemap |
| `scripts/og.swift` | 繪製 `public/og.png` |

## 授權

本儲存庫未採用開放原始碼授權。
