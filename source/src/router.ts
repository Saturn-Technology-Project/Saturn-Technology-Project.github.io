import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import McpPage from './pages/McpPage.vue'
import AppPage from './pages/AppPage.vue'
import PricingPage from './pages/PricingPage.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/mcp', name: 'mcp', component: McpPage },
    { path: '/app', name: 'app', component: AppPage },
    { path: '/pricing', name: 'pricing', component: PricingPage },
    { path: '/platform', redirect: '/mcp' },
    { path: '/security', redirect: '/mcp' },
    { path: '/product', redirect: '/mcp' },
    { path: '/cloud', redirect: '/mcp' },
    { path: '/approach', redirect: '/mcp' },
    { path: '/developers', redirect: '/app' },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})
