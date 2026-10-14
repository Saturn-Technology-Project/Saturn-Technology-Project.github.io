export const SITE_URL = 'https://saturn-core.com'
export const CONSOLE_URL = 'https://dashboard.saturn-core.com'
export const CONTACT_ADDRESS = 'hello@saturn-core.com'
export const DEMO_ADDRESS = 'sales@saturn-core.com'
export const DEMO_FORM_ENDPOINT = `https://formsubmit.co/ajax/${DEMO_ADDRESS}`
export const GITHUB_URL = 'https://github.com/Saturn-Technology-Project/Saturn-App'

// Desktop downloads. Asset names come from electron-builder's
// artifactName "Saturn-${os}-${arch}.${ext}" in Saturn App/desktop/package.json.
export const DOWNLOAD_URLS = {
  mac: `${GITHUB_URL}/releases/latest/download/Saturn-mac-arm64.zip`,
  win: `${GITHUB_URL}/releases/latest/download/Saturn-win-x64.exe`,
  other: `${GITHUB_URL}/releases/latest`,
} as const
