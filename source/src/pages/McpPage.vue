<script setup lang="ts">
import Breadcrumb from '../components/Breadcrumb.vue'
import PolicyCode from '../components/PolicyCode.vue'
import { localePath, useI18n } from '../i18n'
import { CONSOLE_URL } from '../config'

const { locale, t } = useI18n()
</script>

<template>
  <section class="hero">
    <div class="wrap hero-grid">
      <div>
        <Breadcrumb :current="t.nav.mcp" />
        <p class="eyebrow accent">{{ t.mcpPage.eyebrow }}</p>
        <h1>{{ t.mcpPage.heading }}</h1>
        <p class="lede">{{ t.mcpPage.lede }}</p>
        <div class="actions">
          <a class="btn btn-primary btn-lg" :href="CONSOLE_URL">{{ t.mcpPage.primary }}</a>
          <RouterLink class="btn btn-outline btn-lg" :to="localePath('/demo', locale)">{{ t.mcpPage.secondary }}</RouterLink>
        </div>
        <p class="hero-note">{{ t.mcpPage.note }}</p>
      </div>
      <div class="hero-aside">
        <PolicyCode />
        <p class="code-caption">{{ t.features.caption }}</p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <h2>{{ t.mcpPage.howTitle }}</h2>
        <p class="lede">{{ t.mcpPage.howDesc }}</p>
      </div>
      <div class="four">
        <article v-for="(step, i) in t.mcpPage.how" :key="step[0]" class="benefit">
          <span class="num">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3>{{ step[0] }}</h3>
          <p>{{ step[1] }}</p>
        </article>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <h2>{{ t.mcpPage.casesTitle }}</h2>
        <p class="lede">{{ t.mcpPage.casesDesc }}</p>
      </div>
      <div class="two">
        <article v-for="c in t.mcpPage.cases" :key="c.team" class="card usecase">
          <p class="eyebrow">{{ c.team }}</p>
          <h3>{{ c.title }}</h3>
          <p>{{ c.body }}</p>
          <ul class="rules">
            <li v-for="r in c.rules" :key="r">{{ r }}</li>
          </ul>
        </article>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <h2>{{ t.mcpPage.capTitle }}</h2>
        <p class="lede">{{ t.mcpPage.capDesc }}</p>
      </div>
      <div class="console-grid">
        <article v-for="item in t.mcpPage.caps" :key="item[0]" class="card pad">
          <h3>{{ item[0] }}</h3>
          <p>{{ item[1] }}</p>
        </article>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <h2>{{ t.mcpPage.secTitle }}</h2>
        <p class="lede">{{ t.mcpPage.secDesc }}</p>
      </div>
      <ul class="layers">
        <li v-for="item in t.mcpPage.sec" :key="item[0]">
          <h3>{{ item[0] }}</h3>
          <p>{{ item[1] }}</p>
        </li>
      </ul>
    </div>
  </section>

  <section class="section">
    <div class="wrap cta">
      <h2>{{ t.mcpPage.ctaTitle }}</h2>
      <p class="lede">{{ t.mcpPage.ctaBody }}</p>
      <div class="actions">
        <a class="btn btn-primary btn-lg" :href="CONSOLE_URL">{{ t.mcpPage.primary }}</a>
        <RouterLink class="btn btn-outline btn-lg" :to="localePath('/demo', locale)">{{ t.mcpPage.secondary }}</RouterLink>
      </div>
    </div>
  </section>
</template>
