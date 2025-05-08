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

// ✅ Use a custom marker icon that works in production
const customIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
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

    // ✅ Use the custom icon
    marker.value = L.marker([lat, lng], { icon: customIcon }).addTo(map.value);
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
      // Remove postal code (5 or 6 digit numbers)
      const cleanedAddress = data.display_name.replace(/\b\d{5,6}\b/g, "").replace(/\s+,/g, ",").trim();

      selectAddress(cleanedAddress);
      marker.value.bindPopup(`📍 ${cleanedAddress}`).openPopup();
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

const route = useRoute();
useHead({
  link: [
    { rel: 'canonical', href: `https://palermo.divspan.uz/${route.path}` },
  ]
});
</script>

<style scoped>
#mappage,
#map {
  width: 100%;
  height: 100vh;
}
</style>
