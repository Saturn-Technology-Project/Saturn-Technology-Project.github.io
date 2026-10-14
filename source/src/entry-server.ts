import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import App from './App.vue'
import { locale, type Locale, type PageName } from './i18n'
import { createAppRouter } from './router'
import { headTags } from './seo'

export { prerenderPaths, sitemapXml } from './seo'

function localeFromUrl(url: string): Locale {
  const path = url.split('?')[0] ?? '/'
  return path === '/zh' || path.startsWith('/zh/') ? 'zh' : 'en'
}

export async function render(url: string) {
  const lang = localeFromUrl(url)
  locale.value = lang
  const appRouter = createAppRouter()
  const app = createSSRApp(App)
  app.use(appRouter)
  await appRouter.push(url)
  await appRouter.isReady()
  const html = await renderToString(app)
  const page = appRouter.currentRoute.value.meta.page
  const current: PageName =
    page === 'mcp' ||
    page === 'app' ||
    page === 'pricing' ||
    page === 'demo' ||
    page === 'terms' ||
    page === 'privacy' ||
    page === 'home'
      ? page
      : 'home'
  return { html, head: headTags(current, lang), lang }
}
