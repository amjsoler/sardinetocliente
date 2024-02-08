import { defineStore } from 'pinia'
import { API } from '@/services/index.js'
import { useUserStore } from '@/stores/user.js'

export const useGymStore = defineStore("gyms", {
  state: () => {
    return {
      myGyms: JSON.parse(localStorage.getItem("myGyms")),
      gymSelected: JSON.parse(localStorage.getItem("gymSelected"))
    }
},

  actions: {
    async actionGetMyGyms() {
      try {
        const response = await API.gimnasios.getMyGyms()

        useGymStore().$patch({ myGyms: response.data })

        //Autoselect gym if only have one
        if(useGymStore().myGyms.length === 1) {
          useGymStore().$patch({gymSelected: useGymStore().myGyms[0]})
        }
        //Si ya había un gimnasio seleccionado, tengo que actualizar con los datos que hayan venido
        else if(useGymStore().gymSelected){
          useGymStore().$patch({gymSelected: useGymStore().myGyms.filter(item => item.id === useGymStore().gymSelected.id)[0]})
        }

        return true
      }catch(error){
        return false
      }
    },

    actionCheckIfUserHasAdminPower()
    {
      return useGymStore().gymSelected.permisosAdmin ||
        useUserStore().user.id === useGymStore().gymSelected.propietario

    }
  }
})