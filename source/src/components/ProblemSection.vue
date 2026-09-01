<script setup lang="ts">
import { ref } from 'vue'
import FlowChain from './FlowChain.vue'
import { useReveal } from '../composables/useReveal'
import { useI18n } from '../i18n'

const { t } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)
useReveal(sectionRef)
</script>

<template>
  <section ref="sectionRef" class="problem">
    <div class="container">
      <div class="layout">
        <div class="copy">
          <h2 class="display reveal">
            {{ t.problem.title[0] }}<br />
            {{ t.problem.title[1] }}
          </h2>
          <p class="body reveal reveal-delay-1">
            {{ t.problem.body }}
          </p>
        </div>
        <div class="visual reveal reveal-delay-2">
          <FlowChain :steps="[...t.problem.flow]" :accent-index="2" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.problem {
  padding: var(--section-pad) 0;
  border-top: 1px solid var(--border);
}

.layout {
  display: grid;
  grid-template-columns: 1fr 180px;
  gap: 4rem;
  align-items: center;
}

h2 {
  font-size: clamp(2rem, 4.2vw, 3.25rem);
  margin-bottom: 1.5rem;
  max-width: 18em;
}

.body {
  font-size: 1.0625rem;
  color: var(--text-secondary);
  line-height: 1.7;
  max-width: 36em;
}

@media (max-width: 768px) {
  .layout {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .visual {
    justify-self: start;
  }
}
</style>
