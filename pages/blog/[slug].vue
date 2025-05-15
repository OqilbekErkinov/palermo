<template>
  <div class="blogin">
    <header class="header">
      <div class="container">
        <div class="header-back" @click="$router.back()">
          <IconsArrowLeft />
        </div>
        <h1 class="header-title">
          {{ blog?.data?.data?.blog?.title }}
        </h1>
        <div class="header-content">
          <div class="header-content__left">
            <div class="header-content__left--img">
              <img loading="lazy" :src="blog?.data?.data?.blog?.image1" alt="Image">
            </div>
            <p class="header-content__info">
              {{ blog?.data?.data?.blog?.description }}
            </p>
          </div>
          <div class="header-content__right">
            <img loading="lazy" :src="blog?.data?.data?.blog?.main_image" alt="Img">
          </div>
        </div>
      </div>
    </header>
    <section class="why">
      <div class="container">
        <div class="why-content">
          <div class="why-card">
            <img loading="lazy" :src="blog?.data?.data?.blog?.image2" alt="img">
            <div class="why-card__content">
              <p class="why-card__title">
                {{ blog?.data?.data?.blog?.title1 }}

              </p>
              <p class="why-card__text">
                {{ blog?.data?.data?.blog?.text1 }}
              </p>
            </div>
          </div>
          <div class="why-card">
            <img loading="lazy" :src="blog?.data?.data?.blog?.image3" alt="img">
            <div class="why-card__content">
              <p class="why-card__title">
                {{ blog?.data?.data?.blog?.title2 }}
              </p>
              <p class="why-card__text">
                {{ blog?.data?.data?.blog?.text2 }}
              </p>
            </div>
          </div>
          <div class="why-card">
            <img loading="lazy" :src="blog?.data?.data?.blog?.image4" alt="img">
            <div class="why-card__content">
              <p class="why-card__title">
                {{ blog?.data?.data?.blog?.title3 }}
              </p>
              <p class="why-card__text">
                {{ blog?.data?.data?.blog?.text3 }}
              </p>
            </div>
          </div>
          <div class="why-card">
            <img loading="lazy" :src="blog?.data?.data?.blog?.image5" alt="img">
            <div class="why-card__content">
              <p class="why-card__title">
                {{ blog?.data?.data?.blog?.title4 }}
              </p>
              <p class="why-card__text">
                {{ blog?.data?.data?.blog?.text4 }}
              </p>
            </div>
          </div>
        </div>
        <p class="why-desc">
          {{ blog?.data?.data?.blog?.text5 }}
        </p>
      </div>
    </section>
    <section class="contact">
      <div class="container">
        <div class="contact-in">
          <div class="contact-content">
            <div class="contact-content__bg">
            </div>
            <div class="card">
              <div class="card-item">
                <h3 class="card-item__title">
                  {{ servicesData?.data?.home_data?.question_text }}
                </h3>
                <p class="card-item__desc">
                  {{ servicesData?.data?.home_data?.question_description }}
                </p>
                <div class="card-item__wrapper">
                  <IconsLocation />
                  {{ footerData?.data?.data?.footer?.address }}
                </div>
                <a :href="`mailto:${footerData?.data?.data?.footer?.mail}`" class="card-item__wrapper">
                  <IconsEmail />
                  {{ footerData?.data?.data?.footer?.mail }}
                </a>
                <a :href="`tel:${footerData?.data?.data?.footer?.phone}`" class="card-item__wrapper">
                  <IconsPhone />
                  {{ footerData?.data?.data?.footer?.phone }}
                </a>
              </div>
              <form @submit.prevent="handleSubmit" class="card-item form">
                <div class="form-item">
                  <input required v-model="name" :placeholder="$t('your_name')" type="text">
                </div>
                <div class="form-item">
                  <input required v-model="email" :placeholder="$t('your_email')" type="email">
                </div>
                <div class="form-item">
                  <input required v-model="phone" :placeholder="$t('your_phone')" type="phone">
                </div>
                <div class="form-item">
                  <input required v-model="message" :placeholder="$t('your_message')" type="text">
                </div>
                <div class="form-item form-btn">
                  <BaseTranspatentButton>{{ $t('send') }}</BaseTranspatentButton>
                  <BasePointerTop :bg="`white`" :translate="`-15px`" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="js" setup>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import emailjs from 'emailjs-com'
const { servicesData } = useServices();
const { footerData } = useFooter();
const route = useRoute();
const slug = route.params.slug;
const isLoader = useLoader();
const blog = ref(null)
const config = useRuntimeConfig();
const { locale, t } = useI18n();

async function getBlog() {
  isLoader.value = true;
  blog.value = await $fetch(`${config.public.apiBase}/getblog/${locale.value}/?slug=${slug}`)
  isLoader.value = false;
}


const name = ref('')
const email = ref('')
const phone = ref('')
const message = ref('')

const handleSubmit = async () => {
  if (!name.value || !email.value || !phone.value || !message.value) {
    alert("Please fill in all fields")
    return
  }
  try {
    const params = {
      to_name: 'Palermo',
      from_name: name.value,
      message: `Name: ${name.value}
    Email: ${email.value}
    Phone: ${phone.value}
    Message: ${message.value}`
    }

    await emailjs.send(
      'service_b0ehtia',
      'template_h0hee6a',
      params,
      'TpeL7NyK9cxswwzLp'
    )

    name.value = ''
    email.value = ''
    phone.value = ''
    message.value = ''
    toast.success(t('message_sent_successfully'),
    { position: 'bottom-right' }
    )
  } catch (error) {
    console.error("Error occurred", error)
    toast.error(t('error_occurred'),
    { position: 'bottom-right' }
    )
  }
}

getBlog()
useHead({
  link: [
    { rel: 'canonical', href: `https://palermo.uz/${route.path}` },
  ]
})
</script>
<style scoped>
:global(.Toastify__toast-container--bottom-right) {
  margin-bottom: -1.5rem;
}
</style>
