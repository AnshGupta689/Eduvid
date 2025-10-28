import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  // Proxy setup to redirect /api calls to the local Node server (port 4000)
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        // Rewrites /api/generate-script to /generate-script for the Express server
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },

  // Ad-blocker fix: Aliases the problematic icon to an empty module
  resolve: {
    alias: {
      'lucide-react/dist/esm/icons/fingerprint': 'data:text/javascript,export default () => null',
      './icons/fingerprint.js': 'data:text/javascript,export default () => null',
    },
  },
  
  // Build optimization (optional, but good practice)
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/chunk-[hash].js',
        entryFileNames: 'assets/entry-[hash].js',
        assetFileNames: 'assets/asset-[hash][extname]',
        manualChunks: (id) => {
          if (id.includes('node_modules')) return 'vendor';
        },
      },
    },
  },
});