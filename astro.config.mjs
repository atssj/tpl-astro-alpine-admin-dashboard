import { defineConfig, envField } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'
import alpinejs from '@astrojs/alpinejs'

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      PUBLIC_BASE_API_URL: envField.string({ context: "client", access: "public", optional: false }),
    }
  },
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [alpinejs({ entrypoint: '/src/entrypoint' })]
})
