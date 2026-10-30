<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Breadcrumb from '../components/Breadcrumb.vue'
import { localePath, useI18n } from '../i18n'
import { DOWNLOAD_URLS, GITHUB_URL } from '../config'
import { detectPlatform, type DesktopPlatform } from '../platform'

const { locale, t } = useI18n()
const platform = ref<DesktopPlatform>('other')

onMounted(() => {
  platform.value = detectPlatform()
})
</script>

<template>
  <section class="hero">
    <div class="wrap hero-grid">
      <div>
        <Breadcrumb :current="t.nav.app" />
        <p class="eyebrow accent">{{ t.appPage.eyebrow }}</p>
        <h1>{{ t.appPage.heading }}</h1>
        <p class="lede">{{ t.appPage.lede }}</p>
        <div class="actions">
          <a class="btn btn-primary btn-lg" :href="GITHUB_URL" target="_blank" rel="noopener noreferrer">
            <svg class="icon" viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
            {{ t.appPage.primary }}
          </a>
          <a class="btn btn-outline btn-lg btn-download" :href="DOWNLOAD_URLS[platform]" target="_blank" rel="noopener noreferrer">
            <span>{{ t.appPage.download }}</span>
            <span class="btn-sub">{{ t.appPage.downloadFor[platform] }}</span>
          </a>
          <RouterLink class="btn btn-ghost btn-lg" :to="localePath('/mcp', locale)">{{ t.appPage.secondary }}</RouterLink>
        </div>
        <p class="hero-note">{{ t.appPage.note }}</p>
      </div>
      <div class="hero-aside">
        <pre class="code"><span class="k">$</span> <span class="v">git clone</span> <span class="k">\
    https://github.com/Saturn-Technology-Project/Saturn-App.git</span>
<span class="k">$</span> <span class="v">cd</span> <span class="k">Saturn-App</span>
<span class="k">$</span> <span class="v">npm install</span> <span class="k">--prefix runtime</span>
<span class="k">$</span> <span class="v">npm install</span> <span class="k">--prefix desktop</span>
<span class="k">$</span> <span class="v">npm run desktop</span>

<span class="ok">Saturn Runtime listening on 127.0.0.1:4700</span>
<span class="ok">Saturn Desktop ready</span></pre>
        <p class="code-caption">{{ t.appPage.specs[0][1] }}</p>
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
        <a class="btn btn-primary btn-lg" :href="GITHUB_URL" target="_blank" rel="noopener noreferrer">{{ t.appPage.primary }}</a>
        <a class="btn btn-outline btn-lg btn-download" :href="DOWNLOAD_URLS[platform]" target="_blank" rel="noopener noreferrer">
          <span>{{ t.appPage.download }}</span>
          <span class="btn-sub">{{ t.appPage.downloadFor[platform] }}</span>
        </a>
      </div>
    </div>
  </section>
</template>
