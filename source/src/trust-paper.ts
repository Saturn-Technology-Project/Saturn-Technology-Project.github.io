import type { LegalSection } from './legal'
import type { Locale } from './i18n'

export type TrustPaper = {
  eyebrow: string
  heading: string
  updated: string
  lede: string
  sections: readonly LegalSection[]
}

export const trustPaper: Record<Locale, TrustPaper> = {
  zh: {
    eyebrow: '白皮書',
    heading: 'Saturn MCP Gateway 系統白皮書',
    updated: '2026 年 10 月 18 日',
    lede: '狀態以 2026 年 10 月 18 日（台北時間）的產品為準。本文不是認證，也不是第三方稽核。白皮書和行銷文案說法不一致時，以本文為準。第二部分每個狀態只用四個標籤之一：【現況】（產品今天的實際行為）、【已修正】（之前發現的問題，修正已部署並複驗）、【未解決】（已知、還沒修好的問題）、【規劃中】（打算做、但還沒上線的改變；未列時程代表尚未承諾時程）。',
    sections: [
      {
        heading: '第一部分：產品與架構 — 1. 摘要',
        blocks: [
          {
            type: 'p',
            text: 'AI 代理人開始直接呼叫真實系統：付款、寄信、改資料庫、開工單。問題不在代理人「能不能」做，而是誰允許它做、做了什麼、出事時能不能追回。',
          },
          {
            type: 'p',
            text: 'Saturn MCP Gateway 站在代理人和 MCP 伺服器之間。每一次工具呼叫都會經過四步：',
          },
          {
            type: 'ol',
            items: [
              '認證：確認是哪個代理人在呼叫，每個代理人有自己的 OAuth 身分。',
              '判定：依照適用於這個代理人的 policy，決定允許、拒絕，還是要人審批。',
              '執行：只轉送已獲授權的呼叫；上游憑證留在 gateway，代理人拿不到。',
              '稽核：每次呼叫都寫一筆稽核紀錄，已儲存的稽核內容採零存取加密封存。',
            ],
          },
          {
            type: 'p',
            text: '設計原則只有一條：審批是許可，不是命令。人按下核准，不會讓工具直接執行；代理人必須用同一個 action ID 重新送出，gateway 會重新檢查期限、當下的 policy 和參數，全部吻合才執行。',
          },
        ],
      },
      {
        heading: '2. 適用範圍與讀者',
        blocks: [
          {
            type: 'p',
            text: '本文寫給要評估 Saturn 的技術負責人、資安和工程團隊。內容涵蓋：系統架構、代理人身分、policy、審批、上游憑證、金鑰階層與加密設計、資料分級與第三方資料流向、稽核、部署與營運，以及目前已知的邊界。',
          },
          {
            type: 'p',
            text: '本文描述的是上述版本的產品行為。本文不是認證，也不是第三方稽核。每次重大變更都會更新本文並標上版本。',
          },
        ],
      },
      {
        heading: '3. 產品方案',
        blocks: [
          {
            type: 'table',
            head: ['項目', 'Free', 'Pro', 'Team'],
            rows: [
              ['適用對象', '個人（Personal）', '個人（Personal）', '組織（Organization）'],
              ['Saturn App（桌面應用）', 'MIT 開源免費', 'MIT 開源免費', 'MIT 開源免費'],
              ['MCP Gateway 與工具集（Tool sets）', '有（工具集數量無上限）', '有（工具集數量無上限）', '有（工具集數量無上限）'],
              ['逐工具呼叫模式（Call／Approval）', '有', '有', '有'],
              ['參數層級 Policy 規則與版本控制', '無', '有', '有'],
              ['簽章 Webhooks', '無', '有', '有'],
              ['群組（Groups）與多人審批門檻（Quorum）', '無（單人審批）', '無（單人審批）', '有（群組與多人門檻）'],
              ['成員邀請、角色與逐員工 MCP 對應', '無', '無', '有'],
              ['稽核紀錄保存與零存取內容加密', '無限期（具備組織金鑰時零存取加密）', '無限期（具備組織金鑰時零存取加密）', '無限期（具備組織金鑰時零存取加密）'],
              ['價格', '$0（永久免費）', '$20／月（Coming soon）', '$20／人／月（Coming soon）'],
            ],
          },
          {
            type: 'p',
            text: 'Free 與 Pro 的功能分界以後端方案閘門為準：本文提到「參數層級 policy」與「簽章 webhook」的功能，只適用 Pro 以上；群組與多人審批門檻、成員邀請與角色管理，只適用 Team 以上。',
          },
        ],
      },
      {
        heading: '4. 系統元件',
        blocks: [
          {
            type: 'p',
            text: '參與方與信任邊界見第二部分 S2.1。Saturn 系統由下列十二個元件組成：',
          },
          {
            type: 'ul',
            items: [
              'Cloudflare 邊緣：提供 WAF、機器人防護、邊緣速率限制與 TLS 終端（僅接受 TLS 1.2 與 1.3），並在轉送至原始服務時注入來源驗證標頭。',
              'Gateway 服務（Cloud Run）：處理 MCP 協定流量（initialize、tools/list、tools/call）、OAuth 2.1 認證、policy 判定、審批佇列、零存取稽核封存與主控台 API。',
              'Webhook worker（獨立服務）：負責發送 HMAC-SHA256 簽章的審批事件通知（核准、駁回、過期）與失敗重試，與主服務分離，互不拖累。',
              'Session 與速率限制共用儲存（Redis）：儲存跨實例的 MCP session 狀態、pub/sub 通知與應用層速率限制計數器。啟動時無法連線則服務拒絕啟動；執行期無法連線時，登入與註冊等驗證端點直接拒絕請求。',
              '資料庫：儲存組織、成員、代理人、工具目錄、版本化 policy、加密後的上游憑證、處理中內容密文與零存取稽核紀錄。',
              'Cloud KMS：保管不離開硬體安全邊界的 HMAC 根金鑰，透過 MAC 運算依租戶推導上游憑證金鑰，並依組織推導處理中內容（7 天期效）的對稱加密金鑰。',
              'Secret Manager：僅存放應用程式執行期非讀出明文不可的設定值（例如資料庫連線字串、來源驗證密鑰、系統鹽值），不存放任何組織或成員的 ML-KEM 私鑰。',
              '寄信服務：僅用於發送帳號驗證、密碼重設、成員邀請與審批通知信件，不傳送工具呼叫的原始回應內容。',
              'Policy 草擬用的 LLM：供成員在主控台以自然語言輔助草擬或最佳化 policy 規則；產出的規則草案必須由成員人工確認並儲存後才會生效（傳送欄位見第 8 章）。',
              '主控台（瀏覽器端解密）：成員登入、管理代理人與工具集、撰寫 policy、核准或駁回敏感呼叫，並在瀏覽器記憶體內解鎖成員 ML-KEM-1024 私鑰以解密零存取稽核內容。',
              'Saturn App（MIT 開源桌面應用）：執行於 macOS 與 Windows 的本機桌面代理人（含獨立的本機 Runtime，只監聽本機迴路位址），可離線搭配本機模型運作，亦可連上 Saturn MCP Gateway 納入治理。',
              '客戶自己的 MCP 上游伺服器：客戶實際提供工具能力的外部或內部 MCP 伺服器（如帳務、CRM、資料庫、部署系統），只接收經 Saturn 授權並轉送的請求。',
            ],
          },
        ],
      },
      {
        heading: '5. 一次工具呼叫的完整流程',
        blocks: [
          {
            type: 'p',
            text: '從代理人連線到工具執行、封存與通知，一次完整的工具呼叫依序經過以下十二個步驟：',
          },
          {
            type: 'ol',
            items: [
              'OAuth 2.1 + PKCE 認證：代理人透過 OAuth 2.1 授權碼流程（強制 PKCE S256）取得綁定至該代理人與組織（或個人 profile）的存取權杖。未帶有效權杖呼叫 MCP 端點時回傳 401 與 RFC 9728 資源中繼資料。',
              'initialize 交握：代理人向 Saturn MCP 端點發送 initialize，建立綁定至該代理人身分的 MCP session（狀態寫入共用 Redis）。',
              'tools/list（依 tool set 過濾）：代理人請求工具清單時，gateway 僅回傳該代理人獲派工具集（tool set）內、且該成員獲准存取之 MCP 伺服器上的有效工具；不在工具集內的工具對代理人而言不存在。',
              'tools/call 送出呼叫：代理人針對某個工具送出 tools/call 與參數。若代理人處於暫停狀態，呼叫立即被擋下。',
              'Policy 判定：gateway 取出適用於該代理人的有效 policy（依規則順序比對工具名稱與參數條件）以及工具本身的預設模式（Call 或 Approval），給出「允許（allow）」、「拒絕（deny）」或「需審批（approval required）」三種判定之一；若代理人完全沒有任何適用的 policy，預設判定為拒絕。',
              '分流處理（允許／拒絕／需審批）：若判定為「允許」，直接進入第 9 步轉送上游；若判定為「拒絕」，呼叫絕不送往上流，立即寫入拒絕稽核紀錄，並回傳結構化錯誤（含 reason、policy_id、how_to_allow）。',
              '進入審批佇列（含群組 quorum）：若判定為「需審批」，gateway 產生唯一的 action ID（即 saturnRunId），將當下參數計算正規化 SHA-256 摘要，並將待審參數以每組織 KMS 推導金鑰加密保存（7 天到期）。呼叫進入審批佇列等待單一審核者核准，或等待所有必要審核群組（groups）達到法定門檻人數（quorum），同時回傳含審批連結與原因的結構化回應給代理人。',
              '以同一 action ID 重送並重新檢查：審核者按下核准不會直接觸發工具執行（「審批是許可，不是命令」）。代理人必須帶上同一個 saturnRunId 重新呼叫同一工具；gateway 會重新檢查三件事：核准與重送視窗是否尚未過期、重送當下的有效 policy 是否仍允許、以及重送的參數摘要是否與核准時綁定的參數完全一致。任一項不符即拒絕。',
              '以 vault 憑證轉送上游：通過檢查後，gateway 從後量子憑證庫（vault）解密該上游 MCP 伺服器的憑證（僅在此次呼叫期間於記憶體中開啟），代代理人向上游發送工具呼叫並取得回應；若上游回傳 401 且具備 refresh token，gateway 自動完成續期後重試一次。',
              '零存取封存：寫入長期稽核紀錄前，gateway 抽取一次性隨機 32-byte AES-256-GCM 資料金鑰，將工具參數、上游請求、上游回應、伺服器結果與代理人結果一起加密，再用 ML-KEM-1024 + HKDF-SHA384 將資料金鑰分別包裝給組織公鑰與每位有效成員的公鑰，寫入完成後立即刪除資料金鑰。若組織尚無可用的 ML-KEM 金鑰，內容不寫入，僅標記「加密不可用」。',
              '寫入稽核紀錄：gateway 以原子計數器取得該組織遞增序號，將明文中繼資料（呼叫者、工具、policy 版本、判定結果、加密狀態、內容雜湊）與零存取密文信封寫入稽核表。',
              '發送簽章 webhook：若審批狀態變更為核准、駁回或過期（Pro 以上方案），獨立的 webhook worker 會將事件以 HMAC-SHA256 簽章送往客戶設定的 HTTPS 端點。Webhook 僅負責通知，其回應不會觸發工具執行。',
            ],
          },
        ],
      },
      {
        heading: '6. 連接上游 MCP',
        blocks: [
          {
            type: 'p',
            text: '客戶將外部或內部的 MCP 伺服器接入 Saturn 時，gateway 負責網路邊界檢查、工具探索與上游 OAuth 生命週期管理：',
          },
          {
            type: 'ul',
            items: [
              '註冊與網路邊界檢查：以 URL 註冊上游 MCP 伺服器時，gateway 強制要求 HTTPS（僅本機開發允許 localhost 的 HTTP），並解析主機名稱以封鎖私有網段、迴路位址、link-local 與雲端 metadata 位址，防止伺服器端請求偽造（SSRF）。',
              '自動工具探索：連線建立或手動重新整理時，gateway 對上游依序發送 MCP 標準的 initialize 與 tools/list，擷取每個工具的名稱、描述與 JSON inputSchema。若不同伺服器有同名工具，gateway 會自動加上伺服器名稱前綴以防命名衝突；上游已移除的工具則自動停用。',
              '代管上游 OAuth（動態註冊與自動續期）：若上游 MCP 伺服器需要 OAuth 授權，Saturn 會自動探索上游的 OAuth 授權伺服器中繼資料，在支援時執行 Dynamic Client Registration（DCR），並透過帶 PKCE 的授權流程取得權杖。取得的 access token、refresh token 與 client secret 會個別以每租戶 ML-KEM-1024 金鑰封存入庫；當上游在呼叫或探索期間回傳 401 時，gateway 會自動使用 refresh token 更新權杖並重新封存。',
            ],
          },
        ],
      },
      {
        heading: '7. 金鑰階層',
        blocks: [
          {
            type: 'p',
            text: 'Saturn 的密碼學設計分為兩棵彼此獨立的金鑰樹：一棵是由 Cloud KMS 根金鑰推導的「伺服器端金鑰樹」（用於上游憑證與 7 天處理中內容），另一棵是由瀏覽器端產生並保護的「零存取金鑰樹」（用於長期封存的稽核內容與成員私鑰）。兩棵樹不共用任何秘密。',
          },
          {
            type: 'table',
            head: ['金鑰層級', '演算法與推導方式', '產生與持有位置', '用途與保護範圍'],
            rows: [
              ['Cloud KMS 根金鑰', 'HMAC-SHA256 硬體保護金鑰', 'Google Cloud KMS（永不離開 KMS）', '作為伺服器端推導每租戶與每組織金鑰的唯一根信任點'],
              ['每租戶憑證金鑰（pq2.）', 'KMS MAC 依組織與建立者推導種子 → ML-KEM-1024 → HKDF-SHA384 → AES-256-GCM', '執行期由 Gateway 向 KMS 請求推導，不寫入資料庫', '加密上游 MCP 伺服器的 access token、refresh token 與 client secret'],
              ['每組織處理中內容金鑰（s2.）', 'KMS MAC 依組織 ID 推導 32-byte 對稱金鑰 → AES-256-GCM（記憶體快取 300 秒）', '執行期由 Gateway 向 KMS 請求推導，不寫入資料庫', '加密等待核准的參數與執行中 run 的狀態（保存 7 天後到期）'],
              ['組織 ML-KEM 金鑰對', 'ML-KEM-1024（FIPS 203），公鑰 1,568 bytes、私鑰種子 64 bytes', '瀏覽器端產生；Gateway 僅存公鑰與加密備份', '接收零存取稽核紀錄的資料金鑰封裝，並供新成員加入或密碼重設後重包金鑰'],
              ['成員 ML-KEM 金鑰對', 'ML-KEM-1024（FIPS 203），私鑰種子以密碼衍生金鑰（PBKDF2 600,000 次 + AES-256-GCM）包裝', '瀏覽器端產生與解鎖（僅駐留頁面記憶體）', '成員在瀏覽器內解開零存取稽核內容與組織金鑰副本'],
              ['組織 Recovery Key', '256-bit 隨機金鑰 → HKDF-SHA256（saturn-recovery-v1）→ AES-256-GCM', '建立組織金鑰時於瀏覽器顯示一次，永不上傳至伺服器', '管理員或全體成員遺失密碼備份時，於瀏覽器離線解開組織金鑰備份密文'],
            ],
          },
          {
            type: 'p',
            text: '這種分離確保了：即使攻擊者取得完整的資料庫傾印，沒有 KMS 呼叫權限就無法解開任何上游憑證或處理中內容；即使攻擊者能操作執行中的 gateway，也無法回頭解開已刪除資料金鑰的歷史零存取稽核紀錄，或解開成員的私鑰。',
          },
        ],
      },
      {
        heading: '8. 資料分級與第三方資料流向',
        blocks: [
          {
            type: 'h3',
            text: '8.1 資料分級表',
          },
          {
            type: 'table',
            head: ['資料分級', '包含欄位', '儲存與加密方式', 'Gateway 寫入後能否讀取', '保存期限'],
            rows: [
              ['明文中繼資料', '呼叫者身分、代理人 ID、工具名稱、policy ID 與版本、判定結果、時間戳、原子序號、加密狀態、內容 SHA-256 雜湊', '資料庫明文儲存（供主控台搜尋、篩選與治理統計）', '能', '長期保存'],
              ['處理中內容（Gateway 可讀 7 天）', '等待人工核准的工具參數、核准佇列脈絡、執行中（active run）的暫存狀態', 'AES-256-GCM（前綴 s2.），金鑰由 Cloud KMS MAC 依組織推導', '能（為了在核准期間展示脈絡、比對重送摘要並接續轉送）', '7 天後到期'],
              ['零存取稽核內容', '已封存的工具參數（arguments）、上游原始請求（raw_request）、上游原始回應（raw_response）、伺服器結果（server_result）、代理人結果（agent_result）', '隨機 32-byte AES-256-GCM 資料金鑰加密（org-mlkem1024-v1），再以 ML-KEM-1024 + HKDF-SHA384 包裝給組織金鑰與每位有效成員公鑰，寫完即刪除資料金鑰', '不能（僅授權成員可於瀏覽器內解密）', '長期保存'],
              ['上游憑證（Vault）', '上游 MCP 伺服器的 OAuth access token、refresh token、client secret 與靜態授權標頭', 'ML-KEM-1024 + HKDF-SHA384 + AES-256-GCM（前綴 pq2.），金鑰由 Cloud KMS MAC 依租戶推導', '只在完成一次已授權呼叫的期間於記憶體開啟', '長期保存（直到撤銷或重新連線）'],
            ],
          },
          {
            type: 'h3',
            text: '8.2 Policy LLM 與第三方資料流向',
          },
          {
            type: 'p',
            text: '當成員在主控台主動使用「AI 輔助草擬」或「最佳化 policy」功能時，gateway 會將產生規則所需的最小欄位送往由 Saturn 設定的 LLM 服務供應商（透過相容於 OpenAI Chat Completions 的 HTTPS API 呼叫）：',
          },
          {
            type: 'ul',
            items: [
              '草擬 policy 時送出的欄位：組織內候選工具的名稱（name）、上游伺服器名稱（server）、工具描述（description，截斷至最多 500 字元）、參數結構摘要（inputSchema.properties，最多 30 個屬性，含型別、最多 12 個列舉值與最多 160 字元的屬性描述），以及成員輸入的自然語言需求說明（request，截斷至最多 4,000 字元）。',
              '最佳化現有 policy 時額外送出的欄位：該條 policy 目前綁定的工具名稱、決策（allow／require_approval／deny）與條件清單（field、operator、value）。',
              '絕不送往 Policy LLM 的資料：歷史工具呼叫的實際參數、上游回應內容、稽核紀錄、上游憑證、成員密碼雜湊或任何加密金鑰，均不會送往 LLM 服務供應商。若成員不使用 AI 草擬功能，則不會發起任何 LLM 呼叫。',
              '其他外部資料流向：除上述按需觸發的 Policy LLM 外，請求流量經由 Cloudflare 邊緣轉送；帳號與審批通知信件經由寄信服務發送（僅含通知連結與基本事件中繼資料）；已授權的工具呼叫送往客戶自己註冊的上游 MCP 伺服器；審批事件簽章通知送往客戶自己設定的 webhook URL。',
            ],
          },
        ],
      },
      {
        heading: '第二部分：安全架構 — S1. 概述與設計原則',
        blocks: [
          {
            type: 'h3',
            text: 'S1.1 Saturn 保護什麼',
          },
          {
            type: 'p',
            text: 'AI 代理人開始直接呼叫真實系統：付款、寄信、改資料、開工單。Saturn 站在代理人和 MCP 上游伺服器之間，每一次工具呼叫都要經過四步：',
          },
          {
            type: 'ol',
            items: [
              '認證：確認是哪一個代理人在呼叫。每個代理人有自己的 OAuth 身分。',
              '判定：依照適用於這個代理人的 policy，決定允許、拒絕，或送人審批。',
              '執行：只轉送已授權的呼叫。上游憑證留在 gateway 裡，代理人拿不到。',
              '稽核：每次呼叫都寫一筆紀錄，已儲存的敏感內容採零存取加密封存。',
            ],
          },
          {
            type: 'h3',
            text: 'S1.2 核心承諾',
          },
          {
            type: 'ul',
            items: [
              '代理人拿到的是結果，不是秘密。上游的 access token 和 client secret 不會交給代理人。',
              '代理人不被信任。Saturn 預設代理人可能被操控，或本身就是惡意的。它不能自己挑工具、不能持有上游憑證，也不能核准自己的呼叫。',
              '審批是許可，不是命令。人按下核准不會讓工具直接執行。代理人要用同一個 action ID 重送，gateway 重新檢查期限、當下的 policy 和參數，全部符合才執行。',
              '讀不到金鑰就不運作（fail-closed）。讀不到所需的金鑰材料時，gateway 不會啟動，也不會用明文寫入內容。',
            ],
          },
          {
            type: 'h3',
            text: 'S1.3 誠實的限制',
          },
          {
            type: 'p',
            text: 'Saturn 限制的是代理人做得到什麼，不是代理人怎麼想。Saturn 看不到代理人的推理，也不檢查參數內容的語意。Saturn 的部分保證要靠平台營運方誠實運作，以及成員的瀏覽器沒有被入侵。這些前提和目前還沒修好的問題，第 S2 節和第 S10 節會逐條列出。',
          },
        ],
      },
      {
        heading: 'S2. 威脅模型與信任邊界',
        blocks: [
          {
            type: 'h3',
            text: 'S2.1 參與方',
          },
          {
            type: 'table',
            head: ['參與方', '信任它做什麼', '不信任它做什麼'],
            rows: [
              ['代理人（Agent）', '不信任。視為可能被操控或惡意。', '自己挑工具、持有上游憑證、核准自己的呼叫'],
              ['MCP 上游伺服器', '回應已授權的呼叫', '看到被轉送的請求以外的任何東西，包括 Saturn 的憑證庫'],
              ['Gateway（Saturn 服務）', '認證呼叫者、執行 policy、完成已授權的呼叫、寫稽核紀錄', '讀取成員私鑰，或解密已刪除資料金鑰的零存取稽核內容'],
              ['平台營運方（有基礎設施存取權的人）', '誠實運行服務', '見 S2.3。實際上，營運方目前被信任的範圍包括：KMS 簽章權限的管理、呼叫當下轉送環境的完整性、稽核紀錄的保存和順序。'],
              ['成員的瀏覽器', '執行未被竄改的 Saturn 程式，持有成員私鑰', '其他一律不信任。瀏覽器被入侵時，該成員的金鑰會外洩。'],
              ['Saturn 網域與建置流程', '提供未被竄改的前端程式', '這是隱性信任方，見第 S7 節'],
            ],
          },
          {
            type: 'h3',
            text: 'S2.2 範圍內：Saturn 設計上要防的',
          },
          {
            type: 'ul',
            items: [
              '被入侵或惡意的代理人。防線有四道：每個代理人只看得到組織替它挑的工具（curated tool set）；policy 規則（Pro 以上方案可以對參數設條件）；需要人判斷的呼叫進入審批佇列；每個代理人有獨立的 OAuth 身分，每次呼叫都記在它名下，也可以單獨撤銷。',
              '不可信的 MCP 上游。上游憑證封存在 gateway 的憑證庫裡。代理人和上游都拿不到憑證庫的內容。',
              '資料庫副本外洩。上游憑證、處理中內容與已儲存的稽核內容在資料庫裡都是密文。上游憑證與處理中內容的金鑰由 KMS 依租戶／組織推導，KMS 金鑰不在資料庫裡；已儲存的稽核內容則以零存取加密封給組織與成員公鑰，連 gateway 也無法解密歷史紀錄。',
              '跨租戶存取。我們內部紅隊的已認證測試（不是第三方稽核）沒有找到跨租戶存取、IDOR 或權限提升：組織一律由 session 決定，無法用參數覆寫；偽造其他組織的物件 ID 只會得到 403 或 404。',
            ],
          },
          {
            type: 'h3',
            text: 'S2.3 範圍外：Saturn 不防的',
          },
          {
            type: 'ul',
            items: [
              '代理人自身推理被提示注入（prompt injection）。被注入的內容說服代理人送出一個 policy 允許的呼叫，Saturn 會放行。Saturn 能限制被操控的代理人做到什麼，但不能阻止它被操控。',
              '內容層檢查與 DLP。policy 只檢查你宣告的條件。Saturn 不做 DLP，不辨識機密或個資，也不檢查參數內容的語意。',
              '能讀取 gateway 金鑰材料、或能用 KMS 金鑰做簽章運算的營運方。擁有 KMS MAC 簽章權限的服務身分，可以推導任何一個租戶的上游憑證金鑰與 7 天處理中內容金鑰（見第 S4 節與第 S6 節）。這樣的人也能刪除或重排稽核紀錄而不被發現（見第 S6.3 節）。',
              '成員的電腦或瀏覽器被入侵。惡意程式、惡意擴充功能或被劫持的 session，可以讀到該成員能解開的所有東西，包括私鑰解鎖後的內容。',
            ],
          },
        ],
      },
      {
        heading: 'S3. 身分與登入',
        blocks: [
          {
            type: 'h3',
            text: 'S3.1 代理人身分',
          },
          {
            type: 'ul',
            items: [
              '【現況】代理人透過 OAuth 2.1 的 authorization code 流程取得身分，強制使用 PKCE S256。沒有 code_challenge 的請求，或想降級成 plain 的請求，都會被拒絕。redirect_uri 必須完全相符，帶前綴延伸的變形也會被拒，所以不會形成開放重新導向。',
              '【現況】支援 MCP 標準的 Dynamic Client Registration（DCR）。MCP 端點未認證時回 401，並依 RFC 9728 附上 resource metadata。',
              '【現況】代理人的 OAuth token 和成員的網頁 session 是兩個分開的認證平面。網頁 session token 不能用來呼叫 MCP gateway。',
              '【已修正】依 MCP 慣例，DCR 不需要認證，因此註冊端點已加上應用層速率限制（依真實客戶端 IP 跨實例計數），防止大量註冊濫用。',
              '【規劃中】對動態註冊的 OAuth client 加入異常監控，並定期清除長期閒置未使用的 client。',
            ],
          },
          {
            type: 'h3',
            text: 'S3.2 成員登入與多因素驗證（MFA）',
          },
          {
            type: 'p',
            text: '【現況】瀏覽器端：v2. 登入值。送出前，瀏覽器先用 Argon2id 處理密碼（salt 由 email 推導），再做 HKDF，然後送出 v2. 加十六進位字串。我們要講清楚這一步能做到什麼、不能做到什麼：',
          },
          {
            type: 'ul',
            items: [
              '它只是傳輸混淆，不是傳輸保護。送出的 v2. 值等同密碼：攔到它的人，不需要知道密碼就能登入。登入路徑真正的保護是 TLS，加上伺服器端的 Argon2id。',
              'salt 由 email 推導，可以預測，也不是每次註冊隨機產生，所以有人能針對已知 email 預先計算。不要因為有這一步就高估客戶端雜湊的價值。',
              '它的價值有兩個：正常登入時，原始密碼不會離開瀏覽器；登入值和成員私鑰的包裝材料分開（domain separation），所以登入值解不開成員私鑰。',
            ],
          },
          {
            type: 'p',
            text: '【現況】伺服器端：真正的保護。伺服器收到登入值後，用每個帳號各自隨機的 salt 再做一次 Argon2id，才寫入儲存。Saturn 不儲存密碼。登入後拿到的是伺服器端不透明的 session token，不是 JWT，所以沒有離線竄改或 alg=none 的攻擊面。登出會讓 token 立刻失效。成員私鑰解開後只放在頁面記憶體，token 也不寫進 localStorage。',
          },
          {
            type: 'p',
            text: '【現況】舊帳號遷移的明確例外。舊格式的帳號（早期的 SHA-256 登入值或 PBKDF2 雜湊）在遷移截止前登入時，會經 TLS 送出一次原始密碼，讓伺服器驗證舊雜湊，再改寫成 Argon2id。這是「伺服器看不到密碼」的例外；系統已有遷移截止機制，截止後舊格式登入不再接受，未遷移的帳號必須重設密碼。',
          },
          {
            type: 'ul',
            items: [
              '【已修正】登入不再洩漏帳號是否存在。之前，已註冊和未註冊的 email 收到的錯誤回應不同，回應裡還帶有帳號的遷移狀態。現在兩者收到的 401 回應逐位元組完全相同，狀態碼、長度、內容都一樣，已經複驗。',
              '【已修正】一般登入端點、OAuth 登入端點與舊帳號遷移登入端點均已加上應用層速率限制。',
              '【已修正】管理員帳號強制設定 MFA。平台管理員與組織管理員必須完成啟用 TOTP 多因素驗證，否則管理與組織寫入操作會被拒絕。',
              '【已修正】TOTP 安全強化：TOTP secret 在資料庫中加密封存（不以明文存放）；每個 30 秒時間步長（含前後時間窗共 90 秒有效範圍）內已驗證過的步長會被記錄，同一組驗證碼不可重複使用；連續輸入錯誤達 5 次即鎖定拒絕，防止暴力猜測。',
              '【規劃中】確保登入值不會寫進任何外部錯誤回報，並持續評估改用 augmented PAKE（例如 OPAQUE），讓登入值不再等同密碼（此項仍在評估，尚未承諾時程）。',
            ],
          },
        ],
      },
      {
        heading: 'S4. 上游憑證保管與成員私鑰',
        blocks: [
          {
            type: 'h3',
            text: 'S4.1 上游憑證庫（Vault）現況',
          },
          {
            type: 'ul',
            items: [
              '【已修正】每個租戶各自一把金鑰。先前的共用 gateway 金鑰已汰換為每租戶 KMS 推導金鑰：現在每個租戶的憑證金鑰，由 Cloud KMS 的 MAC 運算依租戶推導。KMS 金鑰本身不離開 KMS，所以一個租戶的金鑰打不開其他租戶的憑證。只拿到資料庫副本的人，也推導不出任何租戶的金鑰。',
              '【現況】加密流程。每筆憑證密文的前綴是 pq2.。流程是 ML-KEM-1024（FIPS 203）封裝，接著 HKDF-SHA384，最後用 AES-256-GCM 加密。',
              '【現況】只在呼叫期間開啟。gateway 只在完成一次已授權的呼叫時，打開對應的那個憑證。代理人拿到的是呼叫結果，永遠拿不到憑證本身。',
              '【現況】fail-closed。gateway 取不到金鑰材料時不會啟動。',
            ],
          },
          {
            type: 'h3',
            text: 'S4.2 邊界',
          },
          {
            type: 'ul',
            items: [
              'KMS 簽章權限就是控制點。每租戶金鑰防的是資料庫外洩，防不了持有權限的人。凡是有 KMS MAC 簽章權限的服務身分，都能推導出任何一個租戶的金鑰。所以真正的防線是 IAM：只有 gateway 的執行身分有這項權限，而且要嚴格控管、記錄每一次存取。',
              '「只在呼叫期間開啟」是軟體在限制，不是密碼學在限制。這條規則靠程式邏輯和存取控制執行。密碼學本身沒有限制 gateway 什麼時候能打開憑證。',
              '等待審批的參數。等待審批的參數在儲存時是封存的（見第 S6 節的處理中內容）。核准後，gateway 要用明文參數才能完成呼叫。gateway 只在完成這次已核准的呼叫時處理明文，這一點同樣是軟體限制。',
              '建議客戶的作法。存進 Saturn 的上游憑證，請只給它需要的最小權限。',
            ],
          },
          {
            type: 'h3',
            text: 'S4.3 舊格式憑證與金鑰輪替',
          },
          {
            type: 'ul',
            items: [
              '【已修正】舊格式憑證處理。早期格式的憑證密文不會被當成空值或靜默失敗，系統會明確標記為需要重新驗證，主控台介面也會顯示提示要求重新連線授權。',
              '【規劃中】KMS 金鑰版本目前是固定的，目前不支援金鑰輪替，請勿假設支援（見第 S8 節）。',
            ],
          },
          {
            type: 'h3',
            text: 'S4.4 成員私鑰與組織金鑰備份',
          },
          {
            type: 'ul',
            items: [
              '【現況】每個成員在每個組織裡有自己的 ML-KEM-1024 私鑰。私鑰在瀏覽器裡用密碼推導的金鑰包裝後才上傳，Saturn 伺服器不保存能解開它的金鑰。',
              '【現況】包裝金鑰和登入值用不同的材料推導，所以登入值解不開私鑰。解開後的私鑰只放在頁面記憶體，分頁關掉就消失。',
              '【現況】可以用 256-bit 的 recovery key 救回組織金鑰。成員備份和 recovery key 都遺失時，私鑰與封存內容就救不回來，包括 Saturn 在內沒有人打得開。這是刻意的設計。',
              '【已修正】成員協助重設後重包組織金鑰時，瀏覽器會先重新向伺服器取得目標成員的公鑰並比對 SHA-256 公鑰指紋，指紋不符即拒絕封裝，防止替換公鑰的中間人攻擊。',
              '【現況】限制：成員被移除後，不會再有新內容包給他的金鑰。但已經包給他的舊內容，持有他私鑰和備份的人仍然打得開。移除成員能阻止未來的存取，收不回過去的存取。',
              '【未解決】目前一般成員也能透過 API 下載組織金鑰備份的密文（不是明文）。如果包裝用的密碼或備份保護不足，這會擴大離線攻擊面。',
              '【規劃中】將組織金鑰備份密文的下載權限改為僅限組織管理員。',
            ],
          },
        ],
      },
      {
        heading: 'S5. 政策引擎',
        blocks: [
          {
            type: 'h3',
            text: 'S5.1 判定方式',
          },
          {
            type: 'ul',
            items: [
              '【現況】每次工具呼叫，都用適用於這個代理人的 policy 判定。規則可以設成允許、拒絕或需要審批。',
              '【現況】方案差異：Free 方案提供工具層級控制（決定工具能否呼叫、設為自動執行或需人工審批，但限制不了已允許呼叫的參數）；Pro 以上方案提供參數層級條件（例如 amount > 5000 時要審批，審批也會綁定這組參數）。',
              '【現況】policy 有版本，每筆稽核紀錄都會記下當時用的 policy 版本。用 LLM 起草的 policy 不會自動生效，必須由人確認。',
            ],
          },
          {
            type: 'h3',
            text: 'S5.2 審批流程與結構化錯誤',
          },
          {
            type: 'ol',
            items: [
              'policy 判定為需要審批時，代理人會拿到一個 action ID（saturnRunId），呼叫進入審批佇列。',
              '成員在主控台看到的是這一次、這組參數。',
              '核准不會直接執行工具。代理人要用同一個 action ID 重送，gateway 會重新檢查三件事：核准是否已過期、當下的 policy 是否還允許、參數是否和核准的那組一致。參數不一致就拒絕。',
              '審批結果用簽章 webhook 通知。webhook 只負責通知，不會觸發執行。',
            ],
          },
          {
            type: 'p',
            text: '例子：代理人送出一筆 $5,800 的付款，主管核准了。代理人重送時把金額改成 $58,000，gateway 會拒絕，因為參數和核准的那組不一樣。',
          },
          {
            type: 'p',
            text: '【已修正】被擋下的呼叫回傳結構化錯誤：`reason`、`policy_id`、`how_to_allow`。不回傳核准時的參數或摘要；`how_to_allow` 只指引送出核准請求，不能用來修改 policy。',
          },
          {
            type: 'h3',
            text: 'S5.3 預設行為',
          },
          {
            type: 'ul',
            items: [
              '【已修正】工具層級：沒有規則的工具會被拒絕。代理人呼叫的工具如果沒有對應的規則，判定結果是拒絕。上游新增了現有規則沒提到的工具時，這個修正特別重要。',
              '【已修正】沒有適用 policy 時判定為拒絕。過去若代理人沒有任何適用的 policy 會被放行；現在當代理人沒有任何適用的 policy 時，政策引擎預設判定為拒絕（fail-closed），並在建立組織與連接上游時自動維護預設 policy。',
            ],
          },
        ],
      },
      {
        heading: 'S6. 稽核與零存取加密',
        blocks: [
          {
            type: 'p',
            text: 'Saturn 對已儲存的稽核內容採用零存取加密（zero-access encryption）。Gateway 在轉送工具呼叫時會處理明文；寫入稽核紀錄前，內容以 ML-KEM-1024 包裝至組織金鑰與各成員公鑰，資料金鑰隨即刪除。此後，Saturn 伺服器無法解密已儲存的內容，僅成員可於瀏覽器內開啟。',
          },
          {
            type: 'p',
            text: '零存取加密不等同端對端加密。Gateway 在呼叫當下可讀取內容；若 gateway 遭入侵，其後的呼叫內容可能外洩，已封存的紀錄則不受影響。等待核准與執行中的內容另以伺服器端金鑰加密，保存 7 天，不在零存取範圍內。',
          },
          {
            type: 'table',
            head: ['資料', '加密', 'gateway 寫入後能否讀', '保存'],
            rows: [
              ['已儲存的稽核內容', 'AES-256-GCM 資料金鑰，再以 ML-KEM-1024 + HKDF-SHA384 包裝給組織金鑰與每位有效成員的金鑰；寫完即刪資料金鑰', '不能', '長期'],
              ['處理中內容（等待核准的參數、執行中的 run）', 'AES-256-GCM，金鑰由 Cloud KMS MAC 依組織推導', '能（為了接續核准與轉送）', '7 天後到期'],
              ['上游憑證', 'ML-KEM-1024 + HKDF-SHA384 + AES-256-GCM，金鑰由 KMS MAC 依租戶推導', '只在完成已授權呼叫時開啟', '長期'],
            ],
          },
          {
            type: 'h3',
            text: 'S6.1 記錄什麼',
          },
          {
            type: 'ul',
            items: [
              '【現況】每次呼叫都寫一筆紀錄。可讀欄位包括：呼叫者、工具、policy 版本、判定結果、加密狀態與內容雜湊。',
              '【現況】已儲存的呼叫參數、上游請求、上游回應、伺服器結果與代理人結果，會以零存取信封（org-mlkem1024-v1）加密封存。',
              '【現況】當組織沒有任何可用的 ML-KEM 金鑰時，稽核內容不寫入，稽核列僅記錄「加密不可用（unavailable）」，絕不退回明文儲存。',
            ],
          },
          {
            type: 'h3',
            text: 'S6.2 兩層內容封存的運作方式',
          },
          {
            type: 'ul',
            items: [
              '【現況】第一層（已儲存的稽核內容，零存取加密）：gateway 對每筆稽核紀錄抽取隨機 32-byte 資料金鑰，以 AES-256-GCM 加密正規化 JSON（附加驗證資料 AAD 為組織 ID、紀錄 ID、欄位類型與格式版本 1），接著以 ML-KEM-1024 封裝並透過 HKDF-SHA384（info 為 saturn-payload-mlkem1024-v1）衍生包裝金鑰，將資料金鑰分別包給組織公鑰與每位有效成員公鑰，寫入後立即刪除資料金鑰。平台管理員 API 亦會過濾掉所有密文信封。',
              '【現況】第二層（等待核准與執行中的處理中內容，7 天伺服器端加密）：等待人工審批的參數與執行中 run 的狀態，因為 gateway 在核准後必須讀取參數並轉送上游，所以使用由 Cloud KMS MAC 依組織推導的對稱金鑰進行 AES-256-GCM 加密（前綴 s2.），保存 7 天後自動到期失效。',
            ],
          },
          {
            type: 'h3',
            text: 'S6.3 完整性',
          },
          {
            type: 'ul',
            items: [
              '【現況】逐筆雜湊。每筆紀錄都存一個 SHA-256 內容雜湊，成員在瀏覽器解密後可核對該筆內容有沒有被改。',
              '【已修正】序號原子產生。之前序號是用「目前筆數加一」算出來的，併發寫入時可能撞號，紀錄被刪除後也可能出現重複或藏住缺口。現在序號由一張原子計數表產生，併發寫入也不會重複。',
              '【未解決】沒有雜湊鏈，也沒有外部錨定。紀錄之間沒有密碼學上的串連。能直接存取資料庫的人，可以刪除、重排或截斷紀錄而不被發現。所以 Saturn 的稽核日誌目前不是防竄改的：完整性只保護到每一筆，不保護整份日誌。',
              '【未解決】內容雜湊沒有加金鑰。這個雜湊是不加鹽、不加金鑰的 SHA-256。能讀資料庫的人可以拿它比對猜測，對低熵內容（固定金額、是或否、簡短列舉值）特別有效。',
              '【規劃中】加上防竄改的雜湊鏈，讓每一筆都承諾前一筆的雜湊，並定期把鏈頭錨定到營運方控制不了的外部儲存；同時把內容雜湊改成帶金鑰的 MAC，或改由 AES-GCM 驗證標籤負責，不再另存明文摘要。',
            ],
          },
        ],
      },
      {
        heading: 'S7. 部署邊界與速率限制',
        blocks: [
          {
            type: 'h3',
            text: 'S7.1 現況',
          },
          {
            type: 'ul',
            items: [
              '【現況】服務跑在 Google Cloud Run，對外的公開網域前面是 Cloudflare（WAF、機器人防護、邊緣速率限制）。只開放 HTTPS，TLS 只接受 1.2 和 1.3。',
              '【現況】API 和 dashboard 的每個回應都帶完整的安全標頭：嚴格的 CSP、HSTS、X-Frame-Options: DENY、鎖死的 Permissions-Policy、X-Content-Type-Options。API 的 CORS 只允許 Saturn 自己的 dashboard 來源。互動式 API 文件沒有對外開放。',
            ],
          },
          {
            type: 'h3',
            text: 'S7.2 已修正項目',
          },
          {
            type: 'ul',
            items: [
              '【已修正】行銷網站安全標頭。之前行銷網站缺少 HSTS、CSP、防點擊劫持和 Permissions-Policy，現在全部補上。CSP 限制 script-src \'self\'，禁止 object-src，也禁止被嵌入框架。',
              '【已修正】密碼學程式自行託管。之前部分密碼學程式從外部 CDN 載入，而且沒有 Subresource Integrity。現在外部 CDN 已完全移除，密碼學程式和應用程式碼都由 Saturn 自己的網域打包提供，CSP 也不允許載入遠端腳本。OAuth 登入頁的雜湊程式同樣改成自行託管，載入失敗時直接擋下登入，不會退回舊格式。',
              '【已修正】應用層驗證 Cloudflare 來源標頭。過去若直接連線 Cloud Run 原始服務（origin）可跳過 Cloudflare WAF；現在後端與前端都在應用層以常數時間驗證 Cloudflare 邊緣注入的來源驗證 header，缺少或不符就立即回傳 403 拒絕。精確地說：origin 在網路層仍可連線，只是未經 Cloudflare 邊緣的請求會在應用層被拒絕。',
              '【已修正】速率限制以 Cloudflare 提供的真實客戶端 IP 計算，並透過 Redis 跨實例共用計數；當共用儲存（Redis）無法連線時，登入、遷移登入、註冊與動態用戶端註冊等驗證端點會直接拒絕請求（fail-closed），不會退回單機記憶體放行。',
              '【已修正】部署流程必須等待自動化測試與檢查工作流程通過後才會觸發上線。',
            ],
          },
          {
            type: 'h3',
            text: 'S7.3 尚存邊界與規劃中項目',
          },
          {
            type: 'p',
            text: '密碼學程式改為自行託管後，我們假設 Saturn 自己網域提供的打包程式是可信的。剩下的邊界是 Saturn 建置與發布流程的供應鏈完整性。',
          },
          {
            type: 'ul',
            items: [
              '【規劃中】移除 OAuth 登入頁 CSP 目前仍允許的內聯腳本（inline script）。',
              '【規劃中】在網路層進一步限制 Cloud Run 入口（例如透過負載平衡器或驗證過的 origin pull），與現有的應用層來源標頭驗證構成雙重防線。',
            ],
          },
        ],
      },
      {
        heading: 'S8. 加密技術附註',
        blocks: [
          {
            type: 'table',
            head: ['用途', '演算法', '是否後量子'],
            rows: [
              ['已儲存的稽核內容（org-mlkem1024-v1）', '隨機 32-byte AES-256-GCM 資料金鑰，以 ML-KEM-1024 + HKDF-SHA384 包裝給組織與成員公鑰，寫完即刪資料金鑰', '是'],
              ['處理中內容（s2.，等待核准與執行中）', 'AES-256-GCM，金鑰由 Cloud KMS MAC 依組織推導（7 天到期）', '否'],
              ['上游憑證庫（pq2.）', 'ML-KEM-1024 → HKDF-SHA384 → AES-256-GCM，金鑰依租戶由 KMS MAC 推導', '是'],
              ['成員私鑰備份', 'ML-KEM-1024，在瀏覽器裡用密碼推導的金鑰（PBKDF2-HMAC-SHA256 600,000 次 + AES-256-GCM）包裝', '是'],
              ['組織金鑰復原備份', 'ML-KEM-1024，以 256-bit recovery key 經 HKDF-SHA256 + AES-256-GCM 包裝', '是'],
              ['TOTP 秘密封存', '伺服器端對稱封存（加密存放於資料庫，不存明文）', '否'],
              ['成員登入', '瀏覽器端 Argon2id + HKDF（v2.）；伺服器端每個帳號隨機 salt 的 Argon2id', '不適用'],
              ['稽核逐筆完整性', 'SHA-256（正規化 JSON 摘要）', '不適用'],
            ],
          },
          {
            type: 'ul',
            items: [
              'FIPS 203 不等於 FIPS 140。我們使用 FIPS 203 標準化的 ML-KEM-1024，代表我們實作了這個演算法，不代表 Saturn 或它的密碼模組通過了 FIPS 140 驗證。',
              '還不支援金鑰輪替。推導租戶與組織金鑰的 KMS 金鑰版本目前是固定的，而且還沒有輪替後把現有密文重新包裝的自動化流程。在流程完成並寫進本章之前，目前不支援 KMS 金鑰輪替，請勿假設支援。',
              '記憶體清除。執行環境不保證敏感資料用完後一定會從記憶體清掉。所以我們的說法是「用完就丟棄、不保存」，不是「保證硬體抹除」。',
              '舊信封。早期用 X25519 包裝的稽核內容維持原狀，不會自動轉成 ML-KEM。',
            ],
          },
        ],
      },
      {
        heading: 'S9. 合規現況',
        blocks: [
          {
            type: 'ul',
            items: [
              '本章是 Saturn 對自身設計與限制的說明，不是認證，也不是第三方稽核。',
              'Saturn 目前沒有任何認證。我們沒有 SOC 2 報告，也不聲稱符合 ISO 27001、HIPAA、FedRAMP 或其他框架。',
              'SOC 2 與 ISO 27001 目前處於準備階段，尚未簽訂稽核機構。在簽約之前，不對外聲稱「SOC 2 進行中」或放置任何徽章。我們已備妥就緒路線圖，第一個目標是定點式的 Type I 報告，待補救項目完成後啟動。',
              '本章提到的紅隊測試都是 Saturn 內部進行的，不能拿來代替獨立的第三方評估。',
              '請不要從本章推論出任何合規聲明。使用 FIPS 203 演算法，不代表通過 FIPS 140 驗證（見第 S8 節）。',
            ],
          },
        ],
      },
      {
        heading: 'S10. 我們目前刻意不做的事',
        blocks: [
          {
            type: 'p',
            text: '下面這些，Saturn 今天沒有做。有的是刻意的設計選擇，有的是還沒完成的工作，我們分開標示。',
          },
          {
            type: 'h3',
            text: '刻意不做（設計上的非目標）',
          },
          {
            type: 'ul',
            items: [
              '不防代理人自身推理被提示注入。Saturn 限制的是呼叫，不是想法。',
              '不做內容檢查或 DLP。只檢查你宣告的 policy 條件。',
              '不防成員的電腦或瀏覽器被入侵。',
              '不防持有 KMS 簽章權限的營運方。這一層靠 IAM 控管，不靠密碼學。',
              '轉送當下與等待核准期間不做端對端加密。已封存的稽核紀錄採零存取加密（寫入並刪除資料金鑰後 gateway 無法解密），但 gateway 在轉送工具呼叫當下必須讀取明文，且等待核准與執行中的處理中內容需以伺服器端金鑰加密保存 7 天以供續行，因此不等同於全程端對端加密。',
            ],
          },
          {
            type: 'h3',
            text: '還沒做到（已列入規劃或修正中）',
          },
          {
            type: 'ul',
            items: [
              '【未解決】沒有防竄改的稽核雜湊鏈，也沒有外部錨定；內容雜湊尚未加金鑰。完整性目前只到逐筆。',
              '【未解決】一般成員仍可下載組織金鑰備份的密文（非明文）；限制僅管理員可下載已列入【規劃中】。',
              '【規劃中】origin 在應用層已驗證 Cloudflare 來源標頭（缺少即拒絕），但網路層尚未鎖定僅允許內部負載平衡器連線。',
              '【規劃中】目前不支援 KMS 金鑰輪替與現有密文重新包裝流程。',
              '【規劃中】登入值仍等同密碼。我們靠 TLS、伺服器端 Argon2id 與遷移截止機制保護登入，PAKE 方案仍在評估階段。',
              '【現況】沒有任何認證或第三方稽核。',
            ],
          },
        ],
      },
      {
        heading: 'S11. 營運與事件回應',
        blocks: [
          {
            type: 'ul',
            items: [
              '【已修正】CI secret 掃描：後端與前端的持續整合與部署工作流程均已加入自動 secret 掃描（Gitleaks），一旦偵測到憑證或高熵密鑰即直接中斷並失敗。',
              '【已修正】部署閘門：Cloud Run 部署工作流程已綁定測試與型別檢查結果，必須全數通過才會執行部署。',
              '【已修正】金鑰架構演進：先前的共用 gateway 金鑰已汰換為每租戶 KMS 推導金鑰，確保單一租戶的憑證金鑰與其他租戶隔離，且根金鑰不離開 Cloud KMS。',
              '【現況】KMS 金鑰輪替現況：目前 KMS 金鑰版本固定，尚不支援自動輪替與歷史密文重包（請勿假設支援）。',
              '【現況】漏洞通報與事件處理：外部資安研究人員與客戶可透過公開的 security.txt 與專用信箱通報漏洞，由資安與工程團隊依嚴重度進行修補、複驗並更新本白皮書狀態。',
            ],
          },
        ],
      },
      {
        heading: '附錄 A. 漏洞通報',
        blocks: [
          {
            type: 'p',
            text: '若您在 Saturn MCP Gateway、主控台或 Saturn App 發現潛在的資安漏洞，請透過以下管道通報：',
          },
          {
            type: 'ul',
            items: [
              '通報信箱：security@saturn-core.com',
              '標準 security.txt：https://saturn-core.com/.well-known/security.txt',
              '公開說明段落：Trust 頁面的 #disclosure 段落（https://saturn-core.com/trust#disclosure）',
            ],
          },
          {
            type: 'p',
            text: '來信請附上重現步驟、受影響的網域或端點，以及可能的影響範圍。請勿在問題修補前公開揭露漏洞細節，也請勿存取或修改不屬於您測試帳號的租戶資料。',
          },
        ],
      },
      {
        heading: '附錄 B. 版本紀錄',
        blocks: [
          {
            type: 'table',
            head: ['日期', '版本', '變更'],
            rows: [
              ['2026-10-16', 'v1', '從加密白皮書擴寫成全系統白皮書'],
              ['2026-10-16', 'v2', '併入安全架構章節；區分各元件狀態標籤；移除內部識別資訊'],
              ['2026-10-18', 'v3', '擴寫為全系統架構；稽核改為零存取加密並區分處理中內容；更新 10/18 已修正項目'],
            ],
          },
        ],
      },
    ],
  },
  en: {
    eyebrow: 'Whitepaper',
    heading: 'Saturn MCP Gateway: System Whitepaper',
    updated: '18 October 2026',
    lede: 'Status reflects the product as of 18 October 2026 (Taipei time). This paper is neither a certification nor a third-party audit. Where marketing copy differs from this paper, this paper governs. Every status statement in Part II uses one of four labels: [Current] (actual behavior of the product today), [Fixed] (a previously identified issue whose fix is deployed and verified), [Open] (a known issue not yet resolved), or [Planned] (an intended change not yet live; items without a timeline have no committed schedule).',
    sections: [
      {
        heading: 'Part I: Product & Architecture — 1. Summary',
        blocks: [
          {
            type: 'p',
            text: 'AI agents now call real production systems directly: sending payments, dispatching emails, mutating databases, and opening tickets. The core question is no longer whether an agent can act, but who authorized the action, what it did, and whether you can reconstruct the trail when something goes wrong.',
          },
          {
            type: 'p',
            text: 'Saturn MCP Gateway sits between AI agents and MCP servers. Every tool call passes through four steps:',
          },
          {
            type: 'ol',
            items: [
              'Authentication: Verify which agent is calling; every agent has its own OAuth identity.',
              'Evaluation: Evaluate the call against the policies applicable to that agent to allow, deny, or require human approval.',
              'Execution: Forward only authorized calls; upstream credentials stay in the gateway and are never exposed to the agent.',
              'Audit: Record every call in an audit log, sealing stored audit payloads with zero-access encryption.',
            ],
          },
          {
            type: 'p',
            text: 'One design principle governs approvals: approval is permission, not a command. Clicking Approve never executes the tool directly; the agent must resubmit the call with the same action ID, and the gateway re-verifies the expiration window, the currently active policy, and parameter consistency before forwarding.',
          },
        ],
      },
      {
        heading: '2. Scope & Audience',
        blocks: [
          {
            type: 'p',
            text: 'This document is written for technical leaders, security teams, and engineering teams evaluating Saturn. It covers system architecture, agent identity, policies, human approvals, upstream credentials, key hierarchy and cryptographic design, data classification and third-party data flows, audit logging, deployment and operations, and known boundaries.',
          },
          {
            type: 'p',
            text: 'This paper describes the actual behavior of the product as of the date above. This paper is neither a certification nor a third-party audit. We update this document and record a new version whenever significant changes ship.',
          },
        ],
      },
      {
        heading: '3. Product Plans',
        blocks: [
          {
            type: 'table',
            head: ['Feature', 'Free', 'Pro', 'Team'],
            rows: [
              ['Account Kind', 'Personal', 'Personal', 'Organization'],
              ['Saturn App (Desktop Agent)', 'Free, MIT open source', 'Free, MIT open source', 'Free, MIT open source'],
              ['MCP Gateway & Tool Sets', 'Included (unlimited tool sets)', 'Included (unlimited tool sets)', 'Included (unlimited tool sets)'],
              ['Per-Tool Mode (Call / Approval)', 'Included', 'Included', 'Included'],
              ['Argument-Level Policy Rules & Versioning', 'No', 'Included', 'Included'],
              ['Signed Webhooks', 'No', 'Included', 'Included'],
              ['Groups & Multi-Approver Quorum', 'No (single approver)', 'No (single approver)', 'Included (groups & quorum)'],
              ['Member Invites, Roles & Per-Employee MCP Mapping', 'No', 'No', 'Included'],
              ['Audit History & Zero-Access Payload Encryption', 'Unlimited (zero-access encrypted when org key is active)', 'Unlimited (zero-access encrypted when org key is active)', 'Unlimited (zero-access encrypted when org key is active)'],
              ['Price', '$0 (free forever)', '$20 / month (Coming soon)', '$20 / user / month (Coming soon)'],
            ],
          },
          {
            type: 'p',
            text: 'The boundary between Free and Pro follows the backend plan gates: argument-level policies and signed webhooks require Pro or above; groups, multi-approver quorum, member invitations, and role management require Team or above.',
          },
        ],
      },
      {
        heading: '4. System Components',
        blocks: [
          {
            type: 'p',
            text: 'Parties and trust boundaries are detailed in Part II (S2.1). The Saturn system consists of twelve components:',
          },
          {
            type: 'ul',
            items: [
              'Cloudflare Edge: Provides WAF, bot protection, edge rate limiting, and TLS termination (accepting only TLS 1.2 and 1.3), and injects an origin authentication header when forwarding requests to origin services.',
              'Gateway Service (Cloud Run): Handles MCP protocol traffic (initialize, tools/list, tools/call), OAuth 2.1 authentication, policy evaluation, the approval queue, zero-access audit sealing, and console APIs.',
              'Webhook Worker (Independent Service): Delivers HMAC-SHA256 signed approval event notifications (granted, rejected, expired) with retry handling in a separate service so delivery never blocks gateway traffic.',
              'Shared Session & Rate-Limit Store (Redis): Holds cross-instance MCP session state, pub/sub notifications, and application-layer rate-limit counters. The service refuses to start if Redis is unreachable at boot; if Redis becomes unreachable at runtime, authentication endpoints (sign-in and registration) fail closed and reject requests.',
              'Database: Stores organizations, members, agents, tool catalogs, versioned policies, encrypted upstream credentials, encrypted in-flight content, and zero-access audit records.',
              'Cloud KMS: Holds hardware-protected HMAC root keys that never leave KMS, deriving per-tenant upstream credential keys and per-organization symmetric keys for 7-day in-flight content via MAC operations.',
              'Secret Manager: Holds only operational configuration values that must be read in plaintext at runtime (such as database connection strings, origin verification secrets, and system salts); it never stores organization or member ML-KEM private keys.',
              'Email Delivery Service: Used solely for account verification, password reset, member invitations, and approval notification emails; never carries raw tool call responses.',
              'Policy Drafting LLM: Assists members in drafting or optimizing policy rules from natural language in the console; generated drafts never take effect automatically and must be reviewed and saved by a human member (see Chapter 8 for exact fields sent).',
              'Console (Browser-Side Decryption): Web interface where members sign in, manage agents and tool sets, author policies, approve or reject sensitive calls, and unlock their ML-KEM-1024 private key in browser memory to decrypt zero-access audit payloads.',
              'Saturn App (MIT Open-Source Desktop Application): Local desktop agent for macOS and Windows (with an independent local Runtime listening only on loopback), capable of running offline with local models or connecting to Saturn MCP Gateway for governance.',
              'Customer Upstream MCP Servers: External or internal MCP servers operated by or for the customer (such as billing, CRM, databases, or deployment systems) that receive only authorized calls forwarded by Saturn.',
            ],
          },
        ],
      },
      {
        heading: '5. Complete Lifecycle of a Tool Call',
        blocks: [
          {
            type: 'p',
            text: 'From agent connection through execution, archival, and notification, a complete tool call proceeds through twelve ordered steps:',
          },
          {
            type: 'ol',
            items: [
              'OAuth 2.1 + PKCE Authentication: The agent obtains an access token bound to that agent and organization (or personal profile) via OAuth 2.1 authorization code flow with mandatory PKCE S256. Unauthenticated calls to the MCP endpoint receive HTTP 401 with RFC 9728 resource metadata.',
              'initialize Handshake: The agent sends initialize to the Saturn MCP endpoint, establishing an MCP session bound to the agent identity in shared Redis.',
              'tools/list (Filtered by Tool Set): When the agent requests tools/list, the gateway returns only active tools included in that agent’s assigned tool set and hosted on MCP servers mapped to the acting member; tools outside the set are invisible to the agent.',
              'tools/call Submission: The agent submits tools/call with tool name and arguments. If the agent is paused, the call is rejected immediately.',
              'Policy Evaluation: The gateway evaluates the active policies applicable to the agent (matching tool name and argument conditions in order) together with the tool’s mode (Call or Approval), producing allow, deny, or approval required. If an agent has no applicable policy at all, evaluation defaults to deny.',
              'Decision Branching (Allow / Deny / Approval Required): If allowed, execution proceeds to Step 9; if denied, the call never leaves Saturn, a denial audit event is written immediately, and the agent receives a structured error containing reason, policy_id, and how_to_allow.',
              'Approval Queue (with Group Quorum): If approval is required, the gateway issues a unique action ID (saturnRunId), computes the canonical SHA-256 digest of the arguments, and encrypts the pending arguments with the per-organization KMS-derived key (7-day TTL). The call enters the approval queue waiting for a single reviewer or until every required group reaches its quorum, and returns a structured response with the approval URL to the agent.',
              'Resubmission with the Same Action ID & Re-Verification: Reviewer approval never executes the tool directly (“approval is permission, not a command”). The agent must resubmit the tool call with the same saturnRunId; the gateway re-verifies that the approval and resubmission windows have not expired, that currently active policies still permit the call, and that the resubmitted argument digest matches the approved arguments. Any mismatch is rejected.',
              'Forwarding Upstream with Vault Credentials: Once verified, the gateway unseals the upstream MCP server’s credential from the post-quantum vault in memory for the duration of the call and forwards the request upstream; if the upstream returns HTTP 401 and a refresh token is available, the gateway refreshes the token automatically and retries once.',
              'Zero-Access Archival Sealing: Before writing the permanent audit record, the gateway generates a random 32-byte AES-256-GCM data key, encrypts the arguments, raw request, raw response, server result, and agent result, wraps the data key with ML-KEM-1024 + HKDF-SHA384 to the organization public key and each active member’s public key, and immediately deletes the data key. If the organization has no usable ML-KEM key, payload content is omitted and the row is marked encryption unavailable.',
              'Audit Log Persistence: Using an atomic per-organization sequence counter, the gateway writes the plaintext governance metadata (caller, tool, policy version, decision, encryption status, content SHA-256 hash) alongside the zero-access ciphertext envelope.',
              'Signed Webhook Delivery: When an approval transitions to granted, rejected, or expired (on Pro and above), the independent webhook worker sends an HMAC-SHA256 signed notification to the customer’s configured HTTPS endpoint. Webhook delivery is informational only and never triggers tool execution.',
            ],
          },
        ],
      },
      {
        heading: '6. Connecting Upstream MCP Servers',
        blocks: [
          {
            type: 'p',
            text: 'When a customer connects an external or internal MCP server to Saturn, the gateway enforces network boundaries, discovers tools, and manages the upstream OAuth lifecycle:',
          },
          {
            type: 'ul',
            items: [
              'Registration & Network Boundary Enforcement: Upstream MCP server URLs must use HTTPS (HTTP is permitted only on localhost for local development). The gateway resolves hostnames and blocks private IP ranges, loopback addresses, link-local addresses, and cloud metadata endpoints to prevent Server-Side Request Forgery (SSRF).',
              'Automated Tool Discovery: Upon connection or manual refresh, the gateway sends MCP initialize and tools/list requests upstream, recording each tool’s name, description, and JSON inputSchema. Name collisions across servers are automatically namespaced with the server slug, and tools removed upstream are automatically disabled.',
              'Managed Upstream OAuth (Dynamic Registration & Token Refresh): When an upstream MCP server requires OAuth, Saturn discovers its OAuth authorization server metadata, performs Dynamic Client Registration (DCR) where supported, and completes an authorization code flow with PKCE. Resulting access tokens, refresh tokens, and client secrets are individually sealed with the per-tenant ML-KEM-1024 vault key; if an upstream later returns HTTP 401, the gateway automatically refreshes the token using the stored refresh token and reseals the updated credentials.',
            ],
          },
        ],
      },
      {
        heading: '7. Key Hierarchy',
        blocks: [
          {
            type: 'p',
            text: 'Saturn separates its cryptography into two independent key trees: a server-side KMS-rooted tree (protecting upstream credentials and 7-day in-flight content) and a browser-generated zero-access tree (protecting archived audit payloads and member private keys). The two trees share no secrets.',
          },
          {
            type: 'table',
            head: ['Key Tier', 'Algorithm & Derivation', 'Generation & Custody', 'Purpose & Protection Scope'],
            rows: [
              ['Cloud KMS Root Key', 'Hardware-backed HMAC-SHA256 key', 'Google Cloud KMS (never leaves KMS)', 'Root of trust for deriving per-tenant and per-organization server-side keys'],
              ['Per-Tenant Credential Key (pq2.)', 'KMS MAC over tenant context → ML-KEM-1024 → HKDF-SHA384 → AES-256-GCM', 'Derived on demand by Gateway via KMS; never stored in database', 'Seals upstream MCP server access tokens, refresh tokens, and client secrets'],
              ['Per-Organization In-Flight Key (s2.)', 'KMS MAC over organization ID → 32-byte AES-256-GCM key (cached 300s in memory)', 'Derived on demand by Gateway via KMS; never stored in database', 'Encrypts arguments waiting for approval and active run state (expires after 7 days)'],
              ['Organization ML-KEM Keypair', 'ML-KEM-1024 (FIPS 203), 1,568-byte public key, 64-byte private seed', 'Generated in browser; Gateway stores only public key and encrypted backups', 'Receives wrapped data keys for zero-access audit records and enables member key re-wrapping'],
              ['Member ML-KEM Keypair', 'ML-KEM-1024 (FIPS 203), private seed wrapped via password-derived key (PBKDF2 600,000 iterations + AES-256-GCM)', 'Generated and unlocked in browser (held only in page memory)', 'Unlocks zero-access audit payloads and organization key copies in the member’s browser'],
              ['Organization Recovery Key', '256-bit random key → HKDF-SHA256 (saturn-recovery-v1) → AES-256-GCM', 'Displayed once in browser at org key creation; never uploaded', 'Offline recovery of the encrypted organization key backup if member password backups are lost'],
            ],
          },
          {
            type: 'p',
            text: 'This separation guarantees that a database dump alone cannot decrypt upstream credentials or in-flight content without KMS access, and even an attacker with access to the running gateway cannot retroactively decrypt archived zero-access audit payloads whose data keys have already been deleted, nor unwrap member private keys.',
          },
        ],
      },
      {
        heading: '8. Data Classification & Third-Party Data Flows',
        blocks: [
          {
            type: 'h3',
            text: '8.1 Data Classification Table',
          },
          {
            type: 'table',
            head: ['Data Class', 'Included Fields', 'Storage & Encryption', 'Readable by Gateway After Write?', 'Retention'],
            rows: [
              ['Plaintext Metadata', 'Caller identity, agent ID, tool name, policy ID and version, decision, timestamps, atomic sequence number, encryption status, content SHA-256 hash', 'Stored in plaintext in database for console search, filtering, and governance metrics', 'Yes', 'Long-term'],
              ['In-Flight Content (Gateway-readable for 7 days)', 'Tool arguments waiting for human approval, approval queue context, active run state', 'AES-256-GCM (prefix s2.) with key derived per organization via Cloud KMS MAC', 'Yes (required to display approval context, verify resubmission digests, and forward calls)', 'Expires after 7 days'],
              ['Zero-Access Audit Payloads', 'Archived tool arguments, upstream raw_request, upstream raw_response, server_result, and agent_result', 'Random 32-byte AES-256-GCM data key (org-mlkem1024-v1), wrapped via ML-KEM-1024 + HKDF-SHA384 to organization key and each active member public key; data key deleted immediately after write', 'No (only authorized members can decrypt in the browser)', 'Long-term'],
              ['Upstream Credentials (Vault)', 'Upstream MCP server OAuth access tokens, refresh tokens, client secrets, and static authorization headers', 'ML-KEM-1024 + HKDF-SHA384 + AES-256-GCM (prefix pq2.) with key derived per tenant via Cloud KMS MAC', 'Opened in memory only for the duration of an authorized call', 'Long-term (until revoked or reconnected)'],
            ],
          },
          {
            type: 'h3',
            text: '8.2 Policy LLM & Third-Party Data Flows',
          },
          {
            type: 'p',
            text: 'When a member explicitly uses the AI-assisted policy drafting or policy optimization feature in the console, the gateway sends only the minimum schema fields required to draft rules to the LLM service provider configured by Saturn (over an HTTPS OpenAI-compatible Chat Completions API):',
          },
          {
            type: 'ul',
            items: [
              'Fields sent during policy drafting: Candidate tool names (name), upstream server names (server), tool descriptions (description, truncated to at most 500 characters), input parameter schema summaries (inputSchema.properties, up to 30 properties with type, up to 12 enum values, and property descriptions truncated to 160 characters), and the member’s natural-language prompt (request, truncated to at most 4,000 characters).',
              'Additional fields sent during policy optimization: The existing policy’s target tool name, decision (allow / require_approval / deny), and condition list (field, operator, value).',
              'Data never sent to the Policy LLM: Runtime tool call arguments, upstream responses, audit payloads, upstream credentials, member password verifiers, and cryptographic keys are never sent to the LLM service provider. If a member does not invoke AI drafting or optimization, no LLM request is made.',
              'Other external data flows: Request traffic traverses the Cloudflare edge; account and approval notification emails are sent via the email delivery service (containing only notification links and basic metadata); authorized tool calls are forwarded to the customer’s registered upstream MCP servers; signed approval event notifications are sent to customer-configured webhook URLs.',
            ],
          },
        ],
      },
      {
        heading: 'Part II: Security Architecture — S1. Overview & Design Principles',
        blocks: [
          {
            type: 'h3',
            text: 'S1.1 What Saturn Protects',
          },
          {
            type: 'p',
            text: 'AI agents now call real systems directly: payments, email, databases, and ticketing. Saturn stands between the agent and upstream MCP servers so every tool call passes through four steps:',
          },
          {
            type: 'ol',
            items: [
              'Authentication: Confirm which agent is calling. Every agent has its own OAuth identity.',
              'Evaluation: Evaluate the policies applicable to that agent to allow, deny, or require human approval.',
              'Execution: Forward only authorized calls. Upstream credentials stay in the gateway and are never given to the agent.',
              'Audit: Write an audit record for every call, sealing stored sensitive payloads with zero-access encryption.',
            ],
          },
          {
            type: 'h3',
            text: 'S1.2 Core Commitments',
          },
          {
            type: 'ul',
            items: [
              'Agents receive results, not secrets. Upstream access tokens and client secrets are never handed to agents.',
              'Agents are untrusted. Saturn assumes an agent may be manipulated or malicious. An agent cannot choose its own tools, hold upstream credentials, or approve its own calls.',
              'Approval is permission, not a command. A human clicking Approve does not execute the tool directly. The agent must resubmit with the same action ID, and the gateway re-checks expiration, current policy, and argument consistency before executing.',
              'Fail-closed on missing keys. When required key material is unavailable, the gateway refuses to start and refuses to write plaintext payloads.',
            ],
          },
          {
            type: 'h3',
            text: 'S1.3 Honest Limitations',
          },
          {
            type: 'p',
            text: 'Saturn constrains what an agent can do, not what an agent thinks. Saturn does not inspect an agent’s internal reasoning or the semantic meaning of parameter values. Several guarantees depend on honest operation by the platform operator and on an uncompromised member browser. These assumptions and remaining open items are listed explicitly in S2 and S10.',
          },
        ],
      },
      {
        heading: 'S2. Threat Model & Trust Boundaries',
        blocks: [
          {
            type: 'h3',
            text: 'S2.1 Parties',
          },
          {
            type: 'table',
            head: ['Party', 'Trusted To', 'Not Trusted To'],
            rows: [
              ['Agent', 'Nothing. Treated as potentially manipulated or malicious.', 'Select its own tools, hold upstream credentials, or approve its own calls'],
              ['Upstream MCP Server', 'Respond to authorized calls', 'See anything beyond the forwarded request, including Saturn’s credential vault'],
              ['Gateway (Saturn Service)', 'Authenticate callers, enforce policy, complete authorized calls, write audit records', 'Read member private keys, or decrypt archived zero-access audit payloads after data key deletion'],
              ['Platform Operator (infrastructure access)', 'Operate the service honestly', 'See S2.3. In practice, the operator is currently trusted with KMS MAC signing permissions, the integrity of the in-flight execution environment, and audit record retention and ordering.'],
              ['Member Browser', 'Execute unmodified Saturn code and hold the member private key in memory', 'Anything else. If the browser is compromised, that member’s keys and decrypted view are exposed.'],
              ['Saturn Domain & Build Pipeline', 'Serve unmodified frontend code', 'An implicit root of trust; see S7'],
            ],
          },
          {
            type: 'h3',
            text: 'S2.2 In Scope: What Saturn Is Designed to Prevent',
          },
          {
            type: 'ul',
            items: [
              'Compromised or malicious agents. Four layers of defense apply: curated tool sets per agent; policy rules (with argument conditions on Pro and above); human approval queues for sensitive calls; and distinct per-agent OAuth identities that attribute every call and can be revoked individually.',
              'Untrusted upstream MCP servers. Upstream credentials are sealed in the gateway vault; neither agents nor other upstream servers can read the vault.',
              'Database copy compromise. Upstream credentials, in-flight content, and stored audit payloads are encrypted at rest in the database. Upstream credentials and in-flight keys are derived via Cloud KMS (whose root key is not in the database), while stored audit payloads use zero-access encryption wrapped to organization and member public keys so even the gateway cannot decrypt historical records.',
              'Cross-tenant access. Internal authenticated red-team testing (not a third-party audit) found no cross-tenant access, IDOR, or privilege escalation: organization scope is always derived from the authenticated session and cannot be overridden by request parameters; forging another organization’s object IDs returns 403 or 404.',
            ],
          },
          {
            type: 'h3',
            text: 'S2.3 Out of Scope: What Saturn Does Not Prevent',
          },
          {
            type: 'ul',
            items: [
              'Prompt injection of the agent’s own reasoning. If injected content convinces an agent to issue a call that your policy permits, Saturn will allow it. Saturn bounds what a manipulated agent can execute, not whether it can be manipulated.',
              'Content-layer inspection and DLP. Policies evaluate only the conditions you declare. Saturn does not perform DLP, classify secrets or PII, or inspect the semantic meaning of arguments.',
              'A platform operator with gateway key access or KMS MAC signing permissions. A service identity with KMS MAC signing permission can derive any tenant’s upstream credential key and 7-day in-flight content key (see S4 and S6), and anyone with direct database write access can delete or reorder audit rows without cryptographic detection (see S6.3).',
              'Compromise of a member’s computer or browser. Malware, malicious browser extensions, or hijacked sessions can read anything that member can unlock, including payloads decrypted in memory.',
            ],
          },
        ],
      },
      {
        heading: 'S3. Identity & Sign-In',
        blocks: [
          {
            type: 'h3',
            text: 'S3.1 Agent Identity',
          },
          {
            type: 'ul',
            items: [
              '[Current] Agents authenticate via OAuth 2.1 authorization code flow with mandatory PKCE S256. Requests without a code_challenge or attempting to downgrade to plain are rejected. The redirect_uri must match exactly; prefix-extension variants are rejected, preventing open redirects.',
              '[Current] Standard MCP Dynamic Client Registration (DCR) is supported. Unauthenticated requests to the MCP endpoint return HTTP 401 with RFC 9728 resource metadata.',
              '[Current] Agent OAuth tokens and member web sessions are separate authentication planes. A web session token cannot be used to call the MCP gateway.',
              '[Fixed] Because MCP DCR is unauthenticated by specification, the registration endpoint now enforces application-layer rate limiting (keyed by the real client IP across instances) to prevent bulk registration abuse.',
              '[Planned] Add anomaly monitoring for dynamically registered OAuth clients and periodically purge idle unused clients.',
            ],
          },
          {
            type: 'h3',
            text: 'S3.2 Member Sign-In & Multi-Factor Authentication (MFA)',
          },
          {
            type: 'p',
            text: '[Current] Browser-side v2. login verifier. Before submission, the browser processes the password with Argon2id (using a salt derived from the email address) followed by HKDF, and sends the prefix v2. plus a hex string. We state clearly what this step does and does not achieve:',
          },
          {
            type: 'ul',
            items: [
              'It is transport obfuscation, not transport security. The transmitted v2. verifier is password-equivalent: anyone who intercepts it can sign in without knowing the underlying password. Real protection on the sign-in path comes from TLS plus server-side Argon2id.',
              'Because the client-side salt is derived deterministically from the email address rather than randomly per registration, an attacker can precompute against a known email. Do not overvalue client-side hashing.',
              'Its two real benefits are: during normal sign-in, the raw password does not leave the browser; and the sign-in verifier is domain-separated from the member private-key wrapping material, so the sign-in verifier cannot unwrap a member private key.',
            ],
          },
          {
            type: 'p',
            text: '[Current] Server-side protection. Upon receiving the login verifier, the server hashes it again with Argon2id using a unique random salt per account before storing it. Saturn never stores plaintext passwords. Successful sign-in issues an opaque server-side session token rather than a JWT, eliminating offline token tampering or alg=none attacks. Signing out invalidates the token immediately. Unlocked member private keys live only in page memory, and tokens are never written to localStorage.',
          },
          {
            type: 'p',
            text: '[Current] Explicit exception for legacy account migration. Legacy accounts (using earlier SHA-256 verifiers or PBKDF2 hashes) signing in before the migration deadline send the raw password once over TLS so the server can verify the legacy hash and rewrite it as Argon2id. This is a time-bounded exception to “the server never sees the password”; a migration deadline mechanism is enforced in code, after which legacy sign-ins are rejected and unmigrated accounts must reset their password.',
          },
          {
            type: 'ul',
            items: [
              '[Fixed] Sign-in no longer leaks whether an account exists. Previously, registered and unregistered emails received distinguishable error responses that included migration state. Both now receive byte-for-byte identical HTTP 401 responses (status code, length, and body), verified in testing.',
              '[Fixed] Application-layer rate limiting is enforced on the general sign-in endpoint, the OAuth sign-in endpoint, and the legacy migration sign-in endpoint.',
              '[Fixed] Mandatory MFA for administrator accounts. Platform administrators and organization administrators are required to enable TOTP multi-factor authentication; privileged and organization write operations are blocked until MFA is enabled.',
              '[Fixed] TOTP security hardening: TOTP secrets are encrypted at rest in the database (never stored in plaintext); verified time steps are tracked across the 90-second acceptance window so a TOTP code cannot be replayed; and consecutive failed verification attempts are capped at 5 to prevent brute-force guessing.',
              '[Planned] Ensure login verifiers are excluded from any external error reporting, and evaluate an augmented PAKE protocol (such as OPAQUE) so the transmitted verifier is no longer password-equivalent (under evaluation, no committed schedule).',
            ],
          },
        ],
      },
      {
        heading: 'S4. Upstream Credential Vault & Member Private Keys',
        blocks: [
          {
            type: 'h3',
            text: 'S4.1 Upstream Credential Vault Status',
          },
          {
            type: 'ul',
            items: [
              '[Fixed] Per-tenant key isolation. The earlier shared gateway credential key has been replaced by per-tenant Cloud KMS MAC-derived keys. Because the root KMS key never leaves KMS, one tenant’s derived key cannot open another tenant’s credentials, and a database copy alone cannot derive any tenant key.',
              '[Current] Encryption pipeline. Every credential ciphertext carries the prefix pq2., using ML-KEM-1024 (FIPS 203) encapsulation, HKDF-SHA384 key derivation, and AES-256-GCM authenticated encryption.',
              '[Current] Opened only for the duration of an authorized call. The gateway unseals the corresponding credential only while completing an authorized tool call. The agent receives the call result and never sees the credential.',
              '[Current] Fail-closed at boot. The gateway refuses to start if required key material cannot be read.',
            ],
          },
          {
            type: 'h3',
            text: 'S4.2 Boundaries',
          },
          {
            type: 'ul',
            items: [
              'KMS signing permission is the control point. Per-tenant keys defend against database exfiltration, not against an actor holding KMS permissions. Any service identity permitted to call KMS MAC sign can derive any tenant’s credential key. The real boundary is IAM: only the gateway runtime identity holds this permission, and access must be tightly restricted and audited.',
              '“Opened only during an authorized call” is a software invariant, not a cryptographic constraint. Program logic and access controls enforce when the gateway unseals a credential.',
              'Arguments waiting for approval. Arguments held in the approval queue are encrypted at rest using the per-organization KMS-derived key (see S6). After approval, the gateway must decrypt them into plaintext to forward the call upstream; restricting that decryption to approved calls is likewise a software invariant.',
              'Customer recommendation. Grant upstream credentials stored in Saturn the minimum scopes required for the intended tools.',
            ],
          },
          {
            type: 'h3',
            text: 'S4.3 Legacy Credentials & Key Rotation',
          },
          {
            type: 'ul',
            items: [
              '[Fixed] Legacy credential handling. Credentials sealed under the earlier format are never treated as empty values or silently ignored; the backend marks the connection as requiring reconnection, and the console UI prompts the member to sign in and reconnect the server.',
              '[Planned] KMS key version is currently fixed; KMS key rotation is not currently supported — please do not assume rotation support (see S8).',
            ],
          },
          {
            type: 'h3',
            text: 'S4.4 Member Private Keys & Organization Key Backups',
          },
          {
            type: 'ul',
            items: [
              '[Current] Every member has a distinct ML-KEM-1024 private key per organization. The private key seed is wrapped in the browser using a password-derived key before upload; Saturn servers never hold the key needed to unwrap it.',
              '[Current] The member wrapping key and the login verifier are derived with distinct domain-separation labels, so the login verifier cannot decrypt the private key. Unlocked private keys remain only in page memory and vanish when the tab closes.',
              '[Current] A 256-bit recovery key can restore the organization key offline in the browser. If both member password backups and the recovery key are lost, the private keys and sealed audit payloads cannot be recovered by anyone, including Saturn. This is an intentional design choice.',
              '[Fixed] When a member assists another member by re-wrapping the organization key after a password reset, the browser fetches a fresh copy of the target member’s public key and verifies its SHA-256 fingerprint before encapsulating, aborting on any mismatch to prevent key-substitution attacks.',
              '[Current] Limitation on member removal: Removing a member prevents future audit records from being wrapped to their key, but historical records already wrapped to their public key remain readable to anyone holding that member’s private key and backup. Removal revokes future access, not past access.',
              '[Open] Regular authenticated members of an organization can currently download the encrypted ciphertext (not plaintext) of the organization key backup via the API. If the wrapping secret were weak, this would widen the offline attack surface.',
              '[Planned] Restrict downloading the organization key backup ciphertext to organization administrators only.',
            ],
          },
        ],
      },
      {
        heading: 'S5. Policy Engine',
        blocks: [
          {
            type: 'h3',
            text: 'S5.1 Evaluation Model',
          },
          {
            type: 'ul',
            items: [
              '[Current] Every tool call is evaluated against the policies applicable to the calling agent. Rules resolve to allow, deny, or approval required.',
              '[Current] Plan differentiation: Free provides tool-level governance (whether a tool is exposed and whether it runs automatically as Call or requires human confirmation as Approval, without argument conditions); Pro and above add argument-level conditions (for example, requiring approval when amount > 5000 and binding the approval to those exact arguments).',
              '[Current] Policies are versioned, and every audit record logs the exact policy version evaluated. Policies drafted with LLM assistance never activate automatically and require human confirmation.',
            ],
          },
          {
            type: 'h3',
            text: 'S5.2 Approval Workflow & Structured Errors',
          },
          {
            type: 'ol',
            items: [
              'When policy evaluation requires approval, the agent receives an action ID (saturnRunId) and the call enters the approval queue.',
              'Reviewers in the console inspect that specific call and its exact arguments.',
              'Approving the request does not execute the tool. The agent must resubmit with the same action ID, and the gateway re-checks three invariants: whether the approval has expired, whether current policy still allows the call, and whether the resubmitted arguments match the approved arguments. Any mismatch is rejected.',
              'Approval outcomes trigger signed webhooks. Webhooks only notify; they never execute the tool.',
            ],
          },
          {
            type: 'p',
            text: 'Example: An agent submits a $5,800 payment and a manager approves it. If the agent resubmits with the amount changed to $58,000, the gateway rejects the call because the arguments no longer match the approved digest.',
          },
          {
            type: 'p',
            text: '[Fixed] Blocked calls return a structured error: `reason`, `policy_id`, and `how_to_allow`. It never returns the approved arguments or argument digests; `how_to_allow` only directs how to submit an approval request and cannot be used to modify policies.',
          },
          {
            type: 'h3',
            text: 'S5.3 Default Behavior',
          },
          {
            type: 'ul',
            items: [
              '[Fixed] Tool-level default deny: Tools without a matching rule are denied. If an agent calls a tool that has no matching rule, evaluation resolves to deny — protecting organizations when an upstream server introduces new tools not yet covered by existing rules.',
              '[Fixed] Default deny when no applicable policy exists. Previously, an agent with no applicable policy at all was allowed through; now, when no applicable policy exists for an agent, the policy engine evaluates to deny (fail-closed), and default policies are provisioned automatically during organization setup and server connection.',
            ],
          },
        ],
      },
      {
        heading: 'S6. Audit & Zero-Access Encryption',
        blocks: [
          {
            type: 'p',
            text: 'Saturn uses zero-access encryption for stored audit payloads. The gateway processes plaintext while forwarding a tool call; before writing the audit record, the payload is wrapped with ML-KEM-1024 to the organization key and each member’s public key, and the data key is deleted immediately. Thereafter, Saturn servers cannot decrypt the stored payload — only authorized members can open it in the browser.',
          },
          {
            type: 'p',
            text: 'Zero-access encryption is not end-to-end encryption. The gateway can read the payload at the moment of the call; if the gateway were compromised, subsequent calls could be exposed, while previously archived records remain protected. Content waiting for approval and active runs are encrypted separately with a server-side key and retained for 7 days, outside the scope of zero-access encryption.',
          },
          {
            type: 'table',
            head: ['Data', 'Encryption', 'Readable by Gateway After Write?', 'Retention'],
            rows: [
              ['Stored audit payloads', 'AES-256-GCM data key, wrapped with ML-KEM-1024 + HKDF-SHA384 to the organization key and each active member key; data key deleted immediately after write', 'No', 'Long-term'],
              ['In-flight content (arguments waiting for approval, active runs)', 'AES-256-GCM with key derived per organization via Cloud KMS MAC', 'Yes (to resume approvals and forward calls)', 'Expires after 7 days'],
              ['Upstream credentials', 'ML-KEM-1024 + HKDF-SHA384 + AES-256-GCM with key derived per tenant via KMS MAC', 'Opened only while completing an authorized call', 'Long-term'],
            ],
          },
          {
            type: 'h3',
            text: 'S6.1 What Is Recorded',
          },
          {
            type: 'ul',
            items: [
              '[Current] Every call writes an audit row. Plaintext searchable columns include caller, tool, policy version, decision, encryption status, and content hash.',
              '[Current] Stored call arguments, upstream request, upstream response, server result, and agent result are sealed in a zero-access envelope (org-mlkem1024-v1).',
              '[Current] When an organization has no usable ML-KEM key, audit payload content is not written and the audit row records encryption unavailable — never falling back to plaintext storage.',
            ],
          },
          {
            type: 'h3',
            text: 'S6.2 How the Two Encryption Layers Work',
          },
          {
            type: 'ul',
            items: [
              '[Current] Layer 1 (Stored audit payloads, zero-access encryption): For each audit event, the gateway draws a random 32-byte data key, encrypts the canonical JSON with AES-256-GCM (binding organization ID, record ID, payload type, and format version 1 as AAD), encapsulates to the organization public key and each active member public key via ML-KEM-1024 and HKDF-SHA384 (info saturn-payload-mlkem1024-v1), and deletes the data key immediately after writing. Platform admin APIs also strip all sealed envelopes.',
              '[Current] Layer 2 (In-flight content waiting for approval or execution, 7-day server-side encryption): Because the gateway must display pending arguments for review and forward them upstream once approved, pending approval arguments and active run state are encrypted with AES-256-GCM (prefix s2.) using a symmetric key derived per organization via Cloud KMS MAC, expiring automatically after 7 days.',
            ],
          },
          {
            type: 'h3',
            text: 'S6.3 Integrity',
          },
          {
            type: 'ul',
            items: [
              '[Current] Per-record hash. Every audit record stores a SHA-256 hash of the canonical JSON payload so the browser can verify single-record integrity after decryption.',
              '[Fixed] Atomic sequence numbers. Previously, sequence numbers were computed as current count plus one, which could collide under concurrency or hide gaps after deletions. Sequence numbers are now issued from an atomic counter table, preventing duplicates under concurrent writes.',
              '[Open] No cryptographic hash chain or external anchoring. Audit rows are not cryptographically linked to one another. Anyone with direct database write access could delete, reorder, or truncate rows without cryptographic detection; integrity currently protects individual rows rather than the log as a whole.',
              '[Open] Unkeyed content hash. The stored content_sha256 is an unsalted, unkeyed SHA-256 digest of canonical JSON. Someone with database read access can test candidate guesses against low-entropy payloads (such as fixed amounts, booleans, or short enums).',
              '[Planned] Add a tamper-evident hash chain where each row commits to the previous row’s digest and periodically anchor chain heads to external storage outside operator control; replace the unkeyed content digest with a keyed MAC or rely solely on the AES-GCM authentication tag.',
            ],
          },
        ],
      },
      {
        heading: 'S7. Deployment Boundary & Rate Limiting',
        blocks: [
          {
            type: 'h3',
            text: 'S7.1 Current Posture',
          },
          {
            type: 'ul',
            items: [
              '[Current] Services run on Google Cloud Run behind Cloudflare on public domains (WAF, bot protection, edge rate limiting). Only HTTPS is exposed, accepting only TLS 1.2 and 1.3.',
              '[Current] Every API and dashboard response includes strict security headers: CSP, HSTS, X-Frame-Options: DENY, locked-down Permissions-Policy, and X-Content-Type-Options. API CORS permits only Saturn’s own dashboard origin, and interactive API documentation is disabled in production.',
            ],
          },
          {
            type: 'h3',
            text: 'S7.2 Fixed Items',
          },
          {
            type: 'ul',
            items: [
              '[Fixed] Marketing site security headers. HSTS, CSP (script-src \'self\', object-src \'none\', frame-ancestors \'none\'), clickjacking protection, and Permissions-Policy are enforced across the public website.',
              '[Fixed] Self-hosted cryptography bundles. External CDN script dependencies have been removed; all cryptographic and application scripts are bundled and served from Saturn’s own domain under strict CSP. The OAuth sign-in page likewise self-hosts its hashing bundle and fails closed if the bundle cannot load.',
              '[Fixed] Application-layer Cloudflare origin header verification. Previously, requests sent directly to the Cloud Run origin bypassed Cloudflare WAF; now both backend and frontend verify a Cloudflare-injected origin header in constant time at the application layer and reject requests without it with HTTP 403. Stated precisely: the origin remains reachable at the network layer, and requests bypassing Cloudflare are rejected at the application layer.',
              '[Fixed] Rate limiting uses the real client IP header provided by Cloudflare and shares counters across instances in Redis; when shared storage (Redis) is unreachable, authentication endpoints (sign-in, migration sign-in, registration, and dynamic client registration) fail closed and reject requests rather than falling back to per-instance memory.',
              '[Fixed] Deployment workflows are gated on automated test and type-check jobs passing before deploying to Cloud Run.',
            ],
          },
          {
            type: 'h3',
            text: 'S7.3 Remaining Boundaries & Planned Items',
          },
          {
            type: 'p',
            text: 'With self-hosted cryptography bundles in place, we assume the code served from Saturn’s own domain is trustworthy; the remaining boundary is supply-chain integrity of Saturn’s build and release pipeline.',
          },
          {
            type: 'ul',
            items: [
              '[Planned] Remove the remaining inline script allowance from the OAuth sign-in page CSP.',
              '[Planned] Restrict Cloud Run ingress at the network layer (for example via load balancer ingress or authenticated origin pulls) as a second layer alongside application-layer origin header verification.',
            ],
          },
        ],
      },
      {
        heading: 'S8. Cryptographic Notes',
        blocks: [
          {
            type: 'table',
            head: ['Purpose', 'Algorithm', 'Post-Quantum?'],
            rows: [
              ['Stored Audit Payloads (org-mlkem1024-v1)', 'Random 32-byte AES-256-GCM data key wrapped via ML-KEM-1024 + HKDF-SHA384 to organization and member public keys; data key deleted after write', 'Yes'],
              ['In-Flight Content (s2., pending approval & active runs)', 'AES-256-GCM with key derived per organization via Cloud KMS MAC (7-day TTL)', 'No'],
              ['Upstream Credential Vault (pq2.)', 'ML-KEM-1024 → HKDF-SHA384 → AES-256-GCM with key derived per tenant via KMS MAC', 'Yes'],
              ['Member Private Key Backup', 'ML-KEM-1024 wrapped in browser with password-derived key (PBKDF2-HMAC-SHA256 600,000 iterations + AES-256-GCM)', 'Yes'],
              ['Organization Key Recovery Backup', 'ML-KEM-1024 wrapped with 256-bit recovery key via HKDF-SHA256 + AES-256-GCM', 'Yes'],
              ['TOTP Secret Storage', 'Server-side authenticated symmetric encryption at rest in database (never stored in plaintext)', 'No'],
              ['Member Sign-In', 'Browser-side Argon2id + HKDF (v2.); server-side Argon2id with per-account random salt', 'N/A'],
              ['Per-Record Audit Integrity', 'SHA-256 over canonical JSON', 'N/A'],
            ],
          },
          {
            type: 'ul',
            items: [
              'FIPS 203 is not FIPS 140. Using the FIPS 203 standardized ML-KEM-1024 algorithm means we implement that specification; it does not mean Saturn or its cryptographic modules are FIPS 140 validated.',
              'Key rotation is not yet supported. The KMS key version used to derive tenant and organization keys is currently fixed, and there is no automated re-wrapping pipeline for existing ciphertexts. Until that pipeline is built and documented here, KMS key rotation is not supported — please do not assume rotation support.',
              'Memory zeroization. Managed runtime environments do not guarantee deterministic hardware memory erasure after use. We describe keys as discarded and not retained after use, rather than guaranteeing physical memory zeroization.',
              'Legacy envelopes. Earlier audit envelopes wrapped with X25519 remain as-is and are not automatically migrated to ML-KEM.',
            ],
          },
        ],
      },
      {
        heading: 'S9. Compliance Status',
        blocks: [
          {
            type: 'ul',
            items: [
              'This document explains Saturn’s architecture and limitations; it is neither a certification nor a third-party audit.',
              'Saturn currently holds no compliance certifications. We do not have a SOC 2 report, nor do we claim alignment with ISO 27001, HIPAA, FedRAMP, or any other regulatory framework.',
              'SOC 2 and ISO 27001 readiness work is in preparation, and no external auditor has been engaged yet. Until an auditor is engaged, we do not claim “SOC 2 in progress” or display compliance badges. Our initial target is a point-in-time Type I report once remaining remediation items are complete.',
              'All red-team testing referenced in this paper was conducted internally by Saturn and does not substitute for an independent third-party assessment.',
              'Do not infer any compliance claim from this document. Implementing the FIPS 203 algorithm does not constitute FIPS 140 validation (see S8).',
            ],
          },
        ],
      },
      {
        heading: 'S10. Intentional Non-Goals & Remaining Open Items',
        blocks: [
          {
            type: 'p',
            text: 'The items below are things Saturn does not do today. We distinguish between intentional architectural non-goals and work that is not yet complete.',
          },
          {
            type: 'h3',
            text: 'Intentional Non-Goals (By Design)',
          },
          {
            type: 'ul',
            items: [
              'We do not prevent prompt injection of an agent’s internal reasoning. Saturn governs tool calls, not thoughts.',
              'We do not perform content inspection or DLP. Only declared policy conditions are evaluated.',
              'We do not defend against a compromised member computer or browser.',
              'We do not cryptographically defend against a platform operator holding KMS signing permissions; that boundary is governed by IAM.',
              'In-flight forwarding and pending approvals are not end-to-end encrypted. Archived audit records use zero-access encryption (the gateway cannot decrypt them once the data key is deleted), but the gateway must process plaintext at the moment a tool call is forwarded and retains pending approval arguments encrypted with a server-side key for 7 days to resume execution.',
            ],
          },
          {
            type: 'h3',
            text: 'Not Yet Complete (Open or Planned)',
          },
          {
            type: 'ul',
            items: [
              '[Open] No tamper-evident cryptographic hash chain or external anchoring for audit logs yet, and content hashes are unkeyed SHA-256; integrity currently covers individual rows.',
              '[Open] Regular organization members can still download the encrypted organization key backup ciphertext (not plaintext); restricting download access to administrators is [Planned].',
              '[Planned] Origin requests verify the Cloudflare origin header at the application layer (rejecting direct requests with 403), while network-layer ingress lockdown on Cloud Run remains planned.',
              '[Planned] Automated KMS key rotation and ciphertext re-wrapping are not yet supported.',
              '[Planned] The transmitted login verifier remains password-equivalent; sign-in relies on TLS, server-side Argon2id, and the legacy migration deadline, while PAKE remains under evaluation.',
              '[Current] Saturn holds no third-party certifications or external audit reports.',
            ],
          },
        ],
      },
      {
        heading: 'S11. Operations & Incident Response',
        blocks: [
          {
            type: 'ul',
            items: [
              '[Fixed] CI secret scanning: Automated secret scanning (Gitleaks) runs in both backend and frontend CI and deployment workflows, failing the build immediately if credentials or high-entropy secrets are detected.',
              '[Fixed] Deployment gates: Cloud Run deployment workflows require automated test suites and static checks to pass before deployment proceeds.',
              '[Fixed] Key architecture evolution: The earlier shared gateway credential key has been replaced by per-tenant Cloud KMS MAC-derived keys so each tenant’s credential key is isolated and the root key never leaves Cloud KMS.',
              '[Current] KMS key rotation posture: KMS key versions are currently pinned and automated key rotation is not yet supported (do not assume support).',
              '[Current] Vulnerability disclosure & response: Security researchers and customers can report vulnerabilities via our published security.txt and dedicated security mailbox; findings are triaged, patched, verified, and reflected in updates to this whitepaper.',
            ],
          },
        ],
      },
      {
        heading: 'Appendix A. Vulnerability Disclosure',
        blocks: [
          {
            type: 'p',
            text: 'If you discover a potential security vulnerability in Saturn MCP Gateway, the console, or Saturn App, please report it through the following channels:',
          },
          {
            type: 'ul',
            items: [
              'Email: security@saturn-core.com',
              'Standard security.txt: https://saturn-core.com/.well-known/security.txt',
              'Public disclosure section: The #disclosure section on the Trust page (https://saturn-core.com/trust#disclosure)',
            ],
          },
          {
            type: 'p',
            text: 'Please include reproduction steps, the affected domain or endpoint, and potential impact. We ask that you do not publicly disclose the issue before a fix is deployed and that you do not access or modify tenant data outside your own test accounts.',
          },
        ],
      },
      {
        heading: 'Appendix B. Revision History',
        blocks: [
          {
            type: 'table',
            head: ['Date', 'Version', 'Changes'],
            rows: [
              ['2026-10-16', 'v1', 'Expanded from cryptography paper into full system whitepaper'],
              ['2026-10-16', 'v2', 'Merged security architecture sections, added status labels, and removed internal identifiers'],
              ['2026-10-18', 'v3', 'Expanded to full system architecture; updated audit to zero-access encryption distinguished from in-flight content; updated 10/18 fixed items'],
            ],
          },
        ],
      },
    ],
  },
}
