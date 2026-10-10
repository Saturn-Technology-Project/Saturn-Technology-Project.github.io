<script setup lang="ts">
import PlanGrid from '../components/PlanGrid.vue'
import PolicyCode from '../components/PolicyCode.vue'
import { useI18n } from '../i18n'
import { CONSOLE_URL } from '../config'

const { t } = useI18n()
</script>

<template>
  <section class="hero">
    <div class="wrap hero-grid">
      <div>
        <p class="eyebrow accent">{{ t.hero.eyebrow }}</p>
        <h1>{{ t.hero.title }}</h1>
        <p class="lede">{{ t.hero.desc }}</p>
        <div class="actions">
          <a class="btn btn-primary btn-lg" :href="CONSOLE_URL" target="_blank" rel="noopener noreferrer">{{ t.hero.primary }}</a>
          <RouterLink class="btn btn-outline btn-lg" to="/demo">{{ t.hero.secondary }}</RouterLink>
        </div>
        <p class="hero-note">{{ t.hero.note }}</p>
      </div>

      <div class="mock" aria-hidden="true">
        <div class="mock-head">
          <span class="dot" />
          <span>{{ t.hero.mock.header }}</span>
        </div>
        <dl class="mock-body">
          <div><dt>{{ t.hero.mock.agent }}</dt><dd>{{ t.hero.mock.agentValue }}</dd></div>
          <div><dt>{{ t.hero.mock.tool }}</dt><dd class="mono">{{ t.hero.mock.toolValue }}</dd></div>
          <div><dt>{{ t.hero.mock.args }}</dt><dd class="mono">{{ t.hero.mock.argsValue }}</dd></div>
          <div><dt>{{ t.hero.mock.rule }}</dt><dd>{{ t.hero.mock.ruleValue }}</dd></div>
        </dl>
        <div class="mock-actions">
          <span class="btn btn-primary btn-sm">{{ t.hero.mock.approve }}</span>
          <span class="btn btn-outline btn-sm">{{ t.hero.mock.reject }}</span>
        </div>
        <p class="mock-foot">{{ t.hero.mock.footer }}</p>
      </div>
    </div>
  </section>

  <section class="logos">
    <div class="wrap logos-row">
      <span class="eyebrow">{{ t.logos.label }}</span>
      <ul>
        <li v-for="item in t.logos.items" :key="item">{{ item }}</li>
      </ul>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head center">
        <h2>{{ t.benefits.title }}</h2>
      </div>
      <div class="three">
        <article v-for="(item, i) in t.benefits.items" :key="item[0]" class="benefit">
          <span class="num">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3>{{ item[0] }}</h3>
          <p>{{ item[1] }}</p>
        </article>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <h2>{{ t.vs.title }}</h2>
        <p class="lede">{{ t.vs.desc }}</p>
      </div>
      <div class="vs">
        <div class="vs-col">
          <p class="eyebrow">{{ t.vs.withoutLabel }}</p>
          <ul class="minus">
            <li v-for="item in t.vs.without" :key="item">{{ item }}</li>
          </ul>
        </div>
        <div class="vs-col ours">
          <p class="eyebrow">{{ t.vs.withLabel }}</p>
          <ul class="plus">
            <li v-for="item in t.vs.with" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <h2>{{ t.features.title }}</h2>
        <p class="lede">{{ t.features.desc }}</p>
      </div>
      <div class="features">
        <article v-for="item in t.features.items" :key="item.num" class="feature" :class="{ 'has-code': item.code }">
          <div class="feature-text">
            <p class="eyebrow"><span class="num">{{ item.num }}</span> / {{ item.eyebrow }}</p>
            <h3>{{ item.title }}</h3>
            <ul class="checks">
              <li v-for="point in item.points" :key="point">{{ point }}</li>
            </ul>
          </div>
          <div v-if="item.code" class="feature-aside">
            <PolicyCode />
            <p class="code-caption">{{ t.features.caption }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <h2>{{ t.compare.title }}</h2>
        <p class="lede">{{ t.compare.desc }}</p>
      </div>
      <div class="compare">
        <article v-for="col in t.compare.columns" :key="col.name" class="compare-col" :class="{ ours: col.ours }">
          <h3>{{ col.name }}</h3>
          <ul :class="col.ours ? 'plus' : 'minus'">
            <li v-for="item in col.items" :key="item">{{ item }}</li>
          </ul>
        </article>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <h2>{{ t.console.title }}</h2>
        <p class="lede">{{ t.console.desc }}</p>
      </div>
      <div class="console-grid">
        <article v-for="item in t.console.items" :key="item[0]" class="card pad">
          <h3>{{ item[0] }}</h3>
          <p>{{ item[1] }}</p>
        </article>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head center">
        <h2>{{ t.plans.title }}</h2>
        <p class="lede">{{ t.plans.desc }}</p>
      </div>
      <PlanGrid />
    </div>
  </section>

  <section class="section">
    <div class="wrap cta">
      <h2>{{ t.cta.title }}</h2>
      <p class="lede">{{ t.cta.body }}</p>
      <div class="actions">
        <a class="btn btn-primary btn-lg" :href="CONSOLE_URL" target="_blank" rel="noopener noreferrer">{{ t.cta.primary }}</a>
        <RouterLink class="btn btn-outline btn-lg" to="/demo">{{ t.cta.secondary }}</RouterLink>
      </div>
    </div>
  </section>
</template>
