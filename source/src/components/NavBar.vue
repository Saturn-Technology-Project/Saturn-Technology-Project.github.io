<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Brand from './Brand.vue'
import { localePath, useI18n } from '../i18n'
import { CONSOLE_URL } from '../config'

const { locale, t } = useI18n()
const route = useRoute()
const menuOpen = ref(false)
const langMenu = ref<'bar' | 'tools' | null>(null)

watch(
  () => route.path,
  () => {
    menuOpen.value = false
    langMenu.value = null
  },
)

function closeLang() {
  langMenu.value = null
}

function toggleLang(which: 'bar' | 'tools') {
  langMenu.value = langMenu.value === which ? null : which
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') langMenu.value = null
}

onMounted(() => {
  document.addEventListener('click', closeLang)
  document.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', closeLang)
  document.removeEventListener('keydown', onKeydown)
})

const links = computed(() => [
  { label: t.value.nav.mcp, to: localePath('/mcp', locale.value) },
  { label: t.value.nav.app, to: localePath('/app', locale.value) },
  { label: t.value.nav.pricing, to: localePath('/pricing', locale.value) },
])
const demoTo = computed(() => localePath('/demo', locale.value))
const enTo = computed(() => localePath(route.path, 'en'))
const zhTo = computed(() => localePath(route.path, 'zh'))
</script>

<template>
  <header class="site-header">
    <div class="wrap bar">
      <Brand />

      <nav class="nav-links" :aria-label="locale === 'zh' ? '主要' : 'Main'">
        <RouterLink v-for="link in links" :key="link.to" :to="link.to" :aria-current="route.path === link.to ? 'page' : undefined">{{ link.label }}</RouterLink>
      </nav>

      <div class="nav-end">
        <RouterLink class="btn btn-outline btn-sm" :to="demoTo">{{ t.nav.demo }}</RouterLink>
        <a class="btn btn-primary btn-sm" :href="CONSOLE_URL">{{ t.nav.start }}</a>
        <div class="lang" @click.stop>
          <button
            class="lang-btn"
            type="button"
            :aria-expanded="langMenu === 'bar'"
            aria-haspopup="menu"
            :aria-label="locale === 'en' ? 'Language' : '語言'"
            @click="toggleLang('bar')"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18" />
              <path d="M12 3a14 14 0 0 1 4 9 14 14 0 0 1-4 9 14 14 0 0 1-4-9 14 14 0 0 1 4-9z" />
            </svg>
          </button>
          <div v-if="langMenu === 'bar'" class="lang-menu" role="menu" :aria-label="locale === 'en' ? 'Language' : '語言'">
            <RouterLink role="menuitem" :to="enTo" hreflang="en" lang="en" :class="{ active: locale === 'en' }" :aria-current="locale === 'en' ? 'true' : undefined" @click="langMenu = null">
              English(US)
            </RouterLink>
            <RouterLink role="menuitem" :to="zhTo" hreflang="zh-Hant" lang="zh-Hant" :class="{ active: locale === 'zh' }" :aria-current="locale === 'zh' ? 'true' : undefined" @click="langMenu = null">
              繁體中文
            </RouterLink>
          </div>
        </div>
      </div>

      <div class="mobile-tools">
        <div class="lang" @click.stop>
          <button
            class="lang-btn"
            type="button"
            :aria-expanded="langMenu === 'tools'"
            aria-haspopup="menu"
            :aria-label="locale === 'en' ? 'Language' : '語言'"
            @click="toggleLang('tools')"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18" />
              <path d="M12 3a14 14 0 0 1 4 9 14 14 0 0 1-4 9 14 14 0 0 1-4-9 14 14 0 0 1 4-9z" />
            </svg>
          </button>
          <div v-if="langMenu === 'tools'" class="lang-menu" role="menu" :aria-label="locale === 'en' ? 'Language' : '語言'">
            <RouterLink role="menuitem" :to="enTo" hreflang="en" lang="en" :class="{ active: locale === 'en' }" :aria-current="locale === 'en' ? 'true' : undefined" @click="langMenu = null">
              English(US)
            </RouterLink>
            <RouterLink role="menuitem" :to="zhTo" hreflang="zh-Hant" lang="zh-Hant" :class="{ active: locale === 'zh' }" :aria-current="locale === 'zh' ? 'true' : undefined" @click="langMenu = null">
              繁體中文
            </RouterLink>
          </div>
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
    </div>

    <div v-if="menuOpen" class="mobile-menu wrap">
      <RouterLink v-for="link in links" :key="link.to" :to="link.to" :aria-current="route.path === link.to ? 'page' : undefined">{{ link.label }}</RouterLink>
      <a :href="CONSOLE_URL">{{ t.nav.start }}</a>
      <RouterLink :to="demoTo">{{ t.nav.demo }}</RouterLink>
    </div>
  </header>
</template>
