<template>
  <train-video v-if="checkRouteRequiresTrainVideo"/>
  <gym-header v-if="checkRouteRequiresGymHeader" />
  <router-view v-slot="{ Component }">
    <Transition name="view-transition">
      <component :is="Component" />
    </Transition>
  </router-view>
  <footer-menu v-if="checkRouteRequiresFooterMenu" />

  <system-alert></system-alert>
</template>

<style>
.view-transition-enter-active {
  animation: appear-from-right 0.2s;
  animation-delay: .2s;
}

.view-transition-leave-active {
  animation: disappear-to-left 0.2s;
}

@keyframes disappear-to-left {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(-200px);
    opacity: 0;
  }
}

@keyframes appear-from-right {
  0% {
    transform: translateX(200px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>

<script>
import SystemAlert from '@/components/SystemAlert.vue'
import router from '@/router/index.js'
import GymHeader from '@/components/GymHeader.vue'
import FooterMenu from '@/components/FooterMenu.vue'
import TrainVideo from '@/components/containers/TrainVideo.vue'

export default {
  name: 'App',
  methods: {
    router() {
      return router
    }
  },
  components: { TrainVideo, FooterMenu, GymHeader, SystemAlert },
  computed: {
    checkRouteRequiresGymHeader() {
      return this.$router.currentRoute.value.meta.gymHeader
    },

    checkRouteRequiresFooterMenu() {
      return this.$router.currentRoute.value.meta.footerMenu
    },

    checkRouteRequiresTrainVideo() {
      return this.$router.currentRoute.value.meta.trainVideo
    }


  }
}

</script>

    FooterMenu