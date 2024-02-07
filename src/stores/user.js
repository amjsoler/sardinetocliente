import { defineStore } from 'pinia'
import { API } from '@/services/index.js'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: JSON.parse(localStorage.getItem("user"))
    }
  },

  actions: {
    async actionRegister(newUser) {
      try {
        const response = await API.users.registerUser(newUser)
        useUserStore().$patch({user: response.data})

        return true
      }
      catch(error){
        return false
      }
    },

    async actionLogin(user) {
      try {
        const response = await API.users.loginUser(user)

        //Actualizo los datos de usuario
        useUserStore().$patch({user: response.data})

        return true
      }catch(error) {
        return false
      }
    },

    async actionRecoverAccount(account) {
      try {
        await API.users.accountRecover(account)

        return true
      }catch(error) {
        return false
      }
    }
  }
})