<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import SaturnLogo from './SaturnLogo.vue'
import { useI18n } from '../i18n'
import { DEMO_URL } from '../config'

const { locale, t, setLocale } = useI18n()
const route = useRoute()

const scrolled = ref(false)
const menuOpen = ref(false)
const isHome = computed(() => route.name === 'home')

function onScroll() {
  scrolled.value = window.scrollY > 24
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

watch(
  () => route.path,
  () => {
    menuOpen.value = false
    scrolled.value = window.scrollY > 24
  },
)

const links = computed(() => [
  { label: t.value.nav.product, to: '/product' },
  { label: t.value.nav.approach, to: '/approach' },
  { label: t.value.nav.developers, to: '/developers' },
])
</script>

<template>
  <header class="nav" :class="{ scrolled: scrolled || !isHome }">
    <div class="nav-inner">
      <RouterLink to="/" class="brand" :aria-label="t.nav.home">
        <SaturnLogo :size="22" show-wordmark />
      </RouterLink>

      <nav class="links" aria-label="Main navigation">
        <RouterLink v-for="link in links" :key="link.to" :to="link.to">
          {{ link.label }}
        </RouterLink>
      </nav>

      <div class="nav-end">
        <div class="lang" role="group" :aria-label="locale === 'en' ? 'Language' : '語言'">
          <button type="button" :class="{ active: locale === 'en' }" @click="setLocale('en')">
            EN
          </button>
          <span class="lang-sep" aria-hidden="true">/</span>
          <button type="button" :class="{ active: locale === 'zh' }" @click="setLocale('zh')">
            中文
          </button>
        </div>
        <a
          :href="DEMO_URL"
          class="btn btn-primary nav-cta"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ t.nav.tryDemo }}
        </a>
      </div>

      <button
        class="menu-toggle"
        :aria-expanded="menuOpen"
        :aria-label="t.nav.menu"
        @click="menuOpen = !menuOpen"
      >
        <span :class="{ open: menuOpen }" />
      </button>
    </div>

    <div v-if="menuOpen" class="mobile-menu">
      <RouterLink v-for="link in links" :key="link.to" :to="link.to">
        {{ link.label }}
      </RouterLink>
      <div class="mobile-lang">
        <button type="button" :class="{ active: locale === 'en' }" @click="setLocale('en')">EN</button>
        <span aria-hidden="true">/</span>
        <button type="button" :class="{ active: locale === 'zh' }" @click="setLocale('zh')">中文</button>
      </div>
      <a :href="DEMO_URL" target="_blank" rel="noopener noreferrer">
        {{ t.nav.tryDemo }}
      </a>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: background 0.35s, border-color 0.35s;
  border-bottom: 1px solid transparent;
}

.nav.scrolled {
  background: var(--bg-primary);
  border-bottom-color: var(--border);
}

.nav-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 clamp(1.5rem, 4vw, 2.5rem);
  height: var(--nav-height);
  display: flex;
  align-items: center;
  gap: 2.5rem;
}

.brand {
  flex-shrink: 0;
}

.links {
  display: flex;
  gap: 2rem;
}

.links a {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  transition: color 0.2s;
}

.links a:hover,
.links a.router-link-active {
  color: var(--text-primary);
}

.nav-end {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.lang {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  letter-spacing: 0.04em;
}

.lang button,
.mobile-lang button {
  color: var(--text-muted);
  transition: color 0.2s;
}

.lang button.active,
.mobile-lang button.active {
  color: var(--text-primary);
}

.lang button:hover,
.mobile-lang button:hover {
  color: var(--text-primary);
}

.lang-sep {
  color: var(--text-muted);
}

.nav-cta {
  padding: 0.5rem 0.95rem;
  font-size: 0.75rem;
}

.menu-toggle {
  display: none;
  width: 24px;
  height: 24px;
  position: relative;
  margin-left: auto;
}

.menu-toggle span,
.menu-toggle span::before,
.menu-toggle span::after {
  display: block;
  width: 16px;
  height: 1px;
  background: var(--text-primary);
  transition: transform 0.25s;
}

.menu-toggle span {
  position: relative;
}

.menu-toggle span::before,
.menu-toggle span::after {
  content: '';
  position: absolute;
  left: 0;
}

.menu-toggle span::before {
  top: -5px;
}

.menu-toggle span::after {
  top: 5px;
}

.menu-toggle span.open {
  background: transparent;
}

.menu-toggle span.open::before {
  transform: rotate(45deg) translate(3.5px, 3.5px);
}

.menu-toggle span.open::after {
  transform: rotate(-45deg) translate(3.5px, -3.5px);
}

.mobile-menu {
  display: none;
  flex-direction: column;
  padding: 0.5rem clamp(1.5rem, 4vw, 2.5rem) 1.5rem;
  border-bottom: 1px solid var(--border);
  background: var(--bg-primary);
}

.mobile-menu a,
.mobile-lang {
  font-size: 1rem;
  color: var(--text-secondary);
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--border);
}

.mobile-menu a.router-link-active {
  color: var(--text-primary);
}

.mobile-lang {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

@media (max-width: 768px) {
  .links,
  .nav-end {
    display: none;
  }

  .menu-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mobile-menu {
    display: flex;
  }
}
</style>
