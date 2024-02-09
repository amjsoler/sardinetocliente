<template>
  <select v-model="selectedRate" @change="$emit('update:modelValue', selectedRate)"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-e-lg
          border-s-gray-100 dark:border-s-gray-700 border-s-2 focus:ring-blue-500
          focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
          dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
          dark:focus:border-blue-500"
  >
    <option disabled value="">Selecciona una tarifa</option>
    <option v-for="rate in this.gymRates" v-bind:key="rate.id"
            :value="rate.id">
      {{ rate.nombre }} ({{ rate.tipo }})
    </option>
  </select>
</template>

<script>
import axios from 'axios'
import { getSelectedGymId } from '@/helpers/Helpers.js'

export default {
  name: "RateSelector",
  props: ["modelValue"],
  emits: ["update:modelValue"],

  data() {
    return {
      gymRates: [],
      selectedRate: ""
    }
  },

  mounted() {
    axios.get(import.meta.env.VITE_SERVICE_BASE_URL +
      "gimnasios/" + getSelectedGymId() + "/tarifas")
      .then(response => {
        this.gymRates = response.data
      })
      .catch(() => {})
  }
}
</script>