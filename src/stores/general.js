import { defineStore } from 'pinia'

export const useGeneralStore = defineStore("general", {
  state: () => {
    return {
      alert: {
        type:"info",
        message:""
      },
      processing: []
    }
  },

  actions: {
    showAlert(message, type) {
      this.alert.type = type
      this.alert.message = message
    }
  },
})