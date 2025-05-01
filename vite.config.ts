import obfuscator from 'rollup-plugin-obfuscator'

export default defineNuxtConfig({
  vite: {
    build: {
      rollupOptions: {
        plugins: [obfuscator()]
      }
    }
  }
})
