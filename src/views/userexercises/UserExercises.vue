<template>
{{weightScores}}
</template>

<script>
import axios from 'axios'
import { useGymStore } from '@/stores/gym.js'

export default {
  name: "UserExercises",

  data() {
    return {
      weightScores: []
    }
  },

  mounted(){
    axios.get(import.meta.env.VITE_SERVICE_BASE_URL +
    "gimnasios/"+useGymStore().gymSelected.id+"/registros-de-peso")
      .then(response => {
        this.weightScores = response.data
      })
  },
  methods: {

  }
}
</script>