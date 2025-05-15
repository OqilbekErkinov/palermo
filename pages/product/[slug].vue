<template>
  <div class="detail">
    <header class="header">
      <div class="container">
        <div class="header-in">
          <div class="header-back" @click="$router.back()">
            <IconsArrowLeft />
          </div>
          <div class="header-wrapper">
            <div class="header-left">
              <div class="header-img">
                <img loading="lazy" :src="mainImg || product?.product?.image1" alt="img">
                <div class="header-img__discount">
                  {{ product?.product?.percent }}%
                </div>
                <div class="header-img__mini">
                  <img loading="lazy" :src="product?.product?.main_image" alt="img">
                </div>
              </div>
              <Swiper :modules="modules" :slides-per-view="3" space-between="12">
                <SwiperSlide v-if="product?.product?.image1">
                  <div class="header-img__small" @click="switchImage(product?.product?.image1)">
                    <img loading="lazy" :src="product?.product?.image1" alt="img">
                  </div>
                </SwiperSlide>
                <SwiperSlide v-if="product?.product?.image2">
                  <div class="header-img__small" @click="switchImage(product?.product?.image2)">
                    <img loading="lazy" :src="product?.product?.image2" alt="img">
                  </div>
                </SwiperSlide>
                <SwiperSlide v-if="product?.product?.image3">
                  <div class="header-img__small" @click="switchImage(product?.product?.image3)">
                    <img loading="lazy" :src="product?.product?.image3" alt="img">
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
            <div class="header-right">
              <div class="one">
                <div class="one-wrapper">
                  <p class="one-title">
                    {{ product?.product?.name }}
                  </p>
                  <div class="one-share">
                    <div class="one-share__item">
                      <Share :title="product?.product?.name" />
                    </div>
                    <button class="one-share__item"
                      :class="{ active: store.favoriteItems.includes(product?.product?.slug) }"
                      @click.stop.prevent="store.toggleFavorite(product?.product?.slug)">
                      <IconsHeart />
                    </button>
                  </div>
                </div>
                <div class="one-text">
                  <p class="one-desc">
                    {{ product?.product?.description }}
                  </p>
                </div>
                <span class="one-discount">{{ product?.product?.price }} <span>UZS</span></span>
                <h2 class="one-price">{{ product?.product?.discount_price }} <span>UZS</span></h2>
                <div class="one-count">
                  <div class="one-count__dec" @click="decrement">-</div>
                  <div class="one-count__num">{{ quantity }}</div>
                  <div class="one-count__inc" @click="increment">+</div>
                </div>
                <div class="one-bottom"  
                @click.stop.prevent="cartStore.toggleCart(product?.product?.slug)">
                  <button class="one-bottom__btn">{{ cartStore.cartItems.includes(product?.product?.slug) ? $t('delete_to_cart') : $t('add_to_cart') }}</button>
                  <BasePointerTop :bg="`gradient`" :translate="`-15px`" />
                </div>
              </div>
              <div class="two">
                <p class="two-text">{{ $t('volume_weight') }} <span>{{ product?.product?.size }} кг</span></p>
                <p class="two-text">{{ $t('consumption') }} {{ product?.product?.consuption }}</p>
                <p class="two-text">{{ product?.product?.short_description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="header-gradient"></div>
    </header>

    <!-- <div class="container">
      <pre>{{ product }}</pre>
    </div> -->
    <section class="rec">
      <div class="container">
        <h2 class="rec-title">
          {{ $t('rec_title') }}
        </h2>
        <div class="rec-content">
          <NuxtLink v-for="item in product?.recommended" :key="item">
            <ProductCard :product="item" />
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>


<script lang="js" setup>
import { useCartStore } from "~/store/addToCart";
import { useSavedStore } from "~/store/addToSaved";
const store = useSavedStore();
const cartStore = useCartStore();
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
const modules = [Navigation];
const mainImg = ref(null)
const product = ref(null)
const config = useRuntimeConfig();
const { locale } = useI18n();
const route = useRoute();
const slug = route.params.slug;
const quantity = ref(1)
const isLoader = useLoader();

async function getProducts(method, slug) {
  isLoader.value = true;
  product.value = await $fetch(`${config.public.apiBase}/productview/${locale.value}/?method=${method}&slug=${slug}`)
  isLoader.value = false;
}

function switchImage(img) {
  mainImg.value = img
}

function increment() {
  quantity.value++
}

function decrement() {
  if (quantity.value > 1) {
    quantity.value--
  }
}

getProducts('slug', slug)

const props = defineProps({
  product: Object
})

useHead({
  link: [
    { rel: 'canonical', href: `https://palermo.uz/${route.path}` },
  ]
})
</script>