<template>
  <div class="popular-card">
    <img class="polupar" loading="lazy" :src="props.popularData?.image1" alt="img">
    <button aria-label="Button" class="popular-card__heart" :class="{ active: store.favoriteItems.includes(props.popularData?.slug) }"
      @click.stop.prevent="store.toggleFavorite(props.popularData?.slug)">
      <IconsHeart />
    </button>
    <div class="popular-card__product">
      <img loading="lazy" :src="props.popularData?.main_image" alt="img">
    </div>
  </div>
</template>

<script lang="js" setup>
const props = defineProps({
  popularData: Object
})
import { useSavedStore } from "~/store/addToSaved";
const store = useSavedStore();
</script>