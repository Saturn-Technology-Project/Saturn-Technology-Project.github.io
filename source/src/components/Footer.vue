<script setup lang="ts">
import { computed } from 'vue'
import Brand from './Brand.vue'
import { useI18n } from '../i18n'
import { CONSOLE_URL, GITHUB_URL } from '../config'

const { t } = useI18n()

const links = computed(() => [
  { label: t.value.footer.mcp, to: '/mcp' },
  { label: t.value.footer.app, to: '/app' },
  { label: t.value.footer.pricing, to: '/pricing' },
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
        <nav aria-label="Footer">
          <RouterLink v-for="link in links" :key="link.to" :to="link.to">{{ link.label }}</RouterLink>
          <a :href="GITHUB_URL" target="_blank" rel="noopener noreferrer">{{ t.footer.github }}</a>
          <a :href="CONSOLE_URL" target="_blank" rel="noopener noreferrer">{{ t.footer.console }}</a>
        </nav>
      </div>
      <p class="legal">{{ t.footer.project }}</p>
    </div>
  </footer>
</template>
