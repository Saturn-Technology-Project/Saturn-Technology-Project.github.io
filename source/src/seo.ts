import { CONTACT_ADDRESS, GITHUB_URL, SITE_URL } from './config'
import { copy, pageMeta, type Locale, type PageName } from './i18n'
import { legalCopy } from './legal'

export const PAGES = ['home', 'mcp', 'app', 'pricing', 'demo', 'terms', 'privacy'] as const
const LOCALES = ['en', 'zh'] as const
const ORG_ID = `${SITE_URL}/#organization`
const SITE_ID = `${SITE_URL}/#website`
const OG_IMAGE = new URL('/og.png', SITE_URL).href

export function pagePath(page: PageName, lang: Locale): string {
  const slug = page === 'home' ? '/' : `/${page}`
  if (lang === 'zh') return slug === '/' ? '/zh' : `/zh${slug}`
  return slug
}

export function canonicalUrl(page: PageName, lang: Locale): string {
  return new URL(pagePath(page, lang), SITE_URL).href
}

export function prerenderPaths(): string[] {
  return PAGES.flatMap((page) => LOCALES.map((lang) => pagePath(page, lang)))
}

function htmlLang(lang: Locale): string {
  return lang === 'zh' ? 'zh-Hant' : 'en'
}

function ogLocale(lang: Locale): string {
  return lang === 'zh' ? 'zh_TW' : 'en_US'
}

function imageAlt(lang: Locale): string {
  return lang === 'zh'
    ? 'Saturn，企業級 AI Agent 的安全 MCP Gateway'
    : 'Saturn, the secure MCP gateway for AI agents'
}

function crumbLabel(page: PageName, lang: Locale): string {
  const nav = copy(lang).nav
  if (page === 'mcp') return nav.mcp
  if (page === 'app') return nav.app
  if (page === 'pricing') return nav.pricing
  if (page === 'demo') return nav.demo
  if (page === 'terms' || page === 'privacy') return legalCopy[lang][page].crumb
  return 'Saturn'
}

function faqFor(page: PageName, lang: Locale) {
  const text = copy(lang)
  if (page === 'home') return text.homeFaq.items
  if (page === 'pricing') return text.pricingPage.faq
  return null
}

function questions(items: readonly (readonly [string, string])[]) {
  return items.map(([name, text]) => ({
    '@type': 'Question',
    name,
    acceptedAnswer: { '@type': 'Answer', text },
  }))
}

function mcpApplication(lang: Locale) {
  const text = copy(lang)
  return {
    '@type': 'SoftwareApplication',
    '@id': `${SITE_URL}/#saturn-mcp`,
    name: 'Saturn MCP',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: canonicalUrl('mcp', lang),
    description: text.mcpPage.description,
    featureList:
      lang === 'zh'
        ? ['工具集', '參數層級政策', '多人核准', '簽章 Webhook', '加密的原始內容', '審計軌跡']
        : ['Tool sets', 'Argument-level policy', 'Multi-approver quorum', 'Signed webhooks', 'Encrypted raw payloads', 'Audit trail'],
    provider: { '@id': ORG_ID },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/PreOrder',
      description: lang === 'zh' ? 'Pro 與 Team 即將推出。' : 'Pro and Team plans are coming soon.',
    },
  }
}

function desktopApplication(lang: Locale) {
  const text = copy(lang)
  return {
    '@type': 'SoftwareApplication',
    '@id': `${SITE_URL}/#saturn-app`,
    name: 'Saturn App',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'macOS, Windows',
    url: canonicalUrl('app', lang),
    description: text.appPage.description,
    downloadUrl: `${GITHUB_URL}/releases/latest`,
    codeRepository: GITHUB_URL,
    license: 'https://opensource.org/licenses/MIT',
    isAccessibleForFree: true,
    featureList:
      lang === 'zh'
        ? ['本機 Runtime，只監聽 127.0.0.1', '檔案、程式碼、網頁與 MCP 技能', '自帶模型', 'MIT 授權']
        : ['Local runtime on 127.0.0.1', 'Files, code, web, and MCP skills', 'Bring your own model', 'MIT license'],
    provider: { '@id': ORG_ID },
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  }
}

export function jsonLd(page: PageName, lang: Locale) {
  const meta = pageMeta(page, lang)
  const url = canonicalUrl(page, lang)
  const pageNode: Record<string, unknown> = {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: meta.title,
    description: meta.description,
    inLanguage: htmlLang(lang),
    isPartOf: { '@id': SITE_ID },
    about: { '@id': ORG_ID },
    primaryImageOfPage: OG_IMAGE,
  }

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: 'Saturn',
      url: SITE_URL,
      logo: new URL('/favicon.png', SITE_URL).href,
      image: OG_IMAGE,
      email: CONTACT_ADDRESS,
      description: copy('en').meta.description,
      sameAs: [GITHUB_URL],
      parentOrganization: { '@type': 'Organization', name: 'Prism Capital LLC' },
    },
    {
      '@type': 'WebSite',
      '@id': SITE_ID,
      name: 'Saturn',
      url: SITE_URL,
      inLanguage: ['en', 'zh-Hant'],
      publisher: { '@id': ORG_ID },
    },
  ]

  if (page !== 'home') {
    pageNode.breadcrumb = {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Saturn', item: canonicalUrl('home', lang) },
        { '@type': 'ListItem', position: 2, name: crumbLabel(page, lang), item: url },
      ],
    }
  }

  const faq = faqFor(page, lang)
  if (faq) {
    pageNode['@type'] = ['WebPage', 'FAQPage']
    pageNode.mainEntity = questions(faq)
  }

  graph.push(pageNode)
  if (page === 'home' || page === 'mcp' || page === 'pricing') graph.push(mcpApplication(lang))
  if (page === 'home' || page === 'app' || page === 'pricing') graph.push(desktopApplication(lang))

  return { '@context': 'https://schema.org', '@graph': graph }
}

function esc(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
}

export function headTags(page: PageName, lang: Locale): string {
  const meta = pageMeta(page, lang)
  const url = canonicalUrl(page, lang)
  const alt = imageAlt(lang)
  const other = lang === 'zh' ? 'en_US' : 'zh_TW'
  const alternates = [
    ...LOCALES.map(
      (item) => `<link rel="alternate" hreflang="${htmlLang(item)}" href="${canonicalUrl(page, item)}" />`,
    ),
    `<link rel="alternate" hreflang="x-default" href="${canonicalUrl(page, 'en')}" />`,
  ]
  const json = JSON.stringify(jsonLd(page, lang)).replace(/</g, '\\u003c')
  return [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    `<link rel="canonical" href="${url}" />`,
    ...alternates,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Saturn" />`,
    `<meta property="og:locale" content="${ogLocale(lang)}" />`,
    `<meta property="og:locale:alternate" content="${other}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(alt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    `<meta name="twitter:image:alt" content="${esc(alt)}" />`,
    `<script id="seo-jsonld" type="application/ld+json">${json}</script>`,
  ].join('\n    ')
}

export function sitemapXml(): string {
  const priorities: Record<PageName, string> = {
    home: '1.0',
    mcp: '0.9',
    app: '0.9',
    pricing: '0.8',
    demo: '0.6',
    terms: '0.3',
    privacy: '0.3',
  }
  const lastmod = new Date().toISOString().slice(0, 10)
  const urls = PAGES.flatMap((page) =>
    LOCALES.map((lang) => {
      const alternates = [
        ...LOCALES.map(
          (alt) =>
            `    <xhtml:link rel="alternate" hreflang="${htmlLang(alt)}" href="${canonicalUrl(page, alt)}"/>`,
        ),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${canonicalUrl(page, 'en')}"/>`,
      ].join('\n')
      return `  <url>\n    <loc>${canonicalUrl(page, lang)}</loc>\n    <lastmod>${lastmod}</lastmod>\n${alternates}\n    <changefreq>weekly</changefreq>\n    <priority>${priorities[page]}</priority>\n  </url>`
    }),
  )
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.rel = 'canonical'
    document.head.appendChild(el)
  }
  el.href = href
}

export function applyHead(page: PageName, lang: Locale) {
  if (typeof document === 'undefined') return
  const meta = pageMeta(page, lang)
  const url = canonicalUrl(page, lang)
  const alt = imageAlt(lang)
  document.documentElement.lang = htmlLang(lang)
  document.title = meta.title
  upsertMeta('name', 'description', meta.description)
  upsertMeta('name', 'robots', 'index, follow, max-image-preview:large')
  upsertCanonical(url)
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove())
  for (const item of LOCALES) {
    const link = document.createElement('link')
    link.rel = 'alternate'
    link.hreflang = htmlLang(item)
    link.href = canonicalUrl(page, item)
    document.head.appendChild(link)
  }
  const fallback = document.createElement('link')
  fallback.rel = 'alternate'
  fallback.hreflang = 'x-default'
  fallback.href = canonicalUrl(page, 'en')
  document.head.appendChild(fallback)
  upsertMeta('property', 'og:type', 'website')
  upsertMeta('property', 'og:site_name', 'Saturn')
  upsertMeta('property', 'og:locale', ogLocale(lang))
  upsertMeta('property', 'og:locale:alternate', lang === 'zh' ? 'en_US' : 'zh_TW')
  upsertMeta('property', 'og:title', meta.title)
  upsertMeta('property', 'og:description', meta.description)
  upsertMeta('property', 'og:url', url)
  upsertMeta('property', 'og:image', OG_IMAGE)
  upsertMeta('property', 'og:image:width', '1200')
  upsertMeta('property', 'og:image:height', '630')
  upsertMeta('property', 'og:image:alt', alt)
  upsertMeta('name', 'twitter:card', 'summary_large_image')
  upsertMeta('name', 'twitter:title', meta.title)
  upsertMeta('name', 'twitter:description', meta.description)
  upsertMeta('name', 'twitter:image', OG_IMAGE)
  upsertMeta('name', 'twitter:image:alt', alt)
  jsonLdElement().textContent = JSON.stringify(jsonLd(page, lang)).replace(/</g, '\\u003c')
}

function jsonLdElement(): HTMLScriptElement {
  const existing = document.getElementById('seo-jsonld')
  if (existing instanceof HTMLScriptElement) return existing
  const created = document.createElement('script')
  created.id = 'seo-jsonld'
  created.type = 'application/ld+json'
  document.head.appendChild(created)
  return created
}
