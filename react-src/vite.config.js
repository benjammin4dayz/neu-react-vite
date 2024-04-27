import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          chonky: ['chonky'],
          chonkyIcon: ['chonky-icon-fontawesome'],
        },
      },
    },
  },
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true,
  },
});
