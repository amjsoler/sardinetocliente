<template>
  <div-v-align>
    <container-with-brand-head blur="true">
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
    </container-with-brand-head>
  </div-v-align>
</template>

<script>

import axios from "axios"
import { useValidationStore } from '@/stores/validation'
import { useUserStore } from '@/stores/user'
import {mapWritableState} from 'pinia'
import SpanLabel from '@/components/forms/SpanLabel.vue'
import SmallError from '@/components/forms/SmallError.vue'
import EmailInput from '@/components/forms/inputs/VariableInput.vue'
import FormGroup from '@/components/forms/FormGroup.vue'
import PasswordInput from '@/components/forms/inputs/PasswordInput.vue'
import ButtonSubmit from '@/components/forms/ButtonSubmit.vue'
import LinkStandard from '@/components/general/LinkStandard.vue'
import router from '@/router/index.js'
import DivVAlign from '@/components/containers/DivVAlign.vue'
import ContainerWithBrandHead from '@/components/containers/ContainerWithBrandHead.vue'
import TrainVideo from '@/components/containers/TrainVideo.vue'

export default {
  name: 'LoginUser',
  components: { TrainVideo, ContainerWithBrandHead, DivVAlign, LinkStandard, ButtonSubmit, PasswordInput, FormGroup, EmailInput, SmallError, SpanLabel },

  data() {
    return {
      nuevoUsuario: {
        email: "",
        password: ""
      }
    }
  },

  computed: {
    ...mapWritableState(useValidationStore, {
      message:"message",
      errors:"errors"
    }),
    ...mapWritableState(useUserStore, {
      user:"user"
    })
  },
  methods: {
    iniciarSesion(){
      axios.post(import.meta.env.VITE_SERVICE_BASE_URL+'iniciar-sesion', this.nuevoUsuario)
      .then((response) => {
        //Actualizo los datos de usuario
        useUserStore().$patch({user: response.data})

        router.push({name: "GymClasses"})
      })
        .catch((error) => {
          if(error.response.status === 462){
              this.message = this.$t("LoginUser.form.incorrectpassword")
              this.errors = {password: [this.$t("LoginUser.form.incorrectpassword")]}
          }
        })
    }
  }
}
</script>
