import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 5050, // Use PORT environment variable provided by Render, defaulting to 3000 if not set
    proxy: {
      '/api': {
        target: 'http://localhost:5050',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'dist', // Output directory for production build
    emptyOutDir: true, // Clear output directory before building
  },
});
