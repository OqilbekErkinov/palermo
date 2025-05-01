<template>
  <div class="product-card">
    <div class="product-card__img">
      <img loading="lazy" :src="props.product?.image1" alt="img">
      <div class="product-card__img--item">
        <img loading="lazy" :src="props.product?.main_image" alt="img">
      </div>
    </div>
    <div class="product-card__info">
      <div class="product-card__wrapper">
        <h2 class="product-card__name">{{ props.product?.name }}</h2>
        <div class="product-card__actions">
          <button aria-label="Button" style="cursor: pointer" class="product-card__heart"
            :class="{ active: store.favoriteItems.includes(props.product?.slug) }"
            @click.stop.prevent="store.toggleFavorite(props.product?.slug)">
            <IconsHeart />
          </button>
          <button aria-label="Button" style="cursor: pointer" class="product-card__bug"
            @click.stop.prevent="cartStore.toggleCart(props.product?.slug)"
            :class="{ active: cartStore.cartItems.includes(props.product?.slug) }">
            <IconsBug />
          </button>
        </div>
      </div>
      <p class="product-card__desc">
        {{ props.product?.short_name }}
      </p>
    </div>
  </div>
</template>

<script lang="js" setup>
import { useSavedStore } from "~/store/addToSaved";
import { useCartStore } from "~/store/addToCart";
const store = useSavedStore();
const cartStore = useCartStore();
const props = defineProps({
  product: Object
})
</script>