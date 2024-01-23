import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {}
  }),

  actions: {
    registrarUsuarioOk(payload) {
      this.user = payload
    }
  }
})
