import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://aladdin-0kuf.onrender.com', 
        changeOrigin: true,
        secure: false, // Disable SSL verification for development if needed
        // rewrite: (path) => path.replace(/^\/api/, ''), // Optional: Remove `/api` prefix
      },
    },
  },
})
