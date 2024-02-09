import { defineStore } from 'pinia'
import { API } from '@/services/index.js'
import { useUserStore } from '@/stores/user.js'
import { getSelectedGym, getSelectedGymId } from '@/helpers/Helpers.js'

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
          useGymStore().$patch({gymSelected: useGymStore().myGyms[0].id})
        }

        return true
      }catch(error){
        return false
      }
    },

    async actionCreateGym(newGym) {
      try {
        const response = await API.gimnasios.createGym(newGym)

        useGymStore().$patch((state) => {
          //Añado el gym a la lista de gimnasios y la ordeno. Después la almaceno
          state.myGyms.push(response.data)

          //Selecciono el gym recién creado
          state.gymSelected = response.data.id

          state.myGyms.sort((a, b) =>{
            if(a.nombre < b.nombre){
              return -1;
            }
            if(a.nombre > b.nombre) {
              return 1;
            }

            return 0;
          })
        })

        return true
      }catch(error){
        console.log(error)
        return false
      }
    },

    actionCheckIfUserHasAdminPower()
    {
      return getSelectedGymId() && getSelectedGym() &&
        (getSelectedGym().permisosAdmin ||
        useUserStore().user.id === getSelectedGym().propietario)

    }
  }
})