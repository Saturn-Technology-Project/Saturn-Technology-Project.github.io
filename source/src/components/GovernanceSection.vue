<script setup lang="ts">
import { ref } from 'vue'
import { useReveal } from '../composables/useReveal'
import { useI18n } from '../i18n'

const { t } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)
useReveal(sectionRef)
</script>

<template>
  <section ref="sectionRef" class="governance">
    <div class="container">
      <h2 class="display reveal">{{ t.governance.title }}</h2>
      <p class="lede reveal reveal-delay-1">
        {{ t.governance.lede }}
      </p>

      <ul class="keywords reveal reveal-delay-2">
        <li v-for="item in t.governance.items" :key="item">{{ item }}</li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.governance {
  padding: var(--section-pad) 0;
  background: var(--bg-secondary);
  border-top: 1px solid var(--border);
  text-align: center;
}

h2 {
  font-size: clamp(2rem, 4.2vw, 3.25rem);
  margin-bottom: 1.25rem;
}

.lede {
  font-size: 1.0625rem;
  color: var(--text-secondary);
  margin-bottom: 3.5rem;
}

.keywords {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  max-width: 800px;
  margin: 0 auto;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.keywords li {
  font-family: var(--mono);
  font-size: 0.8125rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-primary);
  padding: 1.5rem 0.75rem;
  border-right: 1px solid var(--border);
}

.keywords li:last-child {
  border-right: none;
}

:global(html[lang='zh-Hant']) .keywords li {
  letter-spacing: 0.04em;
  text-transform: none;
}

@media (max-width: 640px) {
  .keywords {
    grid-template-columns: 1fr 1fr;
  }

  .keywords li:nth-child(2) {
    border-right: none;
  }

  .keywords li:nth-child(-n + 2) {
    border-bottom: 1px solid var(--border);
  }
}
</style>
