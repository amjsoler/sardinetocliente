import { defineStore } from 'pinia'
//TODO: Almacenar el user en el localstoragemediate subscripción o watcher de pinia
export const useUserStore = defineStore('user', {
  state: () => ({
    user: {}
  })
})
