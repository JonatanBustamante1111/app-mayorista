import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      // Whether to enable HMR for CSS. Default is `true`.
      css: true,
      // Whether to enable HMR for assets loaded by JS or CSS files.
      // Default is `true`.
      assets: true,
      // Whether to enable HMR for custom user modules.
      // Default is `true`.
      custom: true,
    },
  },
})