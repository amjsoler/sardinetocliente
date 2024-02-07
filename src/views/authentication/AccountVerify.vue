<template>
  <div-v-align>
    <container-with-brand-head blur="true">
      <section v-if="!correoEnviado"
               class="flex flex-col items-center space-y-2 py-2">
        <p class="text-center text-pretty text-lg">
          <b>{{ $t("accountVerify.accountVerifyMsg") }}</b>
        </p>
        <p class="text-center text-sm">
          {{ $t("accountVerify.accountVerifyMsg2") }}
        </p>
        <p class="!mt-6">{{ $t("accountVerify.resendEmailMsg")}}</p>
        <button-submit processing-id="account-verify-submit" @button-submit="resendEmail">
          {{ $t("accountVerify.resendEmailBtn") }}
        </button-submit>
      </section>
      <section v-else class="flex flex-col items-center dark:text-green-600">
        <icon-check width="75px" height="75px" />
        <p class="text-center dark:text-gray-50">
          {{ $t("accountVerify.verifyMailSent") }}
        </p>
      </section>
    </container-with-brand-head>
  </div-v-align>
</template>

<script>
import ButtonSubmit from '@/components/forms/ButtonSubmit.vue'
import IconCheck from '@/components/icons/IconCheck.vue'
import DivVAlign from '@/components/containers/DivVAlign.vue'
import ContainerWithBrandHead from '@/components/containers/ContainerWithBrandHead.vue'
import { API } from '@/services/index.js'
import { removeIdFromProcessing } from '@/helpers/Helpers.js'

export default {
  name: "AccountVerify",
  components: { ContainerWithBrandHead, DivVAlign, IconCheck, ButtonSubmit },

  data() {
    return {
      correoEnviado:false
    }
  },

  methods: {
    async resendEmail() {
      const response = API.users.accountVerify()

      removeIdFromProcessing("account-verify-submit")

      if(response){
        this.correoEnviado = true;
      }
    }
  }
}
</script>