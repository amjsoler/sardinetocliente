<template>
  <div-v-align>
    <container-with-brand-head blur="true">
      <h1 class="text-lg text-center font-bold dark:text-white">
        {{$t("RegisterUser.title")}}
      </h1>
      <form class="space-y-6">
        <form-group>
          <span-label>{{$t("RegisterUser.form.name")}}</span-label>
          <variable-input type="text" autofocus v-model="newUser.name" />
          <small-error field-name="name" />
        </form-group>

        <form-group>
          <span-label>{{$t("RegisterUser.form.email")}}</span-label>
          <variable-input type="email" v-model="newUser.email" />
          <small-error field-name="email" />
        </form-group>

        <form-group>
          <span-label>{{$t("RegisterUser.form.password")}}</span-label>
          <variable-input type="password" v-model="newUser.password" />
          <small-error field-name="password" />
        </form-group>

        <form-group>
          <span-label>{{$t("RegisterUser.form.password_confirmation")}}</span-label>
          <variable-input type="password" v-model="newUser.password_confirmation" />
          <small-error field-name="password_confirmation" />
        </form-group>

        <button-submit processing-id="register-form-button" @button-submit="registrarUsuario">
          {{$t("RegisterUser.form.buttonSubmit")}}
        </button-submit>
      </form>
    </container-with-brand-head>
  </div-v-align>
</template>

<script>

import SpanLabel from '@/components/forms/SpanLabel.vue'
import SmallError from '@/components/forms/SmallError.vue'
import FormGroup from '@/components/forms/FormGroup.vue'
import ButtonSubmit from '@/components/forms/ButtonSubmit.vue'
import { useUserStore } from '@/stores/user.js'
import router from '@/router/index.js'
import ContainerWithBrandHead from '@/components/containers/ContainerWithBrandHead.vue'
import DivVAlign from '@/components/containers/DivVAlign.vue'
import { useGeneralStore } from '@/stores/general.js'
import { removeIdFromProcessing } from '@/helpers/Helpers.js'
import VariableInput from '@/components/forms/inputs/VariableInput.vue'

export default {
  name: 'RegisterUser',

  components: {
    VariableInput,
    DivVAlign,
    ContainerWithBrandHead,
    ButtonSubmit,
    FormGroup,
    SmallError,
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
      const response = await useUserStore().actionRegister(this.newUser);

      removeIdFromProcessing("register-form-button")

      if(response){
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
