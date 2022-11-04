import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import suidPlugin from '@suid/vite-plugin'

export default defineConfig({
  plugins: [solidPlugin(), suidPlugin()],
  server: {
    host: true,
    port: 3000,
    proxy: {
      '/auth/register': 'http://localhost:5000',
      '/auth/login': 'http://localhost:5000',
      '/logout': 'http://localhost:5000/auth',
      '/api/get_nickname': 'http://localhost:5000'
    }
  },
  build: {
    target: 'esnext',
  },
});
