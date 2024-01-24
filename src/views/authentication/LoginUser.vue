<template>
  <container-v-align-with-brand-head>
    <h1 class="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
      {{$t("LoginUser.title")}}
    </h1>
    <form class="space-y-5 md:space-y-6">
      <form-group>
        <span-label>{{$t("LoginUser.form.email")}}</span-label>
        <email-input v-model="nuevoUsuario.email" />
        <small-error v-if="errors.email">
          {{ errors.email[0] }}
        </small-error>
      </form-group>

      <form-group>
        <span-label>{{$t("LoginUser.form.password")}}</span-label>
        <password-input v-model="nuevoUsuario.password" />
        <small-error v-if="errors.password">
          {{ errors.password[0] }}
        </small-error>
      </form-group>

      <button-submit @button-submit="iniciarSesion">
        {{$t("LoginUser.form.btnsubmit")}}
      </button-submit>

      <p class="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
        {{ $t("LoginUser.form.noaccount") }}
        <link-standard :destination="{name: 'RegisterUser'}">
          {{ $t("LoginUser.form.registerlink") }}
        </link-standard>
      </p>

      <p class="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
        <link-standard :destination="{name: 'AccountRecovery'}">
          {{$t("LoginUser.form.passrememberlink")}}
        </link-standard>
      </p>
    </form>
  </container-v-align-with-brand-head>
</template>

<script>

import axios from "axios"
import { useValidationStore } from '@/stores/validation'
import { useUserStore } from '@/stores/user'
import SpanLabel from '@/components/forms/SpanLabel.vue'
import SmallError from '@/components/forms/SmallError.vue'
import ContainerVAlignWithBrandHead from '@/components/containers/ContainerVAlignWithBrandHead.vue'
import EmailInput from '@/components/forms/inputs/EmailInput.vue'
import FormGroup from '@/components/forms/FormGroup.vue'
import PasswordInput from '@/components/forms/inputs/PasswordInput.vue'
import ButtonSubmit from '@/components/forms/ButtonSubmit.vue'
import LinkStandard from '@/components/general/LinkStandard.vue'
import { mapState } from 'pinia'

export default {
  name: 'LoginUser',
  components: { LinkStandard, ButtonSubmit, PasswordInput, FormGroup, EmailInput, ContainerVAlignWithBrandHead, SmallError, SpanLabel },

  data() {
    return {
      nuevoUsuario: {
        email: "",
        password: ""
      }
    }
  },

  computed: {
    ...mapState(useValidationStore, {
      message:"message",
      errors:"errors"
    }),
    ...mapState(useUserStore, {
      user:"user"
    })
  },

  methods: {
    iniciarSesion(){
      //TODO: Variable de entorno para la url
      //TODO: Vaciar validación cuando sea 200 ok
      //TODO: Almacenar/actualizar el usuario en el store
      //TODO: Almacenar el user en el localstorage

      axios.post("http://192.167.1.107:8765/api/iniciar-sesion", this.nuevoUsuario)
      .then((response) => {
        const userStore = useUserStore()
        userStore.$patch(response.data)

      })
      .catch((error) => {
        console.log(error)
      })
    }
  }

}
</script>
