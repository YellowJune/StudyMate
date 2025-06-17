import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // 또는 GitHub Pages 배포용이면 '/your-repo-name/'
})
