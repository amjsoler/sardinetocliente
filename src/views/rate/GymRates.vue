<template>
  <create-rate @exercise-created="rateCreatedCallback"/>

  <full-screen-blur-with-close-btn-container v-if="rateToModify" @close-full-screen-container="rateToModify=null">
    <modify-gym-rate :rate-to-modify="rateToModify" @rate-modified="rateModified"/>
  </full-screen-blur-with-close-btn-container>

  <block-section v-if="gymRates.length" class="space-y-3">
    <text-input v-model="searchInput" placeholder="Filtrar tarifas por nombre" />
    <ul>
      <li v-for="(rate, index) in getFilteredGymRates" v-bind:key="rate.id"
          class="flex flex-row border-b-2 pb-2 border-input-background items-center [&>*]:flex-grow space-y-4">
        <p class="text-2xl">
          {{ rate.nombre }}
        </p>
        <p class="flex flex-row justify-end space-x-3">
          <edit-icon @click="rateToModify=rate" class="text-primary-400 cursor-pointer"></edit-icon>
          <trash-x-icon @click="deleteRate(rate.id, index)" class="text-red-300 cursor-pointer"></trash-x-icon>
        </p>
      </li>
    </ul>
  </block-section>
</template>

<script>
import axios from 'axios'
import { useGymStore } from '@/stores/gym.js'
import BlockSection from '@/components/containers/BlockSection.vue'
import TrashXIcon from '@/components/icons/TrashXIcon.vue'
import EditIcon from '@/components/icons/EditIcon.vue'
import TextInput from '@/components/forms/inputs/TextInput.vue'
import FullScreenBlurWithCloseBtnContainer from '@/components/containers/FullScreenBlurWithCloseBtnContainer.vue'
import CreateRate from '@/views/rate/CreateGymRate.vue'
import ModifyGymRate from '@/views/rate/ModifyGymRate.vue'

export default {
  name: "GymRates",
  components: { ModifyGymRate, CreateRate, FullScreenBlurWithCloseBtnContainer, TextInput, EditIcon, TrashXIcon, BlockSection },

  data() {
    return {
      gymRates: [],
      rateToModify: null,
      searchInput: "",
    }
  },

  computed: {
    getFilteredGymRates(){
      if(this.searchInput){
        return this.gymRates.filter(item => item.nombre.toLowerCase().includes(this.searchInput))
      }
      else{
        return this.gymRates
      }
    }
  },

  mounted() {
    axios.get(import.meta.env.VITE_SERVICE_BASE_URL+
      "gimnasios/"+getSelectedGymId()+"/tarifas")
      .then(response => {
        this.gymRates = response.data
      })
      .catch(() => {

      })
  },

  methods: {
    rateCreatedCallback(rateCreated) {
      //Push the created exercise into the exercises array
      this.gymRates.push(rateCreated)

      //Then, sort the exercises array
      this.gymRates.sort(function(a, b){
        if(a.nombre >= b.nombre){
          return 1
        }else{
          return -1
        }
      })
    },

    deleteRate(rateId, rateIndex) {
      axios.delete(import.meta.env.VITE_SERVICE_BASE_URL+
        "gimnasios/"+getSelectedGymId()+"/tarifas/"+rateId)
        .then(() => {
          this.gymRates.splice(rateIndex, 1)
        })
        .catch(() => {

        })
    },

    rateModified() {
      this.rateToModify = null
    }
  }
}
</script>