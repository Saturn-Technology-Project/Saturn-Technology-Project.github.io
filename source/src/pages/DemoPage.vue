<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useI18n } from '../i18n'
import { DEMO_FORM_ENDPOINT } from '../config'

const { t } = useI18n()

type Field = 'name' | 'email' | 'company' | 'website'

const form = reactive({
  name: '',
  email: '',
  company: '',
  website: '',
  role: '',
  message: '',
  companyFax: '',
})

const errors = ref<Partial<Record<Field, string>>>({})
const status = ref<'idle' | 'sending' | 'sent' | 'error'>('idle')

function websiteHost(value: string) {
  return value.trim().replace(/^https?:\/\//i, '').replace(/\/.*$/, '').replace(/\.$/, '')
}

function validate() {
  const copy = t.value.demoPage.errors
  const next: Partial<Record<Field, string>> = {}
  if (!form.name.trim()) next.name = copy.required
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = copy.email
  if (!form.company.trim()) next.company = copy.required
  if (!/^([a-z0-9-]+\.)+[a-z]{2,}$/i.test(websiteHost(form.website))) next.website = copy.website
  errors.value = next
  return Object.keys(next).length === 0
}

async function submit() {
  if (status.value === 'sending') return
  if (form.companyFax) {
    status.value = 'sent'
    return
  }
  if (!validate()) return

  status.value = 'sending'
  const company = form.company.trim()
  try {
    const response = await fetch(DEMO_FORM_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: form.name.trim(),
        email: form.email.trim(),
        company,
        website: form.website.trim(),
        role: form.role.trim(),
        message: form.message.trim(),
        _replyto: form.email.trim(),
        _subject: `Saturn demo request — ${company}`,
        _template: 'table',
        _captcha: 'false',
      }),
    })
    const data = (await response.json().catch(() => null)) as { success?: string | boolean } | null
    const ok = response.ok && data?.success !== false && data?.success !== 'false'
    status.value = ok ? 'sent' : 'error'
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <section class="page-hero">
    <div class="wrap demo-layout">
      <div>
        <p class="eyebrow accent">{{ t.demoPage.eyebrow }}</p>
        <h1>{{ t.demoPage.heading }}</h1>
        <p class="lede">{{ t.demoPage.lede }}</p>
      </div>

      <div v-if="status === 'sent'" class="card demo-form demo-success">
        <h2>{{ t.demoPage.successTitle }}</h2>
        <p>{{ t.demoPage.successBody }}</p>
        <RouterLink class="btn btn-outline" to="/">{{ t.demoPage.back }}</RouterLink>
      </div>

      <form v-else class="card demo-form" novalidate @submit.prevent="submit">
        <div class="hp" aria-hidden="true">
          <label>
            Fax
            <input v-model="form.companyFax" type="text" name="company_fax" tabindex="-1" autocomplete="off" />
          </label>
        </div>

        <div class="field">
          <label for="demo-name">{{ t.demoPage.name }}</label>
          <input id="demo-name" v-model="form.name" name="name" type="text" autocomplete="name" :placeholder="t.demoPage.placeholders.name" :aria-invalid="Boolean(errors.name)" required />
          <p v-if="errors.name" class="field-error">{{ errors.name }}</p>
        </div>

        <div class="field">
          <label for="demo-email">{{ t.demoPage.email }}</label>
          <input id="demo-email" v-model="form.email" name="email" type="email" autocomplete="email" :placeholder="t.demoPage.placeholders.email" :aria-invalid="Boolean(errors.email)" required />
          <p v-if="errors.email" class="field-error">{{ errors.email }}</p>
        </div>

        <div class="field">
          <label for="demo-company">{{ t.demoPage.company }}</label>
          <input id="demo-company" v-model="form.company" name="company" type="text" autocomplete="organization" :placeholder="t.demoPage.placeholders.company" :aria-invalid="Boolean(errors.company)" required />
          <p v-if="errors.company" class="field-error">{{ errors.company }}</p>
        </div>

        <div class="field">
          <label for="demo-website">{{ t.demoPage.website }}</label>
          <input id="demo-website" v-model="form.website" name="website" type="text" inputmode="url" autocomplete="url" :placeholder="t.demoPage.placeholders.website" :aria-invalid="Boolean(errors.website)" required />
          <p v-if="errors.website" class="field-error">{{ errors.website }}</p>
        </div>

        <div class="field">
          <label for="demo-role">{{ t.demoPage.role }} <span class="optional">{{ t.demoPage.optional }}</span></label>
          <input id="demo-role" v-model="form.role" name="role" type="text" autocomplete="organization-title" :placeholder="t.demoPage.placeholders.role" />
        </div>

        <div class="field">
          <label for="demo-message">{{ t.demoPage.message }} <span class="optional">{{ t.demoPage.optional }}</span></label>
          <textarea id="demo-message" v-model="form.message" name="message" :placeholder="t.demoPage.placeholders.message" />
        </div>

        <p v-if="status === 'error'" class="form-error" role="alert">{{ t.demoPage.error }}</p>

        <button class="btn btn-primary" type="submit" :disabled="status === 'sending'">
          {{ status === 'sending' ? t.demoPage.sending : t.demoPage.submit }}
        </button>
      </form>
    </div>
  </section>
</template>
