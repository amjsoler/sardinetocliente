<template>
  <div class="space-y-4 px-4">
    <block-section>
      <invite-user @user-invited="userInvitedCallback" />
    </block-section>

    <block-section class="space-y-3" v-if="invitedUsers && invitedUsers.length !== 0">
      <email-input v-model="filterToApply" :placeholder="$t('invitedUsers.filterinputplaceholder')"></email-input>
      <div class="flex flex-row flex-wrap gap-3">
        <article class="flex flex-col items-center justify-center flex-grow p-2 rounded-lg bg-input-background"
                 v-for="user in filteredInvitedUsers" v-bind:key="user.id">
          <p>{{ user.name }}</p>
          <p>{{ user.email }}</p>

          <section v-if="!user.pivot.invitacion_aceptada" class="flex flex-row items-center mt-2 text-orange-100">
            <hourglass-icon class="w-4 h-4"></hourglass-icon>
            <span class="text-sm">{{ $t("invitedUsers.pendingInvite")}}</span>
            <mail-forward @click="resendInvitation(user.id)" class="text-primary-400 ml-3" />
          </section>
        </article>
      </div>
    </block-section>
    <block-section>
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
import { useGymStore } from '@/stores/gym.js'
import InviteUser from '@/views/Gym/admin/InviteUser.vue'
import BlockSection from '@/components/containers/BlockSection.vue'
import HourglassIcon from '@/components/icons/HourglassIcon.vue'
import EmailInput from '@/components/forms/inputs/VariableInput.vue'
import MailForward from '@/components/icons/MailForward.vue'
import { useGeneralStore } from '@/stores/general.js'
import ChevronUpTopIcon from '@/components/icons/ChevronUpTopIcon.vue'
import { API } from '@/services/index.js'

export default {
  name: "InvitedUsers",
  components: { ChevronUpTopIcon, MailForward, EmailInput, HourglassIcon, BlockSection, InviteUser },

  data() {
    return {
      filterToApply: "",
      invitedUsers: []
    }
  },

  computed: {
    filteredInvitedUsers() {
      if(this.filterToApply){
        return this.invitedUsers.filter(item => item.name.toLowerCase().includes(this.filterToApply.toLowerCase()) || item.email.toLowerCase().includes(this.filterToApply.toLowerCase()))
      }else{
        return this.invitedUsers
      }
    }
  },

  async mounted() {
    const response = await API.gimnasios.getInvitedUsers();

    this.invitedUsers = response.data
  },

  methods: {
    userInvitedCallback(newUser){
      this.invitedUsers.unshift(newUser)
    },

    resendInvitation(userId){
      axios.get(import.meta.env.VITE_SERVICE_BASE_URL+"gimnasios/"+useGymStore().gymSelected.id+"/reenviar-invitacion/"+userId)
        .then(() => {
          useGeneralStore().alert.message = this.$t("invitedUsers.resendok")
        })
        .catch(() => {
        })
    }
  }
}
</script>