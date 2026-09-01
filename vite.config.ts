import fs from 'node:fs'
import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

function spaFallback() {
  return {
    name: 'spa-fallback',
    closeBundle() {
      const index = path.resolve('dist/index.html')
      if (fs.existsSync(index)) {
        fs.copyFileSync(index, path.resolve('dist/404.html'))
      }
    },
  }
}

export default defineConfig({
  base: '/',
  plugins: [vue(), spaFallback()],
})
