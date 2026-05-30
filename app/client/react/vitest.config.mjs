import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    name: 'frontend-react', // 🎯 This matches your filter!
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,jsx}'],
  },
});