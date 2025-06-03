<template>
  <div class="services">
    <header class="header" :style="{
      background: `  linear-gradient(270deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.5) 100%) , url(${servicesData?.data?.home_data?.backround_image}) no-repeat center/cover`
    }">
      <div class="container">
        <h1 class="header-title">
          {{ servicesData?.data?.home_data?.title }}
        </h1>
        <div class="content">
          <div class="content-card">
            <h1 class="content-card__title">
              {{ servicesData?.data?.home_data?.mini_title }}
            </h1>
            <p class="content-card__desc">
              {{ servicesData?.data?.home_data?.child_title }}
            </p>
          </div>
          <div class="content-card flex">
            <div class="content-card__blocks">
              <div class="content-card__block">{{ servicesData?.data?.home_data?.end_title }}</div>
              <div class="content-card__block" :style="{
                backgroundImage: `url(${servicesData?.data?.home_data?.image})`
              }"></div>
            </div>
            <p class="content-card__desc">
              {{ servicesData?.data?.home_data?.description }}
            </p>
          </div>
        </div>
      </div>
      <div class="header-gradient"></div>
    </header>

    <section class="consultation">
      <div class="container">
        <h2 class="consultation-title">
          {{ servicesData?.data?.home_data?.service_title }}
        </h2>
        <div class="one">
          <div class="one-img">
            <img loading="lazy" :src="servicesData?.data?.home_data?.image1" alt="img">
          </div>
          <div class="one-content">
            <h2 class="one-content__title">
              {{ servicesData?.data?.home_data?.image1_title }}
            </h2>
            <p class="one-content__desc">
              {{ servicesData?.data?.home_data?.image1_description }}
            </p>
          </div>
        </div>
        <div class="consultation-wrapper">
          <div class="two">
            <img loading="lazy" src="@/assets/images/png/consultation-two.png" alt="img">
          </div>
          <div class="three">
            <div class="three-cards">
              <div class="three-card" v-if="servicesData?.data?.home_data?.mini_image1">
                <img loading="lazy" :src="servicesData?.data?.home_data?.mini_image1" alt="img">
              </div>
              <div class="three-card" v-if="servicesData?.data?.home_data?.mini_image2">
                <img loading="lazy" :src="servicesData?.data?.home_data?.mini_image2" alt="img">
              </div>
              <div class="three-card" v-if="servicesData?.data?.home_data?.mini_image3">
                <img loading="lazy" :src="servicesData?.data?.home_data?.mini_image3" alt="img">
              </div>
            </div>
            <h2 class="three-title">
              {{ servicesData?.data?.home_data?.client_count }}+
            </h2>
            <p class="three-desc">
              {{ servicesData?.data?.home_data?.client_title }}
            </p>
          </div>
        </div>
        <div class="consultation-wrapper wrapper--bottom">
          <div class="four">
            <h3 class="four-title">
              {{ servicesData?.data?.home_data?.image3_title }}
            </h3>
            <p class="four-desc">
              {{ servicesData?.data?.home_data?.image3_description }}
            </p>
          </div>
          <div class="five">
            <div class="five-card">
              <div class="five-card__shape">
                <div class="five-card__shape-item"></div>
              </div>
              <p class="five-card__desc">
                {{ servicesData?.data?.home_data?.image3_minititle }}
              </p>
            </div>
            <div class="five-img">
              <img loading="lazy" :src="servicesData?.data?.home_data?.image3" alt="img">
              <div class="five-img__pointer">
                <BasePointerTop :size="`100%`" :bg="`blur`" />
              </div>
            </div>
          </div>
        </div>
        <div class="six">
          <div class="six-img">
            <img loading="lazy" :src="servicesData?.data?.home_data?.image4" alt="img">
          </div>
          <div class="six-content">
            <h3 class="six-content__title">
              {{ servicesData?.data?.home_data?.image4_title }}
            </h3>
            <p class="six-content__desc">
              {{ servicesData?.data?.home_data?.image4_minititle }}
            </p>
          </div>
        </div>
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
                  <input
                    required
                    v-model="name"
                    @input="validateName"
                    :placeholder="$t('your_name')"
                    type="text"
                    autocomplete="name"
                  />
                  <p v-if="nameError" class="form-error">{{ nameError }}</p>
                </div>
                <div class="form-item">
                  <input
                    required
                    v-model="email"
                    @input="validateEmail"
                    :placeholder="$t('your_email')"
                    type="email"
                    autocomplete="email"
                  />
                  <p v-if="emailError" class="form-error">{{ emailError }}</p>
                </div>
                <div class="form-item">
                  <input
                    required
                    v-model="phone"
                    @input="validatePhone"
                    :placeholder="$t('your_phone')"
                    type="tel"
                    autocomplete="tel"
                  />
                  <p v-if="phoneError" class="form-error">{{ phoneError }}</p>
                </div>
                <div class="form-item">
                  <textarea
                    required
                    v-model="message"
                    maxlength="100"
                    :placeholder="$t('your_message')"
                    class="message-area"
                    rows="3"
                    type="text"
                  ></textarea>
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

<script lang="ts" setup>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import emailjs from 'emailjs-com'
const { servicesData } = useServices();
const { footerData } = useFooter();
const name = ref('')
const email = ref('')
const phone = ref('')
const message = ref('')
const {t} = useI18n();
const nameError = ref('')
const emailError = ref('')
const phoneError = ref('')


// ✅ Validation
const validateName = () => {
  const namePattern = /^[A-Za-z\u0400-\u04FF\s'-]+$/
  nameError.value = namePattern.test(name.value) ? '' : t('nameerror')
}

const validateEmail = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  emailError.value = emailPattern.test(email.value) ? '' : t('emailerror')
}

const validatePhone = () => {
  const phonePattern = /^\+998\d{9}$/
  phoneError.value = phonePattern.test(phone.value) ? '' : t('phoneerror')
}

const isFormValid = () => {
  validateName()
  validateEmail()
  validatePhone()

  const allFilled = name.value && email.value && phone.value && message.value
  return !nameError.value && !emailError.value && !phoneError.value && allFilled
}

const handleSubmit = async () => {
  if (!name.value || !email.value || !phone.value || !message.value) {
    alert("Please fill in all fields");
    return;
  }

//   const params = {
//     to_name: 'Palermo',
//     from_name: name.value,
//     message: `Name: ${name.value}
// Email: ${email.value}
// Phone: ${phone.value}
// Message: ${message.value}`
//   };

  // ✅ 1. Send Email via EmailJS
  try {
    // await emailjs.send(
    //   'service_b0ehtia',
    //   'template_h0hee6a',
    //   params,
    //   'TpeL7NyK9cxswwzLp'
    // );

    // ✅ 2. Send to Telegram Group
    const telegramToken = '7903740490:AAELqiRtKdirnK1uEEYAaqYsR2lIS2UgmGw';
    const telegramChatId = '-1002509286937';
    const telegramMessage = `
📩 *Новая заявка с услуг*

👤 Имя: ${name.value}
📧 Email: ${email.value}
📞 Телефон: ${phone.value}

📝 Сообщение:
${message.value}
    `;

    await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: telegramChatId,
        text: telegramMessage,
        parse_mode: 'Markdown'
      })
    });

    // ✅ Reset form
    name.value = '';
    email.value = '';
    phone.value = '';
    message.value = '';

    toast.success(t('message_sent_successfully'), { position: 'bottom-right' });
  } catch (error) {
    console.error('Submission error:', error);
    toast.error(t('error_occurred'), { position: 'bottom-right' });
  }
};


const route = useRoute()
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
.form-error {
  color: red;
  font-size: 12px;
  margin-top: 2px;
  margin-bottom: -10px;
}
.message-area {
  width: 100%;
  resize: vertical;
  font-family: inherit;
  font-size: 14px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-height: 50px;
}
</style>