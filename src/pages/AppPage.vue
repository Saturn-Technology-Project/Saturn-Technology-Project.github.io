<script setup lang="ts">
import Breadcrumb from '../components/Breadcrumb.vue'
import { localePath, useI18n } from '../i18n'
import { GITHUB_URL, RELEASES_URL } from '../config'

const { locale, t } = useI18n()

// The rail's icons in the app, in the order of its screens (outline paths on a 24-unit grid).
const railIcons = [
  'M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z',
  'M8 7l-5 5 5 5M16 7l5 5-5 5',
  'M6 3v12M18 9a3 3 0 1 0 0-.01M6 21a3 3 0 1 0 0-.01M18 12c0 4-6 3-12 6',
  'M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3',
  'M4 6h16M4 12h16M4 18h10',
  'M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
  'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-5-5M11 8v6M8 11h6',
  'M4 6l2 2 4-4M4 16l2 2 4-4M13 7h7M13 17h7',
  'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z',
  'M12 3l8 4.5v9L12 21l-8-4.5v-9zM4 7.5l8 4.5 8-4.5M12 12v9',
]

// Accuracy along the lineage, with its 95% interval, as the mock's chart draws it.
const line = [
  { x: 34, label: '1k', value: 0.41, low: 0.36, high: 0.46 },
  { x: 124, label: '8k', value: 0.63, low: 0.58, high: 0.68 },
  { x: 214, label: '33k', value: 0.78, low: 0.74, high: 0.82 },
  { x: 304, label: '143k', value: 0.86, low: 0.83, high: 0.89 },
]
const branch = { x: 394, label: 'SFT', value: 0.74, low: 0.7, high: 0.78 }
const y = (value: number) => 150 - (value - 0.3) * 200
const linePath = line.map((point, i) => `${i ? 'L' : 'M'}${point.x} ${y(point.value)}`).join(' ')
</script>

<template>
  <section class="hero app-hero">
    <div class="wrap">
      <div class="app-hero-text">
        <Breadcrumb :current="t.nav.app" />
        <p class="eyebrow accent">{{ t.appPage.eyebrow }}</p>
        <h1>{{ t.appPage.heading }}</h1>
        <p class="lede">{{ t.appPage.lede }}</p>
        <div class="actions">
          <a class="btn btn-primary btn-lg btn-download" :href="RELEASES_URL" target="_blank" rel="noopener noreferrer">
            <span>{{ t.appPage.download }}</span>
            <span class="btn-sub">{{ t.appPage.downloadNote }}</span>
          </a>
          <a class="btn btn-outline btn-lg" :href="GITHUB_URL" target="_blank" rel="noopener noreferrer">
            <svg class="icon" viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
            {{ t.appPage.github }}
          </a>
          <RouterLink class="btn btn-ghost btn-lg" :to="localePath('/mcp', locale)">{{ t.appPage.secondary }}</RouterLink>
        </div>
        <p class="hero-note">{{ t.appPage.note }}</p>
      </div>

      <div class="appwin" role="img" :aria-label="t.appPage.mock.label">
        <div class="appwin-top" aria-hidden="true">
          <span class="appwin-lights"><i /><i /><i /></span>
          <span class="appwin-project">{{ t.appPage.mock.project }} <span class="caret">⌄</span></span>
          <span class="appwin-screen">{{ t.appPage.mock.screen }}</span>
          <span class="appwin-spacer" />
          <span class="appwin-pill"><i />{{ t.appPage.mock.runtime }}</span>
          <span class="appwin-muted">{{ t.appPage.mock.commands }} ⌘K</span>
          <span class="appwin-muted">{{ t.appPage.mock.assistant }}</span>
        </div>
        <div class="appwin-body" aria-hidden="true">
          <nav class="appwin-rail">
            <span v-for="(path, i) in railIcons" :key="i" :class="{ on: i === 3 }">
              <svg viewBox="0 0 24 24"><path :d="path" /></svg>
            </span>
          </nav>
          <div class="appwin-main">
            <p class="appwin-title">{{ t.appPage.mock.experiment }}</p>
            <p class="appwin-meta">{{ t.appPage.mock.meta }}</p>
            <div class="appwin-card">
              <p class="appwin-label">{{ t.appPage.mock.chart }}</p>
              <svg class="appwin-chart" viewBox="0 0 430 176">
                <line v-for="v in [0.4, 0.6, 0.8]" :key="v" class="grid" x1="20" x2="420" :y1="y(v)" :y2="y(v)" />
                <text v-for="v in [0.4, 0.6, 0.8]" :key="`t${v}`" class="tick" x="0" :y="y(v) + 4">{{ v.toFixed(1) }}</text>
                <path class="series" :d="linePath" />
                <path class="series branch" :d="`M${line[3].x} ${y(line[3].value)} L${branch.x} ${y(branch.value)}`" />
                <g v-for="point in [...line, branch]" :key="point.label">
                  <line class="whisker" :class="{ branch: point === branch }" :x1="point.x" :x2="point.x" :y1="y(point.low)" :y2="y(point.high)" />
                  <circle class="dot" :class="{ branch: point === branch }" :cx="point.x" :cy="y(point.value)" r="4.5" />
                  <text class="tick" :x="point.x" y="170" text-anchor="middle">{{ point.label }}</text>
                </g>
                <text class="legend" :x="branch.x" :y="y(branch.value) + 22" text-anchor="middle">{{ t.appPage.mock.branch }}</text>
              </svg>
            </div>
            <p class="appwin-notice">{{ t.appPage.mock.notice }}</p>
            <p class="appwin-verdict"><span>{{ t.appPage.mock.verdictLabel }}</span>{{ t.appPage.mock.verdict }}</p>
          </div>
          <aside class="appwin-panel">
            <p class="appwin-panel-head">{{ t.appPage.mock.panel }} <span class="appwin-mode">{{ t.appPage.mock.mode }} ⌄</span></p>
            <p class="appwin-bubble">{{ t.appPage.mock.question }}</p>
            <p class="appwin-answer">{{ t.appPage.mock.answer }}</p>
            <div class="appwin-request">
              <p>{{ t.appPage.mock.request }}</p>
              <span class="appwin-buttons"><b>{{ t.appPage.mock.approve }}</b><em>{{ t.appPage.mock.reject }}</em></span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="three">
        <article v-for="(item, i) in t.appPage.highlights" :key="item[0]" class="benefit">
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
        <h2>{{ t.appPage.screensTitle }}</h2>
        <p class="lede">{{ t.appPage.screensDesc }}</p>
      </div>
      <ul class="screens">
        <li v-for="(item, i) in t.appPage.screens" :key="item[0]">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path :d="railIcons[i]" /></svg>
          <h3>{{ item[0] }}</h3>
          <p>{{ item[1] }}</p>
        </li>
      </ul>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <h2>{{ t.appPage.modesTitle }}</h2>
        <p class="lede">{{ t.appPage.modesDesc }}</p>
      </div>
      <ol class="modes">
        <li v-for="(item, i) in t.appPage.modes" :key="item[0]">
          <span class="modes-meter" aria-hidden="true"><i v-for="n in 4" :key="n" :class="{ on: n <= i + 1 }" /></span>
          <h3>{{ item[0] }}</h3>
          <p>{{ item[1] }}</p>
        </li>
      </ol>
      <p class="modes-note">{{ t.appPage.modesNote }}</p>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <h2>{{ t.appPage.featTitle }}</h2>
        <p class="lede">{{ t.appPage.featDesc }}</p>
      </div>
      <div class="features">
        <article v-for="item in t.appPage.features" :key="item.num" class="feature">
          <div class="feature-text">
            <p class="eyebrow"><span class="num">{{ item.num }}</span> / {{ item.eyebrow }}</p>
            <h3>{{ item.title }}</h3>
            <ul class="checks">
              <li v-for="point in item.points" :key="point">{{ point }}</li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap files-grid">
      <div>
        <h2>{{ t.appPage.filesTitle }}</h2>
        <p class="lede">{{ t.appPage.filesDesc }}</p>
      </div>
      <div class="hero-aside">
        <pre class="code"><span class="k">my-project/</span>
<span class="k">├─</span> <span class="v">probe.py</span>
<span class="k">└─</span> <span class="k">.saturn/research/</span>
   <span class="k">├─</span> <span class="v">questions/</span>
   <span class="k">├─</span> <span class="v">hypotheses/</span>
   <span class="k">├─</span> <span class="v">experiments/</span>
   <span class="k">├─</span> <span class="v">versions/</span>
   <span class="k">├─</span> <span class="v">models/</span>
   <span class="k">├─</span> <span class="v">runs/</span><span class="k">&lt;id&gt;/</span><span class="ok">samples.jsonl</span>
   <span class="k">├─</span> <span class="v">labels/</span>
   <span class="k">├─</span> <span class="v">counterexamples/</span>
   <span class="k">└─</span> <span class="v">findings/</span></pre>
        <p class="code-caption">{{ t.appPage.asideCaption }}</p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <h2>{{ t.appPage.specsTitle }}</h2>
      </div>
      <ul class="layers">
        <li v-for="item in t.appPage.specs" :key="item[0]">
          <h3>{{ item[0] }}</h3>
          <p>{{ item[1] }}</p>
        </li>
      </ul>
    </div>
  </section>

  <section class="section">
    <div class="wrap cta">
      <h2>{{ t.appPage.ctaTitle }}</h2>
      <p class="lede">{{ t.appPage.ctaBody }}</p>
      <div class="actions">
        <a class="btn btn-primary btn-lg btn-download" :href="RELEASES_URL" target="_blank" rel="noopener noreferrer">
          <span>{{ t.appPage.download }}</span>
          <span class="btn-sub">{{ t.appPage.downloadNote }}</span>
        </a>
        <a class="btn btn-outline btn-lg" :href="GITHUB_URL" target="_blank" rel="noopener noreferrer">{{ t.appPage.github }}</a>
      </div>
    </div>
  </section>
</template>
