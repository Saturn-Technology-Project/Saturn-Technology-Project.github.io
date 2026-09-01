<script setup lang="ts">
defineProps<{
  showWordmark?: boolean
  size?: number
  accent?: boolean
}>()
</script>

<template>
  <div class="logo" :style="{ gap: `${(size ?? 32) * 0.4}px` }">
    <svg
      :width="size ?? 32"
      :height="size ?? 32"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="16"
        cy="16"
        r="5"
        stroke="currentColor"
        stroke-width="1.25"
        fill="none"
      />
      <ellipse
        cx="16"
        cy="16"
        rx="11"
        ry="4"
        :stroke="accent ? 'var(--accent)' : 'currentColor'"
        stroke-width="1.25"
        fill="none"
        transform="rotate(-20 16 16)"
      />
    </svg>
    <span v-if="showWordmark" class="wordmark">SATURN</span>
  </div>
</template>

<style scoped>
.logo {
  display: inline-flex;
  align-items: center;
  color: var(--text-primary);
}

.wordmark {
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: 0.14em;
}
</style>
