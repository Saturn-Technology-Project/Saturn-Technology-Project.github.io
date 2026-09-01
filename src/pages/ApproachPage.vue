<script setup lang="ts">
import { ref } from 'vue'
import PageHero from '../components/PageHero.vue'
import FlowChain from '../components/FlowChain.vue'
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
        :eyebrow="t.approachPage.eyebrow"
        :heading="t.approachPage.heading"
        :lede="t.approachPage.lede"
      />

      <div class="layout reveal reveal-delay-1">
        <ol class="points">
          <li v-for="point in t.approachPage.points" :key="point.name">
            <h2>{{ point.name }}</h2>
            <p>{{ point.body }}</p>
          </li>
        </ol>
        <FlowChain :steps="[...t.workflow.flow]" :accent-index="1" />
      </div>
    </div>
    <CTASection />
  </article>
</template>

<style scoped>
.page {
  padding-top: calc(var(--nav-height) + 4rem);
}

.layout {
  display: grid;
  grid-template-columns: 1fr 220px;
  gap: 4rem;
  align-items: start;
}

.points {
  list-style: none;
  border-top: 1px solid var(--border);
}

.points li {
  padding: 1.75rem 0;
  border-bottom: 1px solid var(--border);
}

h2 {
  font-size: 1.0625rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
}

p {
  font-size: 0.9375rem;
  color: var(--text-secondary);
  line-height: 1.7;
  max-width: 36em;
}

@media (max-width: 768px) {
  .layout {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}
</style>
