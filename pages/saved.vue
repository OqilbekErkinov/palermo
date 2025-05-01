<template>
  <div class="saved">
    <header class="header">
      <div class="container">
        <h1 class="header-title">
          {{ $t('favorite_products') }}
        </h1>
        <div class="header-content" v-if="savedProducts?.data?.products?.length">
          <NuxtLink v-for="item in savedProducts?.data?.products" :key="item.slug"
            :to="localePath(`/product/${item?.slug}`)">
            <ProductCard :product="item" />
          </NuxtLink>
        </div>
        <h1 class="header-empty" v-else>{{ $t('list_empty') }}</h1>
      </div>
    </header>
  </div>
</template>

<script lang="js" setup>
import { useSavedStore } from "~/store/addToSaved";
const localePath = useLocalePath();
const store = useSavedStore();
const savedProducts = ref(null);
const config = useRuntimeConfig();
const { locale } = useI18n();
const isLoader = useLoader();

async function getProducts() {
  store.favoriteItems = localStorage.getItem('favoriteItems') ? JSON.parse(localStorage.getItem('favoriteItems')) : [];

  if (store.favoriteItems.length > 0) {
    savedProducts.value = await $fetch(
      `${config.public.apiBase}/productfilter/${locale.value}/?slugs=${store.favoriteItems.join(',')}`
    );
  } else {
    savedProducts.value = { data: { products: [] } };
  }
  isLoader.value = false;
}

watch(
  () => store.favoriteItems,
  async (newValue, oldValue) => {
    if (newValue.length < oldValue.length) {
      await getProducts();
    }
  },
  { deep: true }
);

getProducts();

const route = useRoute()
useHead({
  link: [
    { rel: 'canonical', href: `https://palermo.divspan.uz/${route.path}` },
  ]
})
</script>
