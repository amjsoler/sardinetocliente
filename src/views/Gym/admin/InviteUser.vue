<template>
  <form class="space-y-6">
    <form-group>
      <span-label>{{ $t("inviteUser.form.email") }}</span-label>
      <variable-input input-type="email" v-model="userToInvite.email" />
      <small-error field-name="email" />
    </form-group>
    <form-group>
      <button-submit processing-id="invite-user-submit" @button-submit="sendUserInvitation">
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
import { removeIdFromProcessing } from '@/helpers/Helpers.js'
import { useUserStore } from '@/stores/user.js'

export default {
  name: "InviteUser",

  components: { VariableInput, SmallError, ButtonSubmit, SpanLabel, FormGroup },

  data() {
    return {
      userToInvite: {
        email: ""
      }
    }
  },

  methods: {
    sendUserInvitation() {
      useUserStore().actionInviteUserToGym(this.userToInvite)

      //Quito el loading  del botón y reseteo el formulario
      removeIdFromProcessing("invite-user-submit")
      this.userToInvite = {
        email: ""
      }
    }
  }
}
</script>