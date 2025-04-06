import { defineConfig } from 'vite'

export default defineConfig({
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
