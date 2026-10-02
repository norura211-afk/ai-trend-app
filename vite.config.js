import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages では https://ユーザー名.github.io/ai-trend-app/ で公開されるため
  base: '/ai-trend-app/',
})
