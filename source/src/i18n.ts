import { computed, ref, watch } from 'vue'

export type Locale = 'en' | 'zh'

const STORAGE_KEY = 'saturn-locale'

function readStored(): Locale {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'zh') return saved
  } catch {
    /* ignore */
  }
  return 'en'
}

export const locale = ref<Locale>(readStored())

const messages = {
  en: {
    meta: {
      title: 'Saturn — Autonomous agents for real business',
      description:
        'Saturn provides the infrastructure for AI agents to operate inside real business workflows.',
    },
    nav: {
      home: 'Saturn home',
      product: 'Product',
      approach: 'Approach',
      developers: 'Developers',
      tryDemo: 'Try Demo',
      menu: 'Toggle menu',
    },
    hero: {
      eyebrow: 'Saturn Technology',
      title: ['Autonomous agents', 'for real business.'],
      desc: 'Saturn provides the infrastructure for AI agents to operate inside real business workflows.',
      explore: 'Explore Saturn',
      contact: 'Contact',
      flow: ['Business', 'Agent', 'Tools', 'Action'],
    },
    problem: {
      title: ['AI can think.', 'Businesses need it to act.'],
      body: 'Modern AI can reason and generate. But real business work requires access, permissions, systems, and execution.',
      flow: ['Think', 'Access', 'Act'],
    },
    product: {
      title: ['The infrastructure between', 'AI and the real world.'],
      diagramAria: 'AI agent connected through tools, policy, and identity to business',
      agent: 'AI AGENT',
      tools: 'TOOLS',
      policy: 'POLICY',
      identity: 'IDENTITY',
      business: 'BUSINESS',
    },
    workflow: {
      title: 'Built around your business.',
      body: 'Every business has different systems and workflows. Saturn connects AI agents to the infrastructure businesses already use.',
      flow: ['Your Systems', 'Saturn', 'Your Agents', 'Autonomous Work'],
    },
    governance: {
      title: 'Autonomous, with control.',
      lede: 'Give agents autonomy without giving up control.',
      items: ['Identity', 'Permissions', 'Policies', 'Audit'],
    },
    cta: {
      title: 'Bring your workflow to life.',
      body: 'Show us a workflow. We’ll help turn it into an autonomous agent.',
      talk: 'Talk to Saturn',
      explore: 'Explore the architecture',
    },
    footer: {
      tagline: 'Infrastructure for autonomous business agents.',
      product: 'Product',
      approach: 'Approach',
      developers: 'Developers',
      project: 'A Prism Technology Project',
    },
    productPage: {
      title: 'Product — Saturn',
      description: 'The infrastructure between AI and the real world.',
      eyebrow: 'Product',
      heading: 'The infrastructure between AI and the real world.',
      lede: 'Saturn sits between the agent and the business — so agents can use tools, follow policy, and act with a real identity.',
      pillars: [
        {
          name: 'Tools',
          body: 'Give agents access to the systems work already lives in — without rebuilding those systems.',
        },
        {
          name: 'Policy',
          body: 'Define what agents may do, when they may do it, and where they must stop.',
        },
        {
          name: 'Identity',
          body: 'Every action is attributable. Agents operate as known actors inside the business.',
        },
      ],
    },
    approachPage: {
      title: 'Approach — Saturn',
      description: 'Custom workflows. Shared infrastructure.',
      eyebrow: 'Approach',
      heading: 'Built around your business.',
      lede: 'Every business has different systems and workflows. Saturn connects AI agents to the infrastructure businesses already use.',
      points: [
        {
          name: 'Your systems stay yours',
          body: 'We connect to what you already run. Saturn does not replace your stack.',
        },
        {
          name: 'Shared infrastructure',
          body: 'Runtime, identity, policy, and control are common. The workflow is not.',
        },
        {
          name: 'Agents that can act',
          body: 'The outcome is not another chatbot. It is autonomous work inside real operations.',
        },
      ],
    },
    developersPage: {
      title: 'Developers — Saturn',
      description: 'Infrastructure for teams who build and operate agents.',
      eyebrow: 'Developers',
      heading: 'Infrastructure you can build on.',
      lede: 'Saturn gives engineering teams a controlled runtime for agents that need to act — with identity, policy, and access to existing systems.',
      github: 'GitHub',
      cards: [
        {
          name: 'Runtime',
          body: 'Execute agents against real workloads, with clear boundaries and observable actions.',
        },
        {
          name: 'Tools',
          body: 'Expose internal systems as tools the agent can call. Keep the source of truth in place.',
        },
        {
          name: 'Policy',
          body: 'Enforce permissions at execution time. Autonomy does not mean unrestricted access.',
        },
        {
          name: 'Identity',
          body: 'Map agents to identities your organization already understands — and can audit.',
        },
      ],
    },
  },
  zh: {
    meta: {
      title: 'Saturn — 為真實業務打造的自主 Agent',
      description: 'Saturn 提供基礎設施，讓 AI Agent 能在真實的企業流程中運作。',
    },
    nav: {
      home: 'Saturn 首頁',
      product: '產品',
      approach: '方法',
      developers: '開發者',
      tryDemo: '試用 Demo',
      menu: '開啟選單',
    },
    hero: {
      eyebrow: 'Saturn Technology',
      title: ['自主 Agent', '服務真實業務。'],
      desc: 'Saturn 提供基礎設施，讓 AI Agent 能在真實的企業流程中運作。',
      explore: '探索 Saturn',
      contact: '聯絡我們',
      flow: ['業務', 'Agent', '工具', '行動'],
    },
    problem: {
      title: ['AI 能思考。', '企業需要它能行動。'],
      body: '現代 AI 能推理、能生成。但真實的企業工作需要存取、權限、系統，以及執行。',
      flow: ['思考', '存取', '行動'],
    },
    product: {
      title: ['連接 AI 與真實世界的', '基礎設施。'],
      diagramAria: 'AI Agent 透過工具、政策與身份連接至業務',
      agent: 'AI AGENT',
      tools: '工具',
      policy: '政策',
      identity: '身份',
      business: '業務',
    },
    workflow: {
      title: '圍繞你的業務而建。',
      body: '每家企業的系統與流程都不同。Saturn 將 AI Agent 接到企業既有的基礎設施上。',
      flow: ['你的系統', 'Saturn', '你的 Agent', '自主作業'],
    },
    governance: {
      title: '自主，且可控。',
      lede: '讓 Agent 保有自主，同時不交出控制權。',
      items: ['身份', '權限', '政策', '審計'],
    },
    cta: {
      title: '讓你的流程真正運作起來。',
      body: '把一個 workflow 拿給我們看。我們協助把它變成自主 Agent。',
      talk: '與 Saturn 談談',
      explore: '探索架構',
    },
    footer: {
      tagline: '自主企業 Agent 的基礎設施。',
      product: '產品',
      approach: '方法',
      developers: '開發者',
      project: 'A Prism Technology Project',
    },
    productPage: {
      title: '產品 — Saturn',
      description: '連接 AI 與真實世界的基礎設施。',
      eyebrow: '產品',
      heading: '連接 AI 與真實世界的基礎設施。',
      lede: 'Saturn 位於 Agent 與業務之間——讓 Agent 能使用工具、遵守政策，並以真實身份行動。',
      pillars: [
        {
          name: '工具',
          body: '讓 Agent 存取工作原本所在的系統——不必重建那些系統。',
        },
        {
          name: '政策',
          body: '定義 Agent 能做什麼、何時能做，以及何處必須停止。',
        },
        {
          name: '身份',
          body: '每一次行動都可追溯。Agent 在企業內以已知的身份運作。',
        },
      ],
    },
    approachPage: {
      title: '方法 — Saturn',
      description: '客製化流程，共用基礎設施。',
      eyebrow: '方法',
      heading: '圍繞你的業務而建。',
      lede: '每家企業的系統與流程都不同。Saturn 將 AI Agent 接到企業既有的基礎設施上。',
      points: [
        {
          name: '系統仍是你的',
          body: '我們接上你已經在跑的系統。Saturn 不取代你的技術堆疊。',
        },
        {
          name: '共用基礎設施',
          body: 'Runtime、身份、政策與控制是共通的。流程則依每家企業而定。',
        },
        {
          name: '能真正行動的 Agent',
          body: '結果不是又一個聊天機器人，而是能在真實營運中自主作業。',
        },
      ],
    },
    developersPage: {
      title: '開發者 — Saturn',
      description: '給打造並營運 Agent 的工程團隊的基礎設施。',
      eyebrow: '開發者',
      heading: '可以在上面打造的基礎設施。',
      lede: 'Saturn 為工程團隊提供受控的 Agent Runtime——具備身份、政策，以及對既有系統的存取。',
      github: 'GitHub',
      cards: [
        {
          name: 'Runtime',
          body: '在真實工作負載上執行 Agent，邊界清楚，行動可觀測。',
        },
        {
          name: '工具',
          body: '把內部系統暴露為 Agent 可呼叫的工具。資料真相仍留在原處。',
        },
        {
          name: '政策',
          body: '在執行時強制權限。自主不代表不受限的存取。',
        },
        {
          name: '身份',
          body: '將 Agent 對應到組織已理解、且可審計的身份。',
        },
      ],
    },
  },
} as const

export type PageName = 'home' | 'product' | 'approach' | 'developers'

watch(
  locale,
  (value) => {
    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch {
      /* ignore */
    }
    document.documentElement.lang = value === 'zh' ? 'zh-Hant' : 'en'
  },
  { immediate: true },
)

export function pageMeta(page: PageName) {
  const m = messages[locale.value]
  if (page === 'product') return { title: m.productPage.title, description: m.productPage.description }
  if (page === 'approach') return { title: m.approachPage.title, description: m.approachPage.description }
  if (page === 'developers') return { title: m.developersPage.title, description: m.developersPage.description }
  return { title: m.meta.title, description: m.meta.description }
}

export function useI18n() {
  const t = computed(() => messages[locale.value])

  function setLocale(next: Locale) {
    locale.value = next
  }

  function toggleLocale() {
    locale.value = locale.value === 'en' ? 'zh' : 'en'
  }

  return { locale, t, setLocale, toggleLocale }
}
