<template>
  <img class="bugg" loading="lazy" :src="iconSrc" alt="Img" />
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  inCart: Boolean,
});

const iconSrc = computed(() =>
  props.inCart
    ? new URL('@/assets/images/png/cart2.png', import.meta.url).href
    : new URL('@/assets/images/png/cart1.png', import.meta.url).href
);
</script>

