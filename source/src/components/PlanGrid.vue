<script setup lang="ts">
import { CONSOLE_URL, DONATE_URL } from '../config'
import { useFreePricing } from '../free-pricing'

const f = useFreePricing()
</script>

<template>
  <div class="plans">
    <article class="card plan featured">
      <p class="kind">{{ f.free.kind }}</p>
      <h3>{{ f.free.name }}</h3>
      <p class="price">{{ f.free.price }} <span class="period">· {{ f.free.period }}</span></p>
      <p class="tagline">{{ f.free.tagline }}</p>
      <ul class="checks">
        <li v-for="point in f.free.points" :key="point">{{ point }}</li>
      </ul>
      <a class="btn btn-primary" :href="CONSOLE_URL">{{ f.free.cta }}</a>
    </article>
    <article class="card plan">
      <p class="kind">{{ f.donate.kind }}</p>
      <h3>{{ f.donate.name }}</h3>
      <p class="tagline">{{ f.donate.tagline }}</p>
      <ul class="checks">
        <li v-for="point in f.donate.points" :key="point">{{ point }}</li>
      </ul>
      <a class="btn btn-outline" :href="DONATE_URL" target="_blank" rel="noopener">{{ f.donate.cta }}</a>
    </article>
  </div>
</template>
