<template>
  <div class="ios-time-picker">
    <div class="picker-column">
      <select v-model="hour">
        <option v-for="h in hours" :key="h" :value="h">{{ h }}</option>
      </select>
    </div>
    <div class="picker-column">
      <select v-model="minute">
        <option v-for="m in minutes" :key="m" :value="m">{{ m }}</option>
      </select>
    </div>
    <div class="picker-column">
      <select v-model="ampm">
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineEmits } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: String,
    default: '08:00 AM'
  }
})

const hour = ref('08')
const minute = ref('00')
const ampm = ref('AM')

const hours = Array.from({ length: 12 }, (_, i) =>
  String(i + 1).padStart(2, '0')
)
const minutes = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, '0')
)

watch([hour, minute, ampm], () => {
  emit('update:modelValue', `${hour.value}:${minute.value} ${ampm.value}`)
})

watch(
  () => props.modelValue,
  (newVal) => {
    const [time, meridian] = newVal.split(' ')
    const [h, m] = time.split(':')
    hour.value = h
    minute.value = m
    ampm.value = meridian
  },
  { immediate: true }
)
</script>

<style scoped>
.ios-time-picker {
  display: flex;
  justify-content: space-between;
  background-color: #1c1c1e;
  padding: 1rem;
  border-radius: 12px;
  color: white;
}
.picker-column {
  flex: 1;
  margin: 0 5px;
}
select {
  width: 100%;
  font-size: 20px;
  padding: 10px;
  border-radius: 10px;
  background: #2c2c2e;
  color: white;
  border: none;
  appearance: none;
  text-align-last: center;
  text-align: center;
}
</style>
