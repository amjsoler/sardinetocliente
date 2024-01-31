<template>
  {{ gymArticles }}
</template>

<script>
import axios from 'axios'
import { useGymStore } from '@/stores/gym.js'

export default {
  name: "GymArticles",

  data() {
    return {
      gymArticles: []
    }
  },

  mounted() {
    axios.get(import.meta.env.VITE_SERVICE_BASE_URL +
    "gimnasios/" + useGymStore().gymSelected.id+"/articulos")
      .then(response => {
        this.gymArticles = response.data
      })
      .catch(() => {

      })
  }
}
</script>