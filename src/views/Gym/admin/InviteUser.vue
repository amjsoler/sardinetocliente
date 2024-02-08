<template>
  <form class="space-y-4">
    <form-group>
      <span-label>{{ $t("inviteUser.form.email") }}</span-label>
      <variable-input input-type="email" v-model="UserToInvite.email" />
      <small-error field-name="email" />
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
import SmallError from '@/components/forms/SmallError.vue'
import VariableInput from '@/components/forms/inputs/VariableInput.vue'
import { API } from '@/services/index.js'

export default {
  name: "InviteUser",
  components: { VariableInput, SmallError, ButtonSubmit, SpanLabel, FormGroup },

  emits: ["userInvited"],

  data() {
    return {
      UserToInvite: {
        email: ""
      }
    }
  },

  methods: {
    sendUserInvitation() {
        const response = API.gimnasios.inviteUserToGym(this.UserToInvite)
        const userAux = response.data;
        console.log(userAux)
        userAux.pivot = {invitacion_aceptada: 0}

        this.$emit("userInvited", userAux)
        this.UserToInvite = {
          email: ""
        }
    }
  }
}
</script>