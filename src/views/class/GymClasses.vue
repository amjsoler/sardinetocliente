<template>

  <container-v-align-no-background>
    <h2 class="text-center">Clases disponibles</h2>
      <!--TODO tOGGLE PARA ELEGIR ENTRE CLASES DE HOY Y DE TODA LA SEMANA -->
    <p>TOGGLE PARA CAMBIAR ENTRE HOY Y CLASES DE LA SEMANA</p>

    <p>LISTADO DE CLASES CON CARDS, FONDO, HORA, PLAZAS</p>
      <article v-for="classe in gymSelected.classes" v-bind:key="classe.id">
        {{ classe.nombre}}
      </article>
  </container-v-align-no-background>
</template>

<script>
import axios from 'axios'
import { useGymStore } from '@/stores/gym.js'
import { mapState } from 'pinia'
import ContainerVAlignNoBackground from '@/components/containers/ContainerVAlignNoBackground.vue'

export default {
  name: "GymClasses",
  components: { ContainerVAlignNoBackground },

  computed: {
    ...mapState(useGymStore, {
      gymSelected: 'gymSelected'
    })
  },

  mounted() {
    const gymStore = useGymStore()

    axios.get(import.meta.env.VITE_SERVICE_BASE_URL+"gimnasios/"+gymStore.gymSelected.id+"/clases")
      .then(response => {
        gymStore.saveGymClassesGivenGymId(gymStore.gymSelected.id, response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>