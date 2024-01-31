<template>
  <gym-header v-if="checkRouteRequiresGymHeader" />
  <router-view />
  <footer-menu v-if="checkRouteRequiresFooterMenu" />

  <system-alert></system-alert>
</template>

<script>
import SystemAlert from '@/components/SystemAlert.vue'
import router from '@/router/index.js'
import GymHeader from '@/components/GymHeader.vue'
import FooterMenu from '@/components/FooterMenu.vue'

export default {
  name: 'App',
  methods: {
    router() {
      return router
    }
  },
  components: { FooterMenu, GymHeader, SystemAlert },
  computed: {
    checkRouteRequiresGymHeader() {
      return this.$router.currentRoute.value.meta.gymHeader
    },

    checkRouteRequiresFooterMenu() {
      return this.$router.currentRoute.value.meta.footerMenu
    }
  }
}

</script>

    FooterMenu