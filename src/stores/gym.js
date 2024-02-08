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

    async actionCreateGym(newGym) {
      try {
        const response = await API.gimnasios.createGym(newGym)

        useGymStore().$patch((state) => {
          //Selecciono el gym recién creado
          state.gymSelected = response.data

          //Añado el gym a la lista de gimnasios y la ordeno. Después la almaceno
          state.myGyms.push(response.data)

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
      return useGymStore().gymSelected &&
        (useGymStore().gymSelected.permisosAdmin ||
        useUserStore().user.id === useGymStore().gymSelected.propietario)

    }
  }
})