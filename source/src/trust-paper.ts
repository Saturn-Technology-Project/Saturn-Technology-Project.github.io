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
  en: {
    eyebrow: 'Whitepaper',
    heading: 'How Saturn seals keys, payloads, and credentials',
    updated: '16 October 2026',
    lede: 'This paper describes the cryptography Saturn MCP uses for sign-in, member keys, tool payloads, and upstream credentials.',
    sections: [
      {
        heading: 'Scope',
        blocks: [
          {
            type: 'p',
            text: 'Saturn sits between an AI agent and the MCP servers that agent is allowed to call. The gateway authenticates the caller, evaluates policy, forwards an approved call, and writes an audit record. This paper covers the four cryptographic paths that support that work: the sign-in verifier, the member private key, the tool-payload envelope, and the upstream credential vault.',
          },
          {
            type: 'p',
            text: 'The descriptions match the mechanisms in the product. This paper does not describe a certification, a third-party audit, or a control that the software does not implement.',
          },
        ],
      },
      {
        heading: 'Parties',
        blocks: [
          {
            type: 'ul',
            items: [
              'The agent calls tools through Saturn MCP. It receives the result of an authorized call.',
              'The gateway evaluates the call, completes it with an upstream credential when policy allows, and seals the payload.',
              'A member holds an ML-KEM-1024 decapsulation key in the browser and opens a sealed payload after signing in.',
              'The organization has one ML-KEM-1024 encapsulation key. The matching private key is stored only inside recovery and member backups.',
            ],
          },
        ],
      },
      {
        heading: 'Sign-in',
        blocks: [
          {
            type: 'p',
            text: 'The browser hashes the password before the request leaves the page. It computes SHA-256 over the label saturn-login-v1, a newline, and the password, then sends the prefix v1. followed by 64 lowercase hex characters. Registration, password reset, password change, re-authentication, invite acceptance, and the OAuth sign-in form use the same verifier.',
          },
          {
            type: 'p',
            text: 'The gateway stores Argon2id of that hex string. Each account gets its own salt inside the hash. An older PBKDF2 verifier still signs in, and the gateway rewrites it as Argon2id. A caller that posts a raw password, such as an operator seed, is normalized with the same labeled SHA-256 before Argon2id.',
          },
          {
            type: 'p',
            text: 'The verifier and the member-key wrapping key are domain-separated. The string stored for sign-in is the input to the second hash. It is a different value from the material that wraps a member private key.',
          },
        ],
      },
      {
        heading: 'Member private keys',
        blocks: [
          {
            type: 'p',
            text: 'Payload keys are ML-KEM-1024 (FIPS 203). The encapsulation key is 1,568 bytes. The private key Saturn records for backup is the 64-byte seed. The browser expands that seed into the decapsulation key. The gateway stores encapsulation keys and encrypted backups. It does not store the seed in the clear.',
          },
          {
            type: 'p',
            text: 'A member backup is built in the browser from the password. The wrapping material is SHA-256 of the label saturn-member-wrap-v1, a newline, and the password. PBKDF2-HMAC-SHA256 then runs for 600,000 iterations over that digest and a random salt, and AES-256-GCM encrypts the seed. The additional data is password, a newline, and the user id. The sign-in verifier fails this decryption.',
          },
          {
            type: 'p',
            text: 'An organization recovery backup uses a recovery key shown when the organization key is created. HKDF-SHA256, with info saturn-recovery-v1, derives an AES-256-GCM key. The additional data is recovery, the organization id, and the key version. The recovery key is not stored on the gateway.',
          },
        ],
      },
      {
        heading: 'The payload envelope',
        blocks: [
          {
            type: 'p',
            text: 'When the organization has a payload key, one audit event produces one envelope. The fields sealed together are the tool arguments, the upstream request, the upstream response, the gateway result, and the result returned to the agent. Arguments waiting for approval use the same wrap, marked org-mlkem1024-v1.',
          },
          {
            type: 'p',
            text: 'The gateway draws a random 32-byte data key and encrypts the canonical JSON with AES-256-GCM. The additional data is the organization id, the record id, the payload type, and the format version, separated by newlines. The format version is 1. The ciphertext includes the 16-byte authentication tag. A SHA-256 of the same canonical JSON is stored beside the ciphertext.',
          },
          {
            type: 'p',
            text: 'That data key is then wrapped to the organization encapsulation key and to each member encapsulation key. ML-KEM-1024 encapsulation produces a 32-byte shared secret and a 1,568-byte ciphertext. HKDF-SHA384 turns the shared secret into a 32-byte AES key. The salt is empty, which is the 48 zero bytes required by HKDF-SHA384, and the info string is saturn-payload-mlkem1024-v1. The algorithm name on the envelope is ML-KEM-1024-HKDF-SHA384-AES-256-GCM.',
          },
          {
            type: 'p',
            text: 'Each wrap is a version byte 0x02, the KEM ciphertext, a 12-byte nonce, and the AES-256-GCM ciphertext of the data key. After every wrap is written, the gateway deletes the data key. A member opens the wrap in the browser with the decapsulation key, checks the content hash, and reads the payload there.',
          },
          {
            type: 'p',
            text: 'A public key that is not 1,568 bytes is skipped. If no usable ML-KEM key is available, the gateway does not write the tool content. The audit row records that encryption is unavailable.',
          },
        ],
      },
      {
        heading: 'Upstream credentials',
        blocks: [
          {
            type: 'p',
            text: 'Access tokens and client secrets use a separate ML-KEM-1024 key that belongs to the gateway. The seed is read from Secret Manager secret F3PF_FALLBACK_SEED. The gateway does not start when that secret cannot be read. Each secret is sealed as the prefix pq1., then ML-KEM-1024 encapsulation, HKDF-SHA384 with info saturn-credential-aes-256-gcm-v1, and AES-256-GCM.',
          },
          {
            type: 'p',
            text: 'The gateway opens that secret for the duration of an authorized call, then uses it upstream. Console APIs report whether a secret exists. Agents receive the call result. This vault key and the organization payload key are different keys: the gateway can complete a call, and a member opens the sealed audit payload.',
          },
        ],
      },
      {
        heading: 'The audit record',
        blocks: [
          {
            type: 'p',
            text: 'The row that stays readable names the caller, the tool, the policy version, and the decision, together with the encryption status and the content hash. The sealed body is the envelope above. An authorized member decrypts it locally after the browser has unwrapped the member key.',
          },
        ],
      },
      {
        heading: 'Boundaries',
        blocks: [
          {
            type: 'ul',
            items: [
              'Envelopes wrapped to an earlier X25519 key stay sealed. The organization creates a new ML-KEM-1024 payload key.',
              'A password verifier created from the raw password, before the labeled sign-in hash, is checked once on the next sign-in and then rewritten as Argon2id.',
              'Anyone who can read the gateway credential seed can open upstream secrets. That seed exists so the gateway can complete an authorized call.',
              'A member who has the password and the password backup can open their private key, and then any payload wrapped to that key.',
              'Losing both the member backups and the organization recovery key leaves those payloads sealed.',
            ],
          },
        ],
      },
    ],
  },
  zh: {
    eyebrow: '白皮書',
    heading: 'Saturn 如何封存金鑰、Payload 與憑證',
    updated: '2026 年 10 月 16 日',
    lede: '本文件說明 Saturn MCP 在登入、成員金鑰、工具 Payload 與上游憑證上使用的密碼學。',
    sections: [
      {
        heading: '範圍',
        blocks: [
          {
            type: 'p',
            text: 'Saturn 位於 AI Agent 與它獲准呼叫的 MCP Server 之間。Gateway 驗證呼叫者、評估政策、轉送已核准的呼叫，並寫下一筆審計紀錄。本文件涵蓋支撐這項工作的四條密碼學路徑：登入驗證值、成員私鑰、工具 Payload 信封，以及上游憑證金庫。',
          },
          {
            type: 'p',
            text: '以下描述對應產品裡實際運行的機制。本文件不陳述認證、第三方稽核，或軟體沒有實作的控制措施。',
          },
        ],
      },
      {
        heading: '角色',
        blocks: [
          {
            type: 'ul',
            items: [
              'Agent 透過 Saturn MCP 呼叫工具，並收到一筆已授權呼叫的結果。',
              'Gateway 評估呼叫，在政策允許時用上游憑證完成呼叫，並封存 Payload。',
              '成員在瀏覽器持有 ML-KEM-1024 解封裝金鑰，登入後打開已封存的 Payload。',
              '組織有一把 ML-KEM-1024 封裝公鑰。對應的私鑰只存在於復原備份與成員備份之中。',
            ],
          },
        ],
      },
      {
        heading: '登入',
        blocks: [
          {
            type: 'p',
            text: '密碼在請求離開頁面之前，先由瀏覽器雜湊。瀏覽器對標籤 saturn-login-v1、一個換行，以及密碼計算 SHA-256，再送出前綴 v1. 與 64 個小寫十六進位字元。註冊、重設密碼、變更密碼、重新驗證、接受邀請，以及 OAuth 登入表單，都使用同一個驗證值。',
          },
          {
            type: 'p',
            text: 'Gateway 保存的是這串十六進位的 Argon2id。每個帳號的雜湊裡有自己的鹽。較早的 PBKDF2 驗證值仍可登入，Gateway 會把它改寫成 Argon2id。仍以明文密碼送出的呼叫者（例如營運種子帳號）會先套用同一個帶標籤的 SHA-256，再做 Argon2id。',
          },
          {
            type: 'p',
            text: '登入驗證值與成員金鑰的包裝金鑰以標籤分開。登入所保存的字串是第二層雜湊的輸入，與包裝成員私鑰的材料是兩個不同的值。',
          },
        ],
      },
      {
        heading: '成員私鑰',
        blocks: [
          {
            type: 'p',
            text: 'Payload 金鑰為 ML-KEM-1024（FIPS 203）。封裝公鑰為 1,568 位元組。備份所記錄的私鑰是 64 位元組種子。瀏覽器把這顆種子展開成解封裝金鑰。Gateway 保存封裝公鑰與加密備份，不以明文保存種子。',
          },
          {
            type: 'p',
            text: '成員備份在瀏覽器裡用密碼建立。包裝材料是標籤 saturn-member-wrap-v1、一個換行與密碼的 SHA-256。PBKDF2-HMAC-SHA256 再對該摘要與隨機鹽迭代 600,000 次，並以 AES-256-GCM 加密種子。附加資料是 password、換行與使用者 id。登入驗證值無法通過這次解密。',
          },
          {
            type: 'p',
            text: '組織復原備份使用建立組織金鑰時顯示的復原金鑰。HKDF-SHA256 以 info saturn-recovery-v1 衍生 AES-256-GCM 金鑰。附加資料是 recovery、組織 id 與金鑰版本。復原金鑰不存放在 Gateway。',
          },
        ],
      },
      {
        heading: 'Payload 信封',
        blocks: [
          {
            type: 'p',
            text: '組織已有 Payload 金鑰時，一筆審計事件產生一個信封。一起封存的欄位是工具參數、上游請求、上游回應、Gateway 結果，以及交回給 Agent 的結果。等待核准的參數使用同一種包裝，並標示 org-mlkem1024-v1。',
          },
          {
            type: 'p',
            text: 'Gateway 抽取 32 位元組隨機資料金鑰，以 AES-256-GCM 加密正規化 JSON。附加資料是組織 id、紀錄 id、Payload 類型與格式版本，以換行分隔。格式版本為 1。密文含 16 位元組驗證標籤。同一份正規化 JSON 的 SHA-256 與密文一起保存。',
          },
          {
            type: 'p',
            text: '資料金鑰再封給組織封裝公鑰與每位成員的封裝公鑰。ML-KEM-1024 封裝產生 32 位元組共享秘密與 1,568 位元組密文。HKDF-SHA384 把共享秘密變成 32 位元組 AES 金鑰。鹽為空，亦即 HKDF-SHA384 所規定的 48 個零位元組；info 為 saturn-payload-mlkem1024-v1。信封上的演算法名稱是 ML-KEM-1024-HKDF-SHA384-AES-256-GCM。',
          },
          {
            type: 'p',
            text: '每一份包裝依序是版本位元組 0x02、KEM 密文、12 位元組 nonce，以及資料金鑰的 AES-256-GCM 密文。所有包裝寫入後，Gateway 刪除資料金鑰。成員在瀏覽器以解封裝金鑰打開包裝、核對內容雜湊，並在瀏覽器裡閱讀 Payload。',
          },
          {
            type: 'p',
            text: '長度不是 1,568 位元組的公鑰會被略過。若沒有可用的 ML-KEM 金鑰，Gateway 不寫入工具內容。審計列標示加密不可用。',
          },
        ],
      },
      {
        heading: '上游憑證',
        blocks: [
          {
            type: 'p',
            text: 'Access token 與 client secret 使用另一把屬於 Gateway 的 ML-KEM-1024 金鑰。種子從 Secret Manager 的 F3PF_FALLBACK_SEED 讀取。讀不到時 Gateway 不會啟動。每筆密鑰封成前綴 pq1.，接著是 ML-KEM-1024 封裝、info 為 saturn-credential-aes-256-gcm-v1 的 HKDF-SHA384，以及 AES-256-GCM。',
          },
          {
            type: 'p',
            text: 'Gateway 在一筆已授權呼叫進行期間打開該密鑰，再用於上游。主控台 API 回報密鑰是否存在。Agent 收到的是呼叫結果。這把金庫金鑰與組織 Payload 金鑰是兩把金鑰：Gateway 完成呼叫，成員打開已封存的審計 Payload。',
          },
        ],
      },
      {
        heading: '審計紀錄',
        blocks: [
          {
            type: 'p',
            text: '保持可讀的那一列寫下呼叫者、工具、政策版本與決策，以及加密狀態與內容雜湊。被封住的本文就是上述信封。經授權的成員在瀏覽器解開成員金鑰之後，於本地解密。',
          },
        ],
      },
      {
        heading: '邊界',
        blocks: [
          {
            type: 'ul',
            items: [
              '封給較早 X25519 金鑰的信封維持密封。組織需建立新的 ML-KEM-1024 Payload 金鑰。',
              '在帶標籤的登入雜湊之前、以明文密碼建立的驗證值，會在下一次登入時核對一次，然後改寫成 Argon2id。',
              '能讀取 Gateway 憑證種子的人可以打開上游密鑰。這顆種子的用途是讓 Gateway 完成已授權的呼叫。',
              '持有密碼與密碼備份的成員可以打開自己的私鑰，以及封給該金鑰的 Payload。',
              '成員備份與組織復原金鑰同時遺失時，那些 Payload 維持密封。',
            ],
          },
        ],
      },
    ],
  },
}
