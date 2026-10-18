<script setup lang="ts">
import { computed } from 'vue'
import Breadcrumb from '../components/Breadcrumb.vue'
import { localePath, useI18n } from '../i18n'
import { splitStatusBadges } from '../legal'
import { trustPaper } from '../trust-paper'

const { locale, t } = useI18n()
const paper = computed(() => trustPaper[locale.value])

function openPaper(event: MouseEvent) {
  const target = document.getElementById('whitepaper')
  if (!target) return
  event.preventDefault()
  target.scrollIntoView({ block: 'start' })
  history.replaceState(history.state, '', `${location.pathname}#whitepaper`)
}
</script>

<template>
  <section class="hero">
    <div class="wrap hero-grid">
      <div>
        <Breadcrumb :current="t.nav.trust" />
        <p class="eyebrow accent">{{ t.trustPage.eyebrow }}</p>
        <h1>{{ t.trustPage.heading }}</h1>
        <p class="lede">{{ t.trustPage.lede }}</p>
        <div class="actions">
          <a class="btn btn-primary btn-lg" href="#whitepaper" @click="openPaper">{{ t.trustPage.paperLink }}</a>
          <RouterLink class="btn btn-outline btn-lg" :to="localePath('/demo', locale)">{{ t.nav.demo }}</RouterLink>
        </div>
      </div>
      <div class="hero-aside">
        <pre class="code"><span class="k">cipher</span>    <span class="v">AES-256-GCM</span>
<span class="k">wrap</span>      <span class="v">ML-KEM-1024</span>
<span class="k">kdf</span>        <span class="v">HKDF-SHA384</span>

<span class="k">sealed</span>    <span class="ok">{{ t.trustPage.envelope[0][0] }}</span>
<span class="k">sealed</span>    <span class="ok">{{ t.trustPage.envelope[1][0] }}</span>
<span class="k">sealed</span>    <span class="ok">{{ t.trustPage.envelope[2][0] }}</span>
<span class="k">sealed</span>    <span class="ok">{{ t.trustPage.envelope[3][0] }}</span></pre>
        <p class="code-caption">{{ t.trustPage.envelopeDesc }}</p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <h2>{{ t.trustPage.layersTitle }}</h2>
        <p class="lede">{{ t.trustPage.layersDesc }}</p>
      </div>
      <div class="four">
        <article v-for="(item, index) in t.trustPage.layers" :key="item[0]" class="benefit">
          <span class="num">{{ String(index + 1).padStart(2, '0') }}</span>
          <h3>{{ item[0] }}</h3>
          <p>{{ item[1] }}</p>
        </article>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <h2>{{ t.trustPage.envelopeTitle }}</h2>
        <p class="lede">{{ t.trustPage.envelopeDesc }}</p>
      </div>
      <div class="console-grid">
        <article v-for="item in t.trustPage.envelope" :key="item[0]" class="card pad">
          <h3>{{ item[0] }}</h3>
          <p>{{ item[1] }}</p>
        </article>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <h2>{{ t.trustPage.holdTitle }}</h2>
      </div>
      <div class="two">
        <article class="card pad">
          <h3>{{ t.trustPage.cannotTitle }}</h3>
          <ul class="checks">
            <li v-for="item in t.trustPage.cannot" :key="item">{{ item }}</li>
          </ul>
        </article>
        <article class="card pad">
          <h3>{{ t.trustPage.canTitle }}</h3>
          <ul class="checks">
            <li v-for="item in t.trustPage.can" :key="item">{{ item }}</li>
          </ul>
        </article>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <h2>{{ t.trustPage.faqTitle }}</h2>
      </div>
      <dl class="faq">
        <div v-for="item in t.trustPage.faq" :key="item[0]">
          <dt>{{ item[0] }}</dt>
          <dd>{{ item[1] }}</dd>
        </div>
      </dl>
    </div>
  </section>

  <section class="section" id="whitepaper">
    <article class="wrap prose paper">
      <p class="eyebrow accent">{{ paper.eyebrow }}</p>
      <h2>{{ paper.heading }}</h2>
      <p class="updated">{{ paper.updated }}</p>
      <p class="lede">{{ paper.lede }}</p>
      <section v-for="section in paper.sections" :key="section.heading">
        <h3>{{ section.heading }}</h3>
        <template v-for="(block, index) in section.blocks" :key="index">
          <p v-if="block.type === 'p'">
            <template v-for="(seg, sIdx) in splitStatusBadges(block.text)" :key="sIdx">
              <span v-if="seg.badge" :class="['status-badge', `status-${seg.kind}`]">{{ seg.text }}</span>
              <template v-else>{{ seg.text }}</template>
            </template>
          </p>
          <h4 v-else-if="block.type === 'h3'" class="subhead">
            <template v-for="(seg, sIdx) in splitStatusBadges(block.text)" :key="sIdx">
              <span v-if="seg.badge" :class="['status-badge', `status-${seg.kind}`]">{{ seg.text }}</span>
              <template v-else>{{ seg.text }}</template>
            </template>
          </h4>
          <ul v-else-if="block.type === 'ul'">
            <li v-for="item in block.items" :key="item">
              <template v-for="(seg, sIdx) in splitStatusBadges(item)" :key="sIdx">
                <span v-if="seg.badge" :class="['status-badge', `status-${seg.kind}`]">{{ seg.text }}</span>
                <template v-else>{{ seg.text }}</template>
              </template>
            </li>
          </ul>
          <ol v-else-if="block.type === 'ol'">
            <li v-for="item in block.items" :key="item">
              <template v-for="(seg, sIdx) in splitStatusBadges(item)" :key="sIdx">
                <span v-if="seg.badge" :class="['status-badge', `status-${seg.kind}`]">{{ seg.text }}</span>
                <template v-else>{{ seg.text }}</template>
              </template>
            </li>
          </ol>
          <div v-else-if="block.type === 'table'" class="table-wrap">
            <table class="doc-table">
              <thead>
                <tr>
                  <th v-for="cell in block.head" :key="cell" scope="col">{{ cell }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, rIdx) in block.rows" :key="rIdx">
                  <td v-for="(cell, cIdx) in row" :key="cIdx">
                    <template v-for="(seg, sIdx) in splitStatusBadges(cell)" :key="sIdx">
                      <span v-if="seg.badge" :class="['status-badge', `status-${seg.kind}`]">{{ seg.text }}</span>
                      <template v-else>{{ seg.text }}</template>
                    </template>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>
      </section>
    </article>
  </section>

  <section class="section" id="disclosure">
    <div class="wrap">
      <div class="section-head">
        <h2>{{ t.trustPage.disclosureTitle }}</h2>
        <p class="lede">{{ t.trustPage.disclosureBody }}</p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap cta">
      <h2>{{ t.trustPage.ctaTitle }}</h2>
      <p class="lede">{{ t.trustPage.ctaBody }}</p>
      <div class="actions">
        <RouterLink class="btn btn-primary btn-lg" :to="localePath('/demo', locale)">{{ t.nav.demo }}</RouterLink>
      </div>
    </div>
  </section>
</template>
