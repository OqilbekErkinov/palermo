<template>
  <div class="cart">
    <div class="container">
      <h1 class="cart-title">
        {{ $t('cart_title') }}
      </h1>
      <div v-if="cartProducts?.data?.products?.length > 0">
        <div class="cart-header">
          <div class="cart-header__left">
            <h2 class="cart-header__title">
              {{ $t('cart_header_title') }}
            </h2>
            <p class="cart-header__text">
              {{ $t('cart_header_text') }}
            </p>
          </div>
          <div class="cart-header__right">
            <div class="cart-header__item" @click="removeAll">
              {{ $t('delete_all') }}
              <div class="cart-header__icon">
                <IconsDelete />
              </div>
            </div>
            <label for="allCheck" class="cart-header__item">
              {{ $t('select_all') }}
              <input :checked="checkCheckedAll()" @input="selectAll" type="checkbox" id="allCheck">
            </label>
          </div>
        </div>
        <div class="cart-content">
          <div class="cart-item" v-for="item in cartProducts?.data?.products" :key="item?.slug">
            <div class="cart-item__actions">
              <button aria-label="Button" class="cart-item__actions--icon" @click="removeProduct(item)">
                <IconsDelete />
              </button>
              <button aria-label="Button" class="cart-item__actions--icon">
                <input :checked="checkChecked(item)" @input="selectProduct(item)" type="checkbox">
              </button>
            </div>
            <div class="cart-item__img">
              <img loading="lazy" :src="item?.image1" alt="img">
              <div class="cart-item__img--small">
                <img loading="lazy" :src="item?.main_image" alt="img">
              </div>
            </div>
            <div class="cart-item__info">
              <h2 class="cart-item__name">
                {{ item?.name }}
              </h2>
              <p class="cart-item__desc">
                {{ item?.short_name }}
              </p>
              <p class="cart-item__price">
               {{ item?.discount_price }} <span>{{ $t('sum') }}</span>
              </p>
              <!-- <pre>{{ item }}</pre> -->
              <p class="cart-item__size">
                <b> {{ $t('volume_weight') }} </b> {{ item?.consuption }}
              </p>
              <p class="cart-item__quantity">
                {{ $t('quantity') }}
              </p>
              <div class="cart-item__count">
                <button aria-label="Button" @click="decrement(item)" class="cart-item__count--el">
                  -
                </button>
                <button aria-label="Button" class="cart-item__count--number">
                  {{ item.quantity }}
                </button>
                <button aria-label="Button" @click="increment(item)" class="cart-item__count--el">
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1 class="cart-empty" v-else>{{ $t('list_empty') }}</h1>
    </div>
    <div class="cart-bottom" v-if="cartProducts?.data?.products?.length > 0">
      <div class="container">
        <div class="cart-bottom__in">
          <div class="cart-bottom__left">
            <p class="cart-bottom__title">{{ $t('cart_bottom_title') }}</p>
            <p class="cart-bottom__text">{{ sum }} <span>{{ $t('sum') }}</span></p>
            <p v-if="selectedProducts?.length > 0" class="cart-bottom__text">{{ selectedProducts?.map(p => p.quantity).reduce((a, b) => a + b) }} {{ $t('cart_bottom_text2') }}</p>
          </div>
          <NuxtLink v-if="selectedProducts?.length > 0" :to="`${localePath('/order')}`" class="cart-bottom__right">
            <BaseButton>{{ $t('cart_bottom_right') }}</BaseButton>
            <div class="cart-bottom__arrow">
              <BasePointerTop :translate="`-15px`" :size="`100%`" :bg="`black`" />
            </div>
          </NuxtLink>
          <button aria-label="Button" v-else class="cart-bottom__right">
            <BaseButton>{{ $t('cart_bottom_right') }}</BaseButton>
            <div class="cart-bottom__arrow">
              <BasePointerTop :translate="`-15px`" :size="`100%`" :bg="`black`" />
            </div>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js" setup>
import { useCartStore } from "~/store/addToCart";
const localePath = useLocalePath();
const store = useCartStore();
const cartProducts = ref(null);
const config = useRuntimeConfig();
const { locale } = useI18n();
const isLoader = useLoader();
const selectedProducts = ref([]);

if (process.client) {
  selectedProducts.value = localStorage.getItem('selectedProducts') 
    ? JSON.parse(localStorage.getItem('selectedProducts')) 
    : [];
}

async function getProducts() {
  isLoader.value = true;
  store.cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
  if (store.cartItems.length > 0) {
    cartProducts.value = await $fetch(
      `${config.public.apiBase}/productfilter/${locale.value}/?slugs=${store.cartItems.join(',')}`
    );
    cartProducts.value.data.products.forEach(product => {
      product.quantity = selectedProducts.value.find(p => p.slug === product.slug)?.quantity || 1;
    });
    console.log(selectedProducts.value);

  } else {
    cartProducts.value = { data: { products: [] } };
  }
  isLoader.value = false;
}

watch(
  () => store.cartItems,
  (newValue, oldValue) => {
    if (newValue.length < oldValue.length) {
      getProducts();
    }
  },
  { deep: true }
);

getProducts();

async function selectProduct(item) {
  const index = selectedProducts.value.findIndex(product => product.slug === item.slug);

  if (index !== -1) {
    // Agar mahsulot allaqachon bor bo‘lsa, uni o‘chirib tashlash
    selectedProducts.value.splice(index, 1);
  } else {
    // Yangi mahsulot qo‘shish (quantity ni saqlab qolish)
    selectedProducts.value.push({ ...item, quantity: item.quantity || 1 });
  }

  // Mahsulotlar ro‘yxatini saqlash
  localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts.value));
  console.log(selectedProducts.value);
}


function increment(item) {
  item.quantity++;
  const selectedProduct = selectedProducts.value.find(p => p.slug === item.slug);
  if (selectedProduct) {
    selectedProduct.quantity = item.quantity;
  }
  localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts.value));
}

function decrement(item) {
  if (item.quantity > 1) {
    item.quantity--;
    const selectedProduct = selectedProducts.value.find(p => p.slug === item.slug);
    if (selectedProduct) {
      selectedProduct.quantity = item.quantity;
    }
    localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts.value));
  }
}

const checkChecked = (item) => {
  return selectedProducts.value.some(product => product.slug === item?.slug);
};

function selectAll() {
  if (selectedProducts.value.length === cartProducts.value.data.products.length) {
    selectedProducts.value = [];
  } else {
    selectedProducts.value = cartProducts.value.data.products.map(product => ({ ...product, quantity: 1 }));
  }
  localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts.value));
  console.log(selectedProducts.value);
}

function removeProduct(item) {
  selectedProducts.value = selectedProducts.value.filter(product => product !== item);
  cartProducts.value.data.products = cartProducts.value.data.products.filter(product => product !== item);
  store.cartItems = store.cartItems.filter(slug => slug !== item.slug);
  localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts.value));
  localStorage.setItem('cartItems', JSON.stringify(store.cartItems));
}

function removeAll() {
  selectedProducts.value = [];
  cartProducts.value.data.products = [];
  store.cartItems = [];
  localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts.value));
  localStorage.setItem('cartItems', JSON.stringify(store.cartItems));
}

function checkCheckedAll() {
  return selectedProducts.value.length === cartProducts?.value?.data?.products?.length;
}

const sum = computed(() => {
  return selectedProducts.value.reduce((total, product) => {
    return total + product.discount_price * product.quantity;
  }, 0);
});
const route = useRoute()
useHead({
  link: [
    { rel: 'canonical', href: `https://palermo.divspan.uz/${route.path}` },
  ]
})
</script>

<style></style>