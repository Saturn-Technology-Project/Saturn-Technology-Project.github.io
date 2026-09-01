<script setup lang="ts">
import { computed } from 'vue'
import SaturnLogo from './SaturnLogo.vue'
import { useI18n } from '../i18n'

const { t } = useI18n()

const internal = computed(() => [
  { label: t.value.footer.product, to: '/product' },
  { label: t.value.footer.approach, to: '/approach' },
  { label: t.value.footer.developers, to: '/developers' },
])

const external = [
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'X', href: 'https://x.com' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com' },
]
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-top">
        <div class="brand-block">
          <RouterLink to="/">
            <SaturnLogo :size="20" show-wordmark />
          </RouterLink>
          <p class="tagline">{{ t.footer.tagline }}</p>
        </div>

        <nav class="footer-links" aria-label="Footer navigation">
          <RouterLink v-for="link in internal" :key="link.to" :to="link.to">
            {{ link.label }}
          </RouterLink>
          <a
            v-for="link in external"
            :key="link.href"
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ link.label }}
          </a>
        </nav>
      </div>

      <div class="footer-bottom">
        <p>Saturn Technology</p>
        <p>{{ t.footer.project }}</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 3rem 0 2.25rem;
  border-top: 1px solid var(--border);
}

.footer-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 3rem;
}

.tagline {
  margin-top: 0.85rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
  max-width: 22em;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.footer-links a {
  font-size: 0.8125rem;
  color: var(--text-muted);
  transition: color 0.2s;
}

.footer-links a:hover {
  color: var(--text-primary);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border);
}

.footer-bottom p {
  font-family: var(--mono);
  font-size: 0.6875rem;
  letter-spacing: 0.06em;
  color: var(--text-muted);
}

@media (max-width: 640px) {
  .footer-top {
    flex-direction: column;
  }

  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.4rem;
  }
}
</style>
