import { computed } from 'vue'
import { locale, type Locale } from './i18n'

// Saturn is free. This copy replaces the old plan tiers on the pricing page, the plan grid and the
// home page's plan section. It lives here rather than in i18n.ts so the two can be edited separately.
const copy = {
  en: {
    plansTitle: 'Free for everyone',
    plansDesc: 'Every feature, on every account, at no cost. If Saturn helps you, you can sponsor it.',
    free: {
      kind: 'Everyone',
      name: 'Saturn',
      price: '$0',
      period: 'forever',
      tagline: 'The desktop App and the MCP gateway, with nothing held back.',
      points: [
        'Saturn App for macOS and Windows, MIT licensed',
        'MCP gateway with unlimited tool sets and audit history',
        'Versioned policies and signed webhooks',
        'Approvals, groups and multi-person quorum',
        'Encrypted tool payloads',
      ],
      cta: 'Start free',
    },
    donate: {
      kind: 'Support',
      name: 'Donate us',
      tagline: 'Saturn is built in the open and paid for by the people who use it. Sponsorship keeps it free.',
      points: ['Monthly or one-time, any amount', 'Through GitHub Sponsors'],
      cta: 'Donate us',
    },
    page: {
      eyebrow: 'Pricing',
      heading: 'Saturn is free.',
      lede: 'The desktop App and the MCP gateway cost nothing, and every account gets every feature: policies, webhooks, group approvals, and full audit history.',
      includedTitle: 'Included for everyone',
      included: [
        'Saturn App for macOS and Windows',
        'Your own models and MCP servers',
        'MCP gateway with policies, approvals and audit',
        'Open-source runtime, MIT licensed',
        'Community support on GitHub',
      ],
      faqTitle: 'Questions',
      faq: [
        ['Is Saturn really free?', 'Yes. There are no paid plans, no usage tiers and no trial. Every account can use every feature of the App and the gateway.'],
        ['How is Saturn paid for?', 'By sponsors. If Saturn is useful to you or your team, you can support it through GitHub Sponsors, monthly or once.'],
        ['Will features move behind a paywall later?', 'Nothing you use today is planned to become paid. If that ever changes, it will be announced well ahead.'],
        ['Is there support?', 'Community support on GitHub. For anything else, write to hello@saturn-core.com.'],
      ] as [string, string][],
      ctaTitle: 'Keep Saturn free',
      ctaBody: 'Sponsoring pays for hosting and development, and keeps every feature open to everyone.',
    },
  },
  zh: {
    plansTitle: '所有人免費',
    plansDesc: '每個帳號都能免費使用全部功能。如果 Saturn 對你有幫助，歡迎贊助。',
    free: {
      kind: '所有人',
      name: 'Saturn',
      price: '$0',
      period: '永久',
      tagline: '桌面 App 與 MCP Gateway，全部功能都不保留。',
      points: [
        'macOS 與 Windows 的 Saturn App，MIT 授權',
        'MCP Gateway，工具集與審計紀錄無上限',
        '版本化政策與簽章 Webhook',
        '核准、群組與多人門檻',
        '加密的工具內容',
      ],
      cta: '免費開始',
    },
    donate: {
      kind: '支持',
      name: '贊助我們',
      tagline: 'Saturn 公開開發，由使用它的人支持。你的贊助讓它保持免費。',
      points: ['每月或單次，金額不限', '透過 GitHub Sponsors'],
      cta: '贊助我們',
    },
    page: {
      eyebrow: '方案與定價',
      heading: 'Saturn 完全免費。',
      lede: '桌面 App 與 MCP Gateway 都不收費，每個帳號都能使用全部功能：政策、Webhook、群組核准，以及完整的審計紀錄。',
      includedTitle: '所有人都包含',
      included: [
        'macOS 與 Windows 的 Saturn App',
        '使用自己的模型與 MCP Server',
        'MCP Gateway：政策、核准與審計',
        '開源 Runtime，MIT 授權',
        'GitHub 社群支援',
      ],
      faqTitle: '常見問題',
      faq: [
        ['Saturn 真的免費嗎？', '是的。沒有付費方案、沒有用量分級，也沒有試用期限。每個帳號都能使用 App 與 Gateway 的全部功能。'],
        ['Saturn 靠什麼維持？', '靠贊助。如果 Saturn 對你或你的團隊有幫助，可以透過 GitHub Sponsors 每月或單次支持。'],
        ['以後會把功能改成付費嗎？', '目前沒有計畫把現有功能改成付費。如果有任何變動，會提早公告。'],
        ['有客服支援嗎？', '透過 GitHub 社群支援。其他問題請寫信到 hello@saturn-core.com。'],
      ] as [string, string][],
      ctaTitle: '讓 Saturn 保持免費',
      ctaBody: '贊助會用在主機與開發費用上，讓所有功能持續對每個人開放。',
    },
  },
} satisfies Record<Locale, unknown>

export function freePricing(lang: Locale) {
  return copy[lang]
}

export function useFreePricing() {
  return computed(() => copy[locale.value])
}
