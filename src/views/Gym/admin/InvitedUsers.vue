<template>
  <div class="space-y-4 px-4 py-2">
    <block-section>
      <invite-user />
    </block-section>

    <block-section class="space-y-3" v-if="getSelectedGym().invitedUsers && getSelectedGym().invitedUsers.length !== 0">
      <search-filter :array-data="getSelectedGym().invitedUsers"
                     @search-performed="(filteredArray) => filteredData=filteredArray"
                      :search-fields="['name', 'email']"/>
      <article class="flex flex-col items-center justify-center flex-grow py-2 px-4 rounded-lg bg-input-background"
               v-for="user in filteredData" v-bind:key="user.id">
        <p>{{ user.name }}</p>
        <small>{{ user.email }}</small>

        <section v-if="!user.pivot.invitacion_aceptada" class="flex flex-row items-center mt-2 text-orange-100">
          <hourglass-icon class="w-4 h-4"></hourglass-icon>
          <span class="text-sm">{{ $t("invitedUsers.pendingInvite")}}</span>
          <mail-forward @click="resendInvitation(user.id)" class="text-primary-400 ml-3" />
        </section>
      </article>
    </block-section>
    <block-section v-else>
      <p class="flex flex-col items-center">
        <chevron-up-top-icon class="animate-bounce animate-duration-1000"/>
        {{ $t("invitedUsers.stillNoUsers")}}
        <small>{{ $t("invitedUsers.startInvitingUsers")}}</small>
      </p>
    </block-section>
  </div>
</template>

<script>
import axios from 'axios'
import InviteUser from '@/views/Gym/admin/InviteUser.vue'
import BlockSection from '@/components/containers/BlockSection.vue'
import HourglassIcon from '@/components/icons/HourglassIcon.vue'
import MailForward from '@/components/icons/MailForward.vue'
import { useGeneralStore } from '@/stores/general.js'
import ChevronUpTopIcon from '@/components/icons/ChevronUpTopIcon.vue'
import { useUserStore } from '@/stores/user.js'
import { getSelectedGym, getSelectedGymId } from '@/helpers/Helpers.js'
import SearchFilter from '@/components/general/SearchFilter.vue'

export default {
  name: "InvitedUsers",
  components: { SearchFilter, ChevronUpTopIcon, MailForward, HourglassIcon, BlockSection, InviteUser },

  data() {
    return {
      filteredData: []
    }
  },

  async mounted() {
    await useUserStore().actionGetInvitedUsers()
  },

  methods: {
    getSelectedGym,
    resendInvitation(userId){
      axios.get(import.meta.env.VITE_SERVICE_BASE_URL+"gimnasios/"+ getSelectedGymId() +"/reenviar-invitacion/"+userId)
        .then(() => {
          useGeneralStore().alert.message = this.$t("invitedUsers.resendok")
        })
        .catch(() => {
        })
    }
  }
}
</script>