<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Breadcrumb from '../components/Breadcrumb.vue'
import { localePath, useI18n } from '../i18n'
import { legalCopy, splitStatusBadges } from '../legal'

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
          <p v-if="block.type === 'p'">
            <template v-for="(seg, sIdx) in splitStatusBadges(block.text)" :key="sIdx">
              <span v-if="seg.badge" :class="['status-badge', `status-${seg.kind}`]">{{ seg.text }}</span>
              <template v-else>{{ seg.text }}</template>
            </template>
          </p>
          <h3 v-else-if="block.type === 'h3'" class="subhead">
            <template v-for="(seg, sIdx) in splitStatusBadges(block.text)" :key="sIdx">
              <span v-if="seg.badge" :class="['status-badge', `status-${seg.kind}`]">{{ seg.text }}</span>
              <template v-else>{{ seg.text }}</template>
            </template>
          </h3>
          <ul v-else-if="block.type === 'ul'">
            <li v-for="item in block.items" :key="item">
              <template v-for="(seg, sIdx) in splitStatusBadges(item)" :key="sIdx">
                <span v-if="seg.badge" :class="['status-badge', `status-${seg.kind}`]">{{ seg.text }}</span>
                <template v-else>{{ seg.text }}</template>
              </template>
            </li>
          </ul>
          <ol v-else-if="block.type === 'ol'">
            <li v-for="item in block.items" :key="item">
              <template v-for="(seg, sIdx) in splitStatusBadges(item)" :key="sIdx">
                <span v-if="seg.badge" :class="['status-badge', `status-${seg.kind}`]">{{ seg.text }}</span>
                <template v-else>{{ seg.text }}</template>
              </template>
            </li>
          </ol>
          <div v-else-if="block.type === 'table'" class="table-wrap">
            <table class="doc-table">
              <thead>
                <tr>
                  <th v-for="cell in block.head" :key="cell" scope="col">{{ cell }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, rIdx) in block.rows" :key="rIdx">
                  <td v-for="(cell, cIdx) in row" :key="cIdx">
                    <template v-for="(seg, sIdx) in splitStatusBadges(cell)" :key="sIdx">
                      <span v-if="seg.badge" :class="['status-badge', `status-${seg.kind}`]">{{ seg.text }}</span>
                      <template v-else>{{ seg.text }}</template>
                    </template>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>
      </section>
    </div>
  </article>
</template>
