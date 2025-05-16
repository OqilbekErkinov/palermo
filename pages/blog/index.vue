<template>
  <div class="blog">
    <header class="header" :style="{
      background: `  linear-gradient(270deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.5) 100%) , url(${blogs?.data?.data?.blog?.header_image}) no-repeat center/cover`
    }">
      <div class="container">
        <h1 class="header-title">
          {{ blogs?.data?.data?.blog?.main_title }}
        </h1>
        <div class="header-content">
          <div class="header-left">
            <div class="header-left__bg">
              <ShapesBlogHeader />
            </div>
            <div class="header-left__content">
              <div class="header-left__top">
                <h2 class="header-left__title">{{ blogs?.data?.data?.blog?.main_title }}</h2>
                <p class="header-left__desc">
                  {{ blogs?.data?.data?.blog?.description }}
                </p>
              </div>
              <div class="header-left__bottom">
                <div class="header-left__bottom--search">
                  <input type="text" v-model="search" @input="searchHandler" :placeholder="$t('blog search')">
                  <div class="header-left__bottom--icon">
                    <IconsSearch />
                  </div>
                </div>
                <div class="header-left__bottom--res" v-if="search">
                  <div v-if="searchRes?.data?.data?.length > 0 && !loader" class="header-left__bottom--list">
                    <NuxtLink v-for="item in searchRes?.data?.data" :key="item" class="header-left__bottom--title"
                      :to="localePath(`/blog/${item?.slug}`)">{{
                        item?.title }}</NuxtLink>
                  </div>
                  <div v-else-if="!loader && !searchRes?.data?.data?.length">
                    <p class="header-left__bottom--title">
                      {{ $t('list_empty') }}
                    </p>
                  </div>
                  <p v-else-if="loader" class="header-left__bottom--title">
                    {{ $t('loading') }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="header-right">
            <div class="header-right__video">
              <a :href="blogs?.data?.data?.blog?.main_video" data-fancybox class="header-right__video--in">
                  <span class="header-right__video--play">
                    <IconsPlay />
                  </span>
                  <img src="~/assets/images/png/services-contact.png" alt="">
                </a>
            </div>
            <h3 class="header-right__title">
              {{ blogs?.data?.data?.blog?.video_title }}
            </h3>
          </div>
        </div>
      </div>
      <div class="header-gradient"></div>
    </header>
    <section class="articles">
      <div class="container">
        <h2 class="articles-title">
          {{ $t('popular_products') }}
        </h2>
        <Swiper :modules="modules"
          :navigation="{ nextEl: '.articles-header__arrows--right', prevEl: '.articles-header__arrows--left', disabledClass: 'disabled' }"
          :breakpoints="breakpoints">
          <SwiperSlide v-for="(item, index) in blogs?.data?.data?.popular_blogs" :key="item">
            <NuxtLink :to="localePath(`/blog/${item?.slug}`)" class="article odd" v-if="index % 2 === 0">
              <div class="odd-content">
                <img loading="lazy" :src="item?.main_image" alt="img">
              </div>
              <div class="odd-info">
                <div class="odd-info__in">
                  <div class="odd-info__bg">
                    <ShapesIndesArticleSmall />
                  </div>
                  <div class="odd-info__arrow">
                    <BasePointerTop :size="`100%`" :bg="`black`" />
                  </div>
                  <div class="odd-info__text">
                    <p class="odd-info__title uppercase">
                      {{ item?.title }}
                    </p>
                    <p class="odd-info__desc">
                      {{ item?.description }}
                    </p>
                  </div>
                </div>
              </div>
            </NuxtLink>
            <NuxtLink :to="localePath(`/blog/${item?.slug}`)" class="article even" v-if="index % 2 === 1">
              <div class="even-bg">
                <ShapesIndexArticleBig />
              </div>
              <div class="even-content">
                <div class="even-img">
                  <img loading="lazy" :src="item?.main_image" alt="img">
                </div>
                <div class="even-info">
                  <p class="even-info__title">
                    {{ item?.title }}
                  </p>
                  <p class="even-info__desc">
                    {{ item?.description }}
                  </p>
                </div>
              </div>
              <div class="even-arrow">
                <BasePointerTop :size="`100%`" :bg="`white`" />
              </div>
            </NuxtLink>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
    <section class="articles">
      <div class="container">
        <h2 class="articles-title">
          {{ $t('recommended_products') }}
        </h2>
        <Swiper :modules="modules"
          :navigation="{ nextEl: '.articles-header__arrows--right', prevEl: '.articles-header__arrows--left', disabledClass: 'disabled' }"
          :breakpoints="breakpoints">
          <SwiperSlide v-for="(item, index) in blogs?.data?.data?.recommended_blogs" :key="item">
            <NuxtLink :to="localePath(`/blog/${item?.slug}`)" class="article odd" v-if="index % 2 === 0">
              <div class="odd-content">
                <img loading="lazy" :src="item?.main_image" alt="img">
              </div>
              <div class="odd-info">
                <div class="odd-info__in">
                  <div class="odd-info__bg">
                    <ShapesIndesArticleSmall />
                  </div>
                  <div class="odd-info__arrow">
                    <BasePointerTop :size="`100%`" :bg="`black`" />
                  </div>
                  <div class="odd-info__text">
                    <p class="odd-info__title uppercase">
                      {{ item?.title }}
                    </p>
                    <p class="odd-info__desc">
                      {{ item?.description }}
                    </p>
                  </div>
                </div>
              </div>
            </NuxtLink>
            <NuxtLink :to="localePath(`/blog/${item?.slug}`)" class="article even" v-if="index % 2 === 1">
              <div class="even-bg">
                <ShapesIndexArticleBig />
              </div>
              <div class="even-content">
                <div class="even-img">
                  <img loading="lazy" :src="item?.main_image" alt="img">
                </div>
                <div class="even-info">
                  <p class="even-info__title">
                    {{ item?.title }}
                  </p>
                  <p class="even-info__desc">
                    {{ item?.description }}
                  </p>
                </div>
              </div>
              <div class="even-arrow">
                <BasePointerTop :size="`100%`" :bg="`white`" />
              </div>
            </NuxtLink>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRuntimeConfig, useHead } from '#imports'
import { useI18n } from 'vue-i18n'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

const modules = [Navigation]
const { blogs } = useBlogs()
const localePath = useLocalePath()
const config = useRuntimeConfig()
const { locale } = useI18n()

const breakpoints = {
  480: {
    slidesPerView: 1,
    spaceBetween: 10,
  },
  640: {
    slidesPerView: 2,
    spaceBetween: 10,
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 10,
  },
}

const isVideoPlayed = ref(true)
const search = ref(null)
const searchRes = ref(null)
const debounceTimer = ref(null)
const loader = ref(true)

async function searchHandler() {
  if (search.value) {
    clearTimeout(debounceTimer.value)
    debounceTimer.value = setTimeout(async () => {
      loader.value = true
      searchRes.value = await $fetch(`${config.public.apiBase}/searchblog/${locale.value}/?search=${search.value}`)
      loader.value = false
    }, 1000)
  } else {
    searchRes.value = null
    loader.value = true
  }
}

onMounted(() => {
  // Handles closing search dropdown on outside click
  window.addEventListener('click', (e) => {
    if (!(e.target).closest('.header-left__bottom')) {
      search.value = null
      searchRes.value = null
      loader.value = true
    }
  })
})

const route = useRoute()
useHead({
  link: [{ rel: 'canonical', href: `https://palermo.uz/${route.path}` }]
})
</script>