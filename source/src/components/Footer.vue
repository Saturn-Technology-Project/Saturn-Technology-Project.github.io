<script setup lang="ts">
import { computed } from 'vue'
import Brand from './Brand.vue'
import { localePath, useI18n } from '../i18n'

const { locale, t } = useI18n()
const year = new Date().getFullYear()

const columns = computed(() => [
  {
    heading: t.value.footer.product,
    links: [
      { label: t.value.footer.mcp, to: localePath('/mcp', locale.value) },
      { label: t.value.footer.app, to: localePath('/app', locale.value) },
      { label: t.value.footer.pricing, to: localePath('/pricing', locale.value) },
    ],
  },
  {
    heading: t.value.footer.legal,
    links: [
      { label: t.value.footer.privacy, to: localePath('/privacy', locale.value) },
      { label: t.value.footer.terms, to: localePath('/terms', locale.value) },
    ],
  },
])
</script>

<template>
  <footer class="site-footer">
    <div class="wrap">
      <div class="footer-main">
        <div class="footer-brand">
          <Brand />
          <p class="tagline">{{ t.footer.tagline }}</p>
        </div>
        <nav v-for="column in columns" :key="column.heading" :aria-label="column.heading">
          <p class="footer-heading">{{ column.heading }}</p>
          <RouterLink v-for="link in column.links" :key="link.to" :to="link.to">{{ link.label }}</RouterLink>
        </nav>
      </div>
      <p class="legal">© {{ year }} {{ t.footer.project }}</p>
    </div>
  </footer>
</template>
