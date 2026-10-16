<script setup lang="ts">
import { useI18n } from '../i18n'

const SIGNUP_URL = 'https://dashboard.saturn-core.com/'
const { t } = useI18n()
</script>

<template>
  <div class="plans">
    <article
      v-for="plan in t.plans.items"
      :key="plan.id"
      class="card plan"
      :class="{ featured: plan.id === 'team' }"
    >
      <p class="kind">{{ plan.kind }}</p>
      <h3>{{ plan.name }}</h3>
      <p class="price">{{ plan.price }} <span v-if="plan.period" class="period">· {{ plan.period }}</span></p>
      <p class="tagline">{{ plan.tagline }}</p>
      <ul class="checks">
        <li v-for="point in plan.points" :key="point">{{ point }}</li>
      </ul>
      <a class="btn btn-primary" :href="SIGNUP_URL">{{ plan.cta }}</a>
    </article>
  </div>
</template>
