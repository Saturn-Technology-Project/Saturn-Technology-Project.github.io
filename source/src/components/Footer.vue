<script setup lang="ts">
import { computed } from 'vue'
import Brand from './Brand.vue'
import { localePath, useI18n } from '../i18n'
import { CONSOLE_URL, GITHUB_URL } from '../config'

const { locale, t } = useI18n()

const links = computed(() => [
  { label: t.value.footer.mcp, to: localePath('/mcp', locale.value) },
  { label: t.value.footer.app, to: localePath('/app', locale.value) },
  { label: t.value.footer.pricing, to: localePath('/pricing', locale.value) },
])
</script>

<template>
  <footer class="site-footer">
    <div class="wrap">
      <div class="top">
        <div>
          <Brand />
          <p class="tagline">{{ t.footer.tagline }}</p>
        </div>
        <nav :aria-label="locale === 'zh' ? '頁尾' : 'Footer'">
          <RouterLink v-for="link in links" :key="link.to" :to="link.to">{{ link.label }}</RouterLink>
          <a :href="GITHUB_URL" target="_blank" rel="noopener noreferrer">{{ t.footer.github }}</a>
          <a :href="CONSOLE_URL" target="_blank" rel="noopener noreferrer">{{ t.footer.console }}</a>
          <a href="/sitemap.xml">{{ t.footer.sitemap }}</a>
        </nav>
      </div>
      <p class="legal">{{ t.footer.project }}</p>
    </div>
  </footer>
</template>
