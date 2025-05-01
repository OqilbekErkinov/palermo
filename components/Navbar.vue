<template>
  <nav class="nav">
    <div class="nav-container">
      <div class="nav-in">
        <div class="nav-left">
          <button aria-label="Button" class="nav-hamb" @click="isSidebarOpen = !isSidebarOpen">
            <IconsHamb />
          </button>

          <NuxtLink :to="localePath('/')" class="nav-logo">
            <img width="100" height="100" loading="lazy" :src="footerData?.data?.data?.footer?.logo" alt="Logo">
          </NuxtLink>
        </div>

        <div class="nav-right">
          <div class="nav-menu">
            <NuxtLink :to="localePath('/')" :class="{ active: $route.path === localePath('/') }" class="nav-menu__item">
              {{ $t('home') }}</NuxtLink>
            <NuxtLink :to="localePath('/about')" :class="{ active: $route.path === localePath('/about') }"
              class="nav-menu__item">{{ $t('about') }}</NuxtLink>
            <NuxtLink :to="localePath('/category')" :class="{ active: $route.path === localePath('/category') }"
              class="nav-menu__item">{{ $t('category') }}</NuxtLink>
            <NuxtLink :to="localePath('/services')" :class="{ active: $route.path === localePath('/services') }"
              class="nav-menu__item">{{ $t('services') }}</NuxtLink>
            <NuxtLink :to="localePath('/blog')" :class="{ active: $route.path === localePath('/blog') }"
              class="nav-menu__item">{{ $t('blog') }}</NuxtLink>
            <NuxtLink :to="localePath('/contact')" :class="{ active: $route.path === localePath('/contact') }"
              class="nav-menu__item">{{ $t('contact') }}</NuxtLink>
          </div>


          <div class="nav-actions">

            <div class="nav-search">
              <div class="nav-search__container">
                <input v-model="search" @input="searchHandler" class="nav-search__input" type="search"
                  :placeholder="$t('search')" />
                <IconsSearch class="nav-search__icon" />
              </div>
              <div class="nav-search__res" v-if="search">
                <div v-if="searchRes?.data?.length > 0 && !loader" class="nav-search__list">
                  <NuxtLink @click="closeSearch" v-for="item in searchRes?.data" :key="item.slug"
                    class="nav-search__title"
                    :to="localePath(`/${item.type === 'blog' ? 'blog' : 'product'}/${item.slug}`)">
                    {{ item.name }}
                  </NuxtLink>
                </div>
                <div v-else-if="!loader && !searchRes?.data?.length">
                  <p class="nav-search__title">
                    {{ $t('list_empty') }}
                  </p>
                </div>
                <p v-else-if="loader" class="nav-search__title">
                  {{ $t('loading') }}
                </p>
              </div>
            </div>
            <!-- 
            <NuxtLink :to="localePath('/')" class="nav-user">
              <IconsUser />
            </NuxtLink> -->

            <NuxtLink :to="localePath('/saved')" class="nav-saved">
              <IconsHeart />
              <span class="nav-saved__count">{{ store?.favoriteItems?.length }}</span>
            </NuxtLink>

            <NuxtLink :to="localePath('/cart')" class="nav-cart">
              <IconsCart />
              <span class="nav-cart__count">{{ cartStore?.cartItems?.length }}</span>
            </NuxtLink>

          </div>

          <NuxtLink :to="localePath('/contact')" class="nav-btn">
            <BaseButton>
              {{ $t('connect') }}
            </BaseButton>
          </NuxtLink>

          <div class="nav-lang" @click="isLangOpen = !isLangOpen">
            <div class="nav-lang__head">{{ locale }}
              <IconsArrowDown />
            </div>
            <div class="nav-lang__items" v-if="isLangOpen">
              <div class="nav-lang__item" @click="setLocale('ru')">ru</div>
              <div class="nav-lang__item" @click="setLocale('en')">en</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div @click="scrollToTop" class="scroller">
      <IconsArrowDown />
    </div>
    <div v-if="isSidebarOpen" @click="isSidebarOpen = false" class="overlay"></div>
    <div class="sidebar" :class="{ active: isSidebarOpen }">
      <div class="sidebar-top">
        <div class="sidebar-header">
          <NuxtLink :to="localePath('/')" class="sidebar-logo" @click="isSidebarOpen = false">
            <img width="100" height="100" loading="lazy" :src="footerData?.data?.data?.footer?.logo" alt="Logo">
          </NuxtLink>
          <button aria-label="Button" @click="isSidebarOpen = false" class="sidebar-cancel">
            <IconsCancel />
          </button>
        </div>
        <div class="sidebar-menu">
          <NuxtLink :to="localePath('/')" :class="{ active: $route.path === localePath('/') }"
            class="sidebar-menu__item" @click="isSidebarOpen = false">
            {{ $t('home') }}</NuxtLink>
          <NuxtLink :to="localePath('/about')" :class="{ active: $route.path === localePath('/about') }"
            class="sidebar-menu__item" @click="isSidebarOpen = false">{{ $t('about') }}</NuxtLink>
          <NuxtLink :to="localePath('/category')" :class="{ active: $route.path === localePath('/category') }"
            class="sidebar-menu__item" @click="isSidebarOpen = false">{{ $t('category') }}</NuxtLink>
          <NuxtLink :to="localePath('/services')" :class="{ active: $route.path === localePath('/services') }"
            class="sidebar-menu__item" @click="isSidebarOpen = false">{{ $t('services') }}</NuxtLink>
          <NuxtLink :to="localePath('/blog')" :class="{ active: $route.path === localePath('/blog') }"
            class="sidebar-menu__item" @click="isSidebarOpen = false">{{ $t('blog') }}</NuxtLink>
          <NuxtLink :to="localePath('/contact')" :class="{ active: $route.path === localePath('/contact') }"
            class="sidebar-menu__item" @click="isSidebarOpen = false">{{ $t('contact') }}</NuxtLink>
        </div>
      </div>
      <div class="sidebar-bottom">
        <BaseButton>{{ $t('connect') }}</BaseButton>
        <div class="sidebar-lang" @click="isLangOpenMobile = !isLangOpenMobile">
          <div class="sidebar-lang__head">{{ locale }}
            <IconsArrowDown />
          </div>
          <div class="sidebar-lang__items" v-if="isLangOpenMobile">
            <div class="sidebar-lang__item" @click="setLocale('ru')">ru</div>
            <div class="sidebar-lang__item" @click="setLocale('en')">en</div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="js" setup>
import { useSavedStore } from "~/store/addToSaved";
import { useCartStore } from "~/store/addToCart";
const store = useSavedStore();
const cartStore = useCartStore();
const localePath = useLocalePath();
const { locale, setLocale } = useI18n();
const { footerData } = useFooter();
const isLangOpen = ref(false);
const isSidebarOpen = ref(false);
const isLangOpenMobile = ref(false);
onMounted(() => {
  window.addEventListener('click', (e) => {
    if (!(e.target).closest('.nav-lang')) {
      isLangOpen.value = false;
    }
  })
  window.addEventListener('click', (e) => {
    if (!(e.target).closest('.nav-search')) {
      search.value = null
      searchRes.value = null
      loader.value = true
    }
  })
  window.addEventListener("scroll", () => {
    const scroller = document.querySelector(".scroller");
    scroller?.classList.toggle("active", window.scrollY > 0);
  });
})
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

const closeSearch = () => {
  search.value = null
  searchRes.value = null
  loader.value = true
}

const search = ref(null)
const searchRes = ref(null)
const debounceTimer = ref(null)
const config = useRuntimeConfig()
const loader = ref(false)
async function searchHandler() {
  if (search.value) {
    clearTimeout(debounceTimer.value)
    debounceTimer.value = setTimeout(async () => {
      loader.value = true
      searchRes.value = await $fetch(`${config.public.apiBase}/searchall/${locale.value}/?search=${search.value}`)
      loader.value = false
    }, 1000);
  }
  else {
    searchRes.value = null
    loader.value = true
  }
}
</script>
