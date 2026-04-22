import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    rolldownOptions: {
      output: {
        advancedChunks: {
          groups: [
            {
              test: 'placeholder.ts',
              name: 'placeholder',
            }
          ]
        }
      }
    }
  }
})