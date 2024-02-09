<template>
  <full-screen-blur-with-close-btn-container @close-full-screen-container="viewingScore=null" v-if="viewingScore">
    <block-section>
      <create-weight-score :exercise-id="viewingScore.id"></create-weight-score>
    </block-section>
    <block-section>
      <block-section class="bg-input-background">
        <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          <li class="me-2 flex-grow">
            <p @click="viewGraphSection=true;viewDataSection=false"
               class="inline-flex items-center justify-center p-4 rounded-t-lg"
               :class="{'dark:text-blue-500 border-b-2 dark:border-b-blue-500': viewGraphSection}"
            >
              <chart-icon class="mr-1" />
              Gráfico
            </p>
          </li>
          <li class="me-2 flex-grow">
            <p @click="viewGraphSection=false;viewDataSection=true"
               class="inline-flex items-center justify-center p-4 rounded-t-lg" aria-current="page"
               :class="{'dark:text-blue-500 border-b-2 dark:border-b-blue-500': viewDataSection}"
            >
              <clipboard-icon  class="mr-1" />
              Datos
            </p>
          </li>
        </ul>
      </block-section>

      <block-section class="bg-input-background" v-if="viewingScore.ejercicios_usuarios && viewingScore.ejercicios_usuarios.length !== 0" v-show="viewGraphSection">
        <Line :data="getGraphData" :options="options" />
      </block-section>

      <block-section class="bg-input-background" v-show="viewDataSection">
        <div class="flex flex-col flex-wrap space-y-3">
          <article v-for="(score, index) in viewingScore.ejercicios_usuarios" v-bind:key="score.id"
                   class="flex flex-row items-center flex-grow [&>p]:flex-grow">
            <p class="flex justify-center">{{ score.unorm}}Kg</p>
            <p class="flex justify-end">
              <trash-x-icon @click="deleteScore(score.id, index)" class="text-red-300" />
            </p>
          </article>
        </div>
      </block-section>
    </block-section>
  </full-screen-blur-with-close-btn-container>

  <block-section v-if="weightScores.length" class="space-y-3">
    <text-input v-model="searchInput" placeholder="Filtrar ejercicios por nombre" />
    <div>
      <article v-for="(exercise) in getFilteredGymExercises" v-bind:key="exercise.id"
          class="flex flex-row border-b-2 pb-2 border-input-background items-center [&>*]:flex-grow space-y-4"
           @click="viewingScore = exercise">
        <section>
          <img :src="exercise.demostracion" />
          <p>{{ exercise.nombre }}</p>
          <p v-if="exercise.ejercicios_usuarios.at(0)">RM: {{ exercise.ejercicios_usuarios.at(0).unorm }}</p>
        </section>
      </article>
    </div>
  </block-section>
</template>

<script>
import axios from 'axios'
import { useGymStore } from '@/stores/gym.js'
import TextInput from '@/components/forms/inputs/TextInput.vue'
import BlockSection from '@/components/containers/BlockSection.vue'
import FullScreenBlurWithCloseBtnContainer from '@/components/containers/FullScreenBlurWithCloseBtnContainer.vue'
import { Line } from 'vue-chartjs'
import ClipboardIcon from '@/components/icons/ClipboardIcon.vue'
import ChartIcon from '@/components/icons/ChartIcon.vue'
import TrashXIcon from '@/components/icons/TrashXIcon.vue'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import CreateWeightScore from '@/views/userexercises/CreateWeightScore.vue'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
export default {
  name: "UserExercises",
  components: { CreateWeightScore, TrashXIcon, ChartIcon, ClipboardIcon, Line, FullScreenBlurWithCloseBtnContainer, BlockSection, TextInput },

  data() {
    return {
      viewGraphSection:true,
      viewDataSection:false,
      viewingScore: null,
      searchInput: "",
      weightScores: [],
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },

  computed: {
    getFilteredGymExercises(){
      if(this.searchInput){
        return this.weightScores.filter(item => item.nombre.toLowerCase().includes(this.searchInput))
      }
      else{
        return this.weightScores
      }
    },

    getGraphData() {
      return {
        labels: [1,1,1,1,1,1,1,1,1,1],
        datasets: [
          {
            label: 'Peso',
            backgroundColor: '#1396ce',
            data: this.viewingScore.ejercicios_usuarios.slice(0, 10).map(item=>item.unorm).reverse()
          },
        ]
      }
    },
  },

  mounted(){
    axios.get(import.meta.env.VITE_SERVICE_BASE_URL +
    "gimnasios/"+getSelectedGymId()+"/registros-de-peso")
      .then(response => {
        this.weightScores = response.data
      })
  },
  methods: {
    deleteScore(scoreId, scoreIndex){
      axios.delete(import.meta.env.VITE_SERVICE_BASE_URL +
      'gimnasios/'+getSelectedGymId()+'/ejercicios/'+this.viewingScore.id+'/registros-de-peso/'+scoreId)
        .then(() => {
          this.viewingScore.ejercicios_usuarios.splice(scoreIndex, 1)
        })
        .catch(() => {})
    }
  }
}
</script>