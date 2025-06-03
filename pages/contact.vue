<template>
  <div class="contact">
    <header class="header">
      <div class="container">
        <h1 class="header-title">
          {{ $t('contact') }}
        </h1>
        <div class="header-in">
          <div class="header-content">
            <div class="header-content__bg"></div>
            <div class="card">
              <div class="card-item">
                <h3 class="card-item__title">
                  {{ footerData?.data?.data?.footer?.title_contact }}
                </h3>
                <p class="card-item__desc">
                  {{ footerData?.data?.data?.footer?.description_contact }}
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
      <div class="header-gradient"></div>
    </header>
    <section class="map">
      <div class="container">
        <div class="map-content" v-html="footerData?.data?.data?.footer?.map"></div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useHead } from '#imports'
import emailjs from 'emailjs-com'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'



const name = ref('')
const email = ref('')
const phone = ref('')
const message = ref('')

const nameError = ref('')
const emailError = ref('')
const phoneError = ref('')

const { t } = useI18n()
const route = useRoute()
const { footerData } = useFooter()

// ✅ Validation
const validateName = () => {
  const namePattern = /^[A-Za-z\u0400-\u04FF\s'-]+$/
  nameError.value = namePattern.test(name.value) ? '' : t('nameerror');
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
  if (!isFormValid()) {
    toast.error(t('fill_all_fields'), { position: 'bottom-right' })
    return
  }

  const params = {
    contact_name: name.value,
    contact_email: email.value,
    contact_phone: phone.value,
    contact_message: message.value
  }

  try {
    await emailjs.send('service_oxl7nhp', 'template_apbj5gi', params, 'C30GeIItXYu1hokzC')
    toast.success(t('message_sent_successfully'), { position: 'bottom-right' })

    // ✅ Send to Telegram
    const telegramToken = '7903740490:AAELqiRtKdirnK1uEEYAaqYsR2lIS2UgmGw'
    const telegramChatId = '-1002509286937'
    const telegramMessage = `
📬 *Новое сообщение контактной формы*

👤 Имя: ${name.value}
📧 Электронная почта: ${email.value}
📞 Телефон: ${phone.value}

📝 Сообщение:
${message.value}
`

    await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: telegramChatId,
        text: telegramMessage,
        parse_mode: 'Markdown'
      })
    })

    // ✅ Clear form after sending
    name.value = ''
    email.value = ''
    phone.value = ''
    message.value = ''
  } catch (error) {
    console.error('Submission error:', error)
    toast.error(t('error_occurred'), { position: 'bottom-right' })
  }
}

useHead({
  link: [{ rel: 'canonical', href: `https://palermo.uz${route.path}` }]
})
</script>


<style scoped>
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
:global(.Toastify__toast-container--bottom-right) {
  margin-bottom: -1.5rem;
}

</style>