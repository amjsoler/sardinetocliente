import { defineStore } from 'pinia'

export const useGeneralStore = defineStore("general", {
  state: () => {
    return {
      alert: {
        type:"info",
        message:""
      }
    }
  },
})