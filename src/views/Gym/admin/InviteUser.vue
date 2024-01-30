<template>
  <form class="space-y-4">
    <form-group>
      <span-label>{{ $t("inviteUser.form.email") }}</span-label>
      <email-input v-model="UserToInvite.email" />
      <small-error v-if="errors.email">
        {{ errors.email[0]}}
      </small-error>
    </form-group>
    <form-group>
      <button-submit @button-submit="sendUserInvitation">
        {{ $t("inviteUser.form.submit") }}
      </button-submit>
    </form-group>
  </form>
</template>
<script>
import FormGroup from '@/components/forms/FormGroup.vue'
import SpanLabel from '@/components/forms/SpanLabel.vue'
import ButtonSubmit from '@/components/forms/ButtonSubmit.vue'
import EmailInput from '@/components/forms/inputs/EmailInput.vue'
import SmallError from '@/components/forms/SmallError.vue'
import { mapState } from 'pinia'
import { useValidationStore } from '@/stores/validation.js'
import { useGymStore } from '@/stores/gym.js'
import axios from 'axios'

export default {
  name: "InviteUser",
  components: { SmallError, EmailInput, ButtonSubmit, SpanLabel, FormGroup },

  emits: ["userInvited"],

  data() {
    return {
      UserToInvite: {
        email: ""
      }
    }
  },

  computed: {
    ...mapState(useValidationStore, {
      message: 'message',
      errors: 'errors'
    })
  },

  methods: {
    sendUserInvitation() {
      axios.post(import.meta.env.VITE_SERVICE_BASE_URL+
        "gimnasios/"+useGymStore().gymSelected.id+"/invitar-usuario",
        this.UserToInvite)
        .then((response) => {
          var userAux = response.data;
          userAux.pivot = {invitacion_aceptada: 0}

          this.$emit("userInvited", userAux)
          this.UserToInvite = {
            email: ""
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>