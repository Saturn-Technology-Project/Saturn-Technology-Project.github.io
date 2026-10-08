<script setup lang="ts">
import { useI18n } from '../i18n'

const { t } = useI18n()
</script>

<template>
  <RouterLink to="/" class="brand" :aria-label="t.nav.home">
    <img src="/favicon.png" alt="" aria-hidden="true" />
    <span class="wordmark">Saturn</span>
  </RouterLink>
</template>
