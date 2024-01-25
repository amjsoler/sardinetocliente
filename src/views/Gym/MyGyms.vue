<template>
  Mis gimnasios
</template>
<script>
import { useUserStore } from '@/stores/user.js'
import { mapState } from 'pinia'

export default {
  name: "MyGyms",

  computed: {
    ...mapState(useUserStore, {
      user: "user"
    })
  },
  mounted() {
    console.log("Entrando  a mygyms")
    console.log(this.user.access_token)
  }
}
</script>