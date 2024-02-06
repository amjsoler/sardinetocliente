<template>
  <div-v-align>
    <container-with-brand-head blur="true">
      <h1 class="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        {{$t("RegisterUser.title")}}
      </h1>
      <form class="space-y-5 md:space-y-6">
        <form-group>
          <span-label>{{$t("RegisterUser.form.name")}}</span-label>
          <email-input autofocus v-model="newUser.name" />
          <small-error field-name="name" />
        </form-group>

        <form-group>
          <span-label>{{$t("RegisterUser.form.email")}}</span-label>
          <email-input v-model="newUser.email" />
          <small-error field-name="email" />
        </form-group>

        <form-group>
          <span-label>{{$t("RegisterUser.form.password")}}</span-label>
          <password-input v-model="newUser.password" />
          <small-error field-name="password" />
        </form-group>

        <form-group>
          <span-label>{{$t("RegisterUser.form.password_confirmation")}}</span-label>
          <password-input v-model="newUser.password_confirmation" />
          <small-error field-name="password_confirmation" />
        </form-group>

        <button-submit processing-id="register-button" @button-submit="registrarUsuario">
          {{$t("RegisterUser.form.buttonSubmit")}}
        </button-submit>

      </form>
    </container-with-brand-head>
  </div-v-align>
</template>

<script>

import SpanLabel from '@/components/forms/SpanLabel.vue'
import PasswordInput from '@/components/forms/inputs/PasswordInput.vue'
import SmallError from '@/components/forms/SmallError.vue'
import FormGroup from '@/components/forms/FormGroup.vue'
import EmailInput from '@/components/forms/inputs/EmailInput.vue'
import ButtonSubmit from '@/components/forms/ButtonSubmit.vue'
import { useUserStore } from '@/stores/user.js'
import router from '@/router/index.js'
import ContainerWithBrandHead from '@/components/containers/ContainerWithBrandHead.vue'
import DivVAlign from '@/components/containers/DivVAlign.vue'
import { useGeneralStore } from '@/stores/general.js'

export default {
  name: 'RegisterUser',
  components: {
    DivVAlign,
    ContainerWithBrandHead,
    ButtonSubmit,
    EmailInput,
    FormGroup,
    SmallError,
    PasswordInput,
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

  methods: {
    async registrarUsuario() {
      if(await useUserStore().actionRegister(this.newUser)){

        useGeneralStore().showAlert(
          this.$t("RegisterUser.alertOk"),
          "success"
        )

        router.push({name: "GymClasses"})
      }
    }
  }
}
</script>
