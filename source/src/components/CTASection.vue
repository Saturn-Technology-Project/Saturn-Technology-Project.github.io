<script setup lang="ts">
import { ref } from 'vue'
import { useReveal } from '../composables/useReveal'
import { useI18n } from '../i18n'
import { CONTACT_EMAIL, DEMO_URL } from '../config'

const { t } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)
useReveal(sectionRef)
</script>

<template>
  <section id="cta" ref="sectionRef" class="cta">
    <div class="container">
      <h2 class="display reveal">{{ t.cta.title }}</h2>
      <p class="body reveal reveal-delay-1">
        {{ t.cta.body }}
      </p>
      <div class="actions reveal reveal-delay-2">
        <a :href="DEMO_URL" class="btn btn-primary" target="_blank" rel="noopener noreferrer">
          {{ t.nav.tryDemo }}
          <span aria-hidden="true">→</span>
        </a>
        <a :href="CONTACT_EMAIL" class="btn btn-outline">
          {{ t.cta.talk }}
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta {
  padding: var(--section-pad) 0;
  border-top: 1px solid var(--border);
  text-align: center;
}

h2 {
  font-size: clamp(2rem, 4.2vw, 3.25rem);
  margin-bottom: 1.25rem;
}

.body {
  font-size: 1.0625rem;
  color: var(--text-secondary);
  max-width: 28em;
  margin: 0 auto 2.25rem;
  line-height: 1.7;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}
</style>
