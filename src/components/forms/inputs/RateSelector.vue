<template>
  <select v-model="selectedRate" @change="$emit('selectedRate', selectedRate)">
    <option v-for="rate in this.gymRates" v-bind:key="rate.id"
            :value="rate.id">
      {{ rate.nombre }} ({{ rate.tipo }})
    </option>
  </select>
</template>

<script>
import axios from 'axios'
import { useGymStore } from '@/stores/gym.js'

export default {
  name: "RateSelector",

  emits: ["selectedRate"],

  data() {
    return {
      gymRates: [],
      selectedRate: null
    }
  },

  mounted() {
    axios.get(import.meta.env.VITE_SERVICE_BASE_URL +
      "gimnasios/" + useGymStore().gymSelected.id + "/tarifas")
      .then(response => {
        this.gymRates = response.data
      })
      .catch(() => {})
  }
}
</script>