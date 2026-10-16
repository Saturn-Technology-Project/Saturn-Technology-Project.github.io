<script setup lang="ts">
import Breadcrumb from '../components/Breadcrumb.vue'
import PlanGrid from '../components/PlanGrid.vue'
import { localePath, useI18n } from '../i18n'
import { CONSOLE_URL } from '../config'

const { locale, t } = useI18n()
</script>

<template>
  <section class="hero">
    <div class="wrap hero-grid">
      <div>
        <Breadcrumb :current="t.nav.pricing" />
        <p class="eyebrow accent">{{ t.pricingPage.eyebrow }}</p>
        <h1>{{ t.pricingPage.heading }}</h1>
        <p class="lede">{{ t.pricingPage.lede }}</p>
        <div class="actions">
          <a class="btn btn-primary btn-lg" :href="CONSOLE_URL">{{ t.nav.start }}</a>
          <RouterLink class="btn btn-outline btn-lg" :to="localePath('/demo', locale)">{{ t.nav.demo }}</RouterLink>
        </div>
        <p class="hero-note">{{ t.plans.desc }}</p>
      </div>
      <div class="hero-aside">
        <pre class="code code-wrap"><span class="k">{{ t.plans.items[0].id }}</span>    <span class="ok">{{ t.plans.items[0].price }}</span> <span class="k">{{ t.plans.items[0].period }}</span>
<span class="v">{{ t.plans.items[0].tagline }}</span>

<span class="k">{{ t.plans.items[1].id }}</span>     <span class="a">{{ t.plans.items[1].price }}</span> <span class="k">{{ t.plans.items[1].period }}</span>
<span class="v">{{ t.plans.items[1].tagline }}</span>

<span class="k">{{ t.plans.items[2].id }}</span>    <span class="a">{{ t.plans.items[2].price }}</span> <span class="k">{{ t.plans.items[2].period }}</span>
<span class="v">{{ t.plans.items[2].tagline }}</span></pre>
        <p class="code-caption">{{ t.pricingPage.includedTitle }}</p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <PlanGrid />
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <h2>{{ t.pricingPage.includedTitle }}</h2>
      </div>
      <ul class="checks included-list">
        <li v-for="item in t.pricingPage.included" :key="item">{{ item }}</li>
      </ul>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head" id="faq">
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
        <RouterLink class="btn btn-primary btn-lg" :to="localePath('/demo', locale)">{{ t.nav.demo }}</RouterLink>
      </div>
    </div>
  </section>
</template>
