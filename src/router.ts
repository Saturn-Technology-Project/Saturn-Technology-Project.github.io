import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import ProductPage from './pages/ProductPage.vue'
import ApproachPage from './pages/ApproachPage.vue'
import DevelopersPage from './pages/DevelopersPage.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/product', name: 'product', component: ProductPage },
    { path: '/approach', name: 'approach', component: ApproachPage },
    { path: '/developers', name: 'developers', component: DevelopersPage },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})
