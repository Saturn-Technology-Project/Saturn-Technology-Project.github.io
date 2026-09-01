<script setup lang="ts">
defineProps<{
  eyebrow: string
  heading: string
  lede: string
}>()
</script>

<template>
  <header class="page-hero">
    <p class="section-label">{{ eyebrow }}</p>
    <h1 class="display">{{ heading }}</h1>
    <p class="lede">{{ lede }}</p>
  </header>
</template>

<style scoped>
.page-hero {
  max-width: 40rem;
  margin-bottom: clamp(3.5rem, 7vw, 5rem);
}

h1 {
  font-size: clamp(2.25rem, 4.5vw, 3.5rem);
  margin-bottom: 1.25rem;
}

.lede {
  font-size: 1.0625rem;
  color: var(--text-secondary);
  line-height: 1.7;
}
</style>
