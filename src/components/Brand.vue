<script setup lang="ts">
import { localePath, useI18n } from '../i18n'

const { locale, t } = useI18n()
</script>

<template>
  <RouterLink :to="localePath('/', locale)" class="brand" :aria-label="t.nav.home">
    <img src="/favicon.png" alt="" width="24" height="24" aria-hidden="true" />
    <span class="wordmark">Saturn</span>
  </RouterLink>
</template>
