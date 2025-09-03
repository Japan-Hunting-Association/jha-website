import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './src/test-setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        '.astro/',
        '**/*.config.*',
        '**/*.d.ts',
        '**/test-setup.ts',
        'src/__tests__/content/**' // Exclude content tests due to Astro:content imports
      ]
    },
    exclude: [
      'node_modules',
      'dist',
      '.idea',
      '.git',
      '.cache',
      'src/__tests__/content/**' // Exclude content tests that require Astro runtime
    ]
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      'astro:content': resolve(__dirname, './src/__mocks__/astro-content.ts')
    }
  }
})