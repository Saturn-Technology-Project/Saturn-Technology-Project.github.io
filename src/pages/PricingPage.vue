<script setup lang="ts">
import Breadcrumb from '../components/Breadcrumb.vue'
import PlanGrid from '../components/PlanGrid.vue'
import { useI18n } from '../i18n'
import { CONSOLE_URL, DONATE_URL } from '../config'
import { useFreePricing } from '../free-pricing'

const { t } = useI18n()
const f = useFreePricing()
</script>

<template>
  <section class="hero">
    <div class="wrap hero-grid">
      <div>
        <Breadcrumb :current="t.nav.pricing" />
        <p class="eyebrow accent">{{ f.page.eyebrow }}</p>
        <h1>{{ f.page.heading }}</h1>
        <p class="lede">{{ f.page.lede }}</p>
        <div class="actions">
          <a class="btn btn-primary btn-lg" :href="CONSOLE_URL">{{ t.nav.start }}</a>
          <a class="btn btn-outline btn-lg" :href="DONATE_URL" target="_blank" rel="noopener">{{ f.donate.cta }}</a>
        </div>
        <p class="hero-note">{{ f.plansDesc }}</p>
      </div>
      <div class="hero-aside">
        <pre class="code code-wrap"><span class="k">saturn</span>    <span class="ok">{{ f.free.price }}</span> <span class="k">{{ f.free.period }}</span>
<span class="v">{{ f.free.tagline }}</span>

<span class="k">donate</span>    <span class="a">{{ f.donate.points[0] }}</span>
<span class="v">{{ f.donate.points[1] }}</span></pre>
        <p class="code-caption">{{ f.page.includedTitle }}</p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <PlanGrid />
    </div>
  </section>

  <section class="section band-oat">
    <div class="wrap">
      <div class="section-head">
        <h2>{{ f.page.includedTitle }}</h2>
      </div>
      <ul class="checks included-list">
        <li v-for="item in f.page.included" :key="item">{{ item }}</li>
      </ul>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head" id="faq">
        <h2>{{ f.page.faqTitle }}</h2>
      </div>
      <dl class="faq">
        <div v-for="item in f.page.faq" :key="item[0]">
          <dt>{{ item[0] }}</dt>
          <dd>{{ item[1] }}</dd>
        </div>
      </dl>
    </div>
  </section>

  <section class="section">
    <div class="wrap cta">
      <h2>{{ f.page.ctaTitle }}</h2>
      <p class="lede">{{ f.page.ctaBody }}</p>
      <div class="actions">
        <a class="btn btn-primary btn-lg" :href="DONATE_URL" target="_blank" rel="noopener">{{ f.donate.cta }}</a>
      </div>
    </div>
  </section>
</template>
