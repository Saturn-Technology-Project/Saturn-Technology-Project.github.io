<script setup lang="ts">
import { useI18n } from '../i18n'

const { locale, t } = useI18n()
</script>

<template>
  <figure class="app-shot">
    <img
      :src="`/screens/app-experiments-${locale}.jpg`"
      :alt="t.appPage.shot.alt"
      width="2000"
      height="1272"
      loading="lazy"
      decoding="async"
    />
    <figcaption>{{ t.appPage.shot.caption }}</figcaption>
  </figure>
</template>
