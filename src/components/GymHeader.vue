<template>
  <header class="relative w-full flex flex-row justify-center py-3">
    <p class="absolute left-3">
        <!-- TODO: Devolver en el array de gimnasios un campo que diga si el user tiene permisos o no -->
      <admin-panel
      v-if="selectedGym && selectedGym.propietario === useUserStore().user.id" /></p>
    <div class="flex flex-col items-center">
      <!-- TODO Componetizar el selector de gimnasio por si se utiliza en otro sitio -->
      <p @click="this.dropDownGymsVisibility = !this.dropDownGymsVisibility;"
         class="flex flex-row items-center"
      >
        <span v-if="selectedGym">
          {{ selectedGym.nombre }}
        </span>
          <span v-else>
         {{ $t("myGyms.selectGym") }}
        </span>
          <span class="ml-1">
        <caret-down-filled width="14px" height="14px"></caret-down-filled>
        </span>
      </p>
      <!-- TODO Animar esto con un drop down -->
      <div v-show="dropDownGymsVisibility" class="absolute top-12 max-w-72 rounded-lg bg-container-background border border-input-background">
        <div class="px-4 py-2 flex flex-row justify-center items-center">
          <p v-if="!myGyms || (myGyms && myGyms.length === 0)"
             class="text-center"
          >
           {{ $t("myGyms.noBelongsToGym") }}
          </p>
          <ul v-else
              class="px-4 py-2"
          >
            <li v-for="(gym,index) in myGyms" v-bind:key="index">
              <p @click="selectGym(index)"
                 class="flex items-center px-4 py-2">
                <img class="w-8 h-8 mr-4 rounded-full" :src="gym.logo" :alt="$t('myGyms.altLogoGym')">
                {{ gym.nombre }}
              </p>
            </li>
          </ul>
        </div>
        <div class="bg-input-background px-4 py-2">
          <router-link :to="{name: 'CreateGym'}" class="flex flex-row justify-center space-x-2">
            <square-plus />
            <span>{{ $t("myGyms.newGym") }}</span>
          </router-link>
        </div>
      </div>
    </div>
    <user-drop-down-menu />
  </header>
</template>
<script>
import CaretDownFilled from '@/components/icons/CaretDownFilled.vue'
import { mapState } from 'pinia'
import { useGymStore } from '@/stores/gym.js'
import SquarePlus from '@/components/icons/SquarePlus.vue'
import AdminPanel from '@/components/AdminPanel.vue'
import UserDropDownMenu from '@/components/UserDropdownMenu.vue'
import { useUserStore } from '@/stores/user.js'

export default {
  name: "GymHeader",

  components: { UserDropDownMenu, AdminPanel, SquarePlus, CaretDownFilled },

  data() {
    return {
      dropDownGymsVisibility: false,
    }
  },
  computed: {
    ...mapState(useGymStore, {
      selectedGym: 'gymSelected',
      myGyms: 'myGyms'
    })
  },

  mounted(){
    useGymStore().actionGetMyGyms()
  } ,

  methods: {
    useUserStore,
    selectGym(gymIndex) {
      useGymStore().$patch({
        gymSelected: this.myGyms[gymIndex]
      })
    }
  }
}
</script>