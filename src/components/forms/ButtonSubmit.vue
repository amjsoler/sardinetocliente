<template>
  <button @click.prevent="buttonSubmitAction"
          type="submit"
          class="relative w-full text-white bg-primary-600 hover:bg-primary-600 focus:ring-4 focus:outline-none
          focus:ring-primary-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600
          dark:hover:bg-primary-600 dark:focus:ring-primary-600"
  :class="{disabled: processingId && chedkIfIdExistsInProcessing(processingId)}"
  >
    <transition name="opacitytransition">
      <spinner-icon v-if="processingId && chedkIfIdExistsInProcessing(processingId)"
                    class="animate-spin h-6 w-6 -mt-3 -ml-3 absolute left-1/2 top-1/2 text-white fill-primary-600"
      />
    </transition>
    <slot />
  </button>
</template>
<script>
import { useGeneralStore } from '@/stores/general.js'
import { addIdToProcessing, chedkIfIdExistsInProcessing } from '@/helpers/Helpers.js'
import SpinnerIcon from '@/components/icons/SpinnerIcon.vue'

export default {
  components: { SpinnerIcon },
  emits: ["buttonSubmit"],

  props: {
    processingId: {
      default: null
    }
  },

  methods: {
    chedkIfIdExistsInProcessing, useGeneralStore,

    buttonSubmitAction(){
      if(this.processingId){
        addIdToProcessing(this.processingId)
      }

      this.$emit('buttonSubmit');
    }
  },
}
</script>

<style scoped>
.opacitytransition-enter-from,
.opacitytransition-leave-to {
  opacity: 0;
  transition: opacity .2s;
}

.opacitytransition-enter-to,
.opacitytransition-leave-from {
  opacity: 1;
  transition: opacity .2s;
}
</style>