<script setup lang="ts">
import { ref } from 'vue'
import FlowChain from './FlowChain.vue'
import { useReveal } from '../composables/useReveal'
import { useI18n } from '../i18n'
import { DEMO_URL } from '../config'

const { t } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)
useReveal(sectionRef)
</script>

<template>
  <section ref="sectionRef" class="hero">
    <div class="hero-inner">
      <p class="eyebrow reveal">{{ t.hero.eyebrow }}</p>

      <h1 class="display reveal reveal-delay-1">
        {{ t.hero.title[0] }}<br />
        {{ t.hero.title[1] }}
      </h1>

      <p class="hero-desc reveal reveal-delay-2">
        {{ t.hero.desc }}
      </p>

      <div class="hero-actions reveal reveal-delay-3">
        <a :href="DEMO_URL" class="btn btn-primary" target="_blank" rel="noopener noreferrer">
          {{ t.nav.tryDemo }}
        </a>
        <a href="#cta" class="btn btn-outline">{{ t.hero.contact }}</a>
      </div>

      <div class="hero-flow reveal reveal-delay-3">
        <FlowChain :steps="[...t.hero.flow]" :accent-index="1" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: calc(var(--nav-height) + 2rem) 1.5rem 4rem;
}

.hero-inner {
  width: 100%;
  max-width: 720px;
  text-align: center;
}

.eyebrow {
  font-family: var(--mono);
  font-size: 0.6875rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 1.75rem;
}

h1 {
  font-size: clamp(2.75rem, 7vw, 4.75rem);
  margin-bottom: 1.5rem;
}

.hero-desc {
  font-size: 1.0625rem;
  color: var(--text-secondary);
  line-height: 1.7;
  max-width: 440px;
  margin: 0 auto 2.25rem;
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 4rem;
}

.hero-flow {
  opacity: 0.85;
}
</style>
