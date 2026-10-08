import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

const sourceDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(sourceDir, '..')
const published = ['index.html', '404.html', 'favicon.svg', 'favicon.png', 'icons.svg', '.nojekyll', 'assets']

function copyDir(from: string, to: string) {
  fs.mkdirSync(to, { recursive: true })
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name)
    const dest = path.join(to, entry.name)
    if (entry.isDirectory()) copyDir(src, dest)
    else fs.copyFileSync(src, dest)
  }
}

function publishToRepoRoot() {
  return {
    name: 'publish-to-repo-root',
    apply: 'build' as const,
    closeBundle() {
      const dist = path.join(sourceDir, 'dist')
      const index = path.join(dist, 'index.html')
      if (fs.existsSync(index)) {
        fs.copyFileSync(index, path.join(dist, '404.html'))
      }

      for (const name of published) {
        const file = path.join(repoRoot, name)
        if (fs.existsSync(file)) fs.rmSync(file, { recursive: true })
      }

      for (const entry of fs.readdirSync(dist, { withFileTypes: true })) {
        const src = path.join(dist, entry.name)
        const dest = path.join(repoRoot, entry.name)
        if (entry.isDirectory()) copyDir(src, dest)
        else fs.copyFileSync(src, dest)
      }
    },
  }
}

export default defineConfig({
  base: '/',
  plugins: [vue(), publishToRepoRoot()],
})
