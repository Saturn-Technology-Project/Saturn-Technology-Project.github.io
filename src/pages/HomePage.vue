<script setup lang="ts">
import AppWindow from '../components/AppWindow.vue'
import PlanGrid from '../components/PlanGrid.vue'
import { useFreePricing } from '../free-pricing'
import { localePath, useI18n } from '../i18n'
import { CONSOLE_URL, RELEASES_URL } from '../config'

const { locale, t } = useI18n()
const f = useFreePricing()
</script>

<template>
  <section class="hero home-hero">
    <div class="wrap hero-grid">
      <div>
        <p class="eyebrow accent">{{ t.hero.eyebrow }}</p>
        <h1>{{ t.hero.title }}</h1>
        <p class="lede">{{ t.hero.desc }}</p>
        <div class="actions">
          <a class="btn btn-primary btn-lg" :href="CONSOLE_URL">{{ t.hero.mcp }}</a>
          <a class="btn btn-outline btn-lg" :href="RELEASES_URL" target="_blank" rel="noopener noreferrer">{{ t.hero.app }}</a>
        </div>
        <p class="hero-note">{{ t.hero.note }}</p>
      </div>
      <div class="hero-products">
        <a class="hero-product" href="#saturn-mcp">
          <svg class="art" viewBox="0 0 72 72" aria-hidden="true">
            <path d="M12 62V22a24 24 0 0 1 48 0v40" />
            <path d="M24 62V26a12 12 0 0 1 24 0v36" />
            <line x1="6" y1="62" x2="66" y2="62" />
            <circle class="fill" cx="36" cy="44" r="5" />
          </svg>
          <span class="eyebrow">{{ t.hero.cards.mcpKind }}</span>
          <strong>Saturn MCP</strong>
          <span>{{ t.hero.cards.mcp }}</span>
          <span class="arrow" aria-hidden="true">→</span>
        </a>
        <a class="hero-product dark" href="#saturn-app">
          <svg class="art" viewBox="0 0 72 72" aria-hidden="true">
            <line x1="10" y1="58" x2="10" y2="46" />
            <line x1="20" y1="58" x2="20" y2="36" />
            <line x1="30" y1="58" x2="30" y2="40" />
            <circle cx="46" cy="28" r="16" />
            <line x1="57" y1="40" x2="66" y2="50" />
            <circle class="fill" cx="46" cy="28" r="5" />
          </svg>
          <span class="eyebrow">{{ t.hero.cards.appKind }}</span>
          <strong>Saturn App</strong>
          <span>{{ t.hero.cards.app }}</span>
          <span class="arrow" aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  </section>

  <section class="section band-oat">
    <div class="wrap">
      <div class="section-head">
        <h2>{{ t.mission.title }}</h2>
        <p class="lede">{{ t.mission.desc }}</p>
      </div>
      <div class="three">
        <article v-for="(item, i) in t.mission.items" :key="item[0]" class="benefit">
          <span class="num">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3>{{ item[0] }}</h3>
          <p>{{ item[1] }}</p>
        </article>
      </div>
    </div>
  </section>

  <section id="saturn-mcp" class="section product">
    <div class="wrap product-grid">
      <div class="product-text">
        <p class="eyebrow accent">{{ t.mcpProduct.eyebrow }}</p>
        <h2>{{ t.mcpProduct.title }}</h2>
        <p class="lede">{{ t.mcpProduct.desc }}</p>
        <ul class="checks">
          <li v-for="point in t.mcpProduct.points" :key="point">{{ point }}</li>
        </ul>
        <div class="actions">
          <a class="btn btn-primary btn-lg" :href="CONSOLE_URL">{{ t.mcpProduct.primary }}</a>
          <RouterLink class="btn btn-outline btn-lg" :to="localePath('/mcp', locale)">{{ t.mcpProduct.secondary }}</RouterLink>
        </div>
      </div>

      <div>
        <div class="mock" aria-hidden="true">
          <div class="mock-head">
            <span class="dot" />
            <span>{{ t.mcpProduct.mock.header }}</span>
          </div>
          <dl class="mock-body">
            <div><dt>{{ t.mcpProduct.mock.agent }}</dt><dd>{{ t.mcpProduct.mock.agentValue }}</dd></div>
            <div><dt>{{ t.mcpProduct.mock.tool }}</dt><dd class="mono">{{ t.mcpProduct.mock.toolValue }}</dd></div>
            <div><dt>{{ t.mcpProduct.mock.args }}</dt><dd class="mono">{{ t.mcpProduct.mock.argsValue }}</dd></div>
            <div><dt>{{ t.mcpProduct.mock.rule }}</dt><dd>{{ t.mcpProduct.mock.ruleValue }}</dd></div>
          </dl>
          <div class="mock-actions">
            <span class="btn btn-primary btn-sm">{{ t.mcpProduct.mock.approve }}</span>
            <span class="btn btn-outline btn-sm">{{ t.mcpProduct.mock.reject }}</span>
          </div>
          <p class="mock-foot">{{ t.mcpProduct.mock.footer }}</p>
        </div>
        <div class="product-logos">
          <span class="eyebrow">{{ t.logos.label }}</span>
          <ul>
            <li v-for="item in t.logos.items" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section id="saturn-app" class="section product band-dark">
    <div class="wrap">
      <div class="product-grid">
        <div class="product-text">
          <p class="eyebrow accent">{{ t.appProduct.eyebrow }}</p>
          <h2>{{ t.appProduct.title }}</h2>
          <p class="lede">{{ t.appProduct.desc }}</p>
        </div>
        <div class="product-text">
          <ul class="checks">
            <li v-for="point in t.appProduct.points" :key="point">{{ point }}</li>
          </ul>
          <div class="actions">
            <a class="btn btn-primary btn-lg btn-download" :href="RELEASES_URL" target="_blank" rel="noopener noreferrer">
              <span>{{ t.appProduct.primary }}</span>
              <span class="btn-sub">{{ t.appPage.downloadNote }}</span>
            </a>
            <RouterLink class="btn btn-outline btn-lg" :to="localePath('/app', locale)">{{ t.appProduct.secondary }}</RouterLink>
          </div>
        </div>
      </div>
      <AppWindow />
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <h2>{{ t.principles.title }}</h2>
      </div>
      <ul class="principles">
        <li v-for="item in t.principles.items" :key="item[0]">
          <h3>{{ item[0] }}</h3>
          <p>{{ item[1] }}</p>
        </li>
      </ul>
    </div>
  </section>

  <section class="section band-oat">
    <div class="wrap">
      <div class="section-head center">
        <h2>{{ f.plansTitle }}</h2>
        <p class="lede">{{ f.plansDesc }}</p>
      </div>
      <PlanGrid />
    </div>
  </section>

  <section class="section" id="faq">
    <div class="wrap">
      <div class="section-head">
        <h2>{{ t.homeFaq.title }}</h2>
      </div>
      <dl class="faq">
        <div v-for="item in t.homeFaq.items" :key="item[0]">
          <dt>{{ item[0] }}</dt>
          <dd>{{ item[1] }}</dd>
        </div>
      </dl>
    </div>
  </section>

  <section class="section band-oat">
    <div class="wrap cta">
      <h2>{{ t.cta.title }}</h2>
      <p class="lede">{{ t.cta.body }}</p>
      <div class="actions">
        <a class="btn btn-primary btn-lg" :href="CONSOLE_URL">{{ t.cta.primary }}</a>
        <a class="btn btn-outline btn-lg" :href="RELEASES_URL" target="_blank" rel="noopener noreferrer">{{ t.cta.secondary }}</a>
      </div>
    </div>
  </section>
</template>
