<template>
  <footer class="footer">
    <div class="footer-gradient"></div>
    <div class="container">
      <div class="footer-content">
        <div class="footer-content__bg">
          <ShapesFooter />
        </div>
        <div class="footer-items">
          <div class="footer-item info">
            <div class="info-card">
              <div class="info-top">
                <div class="info-logo">
                  <NuxtLink class="info-logo__img" :to="localePath('/')">
                    <img loading="lazy" :src="footerData?.data?.data?.footer?.logo" alt="logo">
                  </NuxtLink>
                  <p class="info-logo__text">
                    {{ footerData?.data?.data?.footer?.title }}
                  </p>
                </div>
                <div class="info-connect">
                  <h2 class="info-connect__title">
                    {{ footerData?.data?.data?.footer?.title_contact }}
                  </h2>
                  <p class="info-connect__text">
                    {{ footerData?.data?.data?.footer?.description_contact }}

                  </p>
                  <div class="info-connect__wrapper">
                    <NuxtLink :to="localePath('/contact')">
                      <BaseTranspatentButton>{{ $t('send') }}</BaseTranspatentButton>
                    </NuxtLink>
                    <BasePointerTop :translate="`-15px`" />
                  </div>
                </div>
              </div>
              <div class="info-bottom">
                <div class="info-contact">
                  <p class="info-contact__title">
                    {{ $t('contact') }}
                  </p>
                  <div class="info-contact__items">
                    <div class="info-contact__item">
                      <IconsLocation />
                      <p class="info-contact__text">
                        {{ footerData?.data?.data?.footer?.address }}
                      </p>
                    </div>
                    <div class="info-contact__item">
                      <IconsEmail />
                      <a :href="`mailto:${footerData?.data?.data?.footer?.mail}`" class="info-contact__text">
                        {{ footerData?.data?.data?.footer?.mail }}
                      </a>
                    </div>
                    <div class="info-contact__item">
                      <IconsPhone />
                      <a :href="`tel:${footerData?.data?.data?.footer?.phone}`" class="info-contact__text">
                        {{ footerData?.data?.data?.footer?.phone }}
                      </a>
                    </div>
                  </div>
                </div>
                <div class="info-menu">
                  <p class="info-menu__title">
                    {{ $t('menu') }}
                  </p>
                  <div class="info-menu__links">
                    <NuxtLink :class="{ active: $route.path === localePath('/') }" class="info-menu__link"
                      :to="localePath('/')">{{ $t('home') }}</NuxtLink>
                    <NuxtLink :class="{ active: $route.path === localePath('/about') }" class="info-menu__link"
                      :to="localePath('/about')">{{ $t('about') }}</NuxtLink>
                    <NuxtLink :class="{ active: $route.path === localePath('/category') }" class="info-menu__link"
                      :to="localePath('/category')">{{ $t('category') }}</NuxtLink>
                    <NuxtLink :class="{ active: $route.path === localePath('/services') }" class="info-menu__link"
                      :to="localePath('/services')">{{ $t('services') }}</NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="footer-item footer--socials">
            <BaseSocials />
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
const localePath = useLocalePath();
const { footerData } = useFooter();
</script>