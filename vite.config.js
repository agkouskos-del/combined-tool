import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 7456,
    strictPort: true,
  },
  resolve: {
    alias: {
      '@demon': path.resolve('D:/combined-tool/src/AppDemon.jsx'),
      '@apsogo': path.resolve('D:/combined-tool/src/AppApsogo.jsx'),
    },
  },
});
