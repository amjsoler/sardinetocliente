<template>
  <section class="pt-12">
    <div v-if="gymSelected" class="dark:bg-container-background mx-3 rounded-lg pt-4 overflow-y-auto max-h-dvh">
      <h2 class="text-center text-2xl">Clases disponibles</h2>

      <select class="block mx-auto my-2 bg-input-background">
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
    <div v-else-if="!myGyms || myGyms.length === 0">
      <section class="flex flex-col items-center text-">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-badge-up animate-bounce w-6 h-6" width="64" height="64" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 11v6l-5 -4l-5 4v-6l5 -4z" /></svg>
        <h4 class="text-center text-2xl ">Todavía no formas parte de ningún gimnasio</h4>
        <p><strong>Pide a tu entrenador que te invite a formar parte de la comunidad para poder comenzar a usar la app</strong></p>
        <small>También puedes crear tu propio gimnasio</small>
      </section>
    </div>
    <div v-else>
      Selecciona un gimnasio
    </div>
  </section>
  <class-visor v-model="viewingClass" @close-event="viewingClass = null" v-show="viewingClass"></class-visor>
</template>

<script>
import axios from 'axios'
import { useGymStore } from '@/stores/gym.js'
import { mapState } from 'pinia'
import HeartIcon from '@/components/icons/HeartIcon.vue'
import UsersIcon from '@/components/icons/UsersIcon.vue'
import ClassVisor from '@/components/classes/ClassVisor.vue'

export default {
  name: "GymClasses",
  components: { ClassVisor, UsersIcon, HeartIcon },

  data() {
    return {
      viewingClass:null
    }
  },
  computed: {
    ...mapState(useGymStore, {
      gymSelected: 'gymSelected',
      myGyms: 'myGyms'
    })
  },

  mounted() {
    const gymStore = useGymStore()
    axios.get(import.meta.env.VITE_SERVICE_BASE_URL+"gimnasios")
      .then(response => {
        useGymStore().saveMyGyms(response.data)
      })
  }
}
</script>