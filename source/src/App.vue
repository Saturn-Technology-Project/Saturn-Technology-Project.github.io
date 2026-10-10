<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import { locale, pageMeta, type PageName } from './i18n'

const route = useRoute()

const page = computed<PageName>(() => {
  const name = route.name
  if (name === 'mcp' || name === 'app' || name === 'pricing' || name === 'demo') return name
  return 'home'
})

watch(
  [locale, page],
  () => {
    const meta = pageMeta(page.value)
    document.title = meta.title
    const el = document.querySelector('meta[name="description"]')
    if (el) el.setAttribute('content', meta.description)
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
