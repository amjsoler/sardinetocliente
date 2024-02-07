<template>
  <div-v-align>
    <container-with-brand-head blur="true">
      <h1 class="text-lg text-center font-bold dark:text-white mb-2">
        {{$t("LoginUser.title")}}
      </h1>
      <form class="space-y-6">
        <form-group>
          <span-label>{{$t("LoginUser.form.email")}}</span-label>
          <variable-input v-model="loginUser.email" />
          <small-error field-name="email"></small-error>
        </form-group>

        <form-group>
          <span-label>{{$t("LoginUser.form.password")}}</span-label>
          <variable-input v-model="loginUser.password" />
          <small-error field-name="password" />
        </form-group>

        <button-submit processing-id="login-user-submit" @button-submit="login">
          {{$t("LoginUser.form.btnsubmit")}}
        </button-submit>

        <p class="text-sm font-light dark:text-gray-300 text-center">
          {{ $t("LoginUser.form.noaccount") }}
          <link-standard :destination="{name: 'RegisterUser'}">
            {{ $t("LoginUser.form.registerlink") }}
          </link-standard>
        </p>

        <p class="text-sm font-light text-center">
          <link-standard :destination="{name: 'AccountRecovery'}">
            {{$t("LoginUser.form.passrememberlink")}}
          </link-standard>
        </p>
      </form>
    </container-with-brand-head>
  </div-v-align>
</template>

<script>

import { useUserStore } from '@/stores/user'
import {mapWritableState} from 'pinia'
import SpanLabel from '@/components/forms/SpanLabel.vue'
import SmallError from '@/components/forms/SmallError.vue'
import FormGroup from '@/components/forms/FormGroup.vue'
import ButtonSubmit from '@/components/forms/ButtonSubmit.vue'
import LinkStandard from '@/components/general/LinkStandard.vue'
import DivVAlign from '@/components/containers/DivVAlign.vue'
import ContainerWithBrandHead from '@/components/containers/ContainerWithBrandHead.vue'
import VariableInput from '@/components/forms/inputs/VariableInput.vue'
import router from '@/router/index.js'
import { removeIdFromProcessing } from '@/helpers/Helpers.js'

export default {
  name: 'LoginUser',
  components: { VariableInput, ContainerWithBrandHead, DivVAlign, LinkStandard, ButtonSubmit, FormGroup, SmallError, SpanLabel },

  data() {
    return {
      loginUser: {
        email: "",
        password: ""
      }
    }
  },

  computed: {
    ...mapWritableState(useUserStore, {
      user:"user"
    })
  },
  methods: {
    async login(){
      const result = await useUserStore().actionLogin(this.loginUser)

      removeIdFromProcessing("login-user-submit")
      if(result){
        router.push({name: "GymClasses"})
      }
    }
  }
}
</script>
