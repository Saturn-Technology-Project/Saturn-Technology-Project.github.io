import { computed, ref } from 'vue'
import { legalCopy } from './legal'

export type Locale = 'en' | 'zh'

function localeFromPath(path: string): Locale {
  return path === '/zh' || path.startsWith('/zh/') ? 'zh' : 'en'
}

export const locale = ref<Locale>(
  typeof window === 'undefined' ? 'en' : localeFromPath(window.location.pathname),
)

export function localePath(path: string, lang: Locale): string {
  const withSlash = path.startsWith('/') ? path : `/${path}`
  const bare = withSlash === '/zh' ? '/' : withSlash.startsWith('/zh/') ? withSlash.slice(3) : withSlash
  if (lang === 'zh') return bare === '/' ? '/zh' : `/zh${bare}`
  return bare
}

const messages = {
  en: {
    meta: {
      title: 'Saturn — Secure MCP Gateway for AI Agents',
      description:
        'Saturn is a secure MCP gateway between AI agents and your tools. It enforces argument-level permissions, human approval, and a complete audit trail.',
    },
    nav: {
      home: 'Saturn home',
      mcp: 'Saturn MCP',
      app: 'Saturn App',
      trust: 'Trust',
      pricing: 'Pricing',
      start: 'Get started',
      menu: 'Toggle menu',
    },
    hero: {
      eyebrow: 'MCP Gateway for enterprise AI agents',
      title: 'Give your AI agents access to tools. Keep control of every action.',
      desc: 'Saturn is a secure MCP gateway that sits between your AI agents and your MCP servers. Centralize access, enforce fine-grained permissions, require human approval for sensitive actions, and keep a complete audit trail — all from one console.',
      primary: 'Get started',
      secondary: 'Explore Saturn App',
      note: 'Works with any Model Context Protocol (MCP) client. No changes to your existing MCP servers.',
      mock: {
        header: 'Approval required',
        agent: 'Agent',
        agentValue: 'finance-ops',
        tool: 'Tool',
        toolValue: 'payments.transfer',
        args: 'Arguments',
        argsValue: 'amount: 4,800 USD → vendor_7731',
        rule: 'Matched rule',
        ruleValue: 'Payments v3 · amount > 1000',
        approve: 'Approve',
        reject: 'Reject',
        footer: 'Requested 12 seconds ago · waiting for a reviewer',
      },
    },
    logos: {
      label: 'Compatible with',
      items: ['Claude', 'ChatGPT', 'Cursor', 'Gemini', 'LM Studio', 'Any MCP client'],
    },
    benefits: {
      title: 'Connect once. Control precisely. Prove compliance.',
      items: [
        ['Connect once', 'One MCP endpoint for every agent and every MCP server in your organization. Register a server, and its tools are available to govern immediately.'],
        ['Control precisely', 'Decide which tools each agent can see and under which conditions it may call them — down to individual arguments like amount, environment, or recipient.'],
        ['Prove compliance', 'Every request, policy decision, approval, and execution is recorded. Answer who did what, when, why it was allowed, and who approved it.'],
      ],
    },
    vs: {
      title: 'AI agents are powerful. Without a gateway, they are also unaccountable.',
      desc: 'Most teams connect agents directly to MCP servers. It works in a demo. It does not hold up in production.',
      withoutLabel: 'Without Saturn',
      without: [
        'Every agent holds its own API keys and OAuth tokens',
        'Tool access is all-or-nothing per MCP server',
        'No way to pause a sensitive action for human review',
        'Logs are scattered across servers, if they exist at all',
        'Revoking one agent means rotating credentials everywhere',
      ],
      withLabel: 'With Saturn',
      with: [
        'Credentials stay in a post-quantum encrypted vault; agents never see them',
        'Curated tool sets per agent, with argument-level policy rules',
        'Built-in approval queue for sensitive calls, with full context',
        'One audit trail, with stored payloads under zero-access encryption so the gateway cannot read them after archival (while processing plaintext in flight)',
        'Pause an agent or reject a call instantly from the console',
      ],
    },
    features: {
      title: 'Everything you need to run AI agents in production.',
      desc: 'Saturn covers the full lifecycle of a tool call: identity, access, policy, approval, execution, and audit.',
      items: [
        {
          num: '01',
          code: false,
          eyebrow: 'Unified MCP gateway',
          title: 'One endpoint for all your agents and tools',
          points: [
            'Standards-compliant MCP endpoint over HTTP — initialize, tools/list, and tools/call',
            'OAuth 2.1 with PKCE for every agent connection, bound to a user or an organization',
            'Register any MCP server by URL; Saturn discovers and catalogs its tools automatically',
            'Managed upstream OAuth with dynamic client registration and automatic token refresh',
          ],
        },
        {
          num: '02',
          eyebrow: 'Fine-grained access control',
          title: 'Permissions down to the argument level',
          points: [
            'Tool sets: choose exactly which tools each agent can see in tools/list',
            'Per-tool mode: mark any tool as Call (automatic) or Approval (human-confirmed)',
            'Policy rules with conditions on arguments — amount > 1000, environment == "production"',
            'Versioned policies with full change history, evaluated on every single call',
          ],
          code: true,
        },
        {
          num: '03',
          code: false,
          eyebrow: 'Human-in-the-loop',
          title: 'Approvals built into the request path',
          points: [
            'Sensitive calls pause until one reviewer approves, or until every required group reaches its quorum',
            'After approval, the agent resumes that same task by passing saturnRunId on the tool call',
            'Pending approvals expire, and so does the window for the agent to resubmit',
            'Signed webhooks report granted, rejected, and expired. A webhook response does not run the tool',
          ],
        },
        {
          num: '04',
          code: false,
          eyebrow: 'Enterprise-grade security',
          title: 'Secrets never leave the gateway',
          points: [
            'Upstream tokens stay in a vault sealed with ML-KEM-1024 and AES-256-GCM',
            'Stored audit payloads use zero-access encryption: wrapped to the organization key and each member’s public key before the data key is deleted (the gateway processes plaintext in flight and encrypts pending approvals with a server-side key for 7 days)',
            'A member’s private key is encrypted with a key derived from their password. Saturn cannot unwrap it',
            'A recovery key, never uploaded, restores the organization key. Another member can rewrap records after a password reset',
          ],
        },
        {
          num: '05',
          code: false,
          eyebrow: 'Audit',
          title: 'See the decision without storing the raw payload in the clear',
          points: [
            'Every step is an event: requested, evaluated, approval requested, granted or rejected, executed',
            'The console keeps who called, which tool, the policy version, and the decision',
            'An authorized member decrypts the raw request and response in the browser after signing in',
            'Every account keeps unlimited audit history. Authorized members decrypt raw payloads in the browser',
          ],
        },
        {
          num: '06',
          code: false,
          eyebrow: 'Team and role management',
          title: 'Built for organizations, not just individuals',
          points: [
            'Groups and a quorum hold a high-risk call until enough people approve',
            'One person’s vote counts in every group they belong to',
            'Scope editors to specific agents so teams only manage what they own',
            'Map which MCP servers each employee is allowed to connect',
          ],
        },
      ],
      caption: 'A policy as the engine evaluates it. Conditions are matched against the arguments of each call.',
    },
    compare: {
      title: 'Why a dedicated MCP gateway?',
      desc: 'API gateways govern services. Saturn governs agents — a caller that reasons, chooses tools, and needs to be stopped sometimes.',
      columns: [
        {
          name: 'Direct connection',
          ours: false,
          items: [
            'Agent holds every credential',
            'Every tool on the server is exposed',
            'No approval step',
            'No central audit trail',
          ],
        },
        {
          name: 'API gateway',
          ours: false,
          items: [
            'Sees routes and methods, not tools',
            'No conditions on tool arguments',
            'No human approval workflow',
            'Designed for services, not agents',
          ],
        },
        {
          name: 'Saturn',
          ours: true,
          items: [
            'Credentials sealed in the gateway',
            'Tool sets and argument-level policy',
            'Built-in approval queue',
            'One audit trail for every agent',
          ],
        },
      ],
    },
    console: {
      title: 'One console for every agent in your organization.',
      desc: 'Saturn Console gives security, platform, and operations teams a shared view of what agents can do and what they have done.',
      items: [
        ['Overview', 'Active agents, pending approvals, recent denials, and spend at a glance.'],
        ['Agents', 'Register agents, assign tool sets, pause or resume, and scope who may edit them.'],
        ['Saturn MCP', 'Connect MCP servers, review discovered tools, and build tool sets.'],
        ['Policy', 'Author and version rules; see which policy decided each call.'],
        ['Intervention', 'Approve or reject a call. Multi-approver tasks wait until every required group is done.'],
        ['Resubmit', 'Approved tasks wait on their own page until the agent calls the tool again with saturnRunId.'],
        ['Audit', 'Search governance events. Raw requests and responses open only in an authorized member’s browser.'],
        ['Webhooks', 'Signed notices for approval granted, rejected, and expired. Delivery does not execute the tool.'],
        ['Identity', 'Members, roles, custom permissions, and MCP server mapping per employee.'],
      ],
    },
    cta: {
      title: 'Ready to bring your AI agents under control?',
      body: 'Connect an MCP server, build a tool set, write your first policy. See the full request path on your first approval.',
      primary: 'Get started',
      secondary: 'Explore Saturn App',
    },
    footer: {
      tagline: 'The secure MCP gateway for enterprise AI agents.',
      product: 'Product',
      legal: 'Legal',
      mcp: 'Saturn MCP',
      app: 'Saturn App',
      trust: 'Trust',
      pricing: 'Pricing',
      terms: 'Terms of Service',
      privacy: 'Privacy Policy',
      project: 'Saturn Project by Rick Weng',
    },
    homeFaq: {
      title: 'Questions about Saturn',
      items: [
        ['What is Saturn?', 'Saturn is a secure MCP gateway between AI agents and the tools they call. It centralizes access, enforces fine-grained permissions, requires a person to approve sensitive actions, and keeps a complete audit trail in one console.'],
        ['What is an MCP gateway?', 'MCP (Model Context Protocol) is the standard AI agents use to call tools. An MCP gateway sits in front of your MCP servers. Agents talk only to Saturn, which exposes the tools you choose, evaluates every call against policy, and forwards only the calls that are allowed.'],
        ['Which AI clients work with Saturn?', 'Any MCP client, including Claude, ChatGPT, Cursor, Gemini, LM Studio, and Saturn App. Every agent uses one Saturn MCP endpoint. Existing MCP servers do not need code changes.'],
        ['How is Saturn different from an API gateway?', 'An API gateway governs services by route and HTTP method. Saturn governs agents. It understands tools and arguments, can hold a call for human approval, and records which policy and which reviewer allowed it.'],
        ['Do agents see API keys or OAuth tokens?', 'No. Upstream credentials stay in Saturn’s vault, sealed with ML-KEM-1024 post-quantum key encapsulation and AES-256-GCM. Agents receive only the result of an authorized call. APIs report whether a secret exists, never the secret itself.'],
        ['Is Saturn App free?', 'Yes. Saturn App is a free, open-source desktop workbench for AI research, MIT licensed. It runs on your computer with your models and files. The MCP gateway is free too, with policies, webhooks, and group approvals on every account.'],
      ],
    },
    mcpPage: {
      title: 'Saturn MCP — The MCP gateway for AI agents',
      description: 'Saturn MCP is the MCP server your AI agents talk to. It exposes only approved tools, checks every call against policy, and records the audit trail.',
      eyebrow: 'Saturn MCP',
      heading: 'The MCP gateway that decides what your agents may do.',
      lede: 'Saturn MCP is the MCP server your agents talk to. Behind it sit your real MCP servers — CRM, payments, databases, cloud consoles. Saturn exposes only the tools you approve, evaluates every call against policy, pauses the sensitive ones for a human, and records everything.',
      primary: 'Get started',
      secondary: 'Read the whitepaper',
      note: 'Standards-compliant MCP over HTTP. Works with Claude, ChatGPT, Cursor, Saturn App, or any MCP client.',
      howTitle: 'Up and running in four steps.',
      howDesc: 'No SDK, no agent code changes. Saturn works at the protocol level.',
      how: [
        ['Connect your MCP servers', 'Register each server by URL. Saturn discovers its tools, handles OAuth where needed, and seals the credentials in its vault.'],
        ['Build tool sets', 'Pick the tools each agent should have — across servers. Mark any tool as Call (automatic) or Approval (needs a person).'],
        ['Write policies', 'Add rules with conditions on arguments. Decide per rule: allow, approval required, or deny. Policies are versioned.'],
        ['Point agents at Saturn', 'Give every agent the same Saturn MCP endpoint. They sign in with OAuth and see only their tool set.'],
      ],
      casesTitle: 'What teams run through Saturn.',
      casesDesc: 'Four examples of agents that are useful precisely because they are governed.',
      cases: [
        {
          team: 'Finance operations',
          title: 'An agent that pays vendors — with a human on large amounts',
          body: 'The finance agent reconciles invoices and triggers payments through the payments MCP server. Small transfers run automatically. Anything above the threshold waits for a reviewer, who sees the amount, the recipient, and the invoice reference before approving.',
          rules: ['payments.transfer · amount ≤ 1000 → allow', 'payments.transfer · amount > 1000 → approval required', 'payments.refund · amount > 10000 → deny'],
        },
        {
          team: 'Customer support',
          title: 'A support agent that can read and reply, but never delete',
          body: 'The support agent gets a tool set with CRM lookup, ticket updates, and email reply. Destructive CRM tools are not in the set, so for this agent they do not exist. Emails to external domains require approval; internal notes go straight through.',
          rules: ['crm.get_customer · allow', 'tickets.update · allow', 'email.send · recipient not in company domain → approval required', 'crm.delete_customer · not in tool set'],
        },
        {
          team: 'Platform and DevOps',
          title: 'A release agent that deploys to staging freely, to production with sign-off',
          body: 'The release agent runs rollouts through your deployment MCP server. Staging is automatic. Production rollouts pause for an on-call engineer. Schema-destroying operations are denied outright, regardless of environment.',
          rules: ['deploy.rollout · environment == "staging" → allow', 'deploy.rollout · environment == "production" → approval required', 'db.drop_table · deny'],
        },
        {
          team: 'Data and analytics',
          title: 'Analyst agents for every team, each confined to its own data',
          body: 'Each team gets analyst agents with read-only warehouse tools. Server mapping decides which teams may attach the warehouse at all. Editors are scoped to their own agents, and every query is attributed to the person the agent acted for.',
          rules: ['warehouse.query · allow', 'warehouse.export · row_count > 100000 → approval required', 'Marketing accounts · warehouse server not mapped'],
        },
      ],
      capTitle: 'What the gateway handles for you.',
      capDesc: 'Everything between the agent\u2019s request and your upstream server.',
      caps: [
        ['Identity', 'OAuth 2.1 with PKCE for every agent. Each session is bound to a user or an organization; the profile is checked on every request.'],
        ['Tool discovery', 'Register MCP servers by URL. Saturn discovers tools, keeps the catalog current, and manages upstream OAuth and token refresh.'],
        ['Tool sets', 'Curated tools per agent, across servers. Only those tools appear in tools/list. Each tool is Call or Approval.'],
        ['Policy engine', 'Ordered, versioned rules with conditions on arguments. Every call records the policy id, version, and matched rule.'],
        ['Approval queue', 'Sensitive calls wait for one reviewer or a group quorum. The agent resumes with saturnRunId. Approvals expire.'],
        ['Credential vault', 'Upstream tokens and secrets sealed with ML-KEM-1024 and AES-256-GCM. Agents never see them; every read is audited.'],
        ['Audit trail', 'Governance events stay searchable. Stored audit payloads use zero-access encryption and open only in a member’s browser, while the gateway processes plaintext in flight.'],
        ['Signed webhooks', 'Approval granted, rejected, and expired are signed with HMAC-SHA256. A successful delivery does not execute the tool.'],
      ],
      secTitle: 'Security built into the request path.',
      secDesc: 'An agent can never obtain more than the result of an authorized call. These are the mechanisms behind that guarantee.',
      sec: [
        ['Post-quantum credential vault', 'Access tokens, refresh tokens, and client secrets are sealed individually with ML-KEM-1024 key encapsulation and AES-256-GCM, keys derived via HKDF-SHA384. The key seed lives in configuration, never in the database.'],
        ['No plaintext over the API', 'Console and client APIs report whether a secret exists — never its value. Every secret read generates a credential_accessed audit event.'],
        ['Managed upstream OAuth', 'Saturn discovers the authorization server, performs dynamic client registration where supported, uses PKCE, and refreshes tokens automatically when an upstream returns 401.'],
        ['Network boundaries', 'Upstream URLs must use HTTPS (or HTTP on localhost). Private, link-local, and cloud metadata addresses are refused.'],
        ['Denied means never sent', 'A denied call never leaves Saturn. A held call returns approval_required with a reference id. A paused agent cannot start a call.'],
        ['Role-based access control', 'Four console resources, three access levels each. Preset roles admin, operator, viewer, or custom sets. Editors can be scoped to specific agents.'],
      ],
      ctaTitle: 'Put Saturn in front of your first MCP server today.',
      ctaBody: 'Create a free account, connect a server, and write one rule. The first approval request shows you the whole path.',
    },
    appPage: {
      title: 'Saturn App — A free, open-source workbench for AI research',
      description: 'Saturn App is a free, MIT-licensed desktop workbench for AI research. Write the code yourself, run experiments on your own computer, inspect every sample, and choose how much AI each chat gets.',
      eyebrow: 'Saturn App · Open source · Free',
      heading: 'A workbench for AI research, on your own computer.',
      lede: 'Read the method, write the code yourself, run the experiment and inspect every sample. Saturn is organized around your questions, models, experiments and findings rather than around chats, and you decide how much the assistant may do.',
      primary: 'View on GitHub',
      secondary: 'Connect to Saturn MCP',
      download: 'See releases',
      downloadNote: { released: 'macOS · Apple silicon', unreleased: 'Earlier agent, v0.3.1' },
      note: { released: 'Early preview, MIT licensed. The macOS build is not signed yet. Works offline with local models.', unreleased: 'The workbench on this page arrives with the next release. The release available today is the earlier desktop agent.' },
      asideCaption: 'A project’s research records are plain files in its own folder.',
      highlights: [
        ['Your research, not a chat', 'Questions, hypotheses, code, runs, samples and conclusions each have a place. Reopen a project and Home says where the work stopped and what is still open.'],
        ['You set how much AI', 'In each chat, choose Manual (it only reads and explains), Pair (it proposes, you approve) or Delegate (each message starts a task). Verdicts and labels stay yours.'],
        ['Your computer, your models', 'The runtime listens only on 127.0.0.1, records are files you can read, and every request it sends is in a network log. Use API keys, your Claude or ChatGPT plan, or an offline model.'],
      ],
      featTitle: 'From a question to a conclusion you can defend.',
      featDesc: 'Saturn keeps what you asked, what you ran, what it measured and what you concluded together, so a number never gets separated from how it was produced.',
      features: [
        {
          num: '01',
          eyebrow: 'Home and Workspace',
          title: 'Code beside its results',
          points: [
            'Write down the question and its hypotheses; a run that finishes says only that it executed, and the verdict is yours',
            'A code editor with the run, what it cost, its samples, your findings and a terminal underneath',
            'Reopening restores the file, the unsaved draft and the run you were on',
            'Home lists what changed since you last looked and what still needs a decision',
          ],
        },
        {
          num: '02',
          eyebrow: 'Experiments',
          title: 'Comparisons that say when they are not fair',
          points: [
            'Freeze an experiment into a version, so a changed setting or environment becomes a new version',
            'Only runs measured the same way share a chart; anything else is listed apart with what differs',
            'A score splits into what the scorer judged, what you disputed and what was excluded as an error',
            'Conclusions stay attached to the run they rest on',
          ],
        },
        {
          num: '03',
          eyebrow: 'Lineage and Samples',
          title: 'Follow a model, and read one sample from every side',
          points: [
            'Connect checkpoints to their fine-tuned branches and follow a score along the line',
            'See one sample across the models that saw it, with the scorer’s word beside your label',
            'Label without touching the score, measure how far you agree with the scorer, and keep counterexamples',
            'Look inside: read activations at every layer, or patch the residual stream from another model and sweep the layers',
          ],
        },
        {
          num: '04',
          eyebrow: 'Assistant and Tasks',
          title: 'Help that knows the workbench, and long work kept apart',
          points: [
            'A research assistant on every screen does what you set at the top of its chat: it only reads in Manual and proposes in Pair',
            'Ask how to do something and it walks you through it, boxing each place while you do the work',
            'Hand long work to a task, which runs in its own git worktree and shows what it may touch',
            'Review a task’s diff, then merge or discard it; nothing reaches the project before that',
          ],
        },
        {
          num: '05',
          eyebrow: 'Protection',
          title: 'Clear about what it can enforce',
          points: [
            'A Manual chat only reads, a Pair chat asks before each change or command, and no file tool can write a locked file',
            'In a task, a shell or Codex can still write a locked file: Saturn notices afterwards and records it, because modes and locks are a workflow constraint and not a security boundary',
            'Agents work only in folders you grant, and every edit is checkpointed and can be reverted',
            'Refusals and unexplained changes wait on one screen for you to decide',
          ],
        },
        {
          num: '06',
          eyebrow: 'Resources and environment',
          title: 'What a run cost, and what it ran on',
          points: [
            'Time, processor share, memory, GPUs where nvidia-smi can say, and how fast samples come',
            'Tokens and device memory when your program reports them',
            'See the Python, packages and devices a run uses, with lock files hashed and frozen with the version',
            'Saturn can create the environment, with optional kits for interpretability, post-training, analysis or notebooks',
          ],
        },
      ],
      specsTitle: 'Requirements',
      specs: [
        ['Platforms', 'macOS on Apple silicon. Windows x64 builds exist, but they have not been run since the Rust rewrite, so treat them as untested.'],
        ['Models', 'Anthropic, OpenAI, Google and DeepSeek with your API key; Claude Code on your Claude plan; Codex on your ChatGPT plan; LM Studio for local, offline models.'],
        ['Data', 'Research records are in the project’s .saturn/research folder. App data is in ~/.saturn-app. API keys are encrypted at rest, with the key in the macOS Keychain.'],
        ['License', 'MIT. Copyright Rick Weng.'],
      ],
      ctaTitle: 'Built in the open.',
      ctaBody: 'Saturn App is free for everyone. Star the repository, open an issue, or send a pull request.',
    },
    trustPage: {
      title: 'Saturn Trust — How keys, payloads, and credentials are protected',
      description:
        'Saturn uses zero-access encryption (AES-256-GCM and ML-KEM-1024) for stored audit payloads. Passwords are hashed in the browser before they reach the gateway. Saturn cannot unwrap member private keys.',
      eyebrow: 'Trust',
      heading: 'The gateway can run the call. It cannot read the sealed audit payload.',
      lede: 'Stored audit payloads (arguments, upstream request and response, and the downstream result) use zero-access encryption: sealed with AES-256-GCM, wrapped with ML-KEM-1024 to public keys Saturn does not hold, with the data key deleted immediately after writing.',
      layersTitle: 'Three protections, kept apart.',
      layersDesc: 'A password, a member private key, and a stored audit payload never share one secret.',
      layers: [
        ['Sign-in', 'The browser hashes the password before sending it. Saturn hashes that value again with PBKDF2 and never stores the password.'],
        ['Member private key', 'A different key, derived only in the browser, wraps the ML-KEM private key. The sign-in hash cannot open it.'],
        ['Tool payloads', 'The gateway processes plaintext in flight to forward the call, then encrypts the audit payload with a random AES-256-GCM data key, wraps it with ML-KEM-1024 to the organization and member keys, and deletes the data key.'],
        ['Upstream credentials', 'Access tokens and client secrets are sealed with the gateway’s own ML-KEM-1024 key, so an authorized call can be completed. Agents never receive the secret.'],
      ],
      envelopeTitle: 'One envelope for the whole call.',
      envelopeDesc: 'These fields are sealed with zero-access encryption (ML-KEM-1024-HKDF-SHA384-AES-256-GCM) when archived; pending approvals and active runs use a server-side KMS-derived key for 7 days.',
      envelope: [
        ['Arguments', 'The parameters the agent sent with the tool call.'],
        ['Upstream request', 'The request Saturn forwarded to the tool.'],
        ['Upstream response', 'The raw body that came back from the tool.'],
        ['Downstream result', 'The result Saturn returned to the agent.'],
      ],
      holdTitle: 'What Saturn can and cannot open.',
      cannotTitle: 'Saturn cannot open',
      cannot: [
        'Organization or member private keys',
        'The recovery key',
        'The password, or the key that wraps a member private key',
        'A stored audit payload after its data key is deleted',
      ],
      canTitle: 'Saturn can open',
      can: [
        'Who called, which tool, the policy version, and the decision',
        'Plaintext in flight while forwarding a tool call, and in-flight content (pending approvals and active runs) encrypted with a server-side key for 7 days',
        'An upstream credential, only for the duration of an authorized call',
        'Whether a secret exists — never its value — on console APIs',
      ],
      faqTitle: 'Questions',
      faq: [
        ['Can Saturn decrypt an audit payload?', 'Not after it is written to the audit log. Saturn processes plaintext in flight when forwarding a tool call; before archival, the data key is wrapped with ML-KEM-1024 to the organization and member public keys and immediately deleted. In-flight content waiting for approval or execution is encrypted separately with a server-side key for 7 days.'],
        ['Does the sign-in password unlock the private key on the server?', 'No. The value sent at sign-in is a hash. The private key is wrapped with a different key that never leaves the browser.'],
        ['Do agents see API keys or OAuth tokens?', 'No. Those secrets stay in the credential vault. Agents receive only the result of an authorized call.'],
        ['What if the organization has no payload key yet?', 'New tool content is not stored. The audit row records that encryption is unavailable, not the plaintext.'],
      ],
      ctaTitle: 'See it on your own tools.',
      ctaBody: 'Connect one MCP server and open an encrypted audit record from the browser.',
      paperLink: 'Read the whitepaper',
      disclosureTitle: 'Disclosure',
      disclosureBody:
        'Vulnerability reporting instructions will be published here. Until then, email security@saturn-core.com.',
    },
    pricingPage: {
      title: 'Saturn Pricing — Free Desktop App and MCP Gateway',
      description: 'Saturn is free. The desktop App and the MCP gateway cost nothing, and every account gets every feature. Sponsors keep it that way.',
    },
  },
  zh: {
    meta: {
      title: 'Saturn — 企業級 AI Agent 的安全 MCP Gateway',
      description:
        'Saturn 是介於 AI Agent 與工具之間的安全 MCP（Model Context Protocol）Gateway，提供參數層級權限、人工核准與完整審計紀錄。',
    },
    nav: {
      home: 'Saturn 首頁',
      mcp: 'Saturn MCP',
      app: 'Saturn App',
      trust: '信任',
      pricing: '方案與定價',
      start: '開始使用',
      menu: '開啟選單',
    },
    hero: {
      eyebrow: '企業級 AI Agent 的 MCP Gateway',
      title: '讓 AI Agent 用得上工具，每一個動作仍在你的掌控之中。',
      desc: 'Saturn 是一套安全的 MCP Gateway，部署在 AI Agent 與 MCP Server 之間。集中管理工具存取、落實細緻到參數層級的權限控管、對敏感操作要求人工核准，並保留完整的審計紀錄——全部在同一個主控台完成。',
      primary: '開始使用',
      secondary: '認識 Saturn App',
      note: '相容任何支援 MCP（Model Context Protocol）的用戶端。現有的 MCP Server 不需要任何修改。',
      mock: {
        header: '待核准',
        agent: 'Agent',
        agentValue: 'finance-ops',
        tool: '工具',
        toolValue: 'payments.transfer',
        args: '參數',
        argsValue: 'amount: 4,800 USD → vendor_7731',
        rule: '命中規則',
        ruleValue: 'Payments v3 · amount > 1000',
        approve: '核准',
        reject: '駁回',
        footer: '12 秒前送出 · 等待審核人員',
      },
    },
    logos: {
      label: '相容',
      items: ['Claude', 'ChatGPT', 'Cursor', 'Gemini', 'LM Studio', '任何 MCP 用戶端'],
    },
    benefits: {
      title: '一次接入、精準控管、可稽核可證明。',
      items: [
        ['一次接入', '組織內所有 Agent 與所有 MCP Server 共用一個 MCP 端點。註冊 Server 後，其工具即可立即納入治理。'],
        ['精準控管', '決定每個 Agent 看得到哪些工具、在什麼條件下可以呼叫——細緻到金額、環境、收款對象等個別參數。'],
        ['可稽核可證明', '每一筆請求、政策判定、核准與執行都有紀錄。隨時回答誰做了什麼、何時做的、為何放行、由誰核准。'],
      ],
    },
    vs: {
      title: 'AI Agent 很強大。少了 Gateway，它也難以問責。',
      desc: '多數團隊把 Agent 直接接到 MCP Server。展示時沒問題，上了正式環境就撐不住。',
      withoutLabel: '沒有 Saturn',
      without: [
        '每個 Agent 各自持有 API Key 與 OAuth Token',
        '工具存取以整台 MCP Server 為單位，要嘛全開、要嘛全關',
        '敏感操作無法暫停等待人工審核',
        '日誌散落在各個 Server，甚至根本沒有',
        '撤銷一個 Agent 的權限，得到處輪換憑證',
      ],
      withLabel: '有了 Saturn',
      with: [
        '憑證封存在後量子加密金庫中，Agent 從頭到尾看不到',
        '為每個 Agent 配置專屬工具集，並以參數層級的政策規則控管',
        '內建核准佇列，敏感呼叫附完整脈絡等待審核',
        '一份審計軌跡，已儲存的原始內容採零存取加密，Gateway 封存寫入後無法讀取（轉送呼叫當下會處理明文）',
        '在主控台即時暫停 Agent 或駁回單筆呼叫',
      ],
    },
    features: {
      title: '在正式環境運行 AI Agent 所需的一切。',
      desc: 'Saturn 涵蓋一筆工具呼叫的完整生命週期：身份、存取、政策、核准、執行與審計。',
      items: [
        {
          num: '01',
          code: false,
          eyebrow: '統一的 MCP Gateway',
          title: '所有 Agent 與工具共用一個端點',
          points: [
            '符合標準的 HTTP MCP 端點——支援 initialize、tools/list 與 tools/call',
            '每一條 Agent 連線皆採 OAuth 2.1 搭配 PKCE，綁定到使用者或組織',
            '以 URL 註冊任何 MCP Server，Saturn 自動探索並建立工具目錄',
            '代管上游 OAuth：動態用戶端註冊、Token 自動續期',
          ],
        },
        {
          num: '02',
          eyebrow: '細緻的存取控制',
          title: '權限細緻到參數層級',
          points: [
            '工具集：精確指定每個 Agent 在 tools/list 中看得到哪些工具',
            '逐工具模式：任一工具可設為 Call（自動執行）或 Approval（需人工確認）',
            '政策規則可對參數設定條件——amount > 1000、environment == "production"',
            '政策具版本控制與完整變更紀錄，每一筆呼叫皆重新評估',
          ],
          code: true,
        },
        {
          num: '03',
          code: false,
          eyebrow: '人工介入',
          title: '核准流程內建在請求路徑中',
          points: [
            '敏感呼叫會暫停，直到一位審核者核准，或每個必要群組都達到門檻',
            '核准之後，Agent 在同一筆工具呼叫帶上 saturnRunId，就能重送原來的任務',
            '待核准會過期，核准後可重送的時間也會過期',
            '簽章 Webhook 通知核准、駁回與過期。Webhook 回覆成功不會執行工具',
          ],
        },
        {
          num: '04',
          code: false,
          eyebrow: '企業級安全',
          title: '密鑰永遠不離開 Gateway',
          points: [
            '上游 Token 封存在 ML-KEM-1024 與 AES-256-GCM 的金庫裡',
            '已儲存的審計內容採零存取加密：封給組織金鑰與每位成員公鑰後即刪除資料金鑰（Gateway 於轉送當下處理明文，待核准與執行中內容則以伺服器端金鑰加密保存 7 天）',
            '成員私鑰只用登入密碼衍生的金鑰封存。Saturn 無法解開',
            '復原金鑰只產生一次、不會上傳。有人重設密碼後，其他成員可以幫忙重包歷史紀錄',
          ],
        },
        {
          num: '05',
          code: false,
          eyebrow: '審計',
          title: '看得到判定，原始內容不以明文保存',
          points: [
            '每一步都是事件：requested、evaluated、approval requested、granted 或 rejected、executed',
            '主控台保留呼叫者、工具、政策版本與判定',
            '有權限的成員登入後，在瀏覽器裡解開原始請求與回應',
            '每個帳號都保留無限審計紀錄。授權成員在瀏覽器中解密原始內容',
          ],
        },
        {
          num: '06',
          code: false,
          eyebrow: '團隊與角色管理',
          title: '為組織而生，不只服務個人',
          points: [
            '群組與多人門檻：高風險呼叫要湊齊核准才放行',
            '一個人的一票，會計入他所屬的每一個群組',
            '編輯者可限定在特定 Agent，各團隊只管理自己的範圍',
            '對應每位員工可以連接哪些 MCP Server',
          ],
        },
      ],
      caption: '政策引擎實際評估的規則樣貌。條件會與每一筆呼叫的參數比對。',
    },
    compare: {
      title: '為什麼需要專屬的 MCP Gateway？',
      desc: 'API Gateway 治理的是服務。Saturn 治理的是 Agent——一個會推理、會選擇工具、有時需要被叫停的呼叫者。',
      columns: [
        {
          name: '直接連接',
          ours: false,
          items: ['Agent 持有所有憑證', 'Server 上的每個工具全部暴露', '沒有核准步驟', '沒有集中審計軌跡'],
        },
        {
          name: 'API Gateway',
          ours: false,
          items: ['看到的是路徑與方法，不是工具', '無法對工具參數設定條件', '沒有人工核准流程', '為服務設計，不是為 Agent'],
        },
        {
          name: 'Saturn',
          ours: true,
          items: ['憑證封存在 Gateway 中', '工具集與參數層級政策', '內建核准佇列', '所有 Agent 共用一份審計軌跡'],
        },
      ],
    },
    console: {
      title: '一個主控台，管理組織內所有 Agent。',
      desc: 'Saturn 主控台讓資安、平台與營運團隊共享同一個視角：Agent 能做什麼、以及它們實際做了什麼。',
      items: [
        ['總覽', '一眼掌握活躍 Agent、待核准項目、近期拒絕紀錄與花費。'],
        ['Agents', '註冊 Agent、指派工具集、暫停或恢復，並設定誰可以編輯。'],
        ['Saturn MCP', '連接 MCP Server、檢視探索到的工具、組建工具集。'],
        ['政策', '撰寫與版本化規則；查看每一筆呼叫由哪條政策判定。'],
        ['介入', '核准或駁回一筆呼叫。多人核准會等到每個必要群組都完成。'],
        ['重送', '核准後的任務留在自己的頁面，直到 Agent 帶著 saturnRunId 再次呼叫。'],
        ['審計', '搜尋治理事件。原始請求與回應只在有權限的成員瀏覽器裡打開。'],
        ['Webhook', '核准、駁回與過期會送出簽章通知。送達成功不會執行工具。'],
        ['身份', '成員、角色、自訂權限，以及逐員工的 MCP Server 對應。'],
      ],
    },
    cta: {
      title: '準備好把 AI Agent 納入掌控了嗎？',
      body: '連接一台 MCP Server、組建一個工具集、寫下第一條政策。在第一筆核准請求中，看見完整的請求路徑。',
      primary: '開始使用',
      secondary: '認識 Saturn App',
    },
    footer: {
      tagline: '企業級 AI Agent 的安全 MCP Gateway。',
      product: '產品',
      legal: '法律',
      mcp: 'Saturn MCP',
      app: 'Saturn App',
      trust: '信任',
      pricing: '方案與定價',
      terms: '服務條款',
      privacy: '隱私權政策',
      project: 'Saturn Project by Rick Weng',
    },
    homeFaq: {
      title: '關於 Saturn',
      items: [
        ['Saturn 是什麼？', 'Saturn 是部署在 AI Agent 與工具之間的安全 MCP Gateway。它集中管理工具存取、落實細緻到參數層級的權限控管、對敏感操作要求人工核准，並在同一個主控台保留完整的審計紀錄。'],
        ['什麼是 MCP Gateway？', 'MCP（Model Context Protocol）是 AI Agent 呼叫工具的標準協定。MCP Gateway 放在你的 MCP Server 前面，Agent 只跟 Gateway 對話。Saturn 只露出你選擇的工具，對每一筆呼叫比對政策，並且只轉送被允許的呼叫。'],
        ['哪些 AI 用戶端可以用 Saturn？', '任何 MCP 用戶端，包括 Claude、ChatGPT、Cursor、Gemini、LM Studio 與 Saturn App。所有 Agent 使用同一個 Saturn MCP 端點。現有的 MCP Server 不需要修改程式碼。'],
        ['Saturn 和 API Gateway 有什麼不同？', 'API Gateway 依路徑與 HTTP 方法治理服務。Saturn 治理的是 Agent：它理解工具與參數，可以把一筆呼叫暫停等待人工核准，並記錄是哪條政策、哪位審核人員放行。'],
        ['Agent 看得到 API Key 或 OAuth Token 嗎？', '看不到。上游憑證封存在 Saturn 的金庫中，以 ML-KEM-1024 後量子金鑰封裝搭配 AES-256-GCM 加密。Agent 只拿得到一筆經授權呼叫的結果。API 只回報密鑰是否存在，絕不回傳內容。'],
        ['Saturn App 是免費的嗎？', '是的。Saturn App 是免費、開源的桌面 AI 研究工作台，採 MIT 授權，在你的電腦上用你的模型與檔案運行。MCP Gateway 同樣免費，每個帳號都能使用政策、Webhook 與群組核准。'],
      ],
    },
    mcpPage: {
      title: 'Saturn MCP — AI Agent 的 MCP Gateway',
      description: 'Saturn MCP 是 Agent 實際連線的 MCP Server。它只露出核准過的工具，對每一筆呼叫比對政策，並留下審計軌跡。',
      eyebrow: 'Saturn MCP',
      heading: '決定 Agent 可以做什麼的 MCP Gateway。',
      lede: 'Saturn MCP 是 Agent 實際對話的那台 MCP Server。它後面才是你真正的 MCP Server——CRM、付款、資料庫、雲端主控台。Saturn 只露出你核准的工具，對每一筆呼叫比對政策，把敏感的那幾筆暫停交給人，並記錄一切。',
      primary: '開始使用',
      secondary: '閱讀白皮書',
      note: '符合標準的 HTTP MCP。相容 Claude、ChatGPT、Cursor、Saturn App 或任何 MCP 用戶端。',
      howTitle: '四個步驟，開始運作。',
      howDesc: '不需要 SDK，不需要改 Agent 程式碼。Saturn 在協定層運作。',
      how: [
        ['連接你的 MCP Server', '以 URL 註冊每一台 Server。Saturn 探索其工具，必要時處理 OAuth，並把憑證封存在金庫中。'],
        ['組建工具集', '跨 Server 挑出每個 Agent 該有的工具。任一工具可標記為 Call（自動執行）或 Approval（需要人）。'],
        ['撰寫政策', '加入對參數設條件的規則。每條規則決定：允許、需要核准或拒絕。政策有版本。'],
        ['把 Agent 指向 Saturn', '所有 Agent 都用同一個 Saturn MCP 端點。它們以 OAuth 登入，只看得到自己的工具集。'],
      ],
      casesTitle: '團隊實際透過 Saturn 跑的事。',
      casesDesc: '四個例子：這些 Agent 之所以有用，正是因為它們被治理。',
      cases: [
        {
          team: '財務營運',
          title: '會付款給供應商的 Agent——大額由人把關',
          body: '財務 Agent 對帳並透過付款 MCP Server 觸發付款。小額轉帳自動執行。超過門檻的金額等待審核人員，核准前可看到金額、收款對象與發票編號。',
          rules: ['payments.transfer · amount ≤ 1000 → 允許', 'payments.transfer · amount > 1000 → 需要核准', 'payments.refund · amount > 10000 → 拒絕'],
        },
        {
          team: '客戶支援',
          title: '能查、能回覆，但永遠不能刪除的客服 Agent',
          body: '客服 Agent 的工具集包含 CRM 查詢、工單更新與郵件回覆。具破壞性的 CRM 工具不在集合裡，對這個 Agent 來說根本不存在。寄給外部網域的郵件需要核准；內部備註直接通過。',
          rules: ['crm.get_customer · 允許', 'tickets.update · 允許', 'email.send · 收件人非公司網域 → 需要核准', 'crm.delete_customer · 不在工具集'],
        },
        {
          team: '平台與 DevOps',
          title: '可以自由部署到 staging、上 production 要簽核的發布 Agent',
          body: '發布 Agent 透過部署 MCP Server 執行 rollout。Staging 自動。Production rollout 暫停等待值班工程師。破壞 schema 的操作無論環境一律拒絕。',
          rules: ['deploy.rollout · environment == "staging" → 允許', 'deploy.rollout · environment == "production" → 需要核准', 'db.drop_table · 拒絕'],
        },
        {
          team: '資料與分析',
          title: '每個團隊都有分析 Agent，各自只碰自己的資料',
          body: '每個團隊的分析 Agent 都拿到唯讀的資料倉儲工具。Server 對應決定哪些團隊可以掛上倉儲。編輯者限定在自己的 Agent，每一筆查詢都歸屬到 Agent 所代表的人。',
          rules: ['warehouse.query · 允許', 'warehouse.export · row_count > 100000 → 需要核准', '行銷部帳號 · 未對應倉儲 Server'],
        },
      ],
      capTitle: 'Gateway 替你處理的事。',
      capDesc: '從 Agent 的請求到你的上游 Server 之間的一切。',
      caps: [
        ['身份', '每個 Agent 都走 OAuth 2.1 搭配 PKCE。工作階段綁定到使用者或組織；每一筆請求都檢查 profile。'],
        ['工具探索', '以 URL 註冊 MCP Server。Saturn 探索工具、維護目錄，並代管上游 OAuth 與 Token 續期。'],
        ['工具集', '為每個 Agent 跨 Server 精選工具。只有這些工具出現在 tools/list。每個工具是 Call 或 Approval。'],
        ['政策引擎', '有順序、有版本、可對參數設條件的規則。每一筆呼叫記錄政策 id、版本與命中的規則。'],
        ['核准佇列', '敏感呼叫等待一位審核者，或一個群組門檻。Agent 用 saturnRunId 重送。核准會過期。'],
        ['憑證金庫', '上游 Token 與密鑰以 ML-KEM-1024 與 AES-256-GCM 封存。Agent 看不到；每一次讀取都有審計。'],
        ['審計軌跡', '治理事件可以搜尋。已儲存的審計內容採零存取加密，寫入後僅能在成員的瀏覽器裡打開（Gateway 於呼叫當下會處理明文）。'],
        ['簽章 Webhook', '核准、駁回與過期以 HMAC-SHA256 簽章送出。送達成功不會執行工具。'],
      ],
      secTitle: '安全內建在請求路徑中。',
      secDesc: 'Agent 永遠拿不到比「一筆經授權呼叫的結果」更多的東西。以下是支撐這項保證的機制。',
      sec: [
        ['後量子憑證金庫', 'Access token、refresh token 與 client secret 逐一封存：ML-KEM-1024 金鑰封裝搭配 AES-256-GCM，金鑰以 HKDF-SHA384 推導。金鑰種子存放在設定中，絕不進資料庫。'],
        ['API 不傳明文', '主控台與用戶端 API 只回報密鑰是否存在，絕不回傳內容。每一次讀取都產生 credential_accessed 審計事件。'],
        ['代管的上游 OAuth', 'Saturn 找到授權伺服器，在支援時進行動態用戶端註冊，使用 PKCE，並在上游回 401 時自動續期 Token。'],
        ['網路邊界', '上游 URL 必須使用 HTTPS（或僅限 localhost 的 HTTP）。私有網段、link-local 與雲端 metadata 位址一律拒絕。'],
        ['拒絕即不送出', '被拒絕的呼叫絕不離開 Saturn。被扣住的呼叫回傳 approval_required 與參考 id。暫停中的 Agent 無法發起呼叫。'],
        ['角色型存取控制', '主控台四種資源、各三個存取等級。預設角色 admin、operator、viewer，或自訂組合。編輯者可限定在特定 Agent。'],
      ],
      ctaTitle: '今天就把 Saturn 放到第一台 MCP Server 前面。',
      ctaBody: '建立免費帳號、連接一台 Server、寫一條規則。第一筆核准請求就會讓你看到完整路徑。',
    },
    appPage: {
      title: 'Saturn App — 免費、開源的 AI 研究工作台',
      description: 'Saturn App 是免費、MIT 授權的桌面 AI 研究工作台。親手寫程式、在自己的電腦上跑實驗、檢視每一個樣本，並決定每個對話要讓 AI 參與多少。',
      eyebrow: 'Saturn App · 開源 · 免費',
      heading: '你的 AI 研究工作台，就在自己的電腦上。',
      lede: '讀方法、親手寫程式、跑實驗、檢視每一個樣本。Saturn 圍繞你的問題、模型、實驗與結論來組織，而不是對話，助理能做到什麼程度也由你決定。',
      primary: '前往 GitHub',
      secondary: '連接 Saturn MCP',
      download: '查看發行版本',
      downloadNote: { released: 'macOS · Apple 晶片', unreleased: '先前的 Agent，v0.3.1' },
      note: { released: '搶先預覽版，MIT 授權。macOS 版本尚未簽署。搭配本機模型可離線使用。', unreleased: '本頁介紹的工作台會在下一個版本推出。目前可下載的版本是先前的桌面 Agent。' },
      asideCaption: '專案的研究紀錄都是純文字檔，就放在專案自己的資料夾裡。',
      highlights: [
        ['是你的研究，不是對話', '問題、假說、程式、執行、樣本與結論都有自己的位置。重新打開專案，Home 會告訴你工作停在哪裡、還有什麼沒解決。'],
        ['AI 參與多少由你決定', '每個對話可選 Manual（只讀與解釋）、Pair（助理提案、你核准）或 Delegate（每則訊息開一個任務）。判定與標註永遠由你決定。'],
        ['你的電腦、你的模型', 'Runtime 只監聽 127.0.0.1，紀錄都是你讀得懂的檔案，每一個對外請求都會記在網路日誌裡。可用 API 金鑰、Claude 或 ChatGPT 方案，或離線模型。'],
      ],
      featTitle: '從一個問題，到你能說明依據的結論。',
      featDesc: 'Saturn 把你問了什麼、跑了什麼、量到什麼、得出什麼結論放在一起，數字不會和它的來源分開。',
      features: [
        {
          num: '01',
          eyebrow: 'Home 與 Workspace',
          title: '程式就在結果旁邊',
          points: [
            '寫下問題與假說；一次執行完成只代表它跑完了，判定由你決定',
            '程式編輯器下方就是這次執行、它的成本、樣本、你的發現與終端機',
            '重新打開時，會還原你當時的檔案、未儲存的草稿與正在看的執行',
            'Home 列出上次之後的變化，以及還需要你決定的事',
          ],
        },
        {
          num: '02',
          eyebrow: 'Experiments',
          title: '比較不公平時，它會告訴你',
          points: [
            '把實驗凍結成版本，設定或環境一改就是新版本',
            '只有量測方式相同的執行才會畫在同一張圖上，其他的會另外列出，並說明差在哪裡',
            '分數會拆開成評分器的判斷、你有異議的部分，以及因錯誤被排除的部分',
            '結論會和它依據的那次執行綁在一起',
          ],
        },
        {
          num: '03',
          eyebrow: 'Lineage 與 Samples',
          title: '追蹤一個模型，從各個角度讀一個樣本',
          points: [
            '把 checkpoint 和微調出來的分支連起來，沿著譜系追蹤分數',
            '同一個樣本在各模型上的結果並排，評分器的判斷就在你的標註旁邊',
            '標註不會改動分數，可以看你和評分器的一致程度，也能保留反例',
            '往模型裡面看：讀取每一層的 activation，或從另一個模型 patch residual stream，並逐層掃描',
          ],
        },
        {
          num: '04',
          eyebrow: '助理與 Tasks',
          title: '懂工作台的助理，長任務另外放',
          points: [
            '每個畫面都有研究助理，能做什麼由對話上方的設定決定：Manual 只讀，Pair 只提案',
            '問它怎麼操作，它會一步步帶你走，框出每個位置，動手的是你',
            '長任務交給 Task，在自己的 git worktree 裡執行，並顯示它能動哪些檔案',
            '審閱 Task 的 diff 後再合併或捨棄，在那之前不會碰到專案',
          ],
        },
        {
          num: '05',
          eyebrow: 'Protection',
          title: '清楚說明能防什麼、不能防什麼',
          points: [
            'Manual 對話只讀，Pair 對話在每次修改或執行指令前都會問你，檔案工具也無法寫入已鎖定的檔案',
            '在任務裡，Shell 或 Codex 仍可能寫入已鎖定的檔案：Saturn 會在事後發現並記錄，因為模式與鎖定是工作流程的約束，不是資安邊界',
            'Agent 只在你授權的資料夾裡工作，每次編輯都有檢查點，可以還原',
            '被拒絕的動作和來源不明的變更，都集中在同一個畫面等你決定',
          ],
        },
        {
          num: '06',
          eyebrow: '資源與環境',
          title: '一次執行花了多少，又是在什麼環境跑的',
          points: [
            '執行時間、處理器占比、記憶體、nvidia-smi 能回報的 GPU，以及樣本產生速度',
            '你的程式有回報時，也會記錄 token 與顯存',
            '查看執行用的 Python、套件與裝置，lock 檔會算出雜湊並隨版本凍結',
            'Saturn 可以幫你建立環境，並可選裝可解釋性、後訓練、分析或 Notebook 工具組',
          ],
        },
      ],
      specsTitle: '系統需求',
      specs: [
        ['平台', 'Apple 晶片的 macOS。Windows x64 版本有建置，但 Rust 重寫後尚未實際執行過，請視為未經測試。'],
        ['模型', '用 API 金鑰接 Anthropic、OpenAI、Google 與 DeepSeek；用 Claude 方案跑 Claude Code；用 ChatGPT 方案跑 Codex；用 LM Studio 跑本機離線模型。'],
        ['資料', '研究紀錄在專案的 .saturn/research 資料夾，App 資料在 ~/.saturn-app。API 金鑰加密儲存，加密金鑰放在 macOS 鑰匙圈。'],
        ['授權', 'MIT。Copyright Rick Weng。'],
      ],
      ctaTitle: '公開開發。',
      ctaBody: 'Saturn App 對所有人免費。給 repo 一顆星、開一個 issue，或送一個 pull request。',
    },
    trustPage: {
      title: '信任 — 金鑰、Payload 與憑證如何被保護',
      description:
        'Saturn 對已儲存的稽核內容採用零存取加密（AES-256-GCM 與 ML-KEM-1024）。密碼在送到 Gateway 之前先於瀏覽器雜湊。Saturn 無法解開成員私鑰。',
      eyebrow: '信任',
      heading: 'Gateway 在呼叫當下轉送請求，寫入後無法讀取已封存的稽核內容。',
      lede: '已儲存的稽核內容（工具參數、上游請求與回應、交回給 Agent 的結果）採零存取加密：以 AES-256-GCM 封存，並用 ML-KEM-1024 將資料金鑰封給 Saturn 不持有的公鑰後即刪除資料金鑰。',
      layersTitle: '三層保護，彼此分開。',
      layersDesc: '密碼、成員私鑰與已封存的稽核內容不共用同一把秘密。',
      layers: [
        ['登入', '瀏覽器先把密碼雜湊再送出。Saturn 再用 PBKDF2 雜湊一次，不保存密碼本身。'],
        ['成員私鑰', '另一把只在瀏覽器衍生的金鑰包住 ML-KEM 私鑰。登入用的雜湊解不開它。'],
        ['工具 Payload', 'Gateway 在轉送呼叫時處理明文；寫入稽核紀錄前，以隨機 AES-256-GCM 資料金鑰加密並用 ML-KEM-1024 封給組織與每位成員公鑰，隨即刪除資料金鑰。'],
        ['上游憑證', 'Access token 與 client secret 用 Gateway 自己的 ML-KEM-1024 金鑰封存，已授權的呼叫才能完成。Agent 拿不到密鑰。'],
      ],
      envelopeTitle: '一整筆呼叫，一個信封。',
      envelopeDesc: '封存寫入時，這些欄位以零存取加密（ML-KEM-1024-HKDF-SHA384-AES-256-GCM）一起封存；等待核准與執行中的處理中內容則另以伺服器端金鑰加密保存 7 天。',
      envelope: [
        ['參數', 'Agent 隨工具呼叫送出的參數。'],
        ['上游請求', 'Saturn 轉送給工具的請求。'],
        ['上游回應', '工具回來的原始內容。'],
        ['下游結果', 'Saturn 交回給 Agent 的結果。'],
      ],
      holdTitle: 'Saturn 打得開與打不開的東西。',
      cannotTitle: 'Saturn 打不開',
      cannot: [
        '組織或成員的私鑰',
        '復原金鑰',
        '密碼，以及用來包成員私鑰的那把金鑰',
        '刪除資料金鑰後的已儲存稽核內容',
      ],
      canTitle: 'Saturn 打得開',
      can: [
        '誰呼叫、哪個工具、政策版本，以及決策',
        '轉送工具呼叫當下的明文，以及等待核准與執行中、以伺服器端金鑰加密保存 7 天的處理中內容',
        '上游憑證，且只在一筆已授權呼叫進行的期間',
        '主控台 API 只回報密鑰是否存在，不回報內容',
      ],
      faqTitle: '常見問題',
      faq: [
        ['Saturn 能解密審計 Payload 嗎？', '封存寫入稽核紀錄後不能。Gateway 在轉送工具呼叫當下會處理明文；寫入稽核紀錄前，資料金鑰以 ML-KEM-1024 封給組織與成員公鑰後即刪除，僅授權成員可於瀏覽器解密。等待核准與執行中的處理中內容則另以伺服器端金鑰加密保存 7 天。'],
        ['登入密碼會在伺服器上解開私鑰嗎？', '不會。登入送出的是雜湊。私鑰用另一把從不離開瀏覽器的金鑰包裝。'],
        ['Agent 看得到 API Key 或 OAuth Token 嗎？', '看不到。這些密鑰留在憑證金庫。Agent 只拿得到一筆經授權呼叫的結果。'],
        ['組織還沒有 Payload 金鑰呢？', '新的工具內容不會被保存。審計列只標示尚未加密，不寫入明文。'],
      ],
      ctaTitle: '用你自己的工具看一次。',
      ctaBody: '接上一台 MCP Server，再到瀏覽器打開一筆加密的審計紀錄。',
      paperLink: '閱讀白皮書',
      disclosureTitle: '漏洞回報',
      disclosureBody: '漏洞回報方式會寫在這裡。在正式說明公布前，請寄到 security@saturn-core.com。',
    },
    pricingPage: {
      title: '方案與定價 — 免費 Saturn App 與 MCP Gateway',
      description: 'Saturn 完全免費。桌面 App 與 MCP Gateway 都不收費，每個帳號都能使用全部功能，由贊助者支持維持。',
    },
  },
} as const

export type PageName = 'home' | 'mcp' | 'app' | 'trust' | 'pricing' | 'terms' | 'privacy'

export function pageMeta(page: PageName, lang: Locale = locale.value) {
  const m = messages[lang]
  if (page === 'mcp') return { title: m.mcpPage.title, description: m.mcpPage.description }
  if (page === 'app') return { title: m.appPage.title, description: m.appPage.description }
  if (page === 'trust') return { title: m.trustPage.title, description: m.trustPage.description }
  if (page === 'pricing') return { title: m.pricingPage.title, description: m.pricingPage.description }
  if (page === 'terms' || page === 'privacy') {
    const doc = legalCopy[lang][page]
    return { title: doc.title, description: doc.description }
  }
  return { title: m.meta.title, description: m.meta.description }
}

export function copy(lang: Locale = locale.value) {
  return messages[lang]
}

export function useI18n() {
  const t = computed(() => messages[locale.value])
  return { locale, t }
}
