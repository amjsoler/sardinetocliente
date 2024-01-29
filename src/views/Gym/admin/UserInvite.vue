<template>
  <section>
    <ul>
      <li v-for="user in invitedUsers">{{ user }}</li>
    </ul>
  </section>
</template>

<script>
import axios from 'axios'
import { useGymStore } from '@/stores/gym.js'

export default {
  name: "UserInvite",

  data() {
    return {
      invitedUsers: []
    }
  },

  mounted() {
    axios.get(import.meta.env.VITE_SERVICE_BASE_URL+"gimnasios/"+useGymStore().gymSelected.id+"/usuarios-invitados")
      .then(response => {
        this.invitedUsers = response.data
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>