import type { Component } from 'vue'
import { createMemoryHistory, createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import McpPage from './pages/McpPage.vue'
import AppPage from './pages/AppPage.vue'
import TrustPage from './pages/TrustPage.vue'
import PricingPage from './pages/PricingPage.vue'
import DemoPage from './pages/DemoPage.vue'
import LegalPage from './pages/LegalPage.vue'
import { locale, type Locale, type PageName } from './i18n'

declare module 'vue-router' {
  interface RouteMeta {
    locale?: Locale
    page?: PageName
  }
}

const pages: { path: string; page: PageName; component: Component }[] = [
  { path: '/', page: 'home', component: HomePage },
  { path: '/mcp', page: 'mcp', component: McpPage },
  { path: '/app', page: 'app', component: AppPage },
  { path: '/trust', page: 'trust', component: TrustPage },
  { path: '/pricing', page: 'pricing', component: PricingPage },
  { path: '/demo', page: 'demo', component: DemoPage },
  { path: '/terms', page: 'terms', component: LegalPage },
  { path: '/privacy', page: 'privacy', component: LegalPage },
]

function localized(lang: Locale): RouteRecordRaw[] {
  return pages.map(
    (page): RouteRecordRaw => ({
      path: lang === 'zh' ? (page.path === '/' ? '/zh' : `/zh${page.path}`) : page.path,
      name: lang === 'en' ? page.page : `${lang}-${page.page}`,
      component: page.component,
      meta: { locale: lang, page: page.page },
    }),
  )
}

export const routes: RouteRecordRaw[] = [
  ...localized('en'),
  ...localized('zh'),
  { path: '/platform', redirect: '/mcp' },
  { path: '/security', redirect: '/trust' },
  { path: '/zh/security', redirect: '/zh/trust' },
  { path: '/product', redirect: '/mcp' },
  { path: '/cloud', redirect: '/mcp' },
  { path: '/approach', redirect: '/mcp' },
  { path: '/developers', redirect: '/app' },
]

export function createAppRouter() {
  const history = import.meta.env.SSR ? createMemoryHistory() : createWebHistory(import.meta.env.BASE_URL)
  const router = createRouter({
    history,
    routes,
    scrollBehavior(to) {
      if (to.hash) return { el: to.hash, top: 88 }
      return { top: 0 }
    },
  })

  router.beforeEach((to) => {
    const next = to.meta.locale === 'zh' ? 'zh' : 'en'
    if (locale.value !== next) locale.value = next
  })

  return router
}

export const router = createAppRouter()
