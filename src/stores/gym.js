import { defineStore } from 'pinia'

export const useGymStore = defineStore("gyms", {
  state: () => {
    return {
      myGyms: JSON.parse(localStorage.getItem("myGyms")),
      gymSelected: null
    }
},

  actions: {
    saveMyGyms(myGyms) {
      this.$patch((state) => {
        state.myGyms = myGyms
        //ToDO hacer que al guardar los gimnasios no chafe las clases que hayan creadas en dicho gimnasio
      })
    },

    saveGymClassesGivenGymId(gymId, classes) {
      const gymIndex = this.myGyms.findIndex(gym => gym.id === gymId)

      if(gymIndex !== -1){
        this.$patch((state) => {
          state.myGyms[gymIndex].classes = classes
        })
      }

      if(this.gymSelected.id === gymId){
        this.$patch((state) => {
          state.gymSelected.classes = classes
        })
      }
    }
  }
})