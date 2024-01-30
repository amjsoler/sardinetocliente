<template>
  <header class="relative w-full flex flex-col items-center py-3 z-10">
    <p @click="toggleDropDownGyms"
      class="flex flex-row items-center cursor-pointer" data-dropdown-toggle="dropdownUsers" data-dropdown-placement="bottom">
      <span v-if="selectedGym">
        {{ selectedGym.nombre }}
      </span>
      <span v-else>
        Todavía no perteneces a ningún gimnasio
      </span>
      <span>
      <caret-down-filled width="20px" height="20px"></caret-down-filled>
      </span>
    </p>
    <admin-panel v-if="selectedGym && selectedGym.propietario === useUserStore().user.id" />
    <div v-show="dropDownGymsVisibility" class="absolute top-12 z-10 bg-white rounded-lg shadow w-60 dark:bg-input-background-400">
      <ul class="max-h-24 py-2 overflow-y-auto text-gray-700 dark:text-gray-200">
        <li v-for="(gym,index) in myGyms" v-bind:key="index">
          <p @click="selectGym(index)"
            class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">
            <img class="w-6 h-6 me-2 rounded-full" :src="gym.logo" :alt="$t('myGyms.altLogoGym')">
            {{ gym.nombre }}
          </p>
        </li>
      </ul>
      <router-link :to="{name: 'CreateGym'}" class="flex flex-row justify-center py-3">
        <square-plus />
        <span class="ml-2">{{ $t("myGyms.newGym") }}</span>
      </router-link>
    </div>
    <user-drop-down-menu />
  </header>
</template>
<script>
import CaretDownFilled from '@/components/icons/CaretDownFilled.vue'
import { mapState } from 'pinia'
import { useGymStore } from '@/stores/gym.js'
import SquarePlus from '@/components/icons/SquarePlus.vue'
import { useUserStore } from '@/stores/user.js'
import AdminPanel from '@/components/AdminPanel.vue'
import UserDropDownMenu from '@/components/UserDropdownMenu.vue'

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

  mounted() {
    console.log(this.$route)
  },
  methods: {
    useUserStore,
    toggleDropDownGyms() {
      this.dropDownGymsVisibility = !this.dropDownGymsVisibility;
    },

    selectGym(gymIndex) {
      useGymStore().$patch({
        gymSelected: this.myGyms[gymIndex]
      })
    }
  }
}
</script>