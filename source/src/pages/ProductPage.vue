<script setup lang="ts">
import { ref } from 'vue'
import PageHero from '../components/PageHero.vue'
import ArchitectureDiagram from '../components/ArchitectureDiagram.vue'
import CTASection from '../components/CTASection.vue'
import { useReveal } from '../composables/useReveal'
import { useI18n } from '../i18n'

const { t } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)
useReveal(sectionRef)
</script>

<template>
  <article class="page">
    <div ref="sectionRef" class="container">
      <PageHero
        class="reveal"
        :eyebrow="t.productPage.eyebrow"
        :heading="t.productPage.heading"
        :lede="t.productPage.lede"
      />
      <ArchitectureDiagram class="reveal reveal-delay-1" />
      <ul class="pillars reveal reveal-delay-2">
        <li v-for="pillar in t.productPage.pillars" :key="pillar.name">
          <h2>{{ pillar.name }}</h2>
          <p>{{ pillar.body }}</p>
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

.pillars {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  margin-top: clamp(4rem, 8vw, 5.5rem);
  border-top: 1px solid var(--border);
}

.pillars li {
  padding: 2rem 2rem 0 0;
  border-right: 1px solid var(--border);
}

.pillars li:last-child {
  border-right: none;
  padding-right: 0;
  padding-left: 2rem;
}

.pillars li:first-child {
  padding-left: 0;
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
}

@media (max-width: 768px) {
  .pillars {
    grid-template-columns: 1fr;
  }

  .pillars li,
  .pillars li:last-child {
    border-right: none;
    border-bottom: 1px solid var(--border);
    padding: 1.75rem 0 !important;
  }
}
</style>
