<template>
  <div class="mappage">
    <div id="map" ref="mapContainer"></div>
    <NuxtLink :to="localePath('/order')" class="mappage-btn">
      {{ $t('confirm') }}
    </NuxtLink>
  </div>
</template>

<script setup>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
const mapContainer = ref(null);
const localePath = useLocalePath();
const map = ref(null);
const marker = ref(null);
const selectedAddress = useSelectedAddress();
const selectedRegion = useSelectedRegion();
const isLoader = useLoader();
definePageMeta({
  layout: "map",
});
onMounted(() => {
  map.value = L.map(mapContainer.value).setView(selectedRegion.value.coordinates, 12);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map.value);

  map.value.on("click", async (e) => {
    const { lat, lng } = e.latlng;
    getAddress(lat, lng);

    if (marker.value) {
      map.value.removeLayer(marker.value);
    }

    marker.value = L.marker([lat, lng]).addTo(map.value);
  });
  isLoader.value = false;
});

async function getAddress(lat, lng) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=ru`
    );
    const data = await response.json();

    if (data.display_name) {
      selectAddress(data.display_name);

      marker.value.bindPopup(`📍 ${data.display_name}`).openPopup();
    } else {
      console.log("Manzil topilmadi");
    }
  } catch (error) {
    console.error("Manzilni olishda xatolik:", error);
  }
}

function selectAddress(address) {
  selectedAddress.value = address;
}

const route = useRoute()
useHead({
  link: [
    { rel: 'canonical', href: `https://palermo.divspan.uz/${route.path}` },
  ]
})
</script>

<style scoped></style>
