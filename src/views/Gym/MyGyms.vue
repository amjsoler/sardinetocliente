<template>
    <h3 class="text-center text-2xl pt-6">
      {{ $t("myGyms.title")}}
    </h3>
    <section class="grid grid-cols-2 justify-end pt-6">
      <div @click="selectGym(gym.id)"
        v-for="gym in myGyms" v-bind:key="gym.id"
           class="relative overflow-hidden w-auto h-auto m-1 rounded-lg bg-gray-50 dark:bg-container-background-50 bg-blend-darken"
      >
        <h3 class="absolute bottom-0 w-full text-center text-2xl dark:text-gray-200">AmbittrollAmbittrollAmbittrollAmbittrollAmbittroll</h3>
        <img class="relative rounded-t-lg z-[-3] grayscale brightness-50" :src="gym.logo" alt="" />
      </div>
    </section>


</template>
<script>
import { mapWritableState } from 'pinia'
import axios from 'axios'
import { useGymStore } from '@/stores/gym.js'
import router from '@/router/index.js'

export default {
  name: "MyGyms",

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