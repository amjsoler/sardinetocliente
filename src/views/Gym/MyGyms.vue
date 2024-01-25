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
    //TODO Peticionar gimnasios del usuario
    //TODO Botón para añadir nuevo gimnasio
    //TODO
  }
}
</script>