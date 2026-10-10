<script setup lang="ts">
import { computed } from 'vue'
import { localePath, useI18n } from '../i18n'

defineProps<{ current: string }>()

const { locale } = useI18n()
const home = computed(() => localePath('/', locale.value))
</script>

<template>
  <nav class="crumbs" :aria-label="locale === 'zh' ? '導覽路徑' : 'Breadcrumb'">
    <ol>
      <li><RouterLink :to="home">Saturn</RouterLink></li>
      <li aria-current="page">{{ current }}</li>
    </ol>
  </nav>
</template>
