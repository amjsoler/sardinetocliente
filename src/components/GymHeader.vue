<template>
  <nav class="relative w-full h-12 flex flex-row z-20 justify-center items-center">
    <p class="absolute left-3">
      <admin-panel v-if="actionCheckIfUserHasAdminPower" />
    </p>
    <div class="flex flex-col items-center">
      <!-- TODO Componetizar el selector de gimnasio por si se utiliza en otro sitio -->
      <p class="relative flex flex-row items-center"
         id="dropdowngymbutton"
         data-dropdown-toggle="dropdowngyms"
      >
        <span v-if="selectedGym">
          {{ selectedGym.nombre }}
        </span>
          <span v-else>
         {{ $t("myGyms.selectGym") }}
        </span>
        <span class="absolute -right-4">
          <caret-down-filled width="14px" height="14px"></caret-down-filled>
        </span>
      </p>
      <div
           id="dropdowngyms"
           aria-labelledby="dropdowngymbutton"
           class="hidden absolute top-12 max-w-72 z-20 rounded-lg bg-container-background border border-input-background"
      >
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
              <p class="flex items-center px-4 py-2" @click="selectGym(index)">
                <img class="w-8 h-8 mr-4 rounded-full" :src="gym.logo" :alt="$t('myGyms.altLogoGym')">
                {{ gym.nombre }}
              </p>
            </li>
          </ul>
        </div>
        <div class="bg-input-background px-4 py-2">
          <router-link @click="clickOnDropdownMenu" :to="{name: 'CreateGym'}" class="flex flex-row justify-center space-x-2">
            <square-plus />
            <span>{{ $t("myGyms.newGym") }}</span>
          </router-link>
        </div>
      </div>
    </div>
    <p class="absolute right-3 h-8">
      <user-drop-down-menu />
    </p>
  </nav>
</template>
<script>
import CaretDownFilled from '@/components/icons/CaretDownFilled.vue'
import { mapActions, mapState } from 'pinia'
import { useGymStore } from '@/stores/gym.js'
import SquarePlus from '@/components/icons/SquarePlus.vue'
import AdminPanel from '@/components/AdminPanel.vue'
import UserDropDownMenu from '@/components/UserDropdownMenu.vue'
import { useUserStore } from '@/stores/user.js'

export default {
  name: "GymHeader",

  components: { UserDropDownMenu, AdminPanel, SquarePlus, CaretDownFilled },

  computed: {
    ...mapState(useGymStore, {
      selectedGym: 'gymSelected',
      myGyms: 'myGyms'
    }),
    ...mapActions(useGymStore, {
      actionCheckIfUserHasAdminPower:  'actionCheckIfUserHasAdminPower'
    })
  },

  mounted(){
    useGymStore().actionGetMyGyms()
  } ,

  methods: {
    useUserStore,
    selectGym(gymIndex) {
      this.clickOnDropdownMenu()
      useGymStore().$patch({
        gymSelected: this.myGyms[gymIndex]
      })
    },

    clickOnDropdownMenu() {
      document.getElementById("dropdowngymbutton").click()
    }
  }
}
</script>