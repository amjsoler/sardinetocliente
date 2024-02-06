<template>
  <Transition name="errorfade">
    <small v-if="errors[fieldName]" class="text-red-600">
      {{ errors[fieldName][0] }}
    </small>
  </Transition>
</template>

<style scoped>
.errorfade-enter-to,
.errorfade-leave-from {
  opacity: 1;
  transition: all 0.2s ease;
}
.errorfade-enter-from,
.errorfade-leave-to {
  opacity: 0;
}

.errorfade-leave-active {
  position: absolute;
}

</style>

<script>
import { mapState } from 'pinia'
import { useValidationStore } from '@/stores/validation.js'

export default {

  props: {
    fieldName: {
      required: true
    }
  },



  computed: {
    ...mapState(useValidationStore, {
      message:"message",
      errors:"errors"
    }),
  }
}

</script>