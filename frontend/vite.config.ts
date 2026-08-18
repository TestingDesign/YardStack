import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/YardStack/',
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: ['@emotion/react', '@emotion/styled']
  }
})
