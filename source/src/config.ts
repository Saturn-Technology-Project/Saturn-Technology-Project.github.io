export const CONSOLE_URL = 'https://saturn-frontend-629072855899.asia-east1.run.app'
export const CONTACT_EMAIL = 'mailto:hello@saturn.technology'
export const GITHUB_URL = 'https://github.com/Saturn-Technology-Project/Saturn-App'

// Desktop downloads. Asset names come from electron-builder's
// artifactName "Saturn-${os}-${arch}.${ext}" in Saturn App/desktop/package.json.
export const DOWNLOAD_URLS = {
  mac: `${GITHUB_URL}/releases/latest/download/Saturn-mac-arm64.zip`,
  win: `${GITHUB_URL}/releases/latest/download/Saturn-win-x64.exe`,
  other: `${GITHUB_URL}/releases/latest`,
} as const
