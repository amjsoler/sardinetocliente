<template>
  <create-exercise @exercise-created="exerciseCreatedCallback"/>

  <full-screen-blur-with-close-btn-container v-if="exerciseToModify" @close-full-screen-container="exerciseToModify=null">
    <modify-exercise @exercise-modified="exerciseModified" :exercise-to-modify="exerciseToModify">
    </modify-exercise>
  </full-screen-blur-with-close-btn-container>

  <block-section v-if="gymExercises.length" class="space-y-3">
    <text-input v-model="searchInput" placeholder="Filtrar ejercicios por nombre" />
    <ul>
      <li v-for="(exercise, index) in getFilteredGymExercises" v-bind:key="exercise.id"
      class="flex flex-row border-b-2 pb-2 border-input-background items-center [&>*]:flex-grow space-y-4">
        <p class="text-2xl">
          {{ exercise.nombre }}
        </p>
        <p class="flex flex-row justify-end space-x-3">
          <edit-icon @click="exerciseToModify=exercise;" class="text-primary-400 cursor-pointer"></edit-icon>
          <trash-x-icon @click="deleteExercise(exercise.id, index)" class="text-red-300 cursor-pointer"></trash-x-icon>
        </p>
      </li>
    </ul>
  </block-section>
</template>

<script>
import axios from 'axios'
import { useGymStore } from '@/stores/gym.js'
import CreateExercise from '@/views/exercise/CreateExercise.vue'
import BlockSection from '@/components/containers/BlockSection.vue'
import TrashXIcon from '@/components/icons/TrashXIcon.vue'
import EditIcon from '@/components/icons/EditIcon.vue'
import TextInput from '@/components/forms/inputs/TextInput.vue'
import ModifyExercise from '@/views/exercise/ModifyExercise.vue'
import FullScreenBlurWithCloseBtnContainer from '@/components/containers/FullScreenBlurWithCloseBtnContainer.vue'

export default {
  name: "GymExercises",
  components: { FullScreenBlurWithCloseBtnContainer, ModifyExercise, TextInput, EditIcon, TrashXIcon, BlockSection, CreateExercise },

  data() {
    return {
      gymExercises: [],
      exerciseToModify: null,
      searchInput: "",
    }
  },

  computed: {
    getFilteredGymExercises(){
      if(this.searchInput){
        return this.gymExercises.filter(item => item.nombre.toLowerCase().includes(this.searchInput))
      }
      else{
        return this.gymExercises
      }
    }
  },

  mounted() {
    axios.get(import.meta.env.VITE_SERVICE_BASE_URL+"gimnasios/"+getSelectedGymId()+"/ejercicios")
      .then(response => {
        this.gymExercises = response.data
      })
      .catch(() => {

      })
  },

  methods: {
    exerciseCreatedCallback(createdExercise) {
      //Push the created exercise into the exercises array
      this.gymExercises.push(createdExercise)

      //Then, sort the exercises array
      this.gymExercises.sort(function(a, b){
        if(a.nombre >= b.nombre){
          return 1
        }else{
          return -1
        }
      })
    },

    deleteExercise(exerciseId, exerciseIndex) {
      axios.delete(import.meta.env.VITE_SERVICE_BASE_URL+"gimnasios/"+getSelectedGymId()+"/ejercicios/"+exerciseId)
        .then(() => {
          this.gymExercises.splice(exerciseIndex, 1)
        })
        .catch(() => {

        })
    },

    exerciseModified() {
      this.exerciseToModify = null
    }
  }
}
</script>