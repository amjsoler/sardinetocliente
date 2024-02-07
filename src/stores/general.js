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

  addProcessingUID(uid){
    this.processing.push(uid)
  },

  removeProcessingUID(uid) {
    this.processing.splice(this.processing.indexOf(uid), 1)
  },

  actions: {
    showAlert(message, type) {
      this.alert.type = type
      this.alert.message = message
    }
  },
})