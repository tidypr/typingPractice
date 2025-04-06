import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        sentence: '/public/pages/sentence.html',
        raindrop: '/public/pages/raindrop.html',
        rank: '/public/pages/rank.html',
        mine: '/public/pages/mine.html',
      }
    }
  }
})
