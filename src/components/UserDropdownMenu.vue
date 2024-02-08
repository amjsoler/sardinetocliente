<template>
  <p @click="userDropDownVisibility = !userDropDownVisibility"
     class="h-full"
  >
    <img class="rounded-full size-full" src="@/assets/img.png" />
  </p>

  <div v-if="userDropDownVisibility"
       class="w-full h-dvh fixed top-0 backdrop-blur">
    <square-rounded-x-filled @click="userDropDownVisibility = !userDropDownVisibility"
                             class="absolute right-3 top-3 w-12 h-12"></square-rounded-x-filled>
    <block-section @click="router().push({name: 'MyMetrics'})" class="mt-20 text-center text-2xl cursor-pointer">
      {{ $t("userDropDownMenu.mymetrics")}}
    </block-section>

    <block-section @click="router().push({name: 'MySubscriptions'})"
                   class="mt-20 text-center text-2xl cursor-pointer"
    >
      Mis suscripciones
    </block-section>
  </div>
</template>
<script>
import SquareRoundedXFilled from '@/components/icons/SquareRoundedXFilled.vue'
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/user.js'
import BlockSection from '@/components/containers/BlockSection.vue'
import router from '@/router/index.js'

export default {
  name: "UserDropDownMenu",
  methods: {
    router() {
      return router
    }
  },
  components: { BlockSection, SquareRoundedXFilled },

  data() {
    return {
      userDropDownVisibility: false
    }
  },

  computed: {
    ...mapState(useUserStore, {
      user: 'user'
    }),

    getUserLogo() {
      if(this.user.logo){
        return this.user.logo
      }else{
        return '@/assets/img.png'
      }
    }
  }
}
</script>