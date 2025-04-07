import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: true, // 또는 '0.0.0.0'
    port: 5173,
  },
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        sentence: '/pages/sentence.html',
        raindrop: '/pages/raindrop.html',
        rank: '/pages/rank.html',
        mine: '/pages/mine.html',
      }
    }
  }
})
