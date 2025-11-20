import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Launch-v4-UI/',
  server: {
    port: 3000,
  },
});
