<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Breadcrumb from '../components/Breadcrumb.vue'
import { localePath, useI18n } from '../i18n'
import { legalCopy } from '../legal'

const route = useRoute()
const { locale } = useI18n()

const doc = computed(() => {
  const page = route.meta.page === 'privacy' ? 'privacy' : 'terms'
  return legalCopy[locale.value][page]
})
</script>

<template>
  <article class="page-hero legal-doc">
    <div class="wrap prose">
      <Breadcrumb :current="doc.crumb" />
      <h1>{{ doc.heading }}</h1>
      <p class="updated">{{ doc.updated }}</p>
      <p class="related">
        <RouterLink :to="localePath(doc.relatedPath, locale)">{{ doc.relatedLabel }}</RouterLink>
      </p>
      <section v-for="section in doc.sections" :key="section.heading">
        <h2>{{ section.heading }}</h2>
        <template v-for="(block, index) in section.blocks" :key="index">
          <p v-if="block.type === 'p'">{{ block.text }}</p>
          <ul v-else>
            <li v-for="item in block.items" :key="item">{{ item }}</li>
          </ul>
        </template>
      </section>
    </div>
  </article>
</template>
