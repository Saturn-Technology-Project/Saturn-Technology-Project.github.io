<script setup lang="ts">
import { useI18n } from '../i18n'
import { RAIL_ICONS as railIcons } from '../app-icons'

const { t } = useI18n()

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
</template>
