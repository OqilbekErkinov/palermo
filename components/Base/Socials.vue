<template>
  <div class="socials">
    <a target="_blank" :href="item.link" class="socials-item" v-for="item in footerData?.data?.data?.socials"
      :key="item.name">
      <img loading="lazy" :src="item.icon" alt="Icon">
    </a>
  </div>
</template>

<script lang="ts" setup>
const { footerData } = useFooter();
</script>