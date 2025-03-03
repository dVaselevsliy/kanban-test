import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true, // Позволяет использовать expect без импортов
    setupFiles: "./vitest.setup.ts", // Файл с настройками тестов
  },
})
