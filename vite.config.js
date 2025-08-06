import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/TheNimantran.com/', // 👈 Repo name or custom path for GitHub Pages

  server: {
    proxy: {
      // You need to define a path like '/api' and give a full target URL
      '/api': {
        target: 'http://localhost:8000', // 👈 Fix: proper URL with protocol
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
