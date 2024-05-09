import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  plugins: [
    reactRefresh(),
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  optimizeDeps: {
    include: [
      '@emotion/react',
      '@emotion/styled',
      '@mui/icons-material',
      '@mui/material',
      '@mui/x-data-grid',
      'aws-sdk',
      'axios',
      'dateformat',
      'globalthis',
      'react',
      'react-aws-s3-typescript',
      'react-dom',
      'react-grid-gallery',
      'react-icons',
      'react-router-dom'
    ],
    exclude: ['@emotion/react', '@emotion/styled'] // Exclude these from optimization if needed
  },
  build: {
    chunkSizeWarningLimit: 1000, // Adjust chunk size warning limit as needed
    rollupOptions: {
      manualChunks: {
        vendor: [
          '@emotion/react',
          '@emotion/styled',
          '@mui/icons-material',
          '@mui/material',
          '@mui/x-data-grid',
          'aws-sdk',
          'axios',
          'dateformat',
          'globalthis',
          'react',
          'react-aws-s3-typescript',
          'react-dom',
          'react-grid-gallery',
          'react-icons',
          'react-router-dom'
        ]
      }
    }
  }
});
