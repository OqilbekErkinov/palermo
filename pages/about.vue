<template>
  <div class="about">
    <header class="header" :style="{
      background: `  linear-gradient(270deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.5) 100%) , url(${aboutData?.data?.about_page?.background}) no-repeat center/cover`
    }">
      <div class="container">
        <h1 class="header-title">
          {{ aboutData?.data?.about_page?.title }}
        </h1>
        <div class="header-content__wrapper">
          <div class="header-content">
            <div class="header-content__bg">
              <ShapesAboutHeader />
            </div>
            <div class="header-content__info">
              <div class="header-content__in">
                <p class="header-content__text">
                  {{ aboutData?.data?.about_page?.description }} <br>
                  {{ aboutData?.data?.about_page?.mini_description }}
                </p>
              </div>
              <div class="header-variants variants--mobile">
                <div class="header-variants__item" :style="{
                  backgroundImage: `url(${aboutData?.data?.about_page?.image2})`
                }"></div>
                <div class="header-variants__item" :style="{
                  backgroundImage: `url(${aboutData?.data?.about_page?.image3})`
                }"></div>
                <div class="header-variants__item" :style="{
                  backgroundImage: `url(${aboutData?.data?.about_page?.image4})`
                }"></div>
              </div>
              <div class="header-content__card" :style="{
                backgroundImage: `url(${aboutData?.data?.about_page?.image1})`
              }"></div>
            </div>
          </div>
          <div class="header-variants">
            <div class="header-variants__item" :style="{
              backgroundImage: `url(${aboutData?.data?.about_page?.image2})`
            }"></div>
            <div class="header-variants__item" :style="{
              backgroundImage: `url(${aboutData?.data?.about_page?.image3})`
            }"></div>
            <div class="header-variants__item" :style="{
              backgroundImage: `url(${aboutData?.data?.about_page?.image4})`
            }"></div>
          </div>
        </div>
      </div>
      <div class="header-gradient"></div>
    </header>

    <section class="works">
      <div class="container">
        <h2 class="works-title">
          {{ aboutData?.data?.about_page?.title_about }}
        </h2>
        <div class="works-header">
          <div class="works-header__arrows">
            <button class="works-header__arrows--left">
              <IconsArrowLeft />
            </button>
            <button class="works-header__arrows--right">
              <IconsArrowRight />
            </button>
          </div>
        </div>
        <div class="works-content">
          <div class="work one--work">
            <p class="work-title">{{ aboutData?.data?.about_page?.title_child_about }}</p>
            <p class="work-text">
              {{ aboutData?.data?.about_page?.title_child1_about }}
            </p>
          </div>
          <div class="works-swiper">
            <Swiper :modules="modules"
              :navigation="{ nextEl: '.works-header__arrows--right', prevEl: '.works-header__arrows--left', disabledClass: 'disabled' }"
              :breakpoints="breakpoints">
              <SwiperSlide v-for="(item, index) in aboutData?.data?.gallery" :key="index">
                <div class="work">
                  <img loading="lazy" :src="item.image" alt="img">
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </section>

    <section class="quality">
      <div class="container">
        <h2 class="quality-title">
          {{ aboutData?.data?.about_page?.title_blogs }}
        </h2>
        <div class="quality-content">
          <div class="quality-top">
            <div class="card-one">
              <img loading="lazy" :src="aboutData?.data?.about_page?.image6" alt="img">
              <div class="card-one__content">
                <div class="card-one__content--in">
                  <div class="card-one__bg">
                    <ShapesQualityOne />
                  </div>
                  <div class="card-one__info">
                    <p class="card-one__title">
                      {{ aboutData?.data?.about_page?.image6_minititle }}
                    </p>
                    <p class="card-one__desc">
                      {{ aboutData?.data?.about_page?.image6_title }}
                    </p>
                  </div>
                  <div class="card-one__pointer">
                    <BasePointerTop :size="`100%`" :bg="`black`" />
                  </div>
                </div>
              </div>
            </div>
            <div class="card-two">
              <div class="card-two__bg">
                <ShapesQualityTwo />
              </div>
              <div class="card-two__content">
                <div class="card-two__img">
                  <img loading="lazy" :src="aboutData?.data?.about_page?.image7" alt="img">
                </div>
                <p class="card-two__title">
                  {{ aboutData?.data?.about_page?.image7_minititle }}
                </p>
                <p class="card-two__desc">
                  {{ aboutData?.data?.about_page?.image7_title }}
                </p>
              </div>
              <div class="card-two__pointer">
                <BasePointerTop :size="`100%`" :bg="`white`" />
              </div>
            </div>
            <div class="quality-top__logo">
              <img loading="lazy" src="~/assets/images/png/quality-top__bg.png" alt="Img">
            </div>
          </div>
          <div class="quality-bottom">
            <div class="quality-bottom__logo">
              <img loading="lazy" src="~/assets/images/png/quality-bottom__bg.png" alt="Img">
            </div>
            <div class="card-three">
              <img loading="lazy" :src="aboutData?.data?.about_page?.image8" alt="img">
              <div class="card-three__content">
                <div class="card-three__info">
                  <p class="card-three__title">
                    {{ aboutData?.data?.about_page?.image8_minititle }}
                  </p>
                  <p class="card-three__desc">
                    {{ aboutData?.data?.about_page?.image8_title }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="trust">
      <div class="container">
        <div class="trust-bg">
          <img loading="lazy" src="~/assets/images/png/trust-bg.png" alt="img">
        </div>
        <p class="trust-title">
          {{ aboutData?.data?.about_page?.title_clients }}
        </p>
        <p class="trust-desc">
          {{ aboutData?.data?.about_page?.description_clients }}
        </p>
        <div class="trust-content">
          <button class="trust-content__arrow--left trust-content__arrow">
            <IconsArrowLeft />
          </button>
          <Swiper :centered-slides="true" :modules="modules" v-if="aboutData?.data?.commenst.length > 0"
            :navigation="{ nextEl: '.trust-content__arrow--right', prevEl: '.trust-content__arrow--left', disabledClass: 'disabled' }"
            :loop="true" :breakpoints="breakpointsTrust">
            <SwiperSlide v-for="(item, index) in aboutData?.data?.commenst" :key="index">
              <div class="card">
                <div class="card-header">
                  <div class="card-header__img">
                    <img loading="lazy" :src="item.image1" alt="Img">
                  </div>
                  <div class="card-header__info">
                    <p class="card-header__name">{{ item.client_name }}</p>
                    <div class="card-header__stars">
                      <IconsStar v-for="el in item.rate" :key="el" />
                    </div>
                  </div>
                </div>
                <p class="card-text">
                  {{ item.comment }}
                </p>
                <div class="card-gallery">
                  <div class="card-gallery__item">
                    <img loading="lazy" v-if="item.image2" :src="item.image2" alt="img">
                  </div>
                  <div class="card-gallery__item">
                    <img loading="lazy" v-if="item.image3" :src="item.image3" alt="img">
                  </div>
                  <div class="card-gallery__item" v-if="item.image4">
                    <img loading="lazy" :src="item.image4" alt="img">
                    <div class="card-gallery__item--blur" v-if="item.image5">+1</div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
          <button class="trust-content__arrow--right trust-content__arrow">
            <IconsArrowRight />
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
const modules = [Navigation, EffectCoverflow];
const { aboutData } = useAbout();
const breakpoints = {
  480: {
    slidesPerView: 1,
    spaceBetween: 10,
  },
  768: {
    slidesPerView: 2,
    spaceBetween: 10,
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 10,
  },
}
const breakpointsTrust = {
  480: {
    slidesPerView: 1,
    spaceBetween: 10,
  },
  768: {
    slidesPerView: 2,
    spaceBetween: 0,
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 0,
  },
}

const route = useRoute()
useHead({
  link: [
    { rel: 'canonical', href: `https://palermo.uz/${route.path}` },
  ]
})
</script>
