<template>
  <div class="w-full h-dvh fixed top-0 left-0 backdrop-blur pt-16 z-50 overflow-auto"
        @click.self="$emit('closeFullScreenContainer')">
    <square-rounded-x-filled @click="$emit('closeFullScreenContainer')"
                             class="absolute right-3 top-3 w-12 h-12"
    />
    <slot />
  </div>
</template>
<script>
import SquareRoundedXFilled from '@/components/icons/SquareRoundedXFilled.vue'

export default {
  name: "FullScreenBlurWithCloseBtnContainer",
  components: { SquareRoundedXFilled },
  emits: ["closeFullScreenContainer"]
}
</script>