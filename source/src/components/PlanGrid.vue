<script setup lang="ts">
import { useI18n } from '../i18n'
import { CONSOLE_URL, CONTACT_EMAIL } from '../config'

const { t } = useI18n()
</script>

<template>
  <div class="plans">
    <article
      v-for="plan in t.plans.items"
      :key="plan.id"
      class="card plan"
      :class="{ featured: plan.id === 'enterprise' }"
    >
      <p class="kind">{{ plan.kind }}</p>
      <h3>{{ plan.name }}</h3>
      <p class="price">{{ plan.price }} <span class="period">· {{ plan.period }}</span></p>
      <p class="tagline">{{ plan.tagline }}</p>
      <ul class="checks">
        <li v-for="point in plan.points" :key="point">{{ point }}</li>
      </ul>
      <a v-if="plan.id === 'free'" class="btn btn-primary" :href="CONSOLE_URL" target="_blank" rel="noopener noreferrer">{{ plan.cta }}</a>
      <a v-else-if="plan.id === 'enterprise'" class="btn btn-primary" :href="CONTACT_EMAIL">{{ plan.cta }}</a>
      <button v-else class="btn btn-outline" type="button" disabled>{{ plan.cta }}</button>
    </article>
  </div>
</template>
