// plugins/fancybox.client.ts
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  if (typeof window !== 'undefined') {
    import('@fancyapps/ui').then((module) => {
      const Fancybox = module.Fancybox
      Fancybox.bind('[data-fancybox]', {})
    })
  }
})
