import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import TurndownService from 'turndown'
import { gfm } from 'turndown-plugin-gfm'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
const template = readFileSync(resolve(dist, 'index.html'), 'utf8')
const serverPath = resolve(root, 'dist-ssr/entry-server.js')
const server = await import(pathToFileURL(serverPath).href)
const SITE_URL = 'https://saturn-core.com'
const built = new Date().toISOString().slice(0, 10)

if (!template.includes('<!--seo-->') || !template.includes('<!--app-html-->')) {
  throw new Error('index.html is missing <!--seo--> or <!--app-html--> markers')
}

// Markdown for language models: the page's <main>, without decoration, with absolute links.
const turndown = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced', bulletListMarker: '-' })
turndown.use(gfm)
turndown.remove((node) => node.nodeName === 'SVG' || node.nodeName === 'NAV' || node.nodeName === 'BUTTON' || node.getAttribute?.('aria-hidden') === 'true')
turndown.addRule('absoluteLinks', {
  filter: (node) => node.nodeName === 'A' && node.getAttribute('href'),
  replacement: (content, node) => {
    const text = content.trim()
    if (!text) return ''
    const href = node.getAttribute('href')
    if (href.startsWith('#')) return text
    return `[${text}](${new URL(href, SITE_URL).href})`
  },
})
turndown.addRule('absoluteImages', {
  filter: 'img',
  replacement: (_content, node) => {
    const alt = (node.getAttribute('alt') || '').trim()
    if (!alt) return ''
    return `![${alt}](${new URL(node.getAttribute('src'), SITE_URL).href})`
  },
})
// The site's code panels are <pre> with highlighted spans and no <code>: keep their text as a fenced block.
turndown.addRule('preformatted', {
  filter: (node) => node.nodeName === 'PRE',
  replacement: (_content, node) => `\n\n\`\`\`\n${node.textContent.replace(/\n+$/, '')}\n\`\`\`\n\n`,
})
// The whitepaper's status badges (Current, Fixed, Open, Planned) stay visibly separate from the sentence.
turndown.addRule('statusBadge', {
  filter: (node) => node.nodeName === 'SPAN' && /\bstatus-badge\b/.test(node.getAttribute('class') || ''),
  replacement: (content) => {
    const label = content.trim()
    return /^[【[]/.test(label) ? `**${label}**` : `**${label}:**`
  },
})
// Definition lists (FAQs, specs) become a bold term followed by its definition.
turndown.addRule('definitionTerm', { filter: 'dt', replacement: (content) => `\n\n**${content.trim()}**\n` })
turndown.addRule('definitionBody', { filter: 'dd', replacement: (content) => `\n${content.trim()}\n\n` })

function toMarkdown(html, url) {
  const main = html.match(/<main[^>]*>([\s\S]*)<\/main>/)
  if (!main) throw new Error(`Prerender for ${url} has no <main>`)
  const markdown = turndown
    .turndown(
      main[1]
        .replace(/<!--[\s\S]*?-->/g, '')
        // Inline pieces the layout sets apart (button labels, card lines, adjacent links) keep a space between them.
        .replace(/(<\/(?:span|strong|a)>)(?=<(?:span|strong|a)\b)/g, '$1 '),
    )
    .replace(/\n{3,}/g, '\n\n')
    .trim()
  if (!markdown.startsWith('# ') && !/\n# /.test(markdown)) throw new Error(`Markdown for ${url} has no title`)
  if (markdown.length < 500) throw new Error(`Markdown for ${url} is only ${markdown.length} characters`)
  if (/<[a-z][^>]*>/i.test(markdown.replace(/```[\s\S]*?```/g, ''))) throw new Error(`Markdown for ${url} still contains HTML`)
  // Saturn App ships often: the site links to the releases page and never names a version.
  const version = markdown.match(/\bv\d+\.\d+(\.\d+)?\b/)
  if (version) throw new Error(`Markdown for ${url} names a release version (${version[0]}); link to the releases page instead`)
  return markdown
}

function write(path, text) {
  const file = resolve(dist, `.${path}`)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, text)
}

/** The template with a rendered page and its head tags in place. */
function htmlDocument(html, head, lang) {
  return template
    .replace(/<!--seo-->[\s\S]*?<!--\/seo-->/, `<!--seo-->\n    ${head}\n    <!--/seo-->`)
    .replace('<html lang="en">', `<html lang="${lang === 'zh' ? 'zh-Hant' : 'en'}">`)
    .replace('<!--app-html-->', html)
}

const documents = []

for (const url of server.prerenderPaths()) {
  const { html, head, lang, page } = await server.render(url)
  if (!html.includes('<h1')) throw new Error(`Prerender for ${url} did not include an h1`)
  // /mcp is written to mcp.html, not mcp/index.html, so Cloudflare Pages serves it at /mcp instead of redirecting to /mcp/.
  write(url === '/' ? '/index.html' : `${url}.html`, htmlDocument(html, head, lang))

  const markdown = `${server.documentHeader(page, lang, built)}\n\n${toMarkdown(html, url)}\n`
  write(server.markdownPath(page, lang), markdown)
  documents.push({ page, lang, markdown })
}

// The 404 pages. Cloudflare Pages serves the nearest 404.html, with status 404, for any path that has no file,
// so /zh/anything gets the Chinese one. They have no Markdown copy and are not in the sitemap.
for (const [url, path] of [['/404', '/404.html'], ['/zh/404', '/zh/404.html']]) {
  const { html, head, lang, page } = await server.render(url)
  if (page !== null || !html.includes('<h1')) throw new Error(`Prerender for ${url} is not the 404 page`)
  write(path, htmlDocument(html, head, lang))
}

write('/sitemap.xml', server.sitemapXml())
write('/llms.txt', server.llmsIndex())
write('/llms-full.txt', server.llmsFull(documents, built))
