<template>
  <span :class="myClass" class="pointer-top"
    :style="{ transform: `translateX(${props.translate})`, width: props.size, height: props.size }">
    <IconsPointerTop />
  </span>
</template>

<script lang="ts" setup>
const props = defineProps(['translate', 'bg', 'size'])

const myClass = computed(() => {
  switch (props.bg) {
    case 'white':
      return 'white--pointer'
    case 'black':
      return 'black--pointer'
    case 'blur':
      return 'blur--pointer'
    default:
      return ''
  }
})
</script>