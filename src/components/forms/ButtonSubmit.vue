<template>
  <button @click.prevent="buttonSubmitAction"
          type="submit"
          class="w-full text-white bg-primary-600 hover:bg-primary-600 focus:ring-4 focus:outline-none
          focus:ring-primary-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600
          dark:hover:bg-primary-600 dark:focus:ring-primary-600">
    <svg v-if="processingId && useGeneralStore().processing.indexOf(processingId) !== -1" class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
      <!-- ... -->
    </svg>
    <slot v-else-if="!processingId || (processingId && useGeneralStore().processing.indexOf(processingId) === -1)" />
  </button>
</template>
<script>
import { useGeneralStore } from '@/stores/general.js'

export default {
  emits: ["buttonSubmit"],

  props: {
    processingId: {
      default: null
    }
  },

  methods: { useGeneralStore,
    buttonSubmitAction(){
      if(this.processingId){
        useGeneralStore().processing.push(this.processingId)
      }

      this.$emit('buttonSubmit');
    }
  },
}
</script>