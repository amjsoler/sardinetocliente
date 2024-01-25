<template>
  <container-v-align-no-background>
    <h3 class="text-center">Mis gimnasios</h3>
    <section class="flex flex-row flex-wrap justify-center space-x-5 space-y-3">
      <div @click="selectGym(gym.id)"
        v-for="gym in myGyms" v-bind:key="gym.id"
           class="max-w-32 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800
      dark:border-gray-700"
      >
        <img class="rounded-t-lg" :src="gym.logo" alt="" />
        <h5 class="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
          {{ gym.nombre}}
        </h5>
      </div>
    </section>
  </container-v-align-no-background>


</template>
<script>
import { mapWritableState } from 'pinia'
import axios from 'axios'
import { useGymStore } from '@/stores/gym.js'
import ContainerVAlignNoBackground from '@/components/containers/ContainerVAlignNoBackground.vue'
import router from '@/router/index.js'

export default {
  name: "MyGyms",
  components: { ContainerVAlignNoBackground },

  computed: {
    ...mapWritableState(useGymStore, {
      myGyms: "myGyms",
      gymSelected: 'gymSelected'
    })
  },
  mounted() {
    axios.get(import.meta.env.VITE_SERVICE_BASE_URL+"gimnasios")
      .then(response => {
        useGymStore().saveMyGyms(response.data)
      })
  },

  methods: {
    selectGym(gymId){
      const auxSelectedGym = this.myGyms.filter(item => item.id === gymId)
      useGymStore().$patch({gymSelected: auxSelectedGym[0]})

      router.push({name:"GymClasses"})
    }
  }
}
</script>