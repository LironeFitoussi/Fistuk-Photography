import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  build: {
    // Adjust the asset chunk size limit (in bytes)
    assetsInlineLimit: 5000000, // Set the limit to 1 MB (1000 kB)
  },
  optimizeDeps: {
    include: ['lodash', 'axios'],
  },
  define: {
    global: 'globalThis' // This sets up 'global' as an alias to 'globalThis'
  }
});
