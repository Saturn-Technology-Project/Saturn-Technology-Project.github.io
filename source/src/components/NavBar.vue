<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Brand from './Brand.vue'
import { useI18n } from '../i18n'
import { CONSOLE_URL, CONTACT_EMAIL } from '../config'

const { locale, t, setLocale } = useI18n()
const route = useRoute()
const menuOpen = ref(false)

watch(
  () => route.path,
  () => {
    menuOpen.value = false
  },
)

const links = computed(() => [
  { label: t.value.nav.mcp, to: '/mcp' },
  { label: t.value.nav.app, to: '/app' },
  { label: t.value.nav.pricing, to: '/pricing' },
])
</script>

<template>
  <header class="site-header">
    <div class="wrap bar">
      <Brand />

      <nav class="nav-links" aria-label="Main">
        <RouterLink v-for="link in links" :key="link.to" :to="link.to">{{ link.label }}</RouterLink>
      </nav>

      <div class="nav-end">
        <div class="lang" role="group" :aria-label="locale === 'en' ? 'Language' : '語言'">
          <button type="button" :class="{ active: locale === 'en' }" @click="setLocale('en')">EN</button>
          <span aria-hidden="true">/</span>
          <button type="button" :class="{ active: locale === 'zh' }" @click="setLocale('zh')">中文</button>
        </div>
        <a class="btn btn-outline btn-sm" :href="CONTACT_EMAIL">{{ t.nav.demo }}</a>
        <a class="btn btn-primary btn-sm" :href="CONSOLE_URL" target="_blank" rel="noopener noreferrer">{{ t.nav.start }}</a>
      </div>

      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="menuOpen"
        :aria-label="t.nav.menu"
        @click="menuOpen = !menuOpen"
      >
        <span />
      </button>
    </div>

    <div v-if="menuOpen" class="mobile-menu wrap">
      <RouterLink v-for="link in links" :key="link.to" :to="link.to">{{ link.label }}</RouterLink>
      <a :href="CONSOLE_URL" target="_blank" rel="noopener noreferrer">{{ t.nav.start }}</a>
      <a :href="CONTACT_EMAIL">{{ t.nav.demo }}</a>
      <div class="lang">
        <button type="button" :class="{ active: locale === 'en' }" @click="setLocale('en')">EN</button>
        <span aria-hidden="true">/</span>
        <button type="button" :class="{ active: locale === 'zh' }" @click="setLocale('zh')">中文</button>
      </div>
    </div>
  </header>
</template>
