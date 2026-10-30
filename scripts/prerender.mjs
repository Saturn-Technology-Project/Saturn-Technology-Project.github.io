import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
const template = readFileSync(resolve(dist, 'index.html'), 'utf8')
const serverPath = resolve(root, 'dist-ssr/entry-server.js')
const server = await import(pathToFileURL(serverPath).href)

if (!template.includes('<!--seo-->') || !template.includes('<!--app-html-->')) {
  throw new Error('index.html is missing <!--seo--> or <!--app-html--> markers')
}

for (const url of server.prerenderPaths()) {
  const { html, head, lang } = await server.render(url)
  if (!html.includes('<h1')) throw new Error(`Prerender for ${url} did not include an h1`)
  const page = template
    .replace(/<!--seo-->[\s\S]*?<!--\/seo-->/, `<!--seo-->\n    ${head}\n    <!--/seo-->`)
    .replace('<html lang="en">', `<html lang="${lang === 'zh' ? 'zh-Hant' : 'en'}">`)
    .replace('<!--app-html-->', html)
  const file = url === '/' ? resolve(dist, 'index.html') : resolve(dist, `.${url}`, 'index.html')
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, page)
}

writeFileSync(resolve(dist, 'sitemap.xml'), server.sitemapXml())
