<template>
  <form>
    <form-group>
      <span-label>Selecciona el usuario a suscribir</span-label>
      <user-selector v-model="newSubscription.usuario" />
      <small-error v-if="errors.usuario">{{ errors.usuario[0]}}</small-error>
    </form-group>
    <form-group>
      <span-label>Selecciona la tarifa</span-label>
      <rate-selector v-model="newSubscription.tarifa" />
      <small-error v-if="errors.tarifa">
        {{ errors.tarifa[0] }}
      </small-error>
    </form-group>
    <form-group>
      <button-submit @button-submit="subscribeUserAsAdmin">
        Suscribir usuario
      </button-submit>
    </form-group>
  </form>
</template>

<script>
import axios from 'axios'
import { useGymStore } from '@/stores/gym.js'
import FormGroup from '@/components/forms/FormGroup.vue'
import SpanLabel from '@/components/forms/SpanLabel.vue'
import SmallError from '@/components/forms/SmallError.vue'
import { mapState } from 'pinia'
import { useValidationStore } from '@/stores/validation.js'
import RateSelector from '@/components/forms/inputs/RateSelector.vue'
import ButtonSubmit from '@/components/forms/ButtonSubmit.vue'
import UserSelector from '@/components/forms/inputs/UserSelector.vue'

export default {
  name: "AdminSubscribeUser",

  components: { UserSelector, ButtonSubmit, RateSelector, SmallError, SpanLabel, FormGroup },

  emits: ["newSubscriptionAsAdminCreated"],

  data() {
    return {
      newUsuario: "",
      newTarifa: "",

      newSubscription: {
        usuario: "",
        tarifa: ""
      }
    }
  },

  computed: {
    ...mapState(useValidationStore, {
      message: 'message',
      errors: 'errors'
    })
  },

  mounted() {
    console.log("Montado el adminsubscribe")
  },

  methods: {
    subscribeUserAsAdmin(){
      axios.post(import.meta.env.VITE_SERVICE_BASE_URL +
        "gimnasios/" + getSelectedGymId() + "/suscribir-usuario",
      this.newSubscription)
        .then(response => {
          this.$emit("newSubscriptionAsAdminCreated", response.data)
        })
        .catch(() => {})
    },

    userSelectedCallback(userSelected) {
      console.log("asdf")
      this.newUsuario = userSelected.id
    }
  }
}
</script>