import { defineStore } from 'pinia'
import { API } from '@/services/index.js'
import { getSelectedGym } from '@/helpers/Helpers.js'

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
    },

    async actionAccountVerify() {
      try {
        await API.users.accountVerify()

        return true
      }catch(error){
        return false
      }
    },

    async actionGetInvitedUsers() {
      try {
        const response = await API.gimnasios.getInvitedUsers();

        getSelectedGym().invitedUsers = response.data

        return true;
      }  catch(error) {
        return false;
      }
    },

    async actionInviteUserToGym(userToInvite) {
      try {
        const response = await API.users.inviteUserToGym(userToInvite)

        //Guardo la invitación en el array del gimnasio
        const auxInvitedUser = response.data
        auxInvitedUser.pivot = {invitacion_aceptada: false}
        getSelectedGym().invitedUsers.unshift(auxInvitedUser)

        return true;
      }catch(error) {
        console.log("store, user.js: error actionInviteUserToGym")
        return false;
      }
    }
  }
})