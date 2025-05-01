<template>
  <main class="index">
    <header class="header" :style="{
      background: `linear-gradient(270deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.5) 100%) , url(${homePageData?.data?.home_data?.image}) no-repeat center/cover`
    }">
      <div class="container">
        <h1 class="header-title">
          {{ homePageData?.data?.home_data?.title }}
        </h1>
        <div class="header-content">
          <div class="header-content__bg">
            <ShapesIndexHeader />
          </div>
          <div class="header-content__cards">
            <div class="header-content__card card-left">
              <div class="card-left__icons">
                <div class="card-left__icon" :style="{
                  backgroundImage: `url(${homePageData?.data?.home_data?.color_image_1})`
                }"></div>
                <div class="card-left__icon" :style="{
                  backgroundImage: `url(${homePageData?.data?.home_data?.color_image_2})`
                }"></div>
              </div>
              <p class="card-left__text">
                {{ homePageData?.data?.home_data?.description }}
              </p>
            </div>
            <div class="header-content__card card-right">
              <p class="card-right__text">
                {{ homePageData?.data?.home_data?.minititle }}
              </p>
              <div class="card-right__bottom">
                <BaseTranspatentButton>{{ $t('go_to_catalog') }}</BaseTranspatentButton>
                <BasePointerTop :translate="`-15px`" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="header-gradient"></div>
    </header>

    <section class="inspiration">
      <div class="container">
        <div class="inspiration-content">
          <div class="inspiration-content__bg">
            <ShapesIndexInspiration />
          </div>
          <div class="items">
            <div class="item">
              <p class="item-title">
                {{ homePageData?.data?.home_data?.about_title }}
              </p>
              <p class="item-text">
                {{ homePageData?.data?.home_data?.about_description }}
              </p>
              <BaseTranspatentButton>{{ $t('about') }}</BaseTranspatentButton>
            </div>
            <div class="item">
              <div class="item-search">
                <input v-model="search" @input="searchHandler" type="text" placeholder="поисковой запрос...">
                <div class="item-search__icon">
                  <IconsSearch />
                </div>
                <div class="item-search__res" v-if="search">
                  <div v-if="searchRes?.data?.length > 0 && !loader" class="item-search__list">
                    <NuxtLink v-for="item in searchRes?.data" :key="item.slug" class="item-search__title"
                      :to="localePath(`/${item.type === 'blog' ? 'blog' : 'product'}/${item.slug}`)">
                      {{ item.name }}
                    </NuxtLink>
                  </div>
                  <div v-else-if="!loader && !searchRes?.data?.length">
                    <p class="item-search__title">
                      {{ $t('list_empty') }}
                    </p>
                  </div>
                  <p v-else-if="loader" class="item-search__title">
                    {{ $t('loading') }}
                  </p>
                </div>
              </div>

              <div class="cards">
                <div class="card">
                  <div class="card-header">
                    <div class="card__header__left">
                      <h1 class="card-header__title">
                        {{ $t('about1') }}
                      </h1>
                      <p class="card-header__text">
                        {{ $t('about1_desc') }}
                      </p>
                    </div>
                    <div class="card-header__right">
                      <BasePointerTop :bg="`white`" />
                    </div>
                  </div>
                  <div class="card-img">
                    <img  loading="lazy" src="~/assets/images/png/inspiration-img1.png" alt="img">
                  </div>
                </div>
                <div class="card">
                  <div class="card-header">
                    <div class="card__header__left">
                      <h1 class="card-header__title">
                        {{ $t('about2') }}
                      </h1>
                      <p class="card-header__text">
                        {{ $t('about2_desc') }}
                      </p>
                    </div>
                    <div class="card-header__right">
                      <BasePointerTop :bg="`white`" />
                    </div>
                  </div>
                  <div class="card-img">
                    <img  loading="lazy" src="~/assets/images/png/inspiration-img2.png" alt="img">
                  </div>
                </div>
                <div class="card">
                  <div class="card-header">
                    <div class="card__header__left">
                      <h1 class="card-header__title">
                        {{ $t('about3') }}
                      </h1>
                      <p class="card-header__text">
                        {{ $t('about3_desc') }}
                      </p>
                    </div>
                    <div class="card-header__right">
                      <BasePointerTop :bg="`white`" />
                    </div>
                  </div>
                  <div class="card-img">
                    <img  loading="lazy" src="~/assets/images/png/inspiration-img3.png" alt="img">
                  </div>
                </div>
              </div>
            </div>
            <div class="item">
              <BaseSocials />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="why">
      <div class="container">
        <h1 class="why-title">
          {{ $t('why_select') }}
        </h1>
        <div class="why-content">
          <div class="why-card">
            <img  loading="lazy" :src="homePageData?.data?.home_data?.image1" alt="img">
            <div class="why-card__content">
              <p class="why-card__title">
                {{ homePageData?.data?.home_data?.image1_title }}

              </p>
              <p class="why-card__text">
                {{ homePageData?.data?.home_data?.image1_description }}
              </p>
            </div>
          </div>
          <div class="why-card">
            <img  loading="lazy" :src="homePageData?.data?.home_data?.image2" alt="img">
            <div class="why-card__content">
              <p class="why-card__title">
                {{ homePageData?.data?.home_data?.image2_title }}
              </p>
              <p class="why-card__text">
                {{ homePageData?.data?.home_data?.image2_description }}
              </p>
            </div>
          </div>
          <div class="why-card">
            <img  loading="lazy" :src="homePageData?.data?.home_data?.image3" alt="img">
            <div class="why-card__content">
              <p class="why-card__title">
                {{ homePageData?.data?.home_data?.image3_title }}
              </p>
              <p class="why-card__text">
                {{ homePageData?.data?.home_data?.image3_description }}
              </p>
            </div>
          </div>
          <div class="why-card">
            <img  loading="lazy" :src="homePageData?.data?.home_data?.image4" alt="img">
            <div class="why-card__content">
              <p class="why-card__title">
                {{ homePageData?.data?.home_data?.image4_title }}
              </p>
              <p class="why-card__text">
                {{ homePageData?.data?.home_data?.image4_description }}
              </p>
            </div>
          </div>
        </div>
        <div class="why-img">
          <img  loading="lazy"  src="~/assets/images/png/why-logo.png" alt="img">
        </div>
      </div>
    </section>

    <section class="popular">
      <div class="container">
        <h1 class="popular-title">
          {{ $t('popular_product') }}
        </h1>
        <div class="popular-content">
          <NuxtLink :to="localePath(`/product/${item?.slug}`)" v-for="item in homePageData?.data?.popular_products"
            :key="item">
            <PopularCard :popularData="item" />
          </NuxtLink>
        </div>
        <div class="popular-bottom">
          <p class="popular-bottom__text">
            {{ $t('popular_bottom_desc') }}
          </p>
          <div class="popular-bottom__wrapper">
            <NuxtLink :to="localePath('/category')">
              <BaseTranspatentButton>{{ $t('go_to_catalog') }}</BaseTranspatentButton>
            </NuxtLink>
            <BasePointerTop :translate="`-15px`" />
          </div>
        </div>
      </div>
    </section>

    <section class="articles">
      <div class="container">
        <h2 class="articles-title">
          {{ $t('blog_title') }}
        </h2>
        <div class="articles-header">
          <p class="articles-header__desc">
            {{ $t('blog_desc') }}
          </p>
          <div class="articles-header__arrows">
            <button aria-label="Button" class="articles-header__arrows--left">
              <IconsArrowLeft />
            </button>
            <button aria-label="Button" class="articles-header__arrows--right">
              <IconsArrowRight />
            </button>
          </div>
        </div>
        <Swiper :modules="modules"
          :navigation="{ nextEl: '.articles-header__arrows--right', prevEl: '.articles-header__arrows--left', disabledClass: 'disabled' }"
          :breakpoints="breakpoints">
          <SwiperSlide v-for="(item, index) in homePageData?.data?.blogs" :key="item">
            <NuxtLink :to="localePath(`/blog/${item?.slug}`)" class="article odd" v-if="index % 2 === 0">
              <div class="odd-content">
                <img  loading="lazy" :src="item?.main_image" alt="img">
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
                  <img  loading="lazy" :src="item?.main_image" alt="img">
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
        <div class="articles-bottom">
          <NuxtLink :to="localePath('/blog')">
            <BaseTranspatentButton>{{ $t('blog_mini_title') }}</BaseTranspatentButton>
          </NuxtLink>
          <BasePointerTop :translate="`-15px`" />
        </div>
      </div>
    </section>
  </main>
</template>
<script lang="js" setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
const modules = [Navigation];
const { homePageData } = useHomePage();
const localePath = useLocalePath();
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

const search = ref(null)
const searchRes = ref(null)
const debounceTimer = ref(null)
const config = useRuntimeConfig()
const { locale } = useI18n()
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

onMounted(() => {
  window.addEventListener('click', (e) => {
    if (!(e.target).closest('.item-search')) {
      search.value = null
      searchRes.value = null
      loader.value = true
    }
  })
})

const route = useRoute()
useHead({
  link: [
    { rel: 'canonical', href: `https://palermo.divspan.uz/${route.path}` },
  ]
})
</script>

