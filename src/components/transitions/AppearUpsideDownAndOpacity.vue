<template>
  <transition name="appear-upside-down-and-opacity" :style="'animation-duration:'+animationDuration">
    <slot />
  </transition>
</template>

<style scoped>
  .appear-upside-down-and-opacity-enter-active {
    animation: appear-upside-down-and-opacity;
  }

  .appear-upside-down-and-opacity-leave-active {
    animation: appear-upside-down-and-opacity reverse;
  }

  @keyframes appear-upside-down-and-opacity {
    0% {
      opacity: 0;
      transform: translateY(-200px);
    }

    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }
</style>

<script>
export default {
  name: 'AppearUpsideDownAndOpacity',

  props: {
    "animationDuration": {
      default: ".2s"
}
  }
}
</script>