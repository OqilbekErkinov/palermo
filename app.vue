<template>
  <div>
    <div v-show="!isLoader">
      <NuxtLoadingIndicator />
      <NuxtLayout />
    </div>
    <h1 v-if="isLoader" class="loader">Palermo</h1>
  </div>
</template>

<script setup>
const isLoader = useLoader()
const { t, locale } = useI18n()

onMounted(() => {
  // Endi hech qanday F12 yoki contextmenu blokirovka yo'q
})

useSeoMeta({
  title: () => t('meta.title'),
  meta: [
    { hid: 'description', name: 'description', content: () => t('meta.description') },
    { name: 'format-detection', content: 'telephone=no' },

    // Open Graph (Facebook, LinkedIn)
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: () => t('meta.ogTitle') },
    { property: 'og:description', content: () => t('meta.ogDescription') },
    { property: 'og:image', content: '/preview.webp' },
    { property: 'og:url', content: 'https://palermo.divspan.uz' },
    { property: 'og:site_name', content: 'Palermo' },

    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: () => t('meta.twitterTitle') },
    { name: 'twitter:description', content: () => t('meta.twitterDescription') },
    { name: 'twitter:image', content: '/preview.webp' },

    // Additional SEO
    { name: 'robots', content: 'index, follow' }
  ],
  
  htmlAttrs: {
    lang: () => locale.value
  }
})
</script>