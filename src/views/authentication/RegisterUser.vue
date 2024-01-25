<template>
  <container-v-align-with-brand-head>
    <h1 class="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
      {{$t("RegisterUser.title")}}
    </h1>
    <form class="space-y-5 md:space-y-6">
      <form-group>
        <span-label>{{$t("RegisterUser.form.name")}}</span-label>
        <email-input v-model="newUser.name" />
        <small-error v-if="errors.name">
          {{ errors.name[0] }}
        </small-error>
      </form-group>

      <form-group>
        <span-label>{{$t("RegisterUser.form.email")}}</span-label>
        <email-input v-model="newUser.email" />
        <small-error v-if="errors.email">
          {{ errors.email[0] }}
        </small-error>
      </form-group>

      <form-group>
        <span-label>{{$t("RegisterUser.form.password")}}</span-label>
        <password-input v-model="newUser.password" />
        <small-error v-if="errors.password">
          {{ errors.password[0] }}
        </small-error>
      </form-group>

      <form-group>
        <span-label>{{$t("RegisterUser.form.password_confirmation")}}</span-label>
        <password-input v-model="newUser.password_confirmation" />
        <small-error v-if="errors.password_confirmation">
          {{ errors.password_confirmation[0] }}
        </small-error>
      </form-group>

      <button-submit @button-submit="registrarUsuario">
        {{$t("RegisterUser.form.buttonSubmit")}}
      </button-submit>

    </form>
  </container-v-align-with-brand-head>
</template>

<script>

import axios from 'axios'
import SpanLabel from '@/components/forms/SpanLabel.vue'
import ContainerVAlignWithBrandHead from '@/components/containers/ContainerVAlignWithBrandHead.vue'
import PasswordInput from '@/components/forms/inputs/PasswordInput.vue'
import SmallError from '@/components/forms/SmallError.vue'
import FormGroup from '@/components/forms/FormGroup.vue'
import EmailInput from '@/components/forms/inputs/EmailInput.vue'
import ButtonSubmit from '@/components/forms/ButtonSubmit.vue'
import { mapState, mapWritableState } from 'pinia'
import { useValidationStore } from '@/stores/validation.js'
import { useUserStore } from '@/stores/user.js'
import router from '@/router/index.js'

export default {
  name: 'RegisterUser',
  components: {
    ButtonSubmit,
    EmailInput,
    FormGroup,
    SmallError,
    PasswordInput,
    ContainerVAlignWithBrandHead,
    SpanLabel
  },

  data() {
    return {
      newUser: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  },

  computed: {
    ...mapState(useValidationStore, {
      message:"message",
      errors:"errors"
    }),
    ...mapWritableState(useUserStore, {
      user:"user"
    })
  },

  methods: {
    registrarUsuario() {
      axios
        .post(import.meta.env.VITE_SERVICE_BASE_URL+'registrarse', this.newUser)
        .then((response) => {
          useUserStore().$patch({user: response.data})

          //TODO Muestro un alert informando del resultado de la operación
          console.log(this.$t("alerts.registerok"))

          //Redirijo a la ruta de verificación de cuenta tras el registro
          router.push({name: "AccountVerify"})
        })
    }
  }
}
</script>
