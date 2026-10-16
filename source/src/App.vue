<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import { locale, type PageName } from './i18n'
import { applyHead } from './seo'

const route = useRoute()

const page = computed<PageName>(() => {
  const name = route.meta.page
  if (
    name === 'mcp' ||
    name === 'app' ||
    name === 'trust' ||
    name === 'pricing' ||
    name === 'demo' ||
    name === 'terms' ||
    name === 'privacy' ||
    name === 'home'
  )
    return name
  return 'home'
})

watch(
  [locale, page],
  () => {
    applyHead(page.value, locale.value)
  },
  { immediate: true },
)
</script>

<template>
  <NavBar />
  <main>
    <RouterView />
  </main>
  <Footer />
</template>
