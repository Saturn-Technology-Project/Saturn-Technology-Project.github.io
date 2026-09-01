<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import { locale, pageMeta, type PageName } from './i18n'

const route = useRoute()

const page = computed<PageName>(() => {
  const name = route.name
  if (name === 'product' || name === 'approach' || name === 'developers') return name
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
  <div class="noise" aria-hidden="true" />
  <NavBar />
  <main>
    <RouterView />
  </main>
  <Footer />
</template>
