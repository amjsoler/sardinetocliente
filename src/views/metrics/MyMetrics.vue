<template>
  <block-section>
    <create-metric @metric-created="metricCreatedCallback"/>
  </block-section>

  <block-section>
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

  <block-section v-if="myMetrics && myMetrics.length !== 0" v-show="viewGraphSection">
    <Line :data="getGraphData" :options="options" />
  </block-section>

  <block-section v-show="viewDataSection">
    <div class="flex flex-col flex-wrap space-y-3">
      <article v-for="(metric, index) in myMetrics" v-bind:key="metric.id"
      class="flex flex-row items-center flex-grow [&>p]:flex-grow">
        <p>{{ getFullDate(metric.created_at) }}</p>
        <p class="flex justify-center">{{ metric.peso}}Kg</p>
        <p class="flex justify-center">{{ metric.porcentaje_graso}}%</p>
        <p class="flex justify-end">
          <trash-x-icon @click="deleteMetric(metric.id, index)" class="text-red-300" />
        </p>

      </article>
    </div>
  </block-section>
</template>

<script>
import axios from 'axios'
import CreateMetric from '@/views/metrics/CreateMetric.vue'
import BlockSection from '@/components/containers/BlockSection.vue'
import TrashXIcon from '@/components/icons/TrashXIcon.vue'
import ChartIcon from '@/components/icons/ChartIcon.vue'
import ClipboardIcon from '@/components/icons/ClipboardIcon.vue'

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
import { Line } from 'vue-chartjs'

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
  name: "MyMetrics",
  components: { ClipboardIcon, ChartIcon, TrashXIcon, BlockSection, CreateMetric, Line },

  data() {
    return {
      myMetrics: [],
      viewDataSection: false,
      viewGraphSection: true,
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },

  computed: {
    getGraphData() {
      return {
        labels: [1,1,1,1,1,1,1,1,1,1],
        datasets: [
          {
            label: 'Peso',
            backgroundColor: '#1396ce',
            data: this.myMetrics.slice(0, 10).reverse().map(item=>item.peso)
          },
          {
            label: '% graso',
            backgroundColor: '#de8613',
            data: this.myMetrics.slice(0, 10).reverse().map(item=>item.porcentaje_graso)
          },
        ]
      }
    },
  },
  mounted() {
    axios.get(import.meta.env.VITE_SERVICE_BASE_URL+
      "metricas")
      .then(response => {
        this.myMetrics = response.data
      })
      .catch(() => {
      })
  },

  methods: {
    metricCreatedCallback(metric) {
      this.myMetrics.unshift(metric)
    },

    getFullDate(created_at){
      const date = new Date(created_at)

      return date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()
    },

    deleteMetric(metricId, index) {
      axios.delete(import.meta.env.VITE_SERVICE_BASE_URL + "metricas/"+metricId)
        .then(() => {
            this.myMetrics.splice(index,1)
        })
        .catch(() => {
        })
    }
  }
}
</script>