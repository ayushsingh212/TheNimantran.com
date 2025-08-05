import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/TheNimantran.com/', // 👈 Use your repo name here
  
});
