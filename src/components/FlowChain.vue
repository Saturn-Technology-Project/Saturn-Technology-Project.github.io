<script setup lang="ts">
defineProps<{
  steps: string[]
  accentIndex?: number
}>()
</script>

<template>
  <ol class="chain" aria-label="Process">
    <li v-for="(step, i) in steps" :key="step" class="node" :class="{ accent: i === accentIndex }">
      <span class="label">{{ step }}</span>
      <span v-if="i < steps.length - 1" class="connector" aria-hidden="true" />
    </li>
  </ol>
</template>

<style scoped>
.chain {
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
}

.node {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.label {
  font-family: var(--mono);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-secondary);
  padding: 0.5rem 0.85rem;
  border: 1px solid var(--border);
  background: var(--bg-surface);
  border-radius: var(--radius);
}

:global(html[lang='zh-Hant']) .label {
  letter-spacing: 0.04em;
  text-transform: none;
}

.node.accent .label {
  color: var(--text-primary);
  border-color: var(--border-strong);
}

.connector {
  width: 1px;
  height: 28px;
  background: var(--border-strong);
  position: relative;
  overflow: hidden;
}

.connector::after {
  content: '';
  position: absolute;
  left: 0;
  top: -100%;
  width: 100%;
  height: 100%;
  background: var(--accent);
  animation: flow 2.8s ease-in-out infinite;
}

@keyframes flow {
  0% {
    top: -100%;
    opacity: 0;
  }
  30% {
    opacity: 0.85;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .connector::after {
    animation: none;
    opacity: 0;
  }
}
</style>
