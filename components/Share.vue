<template>
  <div class="share-btn" :class="{ open: isShare }" @click="isShare = !isShare" id="shareBtn">
    <button aria-label="Button" class="share-icon main">
      <IconsShare />
    </button>
    <div class="social-icons">
      <button aria-label="Button" @click="shareOnTelegram"  class="share-icon">
        <IconsTelegram />
      </button>
      <button aria-label="Button" @click="shareOnTwitter"  class="share-icon">
        <IconsTwitter />
      </button>
      <button aria-label="Button" @click="shareOnFacebook" class="share-icon">
        <IconsFacebook />
      </button>
      <button aria-label="Button" @click="shareOnWhatsapp" class="share-icon">
        <IconsWhatsapp />
      </button>
      <button aria-label="Button" @click="copyToClipboard" class="share-icon">
        <IconsCopy />
      </button>
    </div>
  </div>
</template>

<script setup>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const isShare = ref(false);
const {t} = useI18n();

const props = defineProps({
  title: {
    type: String,
    default: 'Check this out!',
  }
})
const route = useRoute();
const shareOnTelegram = () => {
  const url = encodeURIComponent(`https://palermo.uz/${route.path}`)
  const text = encodeURIComponent(props.title);
 window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
}
const shareOnTwitter = () => {
  const url = encodeURIComponent(`https://palermo.uz/${route.path}`)
  const text = encodeURIComponent(props.title);
  window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
}
const shareOnFacebook = () => {
  const url = encodeURIComponent(`https://palermo.uz/${route.path}`)
  const text = encodeURIComponent(props.title);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank');
}
const shareOnWhatsapp = () => {
  const url = encodeURIComponent(`https://palermo.uz/${route.path}`)
  const text = encodeURIComponent(props.title);
  window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
};
const copyToClipboard = () => {
  navigator.clipboard.writeText(`https://palermo.uz${route.path}`);
  toast.success(t('copied'),
  { position: 'bottom-right' }
  );
}
</script>

<style scoped>
:global(.Toastify__toast-container--bottom-right) {
  margin-bottom: -1.5rem;
}
</style>