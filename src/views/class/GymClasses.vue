<template>
  <section class="pt-12">
    <gym-header></gym-header>
    <div class="dark:bg-container-background-50 mx-3 rounded-lg pt-4">
      <h2 class="text-center text-2xl">Clases disponibles</h2>

      <select class="block mx-auto my-2 bg-input-background-400">
        <option>Hoy</option>
        <option>Mañana</option>
        <option>Pasado</option>
      </select>

      <div class="flex flex-row flex-wrap">
        <article @click="viewingClass = classe"
          class=" cursor-pointer overflow-hidden relative size-24 bg-red-600 gap-4 rounded-lg flex-grow m-3 px-3 py-2 flex flex-col items-center"
                 v-for="classe in gymSelected.classes" v-bind:key="classe.id"
        >
          <p class="text-3xl mt-1">{{ new Date(classe.fechayhora).getHours() }}:{{ new Date(classe.fechayhora).getMinutes() }}h</p>
          <heart-icon width="100px" height="100px" class="absolute bottom-[-40px] right-[-30px] text-gray-200" />
          <p class="absolute left-3 bottom-2 text-lg flex flex-row ">
            5/10
            <span><users-icon /></span>
          </p>
        </article>
      </div>
    </div>
  </section>
  <class-visor v-model="viewingClass" @close-event="viewingClass = null" v-show="viewingClass"></class-visor>
</template>

<script>
import axios from 'axios'
import { useGymStore } from '@/stores/gym.js'
import { mapState } from 'pinia'
import GymHeader from '@/components/GymHeader.vue'
import HeartIcon from '@/components/icons/HeartIcon.vue'
import UsersIcon from '@/components/icons/UsersIcon.vue'
import ClassVisor from '@/components/classes/ClassVisor.vue'

export default {
  name: "GymClasses",
  components: { ClassVisor, UsersIcon, HeartIcon, GymHeader },

  data() {
    return {
      viewingClass:null
    }
  },
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