<script setup lang="ts">
import { ref } from 'vue'
import PageHero from '../components/PageHero.vue'
import CTASection from '../components/CTASection.vue'
import { useReveal } from '../composables/useReveal'
import { useI18n } from '../i18n'
import { DEMO_URL } from '../config'

const { t } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)
useReveal(sectionRef)
</script>

<template>
  <article class="page">
    <div ref="sectionRef" class="container">
      <PageHero
        class="reveal"
        :eyebrow="t.developersPage.eyebrow"
        :heading="t.developersPage.heading"
        :lede="t.developersPage.lede"
      />

      <div class="actions reveal reveal-delay-1">
        <a
          href="https://github.com"
          class="btn btn-outline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ t.developersPage.github }}
        </a>
        <a :href="DEMO_URL" class="btn btn-primary" target="_blank" rel="noopener noreferrer">
          {{ t.nav.tryDemo }}
        </a>
      </div>

      <ul class="cards reveal reveal-delay-2">
        <li v-for="card in t.developersPage.cards" :key="card.name">
          <h2>{{ card.name }}</h2>
          <p>{{ card.body }}</p>
        </li>
      </ul>
    </div>
    <CTASection />
  </article>
</template>

<style scoped>
.page {
  padding-top: calc(var(--nav-height) + 4rem);
}

.actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: clamp(3.5rem, 7vw, 5rem);
}

.cards {
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-top: 1px solid var(--border);
}

.cards li {
  padding: 2rem 2rem 2rem 0;
  border-bottom: 1px solid var(--border);
  border-right: 1px solid var(--border);
}

.cards li:nth-child(even) {
  padding-right: 0;
  padding-left: 2rem;
  border-right: none;
}

h2 {
  font-family: var(--mono);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 0.85rem;
}

p {
  font-size: 0.9375rem;
  color: var(--text-secondary);
  line-height: 1.7;
  max-width: 36em;
}

@media (max-width: 640px) {
  .cards {
    grid-template-columns: 1fr;
  }

  .cards li,
  .cards li:nth-child(even) {
    border-right: none;
    padding: 1.75rem 0;
  }
}
</style>
