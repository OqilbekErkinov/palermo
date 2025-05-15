<template>
  <div class="order">
    <div class="container">
      <h2 class="order-title">{{ $t('order_title') }}</h2>
      <p class="order-text" v-if="selectedProducts.length > 0">{{ $t('order_text') }}</p>
      <div class="order-wrapper" v-if="selectedProducts.length > 0">
        <form @submit.prevent="handleSubmit" class="order-form order-card">
          <!-- City Selection -->
          <div class="order-form__item">
            <label>{{ $t('order_city_title') }}</label>
            <div class="select">
              <div class="select-head" @click="isOpenCitys = !isOpenCitys" style="margin-top: 0.8rem">
                <div class="select-head__left">
                  <IconsLocation />
                  {{ selectedRegion.name }}
                </div>
                <div class="select-head__right">
                  <IconsArrowDown />
                </div>
              </div>
              <div class="select-body" :class="{ active: isOpenCitys }">
                <div class="select-body__item" v-for="item in regions" :key="item.name"
                  @click="isOpenCitys = false, selectedRegion = item">
                  {{ item.name }}
                </div>
              </div>
            </div>
          </div>

          <!-- Address -->
          <div class="order-form__item">
            <p>{{ $t('order_address_title') }}</p>
            <span>{{ $t('order_address_text') }}</span>
            <NuxtLink :to="localePath('/map')" class="order-form__map"
              :style="{ border: isAddressError ? '1px solid red' : '1px solid transparent' }">
              <span v-if="selectedAddress">{{ selectedAddress }}</span>
              <span v-else>{{ $t('order_address_text2') }}</span>
            </NuxtLink>
          </div>

          <!-- Delivery Date with Calendar -->
          <div class="order-form__item">
            <label style="margin-bottom: 0.7rem">{{ $t('order_date_title') }}</label>
            <div class="datepicker-wrapper datepicker">
              <Datepicker v-model="selectedDate" :locale="locale.value" :monday-first="true" :min-date="new Date()"
                auto-apply hide-input-icon :format="formatDate" input-class="custom-date-input"
                calendar-class="custom-calendar" menu-class="dp-menu-styled" />
            </div>
          </div>

          <!-- User Info -->
          <div class="order-form__item">
            <label style="margin-bottom: 0.7rem">{{ $t('order_recipient_title') }}</label>
            <div class="order-form__item--bg">
              <div>
                <input style="width: 100%;" v-model="userData.name" required type="text" :placeholder="$t('your_name')"
                  @input="validateName" />
                <p v-if="nameError" class="form-error">{{ nameError }}</p>
              </div>
              <div>
                <input style="width: 100%;" v-model="userData.surname" required type="text"
                  :placeholder="$t('your_surname')" @input="validateSurname" />
                <p v-if="surnameError" class="form-error">{{ surnameError }}</p>
              </div>
              <div>
                <input style="width: 100%;" v-model="userData.phone" required type="text"
                  :placeholder="$t('your_phone')" @input="validatePhone" />
                <p v-if="phoneError" class="form-error">{{ phoneError }}</p>
              </div>
            </div>
          </div>

          <!-- Payment -->
          <div class="order-form__item">
            <label>{{ $t('order_payment_title') }}</label>
            <div class="order-form__payment order-form__item--bg mt-8">
              <input v-model="userData.payment" value="payment2" required type="radio" name="payment" id="payment2" />
              <label style="text-align: center" for="payment2" class="order-form__payment--info">
                <h3>{{ $t('order_payment_text3') }}</h3>
              </label>
            </div>
          </div>

          <!-- Total and Submit -->
          <div class="order-form__item">
            <h1 class="order-form__sum">{{ $t('order_sum') }} <span>{{ sum }} {{ $t('sum') }}</span></h1>
            <div class="order-form__wrapper">
              <BaseButton>{{ $t('order_button') }}</BaseButton>
              <div class="order-form__arrow">
                <BasePointerTop :translate="'-15px'" :bg="'black'" :size="'100%'" />
              </div>
            </div>
          </div>
        </form>

        <!-- Product Items -->
        <div class="order-items order-card">
          <div class="card order-card" v-for="item in selectedProducts" :key="item">
            <div class="card-cancel" @click="removeProduct(item)">
              <IconsCancel />
            </div>
            <div class="card-img">
              <img loading="lazy" :src="item.main_image" alt="img" />
            </div>
            <div class="card-info">
              <div class="card-name">
                <h3>{{ item.name }}</h3>
              </div>
              <span class="card-quantity">{{ $t('quantity') }}</span>
              <div class="card-count">
                <button class="card-count__item" @click="decrement(item)">-</button>
                <button class="card-count__number">{{ item.quantity }}</button>
                <button class="card-count__item" @click="increment(item)">+</button>
              </div>
              <h2 class="card-price">{{ item.discount_price }} <span>{{ $t('sum') }}</span></h2>
            </div>
          </div>
        </div>
      </div>
      <h1 class="order-empty" v-else>{{ $t('list_empty') }}</h1>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { useI18n } from 'vue-i18n'
import { useCartStore } from '~/store/addToCart'
import emailjs from 'emailjs-com'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const selectedDate = ref(new Date())
const formatDisplayDate = (date) => {
  const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
  return `${date.getDate()}-${months[date.getMonth()]}`
}
const formatDate = (date) => `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`

const { t } = useI18n()
const localePath = useLocalePath()
const { locale } = useI18n()
const route = useRoute()
const isOpenCitys = ref(false)
const isAddressError = ref(false)
const selectedProducts = ref([])
const store = useCartStore()

const userData = useUserData()
const selectedRegion = useSelectedRegion()
const selectedAddress = useSelectedAddress()

const nameError = ref('')
const surnameError = ref('')
const phoneError = ref('')

function validateName() {
  const regex = /^[A-Za-zА-Яа-яЁё\s'-]+$/
  nameError.value = regex.test(userData.value.name) ? '' : t('letters only')
}
function validateSurname() {
  const regex = /^[A-Za-zА-Яа-яЁё\s'-]+$/
  surnameError.value = regex.test(userData.value.surname) ? '' : t('letters only')
}
function validatePhone() {
  const regex = /^\+998\d{9}$/
  phoneError.value = regex.test(userData.value.phone) ? '' : t('phone format is wrong')
}

if (process.client) {
  selectedProducts.value = localStorage.getItem('selectedProducts') 
    ? JSON.parse(localStorage.getItem('selectedProducts')) 
    : []
  userData.value.name = localStorage.getItem('order_name') || ''
  userData.value.surname = localStorage.getItem('order_surname') || ''
  userData.value.phone = localStorage.getItem('order_phone') || ''
}

watch(() => userData.value.name, val => localStorage.setItem('order_name', val))
watch(() => userData.value.surname, val => localStorage.setItem('order_surname', val))
watch(() => userData.value.phone, val => localStorage.setItem('order_phone', val))

const regionsAll = [
  { name: { en: 'Tashkent', ru: 'Ташкент' }, value: 'toshkent', coordinates: [41.2995, 69.2401] },
]
const regions = computed(() =>
  regionsAll.map(region => ({
    ...region,
    name: region.name[locale.value] || region.name.ru,
  }))
)

const sum = computed(() =>
  selectedProducts.value.reduce((total, product) => total + product.discount_price * product.quantity, 0)
)

onMounted(() => {
  selectedRegion.value = regions.value[0]
})

async function handleSubmit() {
  validateName()
  validateSurname()
  validatePhone()

  if (nameError.value || surnameError.value || phoneError.value) {
    toast.error(t('fill_all_fields'), { position: 'bottom-right' })
    return
  }

  if (!selectedAddress.value) {
    isAddressError.value = true
    window.scrollTo(0, 0)
    return
  }

  if (userData.value.payment === 'payment1') return

  const params = {
    your_name: userData.value.name,
    your_surname: userData.value.surname,
    your_phone: userData.value.phone,
    selectedAddress: selectedAddress.value,
    selectedDay: formatDate(selectedDate.value),
    order_payment_text3: t('order_payment_text3'),
    sum: sum.value.toString(),
    products: selectedProducts.value.map(p => ({
      image: p.main_image,
      name: p.name,
      quantity: p.quantity,
      price: p.discount_price,
    })),
  }

  // SEND EMAIL
  try {
    await emailjs.send('service_oxl7nhp', 'template_tkzpai1', params, 'C30GeIItXYu1hokzC')
    toast.success(t('data_sent_successfully'), { position: 'bottom-right' })
  } catch (error) {
    console.error('EmailJS error:', error)
    toast.error(t('Failed to send order email.'), { position: 'bottom-right' })
    return
  }

  // SEND TELEGRAM
  try {
    const telegramToken = '7903740490:AAELqiRtKdirnK1uEEYAaqYsR2lIS2UgmGw'
    const telegramChatId = '-1002509286937'
    const encodedAddress = encodeURIComponent(selectedAddress.value)
    const message = `
📦 *Получен новый заказ*

👤 Имя: ${userData.value.name} ${userData.value.surname}
📞 Телефон: ${userData.value.phone}

🛒 *Продукты:*
${selectedProducts.value.map(p => `- ${p.name} (x${p.quantity}) – ${p.discount_price} ${t('sum')}`).join('\n')}

📅 Дата: ${formatDate(selectedDate.value)}
💳 Оплата: ${t('order_payment_text3')}
🧾 Cумма: ${sum.value} ${t('sum')}
📍 Адрес: ${selectedAddress.value}
🗺️ [Открыть в Яндекс.Картах]( https://yandex.com/maps/?text=${encodedAddress})
    `
    await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: telegramChatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    })
  } catch (err) {
    console.error('Telegram error:', err)
    toast.error(t('Failed to send Telegram message.'), { position: 'bottom-right' })
  }

  // ✅ Clear cart and form
  selectedProducts.value = []
  localStorage.setItem('selectedProducts', JSON.stringify([]))
  localStorage.setItem('cartItems', JSON.stringify([]))
  store.cartItems = []

  userData.value = { name: '', surname: '', phone: '', payment: '' }
  selectedRegion.value = { name: 'Ташкент', value: 'toshkent', coordinates: [41.2995, 69.2401] }
  selectedAddress.value = ''
  window.scrollTo(0, 0)
}

function increment(item) {
  item.quantity++
  const selectedProduct = selectedProducts.value.find(p => p.slug === item.slug)
  if (selectedProduct) selectedProduct.quantity = item.quantity
  localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts.value))
}

function decrement(item) {
  if (item.quantity > 1) {
    item.quantity--
    const selectedProduct = selectedProducts.value.find(p => p.slug === item.slug)
    if (selectedProduct) selectedProduct.quantity = item.quantity
    localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts.value))
  }
}

function removeProduct(item) {
  selectedProducts.value = selectedProducts.value.filter(product => product !== item)
  store.cartItems = store.cartItems.filter(slug => slug !== item.slug)
  localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts.value))
  localStorage.setItem('cartItems', JSON.stringify(store.cartItems))
}

useHead({
  link: [{ rel: 'canonical', href: `https://palermo.uz/${route.path}` }],
})
</script>


<style scoped>
.form-error {
  color: red;
  font-size: 12px;
  margin-top: 2px;
  margin-bottom: -10px;
}

.datepicker {
  background: rgba(14, 14, 14, 0.231372549);
    border-radius: 30px;
    padding: 5px 16px;
    border-bottom: none !important;
}

.custom-date-input {
  background: transparent;
  border: none;
  color: white;
  font-size: 16px;
  width: 100%;
}
:deep(.dp__input) {
  border-bottom: none !important;
  font-size: 24px
}

:deep(.dp-menu-styled) {
  background-color: #3a3a3a !important;
  border-radius: 12px !important;
  border-bottom: none !important;
  padding: 1rem !important;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  width: 280px !important;
  font-family: 'Inter', sans-serif;
  color: white;
}

:deep(.dp__calendar_header),
:deep(.dp__month_year_wrap),
:deep(.dp__cell_inner),
:deep(.dp__icon),
:deep(.dp__action_buttons) {
  color: white !important;
}

:deep(.dp__cell_inner) {
  border-radius: 8px;
  padding: 0.5rem 0.7rem;
  transition: background 0.2s;
}

:deep(.dp__cell_inner:hover),
:deep(.dp__active_date) {
  background-color: #6E6B69 !important;
  color: white !important;
  border-radius: 50%;
  border: none;
}
:deep(.dp__calendar_header_item):hover {
  background-color: #6E6B69 !important;
  color: white !important;
  border-radius: 50%;
  border: none;
}
:deep(.dp__month_year_select) {
  color: white !important;
}
:deep(.dp__menu_index),
:deep(.dp__overlay) {
  background-color: #5A5754 !important;
  border: none !important;
}

:deep(.dp__menu_index){
  margin-left: -9rem !important;
  margin-top: 0rem !important;
  border-radius: 15px;
}


:deep(.dp__month_year_select):hover {
  background-color: #6E6B69 !important;
}
:deep(.dp__button_bottom):hover {
  background-color: #5A5754 !important;
}
:deep(.dp__arrow_top),
:deep(.dp__arrow_bottom){
  display: none;
}

:global(.Toastify__toast-container--bottom-right) {
  margin-bottom: -1.5rem;
}
</style>
