export type LegalBlock =
  | { type: 'p'; text: string }
  | { type: 'ul'; items: readonly string[] }

export type LegalSection = {
  heading: string
  blocks: readonly LegalBlock[]
}

export type LegalDoc = {
  title: string
  description: string
  crumb: string
  heading: string
  updated: string
  relatedPath: '/terms' | '/privacy'
  relatedLabel: string
  sections: readonly LegalSection[]
}

const en = {
  terms: {
    title: 'Terms of Service — Saturn',
    description:
      'The agreement you accept by using Saturn. The services are provided by Rick Weng. Prism Capital LLC owns the intellectual property.',
    crumb: 'Terms of Service',
    heading: 'Terms of Service',
    updated: 'Updated 10 October 2026',
    relatedPath: '/privacy',
    relatedLabel: 'Privacy Policy',
    sections: [
      {
        heading: 'Acceptance',
        blocks: [
          {
            type: 'p',
            text: 'These Terms of Service are a contract between you and Rick Weng. By accessing or using the Services, you agree to these terms and the Privacy Policy. If you do not agree, do not use the Services.',
          },
          {
            type: 'p',
            text: 'Using the Services includes visiting the website and submitting information, creating or using an account, signing in to the console, connecting to the MCP backend, and using Saturn App when it connects to our servers.',
          },
          {
            type: 'p',
            text: 'If you use the Services for an organization, you represent that you have authority to bind that organization. “You” then includes the organization. You are responsible for the users who access the Services under your account.',
          },
        ],
      },
      {
        heading: 'Who provides the Services',
        blocks: [
          {
            type: 'p',
            text: 'The Services are provided by Rick Weng, an individual in Taiwan. In these terms, “we” and “us” mean Rick Weng.',
          },
          {
            type: 'p',
            text: 'Prism Capital LLC, a Wyoming limited liability company, owns the Saturn name, software, website, console, and the other intellectual property in the Services. Prism Capital LLC engages Rick Weng to operate, maintain, and develop the Services. Your contract is with Rick Weng, not with Prism Capital LLC.',
          },
        ],
      },
      {
        heading: 'The Services',
        blocks: [
          {
            type: 'p',
            text: 'The Services are:',
          },
          {
            type: 'ul',
            items: [
              'The website at https://saturn-core.com.',
              'The MCP console at https://dashboard.saturn-core.com.',
              'The MCP backend at https://api.saturn-core.com, which is the server for the gateway, accounts, policies, approvals, and the audit trail.',
              'Saturn App, the desktop application for macOS and Windows.',
              'The Saturn App backend, a server separate from the MCP backend, which Saturn App uses to sign in, sync, and run agents.',
            ],
          },
          {
            type: 'p',
            text: 'We may improve, change, or discontinue a part of the Services. If we discontinue a part that you are using under an account, we will give you reasonable notice when we can.',
          },
        ],
      },
      {
        heading: 'Accounts',
        blocks: [
          {
            type: 'p',
            text: 'You must provide accurate account information and keep it current. You are responsible for protecting your credentials and for activity under your account. Tell us at hello@saturn-core.com if you believe your account is being misused.',
          },
          {
            type: 'p',
            text: 'An organization account may have members, roles, and permissions. The person who administers the account is responsible for who is invited and for what those users can do.',
          },
        ],
      },
      {
        heading: 'Eligibility',
        blocks: [
          {
            type: 'p',
            text: 'You may accept these terms only if you have the legal capacity to do so. Under Article 12 of the Taiwan Civil Code, a person who has reached the age of eighteen is an adult. A person under the age of seven has no legal capacity, and a declaration of intent by that person is void (Civil Code Articles 13 and 75). A minor who has reached the age of seven has limited legal capacity and may enter this contract only with the consent or ratification of a statutory agent (Civil Code Articles 13, 77, and 79).',
          },
        ],
      },
      {
        heading: 'Your responsibilities',
        blocks: [
          {
            type: 'p',
            text: 'You decide which agents, tools, policies, and MCP servers you connect. You are responsible for your agents, the servers you register, the rules you write, the instructions you give, and the data those calls and conversations contain. A policy is applied as you configure it. We do not promise that it will stop every action you later decide should have been stopped.',
          },
          {
            type: 'p',
            text: 'You will not:',
          },
          {
            type: 'ul',
            items: [
              'Use the Services in violation of law, or to infringe another person’s rights.',
              'Interfere with the Services, probe them without authorization, or attempt to reach another customer’s data or the contents of the credential vault.',
              'Submit data, prompts, or tool calls that you do not have the right to submit.',
              'Misrepresent your identity, or share credentials except with users who belong to your organization.',
            ],
          },
        ],
      },
      {
        heading: 'Customer data',
        blocks: [
          {
            type: 'p',
            text: 'You keep your rights in the data you and your users submit, including account details, policies, conversations, and tool-call contents. You grant Rick Weng a right to host, process, and transmit that data only to provide, secure, and support the Services, as the Privacy Policy describes.',
          },
          {
            type: 'p',
            text: 'You represent that you have the rights needed to submit that data, including personal data about people in your organization and personal data inside prompts and tool-call arguments.',
          },
        ],
      },
      {
        heading: 'Intellectual property',
        blocks: [
          {
            type: 'p',
            text: 'Prism Capital LLC owns the intellectual property in the Services. Except for the MIT License described below, these terms give you only a limited right to use the Services while you comply with them. You do not receive any ownership of the Services.',
          },
          {
            type: 'p',
            text: 'The source code of Saturn App is offered under the MIT License. The copyright holder is Prism Capital LLC. The MIT License governs your rights in that source code. It does not replace these terms for the Services. When you use Saturn App together with our servers, these terms apply.',
          },
          {
            type: 'p',
            text: 'If you send us a suggestion, we may use it to operate and improve the Services without obligation to you. That does not transfer your customer data to us.',
          },
        ],
      },
      {
        heading: 'Fees',
        blocks: [
          {
            type: 'p',
            text: 'Saturn App is free. The website is free to browse. Pro and Enterprise are not yet offered for sale, and these terms do not require you to pay. If we later offer a paid plan, we will show the price, the billing period, and the cancellation terms before you are charged. You owe fees only for a plan you choose to buy.',
          },
        ],
      },
      {
        heading: 'Confidentiality',
        blocks: [
          {
            type: 'p',
            text: 'We will use your customer data only to provide the Services, and we will not disclose it except as the Privacy Policy allows or as you instruct. You will not disclose non-public information we make available to you about the Services, except to your personnel who need it and are bound to keep it confidential.',
          },
        ],
      },
      {
        heading: 'Privacy',
        blocks: [
          {
            type: 'p',
            text: 'The Privacy Policy describes how personal data is handled. It is part of this contract. Where Taiwan’s Personal Data Protection Act applies, the notice required by Article 8 is given in that policy.',
          },
        ],
      },
      {
        heading: 'Disclaimers',
        blocks: [
          {
            type: 'p',
            text: 'The Services are provided as available. To the extent the law allows, we disclaim warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the Services will be uninterrupted or error-free, that a policy will block every call, or that an agent will behave as you expect.',
          },
          {
            type: 'p',
            text: 'Model providers and the MCP servers you connect are not part of the Services. Their terms apply between you and them.',
          },
        ],
      },
      {
        heading: 'Limitation of liability',
        blocks: [
          {
            type: 'p',
            text: 'Article 222 of the Taiwan Civil Code does not allow an agreement to disclaim liability for willful misconduct or gross negligence. These terms do not do so. Article 247-1 of the Civil Code makes void a standard term that, in the circumstances, is grossly unfair, including a term that exempts or reduces our liability, increases yours, or restricts your rights. If you are a consumer under the Consumer Protection Act, these terms do not take away the rights Articles 11 and 12 of that Act give you.',
          },
          {
            type: 'p',
            text: 'Except for liability the law does not allow us to limit, we are not liable for indirect, incidental, special, or consequential loss, including lost profits, lost data, or the acts of an agent or an upstream server. Our total liability arising out of the Services in a claim is limited to the fees you paid Rick Weng for the Services during the twelve months before the claim. If you paid nothing, that limit is zero.',
          },
        ],
      },
      {
        heading: 'Indemnity',
        blocks: [
          {
            type: 'p',
            text: 'You will indemnify Rick Weng against claims, losses, and reasonable expenses arising out of your customer data, your agents, the MCP servers you connect, or your breach of these terms. This indemnity does not apply to the extent the claim is caused by our willful misconduct or gross negligence.',
          },
        ],
      },
      {
        heading: 'Suspension and termination',
        blocks: [
          {
            type: 'p',
            text: 'You may stop using the Services at any time. We may suspend or end access if you breach these terms, if we must do so to protect the Services or another customer, or if we discontinue the Services. When we can do so without increasing the risk, we will tell you the reason.',
          },
          {
            type: 'p',
            text: 'Ending access does not revoke the MIT License you already have in Saturn App’s source code. Sections that by their nature should continue, including those on customer data, intellectual property, confidentiality, disclaimers, liability, and indemnity, continue after the contract ends. The Privacy Policy states what happens to personal data when you ask for deletion.',
          },
        ],
      },
      {
        heading: 'Changes',
        blocks: [
          {
            type: 'p',
            text: 'We may update these terms by posting a new version on this page and changing the date above. If you have an account and a change materially affects your rights or obligations, we will notify you by email or in the console before it takes effect. If you continue to use the Services after the effective date, you accept the updated terms. If you do not accept them, stop using the Services.',
          },
        ],
      },
      {
        heading: 'Governing law',
        blocks: [
          {
            type: 'p',
            text: 'These terms are governed by the laws of Taiwan. The courts of Taiwan have jurisdiction. This does not remove a forum that the law does not allow you to waive. Prism Capital LLC is not a party to this contract.',
          },
        ],
      },
      {
        heading: 'General',
        blocks: [
          {
            type: 'p',
            text: 'These terms and the Privacy Policy are the entire agreement between you and Rick Weng about the Services. If a provision is held unenforceable, the rest remains in effect. You may not assign this contract without our consent. We may assign it to a successor that continues the Services. A failure to enforce a provision is not a waiver.',
          },
          {
            type: 'p',
            text: 'These terms are published in Traditional Chinese and English. If the two texts differ, the Traditional Chinese text controls.',
          },
        ],
      },
      {
        heading: 'Contact',
        blocks: [
          { type: 'p', text: 'Rick Weng' },
          { type: 'p', text: 'hello@saturn-core.com' },
        ],
      },
    ],
  },
  privacy: {
    title: 'Privacy Policy — Saturn',
    description:
      'How Rick Weng handles personal data when you use the Saturn website, console, MCP backend, Saturn App, and Saturn App backend.',
    crumb: 'Privacy Policy',
    heading: 'Privacy Policy',
    updated: 'Updated 10 October 2026',
    relatedPath: '/terms',
    relatedLabel: 'Terms of Service',
    sections: [
      {
        heading: 'This policy',
        blocks: [
          {
            type: 'p',
            text: 'This policy tells you how personal data is collected, processed, and used when you use the Services. By using the Services, you agree to this policy together with the Terms of Service. It is the notice required by Article 8 of Taiwan’s Personal Data Protection Act when we collect personal data from you.',
          },
        ],
      },
      {
        heading: 'Who is responsible',
        blocks: [
          {
            type: 'p',
            text: 'Rick Weng, an individual in Taiwan, decides the purposes and means of using personal data to provide the Services. Contact hello@saturn-core.com.',
          },
          {
            type: 'p',
            text: 'Prism Capital LLC, a Wyoming limited liability company, owns the intellectual property and engages Rick Weng to operate, maintain, and develop the Services. Prism Capital LLC is not the party that handles your personal data under this policy.',
          },
        ],
      },
      {
        heading: 'What we collect',
        blocks: [
          {
            type: 'p',
            text: 'The categories follow the classification published for the Personal Data Protection Act. Identification data is category C001, which includes name, job title, and email address. Conversations, tool-call arguments, and files you choose to send may contain other categories. Which categories those are depends on what you submit.',
          },
          {
            type: 'p',
            text: 'On the website at https://saturn-core.com, a demo request includes your name, email address, company, and company website, and any job title or message you add. The page language is part of the address. The website does not use advertising cookies or a separate analytics product.',
          },
          {
            type: 'p',
            text: 'On the MCP console at https://dashboard.saturn-core.com and the MCP backend at https://api.saturn-core.com, we process the account and the gateway records needed to run the service:',
          },
          {
            type: 'ul',
            items: [
              'Identity and account data, including name, email address, organization, role, and sign-in credentials. Signing in from Saturn App uses this same account.',
              'What you configure: members, permissions, agents, tool sets, policies and their versions, and which MCP servers a person may connect.',
              'Each tool call the gateway evaluates: the agent, the tool, the arguments, the policy version, the decision, the reviewer when there is one, and whether the call was executed.',
              'Upstream credentials you store in the vault, sealed so the gateway can make a call you have allowed. The console does not return the secret itself.',
              'Cost records, if you use cost tracking.',
            ],
          },
          {
            type: 'p',
            text: 'Saturn App runs on your computer. Until it connects to our servers, agents, files, commands, chats, and model keys stay on that computer, and we do not receive them. When you sign in and use the Saturn App backend, that backend — a server separate from the MCP backend — processes the App data it syncs and runs: agents, conversations, tasks, scheduled wakes, memories, and the MCP servers you attach in the App.',
          },
          {
            type: 'p',
            text: 'Downloads of Saturn App are served by GitHub. GitHub processes that request under its own terms.',
          },
        ],
      },
      {
        heading: 'Purposes and legal bases',
        blocks: [
          {
            type: 'p',
            text: 'We collect and use personal data for these specific purposes, as classified for the Personal Data Protection Act: contractual and similar relationships (code 069), customer management and service (code 090), information and database management (code 136), and information security (code 137).',
          },
          {
            type: 'p',
            text: 'Collection and use stay within what those purposes require, and must be honestly and reasonably connected to them (Articles 5 and 20). As a non-government party, we collect and process personal data because we have a contract or a similar relationship with you and maintain appropriate security measures, and because you consent by using the Services (Article 19, paragraph 1, subparagraphs 2 and 5).',
          },
        ],
      },
      {
        heading: 'Period, place, recipients, and method',
        blocks: [
          {
            type: 'p',
            text: 'We keep demo requests only for as long as we need them to reply and to continue that conversation. We keep account data, console data, MCP backend data, and Saturn App backend data while you use the Services. When the purpose ends, or you ask us to delete the data, we delete it or stop using it. We may keep what we still need to finish a request you already made, to resolve a dispute, or to comply with law (Article 11, paragraph 3).',
          },
          {
            type: 'p',
            text: 'The console, the MCP backend, and the Saturn App backend are hosted on Google Cloud in Taiwan (asia-east1). The website is hosted by Cloudflare. Demo requests are delivered by FormSubmit to sales@saturn-core.com. Saturn App downloads are served by GitHub. A tool call is sent to an upstream MCP server only when your own configuration allows it. People in your organization see what their roles allow.',
          },
          {
            type: 'p',
            text: 'We do not sell personal data. We do not use it for advertising. FormSubmit, Cloudflare, and GitHub may process the data they handle outside Taiwan, because that is how those services deliver the form, the website, or the download. If a competent authority restricts an international transfer under Article 21, we will comply with that restriction.',
          },
        ],
      },
      {
        heading: 'If you do not provide data',
        blocks: [
          {
            type: 'p',
            text: 'You choose what to provide. If you do not provide the information a demo request needs, we cannot arrange the walkthrough. If you do not provide account information, you cannot use the console, the MCP backend, or the parts of Saturn App that require sign-in. Saturn App can still be used on your computer for functions that do not connect to our servers.',
          },
        ],
      },
      {
        heading: 'Your rights',
        blocks: [
          {
            type: 'p',
            text: 'Under Article 3 of the Personal Data Protection Act, you may ask to inquire or review, to receive a copy, to supplement or correct, to stop collection, processing, or use, and to delete. These rights cannot be waived in advance. Email hello@saturn-core.com. We may need to confirm that the request is yours. We will respond within the period the Act requires.',
          },
        ],
      },
      {
        heading: 'Security',
        blocks: [
          {
            type: 'p',
            text: 'Article 27 requires appropriate security measures to prevent personal data from being stolen, altered, damaged, lost, or disclosed. Upstream credentials in the MCP backend are sealed with ML-KEM-1024 and AES-256-GCM. No method of storage or transmission is perfectly secure.',
          },
        ],
      },
      {
        heading: 'Legal capacity',
        blocks: [
          {
            type: 'p',
            text: 'The Services are not directed at anyone who lacks the legal capacity to accept the Terms of Service. If we learn that we hold personal data from such a person without the consent the Civil Code requires, we will delete it.',
          },
        ],
      },
      {
        heading: 'Changes',
        blocks: [
          {
            type: 'p',
            text: 'We may update this policy by posting a new version on this page and changing the date above. If you have an account and a change materially affects how we use personal data, we will notify you by email or in the console before it takes effect. If you continue to use the Services after that date, you accept the update. If you do not, stop using the Services and you may ask us to delete your personal data.',
          },
        ],
      },
      {
        heading: 'Contact',
        blocks: [
          { type: 'p', text: 'Rick Weng' },
          { type: 'p', text: 'hello@saturn-core.com' },
        ],
      },
    ],
  },
} as const

const zh = {
  terms: {
    title: '服務條款 — Saturn',
    description: '你使用 Saturn 時同意的契約。本服務由 Rick Weng 提供。智慧財產由 Prism Capital LLC 所有。',
    crumb: '服務條款',
    heading: '服務條款',
    updated: '更新日期：2026 年 10 月 10 日',
    relatedPath: '/privacy',
    relatedLabel: '隱私權政策',
    sections: [
      {
        heading: '同意',
        blocks: [
          {
            type: 'p',
            text: '本服務條款是你與 Rick Weng 之間的契約。你存取或使用本服務，即表示你已閱讀並同意本條款與隱私權政策。若你不同意，請勿使用本服務。',
          },
          {
            type: 'p',
            text: '使用本服務，包括瀏覽網站並送出資料、建立或使用帳號、登入主控台、連線 MCP 後端，以及使用會連上我們伺服器的 Saturn App。',
          },
          {
            type: 'p',
            text: '若你代表組織使用，即表示你有權使該組織受本條款拘束。此時「你」包含該組織。透過你的帳號使用本服務的使用者，由你負責。',
          },
        ],
      },
      {
        heading: '誰提供本服務',
        blocks: [
          {
            type: 'p',
            text: '本服務由 Rick Weng 提供。Rick Weng 是位於台灣的個人。本條款所稱「我們」指 Rick Weng。',
          },
          {
            type: 'p',
            text: 'Saturn 的名稱、軟體、網站、主控台及其他智慧財產，由 Prism Capital LLC 所有。Prism Capital LLC 是美國懷俄明州的有限責任公司，並委託 Rick Weng 營運、維護與開發本服務。你的契約當事人是 Rick Weng，不是 Prism Capital LLC。',
          },
        ],
      },
      {
        heading: '服務內容',
        blocks: [
          {
            type: 'p',
            text: '本服務包含：',
          },
          {
            type: 'ul',
            items: [
              '網站 https://saturn-core.com。',
              'MCP 主控台 https://dashboard.saturn-core.com。',
              'MCP 後端伺服器 https://api.saturn-core.com，提供 Gateway、帳號、政策、核准與審計。',
              'Saturn App，供 macOS 與 Windows 使用的桌面應用程式。',
              'Saturn App 後端伺服器。它與 MCP 後端分開，供 Saturn App 登入、同步並執行 Agent。',
            ],
          },
          {
            type: 'p',
            text: '我們得改進、變更或停止本服務的一部分。若停止的是你已透過帳號使用的部分，我們會在合理可行時事先通知。',
          },
        ],
      },
      {
        heading: '帳號',
        blocks: [
          {
            type: 'p',
            text: '你應提供正確的帳號資料並保持更新。你應保管自己的憑證，並對帳號下的活動負責。若你認為帳號遭人冒用，請寫信到 hello@saturn-core.com。',
          },
          {
            type: 'p',
            text: '組織帳號得有成員、角色與權限。管理該帳號的人，負責邀請對象以及這些使用者可以做的事。',
          },
        ],
      },
      {
        heading: '使用資格',
        blocks: [
          {
            type: 'p',
            text: '你必須具備同意本條款的行為能力。依民法第12條，滿十八歲為成年。未滿七歲者無行為能力，其意思表示無效（民法第13條、第75條）。滿七歲以上之未成年人有限制行為能力，訂立本契約應經法定代理人允許或承認（民法第13條、第77條、第79條）。',
          },
        ],
      },
      {
        heading: '你的責任',
        blocks: [
          {
            type: 'p',
            text: '你決定連接哪些 Agent、工具、政策與 MCP Server。你要為自己的 Agent、註冊的 Server、撰寫的規則、下達的指示，以及這些呼叫與對話中的資料負責。政策依你的設定執行。我們不保證它會攔下你事後認為不該放行的每一次動作。',
          },
          {
            type: 'p',
            text: '你不得：',
          },
          {
            type: 'ul',
            items: [
              '以違反法律的方式使用本服務，或侵害他人權利。',
              '干擾本服務、未經授權探測本服務，或試圖取得其他客戶的資料或金庫中的密鑰內容。',
              '提交你無權提交的資料、指示或工具呼叫。',
              '偽稱身份，或把憑證交給不屬於你組織的人。',
            ],
          },
        ],
      },
      {
        heading: '客戶資料',
        blocks: [
          {
            type: 'p',
            text: '你保留自己與你的使用者所提交資料的權利，包括帳號資料、政策、對話與工具呼叫內容。你同意 Rick Weng 僅為提供、保護與支援本服務，依隱私權政策代管、處理並傳輸這些資料。',
          },
          {
            type: 'p',
            text: '你聲明自己有權提交這些資料，包括組織成員的個人資料，以及指示與工具呼叫參數中的個人資料。',
          },
        ],
      },
      {
        heading: '智慧財產',
        blocks: [
          {
            type: 'p',
            text: '本服務的智慧財產由 Prism Capital LLC 所有。除下列 MIT 授權外，本條款只給你在遵守條款期間使用本服務的有限權利。你不會取得本服務的所有權。',
          },
          {
            type: 'p',
            text: 'Saturn App 的原始碼另以 MIT 授權提供，著作權人是 Prism Capital LLC。MIT 授權規範你對該原始碼的權利，不取代本條款對本服務的規範。你使用會連上我們伺服器的 Saturn App 時，仍應遵守本條款。',
          },
          {
            type: 'p',
            text: '你若提供建議，我們得用於營運與改進本服務，而不因此對你負額外義務。這不會把你的客戶資料轉歸我們。',
          },
        ],
      },
      {
        heading: '費用',
        blocks: [
          {
            type: 'p',
            text: 'Saturn App 免費。瀏覽網站不收費。Pro 與 Enterprise 尚未開始販售，本條款不產生付款義務。若日後提供付費方案，我們會在收費前載明價格、計費期間與取消方式。只有你選擇購買的方案，才需要付費。',
          },
        ],
      },
      {
        heading: '保密',
        blocks: [
          {
            type: 'p',
            text: '我們只為提供本服務而使用你的客戶資料，並且只在隱私權政策允許或依你的指示時揭露。對於我們向你提供、且非公開的本服務資訊，你只得向有必要知悉、且負有保密義務的人員揭露。',
          },
        ],
      },
      {
        heading: '隱私',
        blocks: [
          {
            type: 'p',
            text: '隱私權政策說明個人資料如何處理，並構成本契約的一部分。個人資料保護法適用時，同法第8條所定的告知，記載於該政策。',
          },
        ],
      },
      {
        heading: '免責',
        blocks: [
          {
            type: 'p',
            text: '本服務依當時可提供的狀態供應。在法律允許的範圍內，我們不保證適銷性、特定目的之適用性或不侵權，也不保證服務不中斷或無錯誤、政策會攔下每一次呼叫，或 Agent 會依你的預期行事。',
          },
          {
            type: 'p',
            text: '模型供應者與你連接的 MCP Server 不屬於本服務。你與它們之間適用各自的條款。',
          },
        ],
      },
      {
        heading: '責任限制',
        blocks: [
          {
            type: 'p',
            text: '民法第222條禁止預先免除故意或重大過失的責任。本條款沒有免除該責任。依民法第247條之1，定型化契約中免除或減輕我們的責任、加重你的責任，或限制你行使權利的約定，若按其情形顯失公平，該部分無效。你若是消費者保護法所稱的消費者，本條款不排除同法第11條及第12條賦予你的權利。',
          },
          {
            type: 'p',
            text: '除法律不允許限制的責任外，我們對間接、附隨、特殊或衍生的損害不負責任，包括利潤損失、資料遺失，以及 Agent 或上游 Server 的行為。就本服務所生的單一請求，我們的合計責任上限是你在該請求發生前十二個月內為本服務支付給 Rick Weng 的費用。若你沒有付費，上限為零。',
          },
        ],
      },
      {
        heading: '補償',
        blocks: [
          {
            type: 'p',
            text: '因你的客戶資料、你的 Agent、你連接的 MCP Server，或你違反本條款所生的請求、損失與合理費用，你應補償 Rick Weng。若該請求是因我們的故意或重大過失所致，不在補償範圍。',
          },
        ],
      },
      {
        heading: '暫停與終止',
        blocks: [
          {
            type: 'p',
            text: '你可以隨時停止使用本服務。若你違反本條款、我們必須保護本服務或其他客戶，或我們停止提供本服務，我們得暫停或終止你的存取。在不會升高風險時，我們會告知理由。',
          },
          {
            type: 'p',
            text: '終止存取不會撤回你已依 MIT 授權取得的 Saturn App 原始碼權利。依其性質應存續的條款，包括客戶資料、智慧財產、保密、免責、責任與補償，於契約結束後仍然有效。你請求刪除個人資料時如何處理，見隱私權政策。',
          },
        ],
      },
      {
        heading: '變更',
        blocks: [
          {
            type: 'p',
            text: '我們得於本頁刊登新版本並更新上方日期，以修改本條款。若你已有帳號，且變更對你的權利義務有重大影響，我們會在生效前以電子郵件或主控台通知。生效日之後你繼續使用本服務，即表示你接受更新後的條款。若你不接受，請停止使用。',
          },
        ],
      },
      {
        heading: '準據法與管轄',
        blocks: [
          {
            type: 'p',
            text: '本條款以台灣法律為準據法，由台灣法院管轄。法律不允許你拋棄的管轄，不因本條而喪失。Prism Capital LLC 不是本契約的當事人。',
          },
        ],
      },
      {
        heading: '一般條款',
        blocks: [
          {
            type: 'p',
            text: '本條款與隱私權政策構成你與 Rick Weng 之間關於本服務的完整約定。任一條款若不能執行，其餘條款仍然有效。未經我們同意，你不得轉讓本契約。我們得把本契約轉讓給繼續提供本服務的承受人。未行使某一權利，不構成拋棄。',
          },
          {
            type: 'p',
            text: '本條款以繁體中文與英文提供。兩種文本不一致時，以繁體中文為準。',
          },
        ],
      },
      {
        heading: '聯絡',
        blocks: [
          { type: 'p', text: 'Rick Weng' },
          { type: 'p', text: 'hello@saturn-core.com' },
        ],
      },
    ],
  },
  privacy: {
    title: '隱私權政策 — Saturn',
    description: '你使用 Saturn 網站、主控台、MCP 後端、Saturn App 與 Saturn App 後端時，Rick Weng 如何處理個人資料。',
    crumb: '隱私權政策',
    heading: '隱私權政策',
    updated: '更新日期：2026 年 10 月 10 日',
    relatedPath: '/terms',
    relatedLabel: '服務條款',
    sections: [
      {
        heading: '本政策',
        blocks: [
          {
            type: 'p',
            text: '本政策說明你使用本服務時，個人資料如何被蒐集、處理與利用。你使用本服務，即表示你連同服務條款一起同意本政策。我們向你蒐集個人資料時，本政策即為個人資料保護法第8條所定的告知。',
          },
        ],
      },
      {
        heading: '誰負責',
        blocks: [
          {
            type: 'p',
            text: 'Rick Weng 是位於台灣的個人，決定為提供本服務而使用個人資料的目的與方式。請寫信到 hello@saturn-core.com。',
          },
          {
            type: 'p',
            text: 'Prism Capital LLC 是美國懷俄明州的有限責任公司，擁有智慧財產，並委託 Rick Weng 營運、維護與開發本服務。依本政策處理你個人資料的當事人不是 Prism Capital LLC。',
          },
        ],
      },
      {
        heading: '我們蒐集的資料',
        blocks: [
          {
            type: 'p',
            text: '個人資料類別依個人資料保護法所定分類。識別類資料為 C001，包括姓名、職稱與電子郵件。對話、工具呼叫參數，以及你選擇傳送的檔案，可能包含其他類別。實際類別依你提交的內容而定。',
          },
          {
            type: 'p',
            text: '在網站 https://saturn-core.com，預約展示會收集姓名、Email、公司與公司網址，以及你自行填寫的職稱或說明。頁面語言寫在網址裡。本網站不使用廣告 cookie，也沒有另外的分析工具。',
          },
          {
            type: 'p',
            text: '在 MCP 主控台 https://dashboard.saturn-core.com 與 MCP 後端 https://api.saturn-core.com，我們處理運行服務所需的帳號與 Gateway 紀錄：',
          },
          {
            type: 'ul',
            items: [
              '身份與帳號資料，包括姓名、Email、組織、角色與登入憑證。從 Saturn App 登入，使用的是同一組帳號。',
              '你設定的內容：成員、權限、Agent、工具集、政策與其版本，以及某人可以連接哪些 MCP Server。',
              'Gateway 評估的每一筆工具呼叫：Agent、工具、參數、政策版本、判定、審核人員（若有），以及是否已執行。',
              '你存放在金庫中的上游憑證。憑證經封存，以便 Gateway 執行你允許的呼叫。主控台不回傳密鑰本身。',
              '你若使用成本追蹤，則包括歸屬到呼叫的成本紀錄。',
            ],
          },
          {
            type: 'p',
            text: 'Saturn App 在你的電腦上運行。在它連上我們的伺服器之前，Agent、檔案、指令、對話與模型金鑰都留在該電腦，我們不會收到。你登入並使用 Saturn App 後端時，該後端與 MCP 後端分開，並處理它所同步與執行的 App 資料：Agent、對話、任務、排程喚醒、記憶，以及你在 App 中掛載的 MCP Server。',
          },
          {
            type: 'p',
            text: 'Saturn App 的下載由 GitHub 提供。GitHub 依它自己的條款處理該請求。',
          },
        ],
      },
      {
        heading: '目的與依據',
        blocks: [
          {
            type: 'p',
            text: '我們依個人資料保護法的特定目的蒐集與利用個人資料。特定目的及代號為：〇六九 契約、類似契約或其他法律關係事務；〇九〇 消費者、客戶管理與服務；一三六 資（通）訊與資料庫管理；一三七 資通安全與管理。',
          },
          {
            type: 'p',
            text: '蒐集與利用不得逾越這些目的的必要範圍，並應與目的具有正當合理的關聯（第5條、第20條）。我們是非公務機關，蒐集與處理的依據是：與你有契約或類似契約關係且已採取適當安全措施，以及你使用本服務所為的同意（第19條第1項第2款、第5款）。',
          },
        ],
      },
      {
        heading: '期間、地區、對象與方式',
        blocks: [
          {
            type: 'p',
            text: '預約展示只在回覆與後續聯絡所需的期間保存。帳號、主控台、MCP 後端與 Saturn App 後端的資料，在你使用本服務期間保存。特定目的消失，或你請求刪除時，我們會刪除或停止利用。為完成你已經提出的請求、解決爭議或遵守法律所仍必要的部分，得依第11條第3項但書繼續保存。',
          },
          {
            type: 'p',
            text: '主控台、MCP 後端與 Saturn App 後端由 Google Cloud 於台灣區域（asia-east1）代管。網站由 Cloudflare 代管。預約展示由表單服務 FormSubmit 寄至 sales@saturn-core.com。Saturn App 的下載由 GitHub 提供。工具呼叫只有在你自己的設定允許時，才會送到上游 MCP Server。組織內的人依其角色看到對應的內容。',
          },
          {
            type: 'p',
            text: '我們不出售個人資料，也不把它用於廣告。FormSubmit、Cloudflare 與 GitHub 為了寄送表單、提供網站或提供下載，可能在台灣以外處理它們經手的資料。主管機關若依第21條限制特定國際傳輸，我們會遵守該限制。',
          },
        ],
      },
      {
        heading: '你若不提供資料',
        blocks: [
          {
            type: 'p',
            text: '你可以選擇是否提供。你若不提供預約展示所需的資料，我們無法安排導覽。你若不提供帳號資料，就無法使用主控台、MCP 後端，以及 Saturn App 中需要登入的功能。Saturn App 不連線我們伺服器的功能，仍可在你的電腦上使用。',
          },
        ],
      },
      {
        heading: '你的權利',
        blocks: [
          {
            type: 'p',
            text: '依個人資料保護法第3條，你可以請求查詢或閱覽、製給複製本、補充或更正、停止蒐集、處理或利用，以及刪除。這些權利不得預先拋棄或限制。請寫信到 hello@saturn-core.com。我們可能需要確認提出請求的是你本人，並在該法所定期間內回覆。',
          },
        ],
      },
      {
        heading: '安全措施',
        blocks: [
          {
            type: 'p',
            text: '第27條要求採取適當安全措施，防止個人資料被竊取、竄改、毀損、滅失或洩漏。MCP 後端的上游憑證以 ML-KEM-1024 與 AES-256-GCM 封存。沒有任何儲存或傳輸方式是絕對安全的。',
          },
        ],
      },
      {
        heading: '行為能力',
        blocks: [
          {
            type: 'p',
            text: '本服務不以不具備同意服務條款之行為能力的人為對象。若我們得知在沒有民法所要求的同意下持有這類個人資料，會予以刪除。',
          },
        ],
      },
      {
        heading: '變更',
        blocks: [
          {
            type: 'p',
            text: '我們得於本頁刊登新版本並更新上方日期，以修改本政策。若你已有帳號，且變更對個人資料的利用有重大影響，我們會在生效前以電子郵件或主控台通知。該日期之後你繼續使用本服務，即表示你接受更新。若你不接受，請停止使用，並可以要求我們刪除你的個人資料。',
          },
        ],
      },
      {
        heading: '聯絡',
        blocks: [
          { type: 'p', text: 'Rick Weng' },
          { type: 'p', text: 'hello@saturn-core.com' },
        ],
      },
    ],
  },
} as const

export const legalCopy = { en, zh } as const satisfies Record<'en' | 'zh', { terms: LegalDoc; privacy: LegalDoc }>
