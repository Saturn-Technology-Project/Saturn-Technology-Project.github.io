<script setup lang="ts">
import { computed } from 'vue'
import { localePath, useI18n } from '../i18n'

const { locale, t } = useI18n()

const links = computed(() => [
  { to: '/mcp', name: t.value.nav.mcp, desc: t.value.notFound.links.mcp },
  { to: '/app', name: t.value.nav.app, desc: t.value.notFound.links.app },
  { to: '/trust', name: t.value.nav.trust, desc: t.value.notFound.links.trust },
  { to: '/pricing', name: t.value.nav.pricing, desc: t.value.notFound.links.pricing },
])
</script>

<template>
  <section class="hero not-found">
    <div class="wrap">
      <p class="eyebrow accent">{{ t.notFound.eyebrow }}</p>
      <h1>{{ t.notFound.heading }}</h1>
      <p class="lede">{{ t.notFound.lede }}</p>
      <div class="actions">
        <RouterLink class="btn btn-primary btn-lg" :to="localePath('/', locale)">{{ t.notFound.home }}</RouterLink>
      </div>
      <ul class="not-found-links">
        <li v-for="link in links" :key="link.to">
          <RouterLink :to="localePath(link.to, locale)">
            <strong>{{ link.name }}</strong>
            <span>{{ link.desc }}</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </section>
</template>
