<script setup lang="ts">
import PlanGrid from '../components/PlanGrid.vue'
import { useI18n } from '../i18n'
import { CONTACT_EMAIL } from '../config'

const { t } = useI18n()
</script>

<template>
  <section class="page-hero">
    <div class="wrap center">
      <p class="eyebrow accent">{{ t.pricingPage.eyebrow }}</p>
      <h1>{{ t.pricingPage.heading }}</h1>
      <p class="lede">{{ t.pricingPage.lede }}</p>
    </div>
  </section>

  <section class="section pricing-plans">
    <div class="wrap">
      <PlanGrid />
      <p class="small center" style="margin-top: 28px">{{ t.plans.desc }}</p>
    </div>
  </section>

  <section class="section">
    <div class="wrap included">
      <h2>{{ t.pricingPage.includedTitle }}</h2>
      <ul class="checks included-list">
        <li v-for="item in t.pricingPage.included" :key="item">{{ item }}</li>
      </ul>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <h2>{{ t.pricingPage.faqTitle }}</h2>
      </div>
      <dl class="faq">
        <div v-for="item in t.pricingPage.faq" :key="item[0]">
          <dt>{{ item[0] }}</dt>
          <dd>{{ item[1] }}</dd>
        </div>
      </dl>
    </div>
  </section>

  <section class="section">
    <div class="wrap cta">
      <h2>{{ t.pricingPage.ctaTitle }}</h2>
      <p class="lede">{{ t.pricingPage.ctaBody }}</p>
      <div class="actions">
        <a class="btn btn-primary btn-lg" :href="CONTACT_EMAIL">{{ t.nav.demo }}</a>
      </div>
    </div>
  </section>
</template>
