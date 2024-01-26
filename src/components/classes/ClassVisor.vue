<template>
  <div class="min-h-dvh backdrop-blur fixed top-0 w-full">
    <square-rounded-x-filled @click="$emit('closeEvent')" class="absolute right-2 top-2 w-12 h-12"/>

    <div class="bg-red-600 mt-16 rounded-lg w-auto mx-3">
      {{ modelValue }}
    </div>

    <p class="fixed bottom-0 mx-auto w-auto text-center">Apuntarse</p>
  </div>
</template>

<script>
import SquareRoundedXFilled from '@/components/icons/SquareRoundedXFilled.vue'

export default {
  name: "ClassVisor",
  components: { SquareRoundedXFilled },
  emits: ["closeEvent"],
  props: ["modelValue"]
}
</script>