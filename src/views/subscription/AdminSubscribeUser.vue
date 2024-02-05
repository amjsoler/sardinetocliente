<template>
  <form>
    <form-group>
      <span-label>Selecciona la tarifa</span-label>
      <rate-selector @selected-rate="(selectedRate) => console.log(selectedRate)" />
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

export default {
  name: "AdminSubscribeUser",

  components: { ButtonSubmit, RateSelector, SmallError, SpanLabel, FormGroup },

  props: {
    userToSubscribe: {
      required: true
    }
  },

  emits: ["newSubscriptionAsAdminCreated"],

  data() {
    return {
      newSubscription: {
        usuario: this.userToSubscribe,
        tarifa: null
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
    subscribeUserAsAdmin(){
      axios.post(import.meta.env.VITE_SERVICE_BASE_URL +
        "gimnasios/" + useGymStore().gymSelected.id + "/suscribir-usuario",
      this.newSubscription)
        .then(response => {
          this.$emit("newSubscriptionAsAdminCreated", response.data)
        })
        .catch(() => {})
    }
  }
}
</script>