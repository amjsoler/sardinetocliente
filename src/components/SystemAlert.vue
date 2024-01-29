<template>
  <div id="system-alert-container" class="fixed bottom-3 w-full opacity-0 rounded-lg hidden">
    <div id="system-alert"
         class="flex items-center p-4 mx-3  border-t-4"
         :class="{'text-green-800 border-green-300 bg-green-50 dark:text-green-400 dark:bg-input-background-400 dark:border-green-800': alert.type==='success',
                  'text-red-800 border-red-300 bg-red-50 dark:text-red-400 dark:bg-input-background-400 dark:border-red-800': alert.type === 'danger',
                  'text-primary-800 border-primary-300 bg-primary-50 dark:text-primary-400 dark:bg-input-background-400 dark:border-primary-800': alert.type === 'info'
                }"
         role="alert"
    >

      <svg v-if="alert.type==='info'" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-circle"
           width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
           stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
        <path d="M12 9h.01" /><path d="M11 12h1v4h1" />
      </svg>
      <svg v-else-if="alert.type==='success'" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-check"
           width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
           stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M5 12l5 5l10 -10" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-alert-octagon" width="24" height="24"
           viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M12.802 2.165l5.575 2.389c.48 .206 .863 .589 1.07 1.07l2.388 5.574c.22 .512 .22 1.092 0 1.604l-2.389 5.575c-.206 .48 -.589 .863 -1.07 1.07l-5.574 2.388c-.512 .22 -1.092 .22 -1.604 0l-5.575 -2.389a2.036 2.036 0 0 1 -1.07 -1.07l-2.388 -5.574a2.036 2.036 0 0 1 0 -1.604l2.389 -5.575c.206 -.48 .589 -.863 1.07 -1.07l5.574 -2.388a2.036 2.036 0 0 1 1.604 0z" />
        <path d="M12 8v4" />
        <path d="M12 16h.01" />
      </svg>

      <div class="ms-3 text-sm font-medium">
        {{ alert.message }}
      </div>
      <button type="button"
              class="ms-auto -mx-1.5 -my-1.5  rounded-lg
              p-1.5 inline-flex items-center justify-center h-8 w-8"
              :class="{
                'bg-green-50 text-green-500 focus:ring-2 focus:ring-green-400 hover:bg-green-200 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700': alert.type==='success',
                'bg-primary-50 text-primary-500 focus:ring-2 focus:ring-primary-400 hover:bg-primary-200 dark:bg-primary-800 dark:text-primary-400 dark:hover:bg-primary-700': alert.type==='info',
                'bg-red-50 text-red-500 focus:ring-2 focus:ring-red-400 hover:bg-red-200 dark:bg-red-800 dark:text-red-400 dark:hover:bg-red-700': alert.type==='danger',
              }"
              data-dismiss-target="#alert-border-3"
              aria-label="Close"
              @click="closeAlert()"
      >
        <span class="sr-only">Dismiss</span>
        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'pinia'
  import { useGeneralStore } from '@/stores/general.js'
  import { watch } from 'vue'

  export default {
    name: "SystemAlert",

    computed: {
        ...mapState(useGeneralStore, {
          alert: "alert"
        })
    },

    mounted() {
       watch(this.alert, (alert) => {
         if(alert.message){
           this.showAlert()
         }else{
           this.closeAlert()
         }
       })
    },
    methods: {
      showAlert() {
        document.getElementById("system-alert-container").classList.remove("animationinvisible")
        document.getElementById("system-alert-container").classList.add("animationvisible")


        setTimeout(() => this.closeAlert(), 5000)
      },

      closeAlert(){
        document.getElementById("system-alert-container").classList.remove("animationvisible")
        document.getElementById("system-alert-container").classList.add("animationinvisible")
      }
    }
  }
</script>

<style scoped>
  .animationvisible {
    display: block;
    opacity: 100%;
    animation-name: become-visible;
    animation-duration: 800ms;
    animation-timing-function: ease-in-out;
  }

  .animationinvisible {
    display: none;
    opacity: 0;
    animation-name: become-invisible;
    animation-duration: 800ms;
    animation-timing-function: ease-in-out;
  }
  @keyframes become-visible {
    0% { opacity: 0; transform: translateY(100%)}
    100% { opacity: 100%; transform: translateY(0%)}
  }

  @keyframes become-invisible {
    0% { opacity: 100%; transform: translateY(0%)}
    100% { opacity: 0; transform: translateY(100%)}
  }
</style>