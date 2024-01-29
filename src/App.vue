<template>
  <gym-header v-if="checkRouteRequiresGymHeader" />
  <router-view />

  <system-alert></system-alert>
</template>

<script>
import SystemAlert from '@/components/SystemAlert.vue'
import router from '@/router/index.js'
import GymHeader from '@/components/GymHeader.vue'

export default {
  name: 'App',
  methods: {
    router() {
      return router
    }
  },
  components: { GymHeader, SystemAlert },
  computed: {
    checkRouteRequiresGymHeader() {
      return this.$router.currentRoute.value.meta.gymHeader
    }
  }
}

</script>

    FooterMenu