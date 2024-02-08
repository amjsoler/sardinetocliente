import { defineStore } from 'pinia'
import { API } from '@/services/index.js'

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

        const gymToPatch = {
          myGyms: response.data,
        }

        //Autoselect gym if only have one
        if(response.data.length === 1) {
          gymToPatch.gymSelected = response.data[0]
        }

        useGymStore().$patch(gymToPatch)

        return true
      }catch(error){
        return false
      }
    }
  }
})