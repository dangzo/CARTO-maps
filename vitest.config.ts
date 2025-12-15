import { defineConfig } from 'vitest/config';
import path from 'path';

// https://vitest.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    exclude: ['**/node_modules/**', '**/dist/**', '**/build/**'],
    globals: true,
    setupFiles: './src/setup-tests.ts',
  },
});
