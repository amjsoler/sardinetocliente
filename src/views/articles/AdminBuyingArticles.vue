<template>
  <block-section>
      <block-section class="flex flex-row items-center bg-input-background"
                     v-for="(buying, index) in gymBuyingHistory" v-bind:key="buying.id">
        <section class="flex-grow">
          <p>{{ buying.articulo.nombre }}</p>
          <p>{{ buying.usuario.name }} ({{ buying.usuario.email }})</p>
          <p>{{ getDateAndHourFromString(buying.created_at)}}</p>
          <p v-if="buying.pagada">
            Pagado: {{getDateAndHourFromString(buying.pagada)}}
          </p>
          <p v-if="buying.entregada">
            Entregado: {{getDateAndHourFromString(buying.entregada)}}
          </p>
        </section>
        <section class="flex flex-row justify-end">
          <p v-if="!buying.pagada">
            <credit-card class="text-red-300 size-8" @click="markBuyingAsPaid(buying.id, index)" />
          </p>
          <p v-else-if="!buying.entregada">
            <deliver-truck class="text-red-300  size-8" @click="markBuyingAsDelivered(buying.id, index)" />
          </p>
        </section>
      </block-section>
  </block-section>
</template>

<script>
import axios from 'axios'
import { useGymStore } from '@/stores/gym.js'
import BlockSection from '@/components/containers/BlockSection.vue'
import { getDateAndHourFromString } from '@/helpers/Helpers.js'
import CreditCard from '@/components/icons/CreditCard.vue'
import DeliverTruck from '@/components/icons/Delivertruck.vue'

export default {
  name: "AdminBuyingArticles",
  components: { DeliverTruck, CreditCard, BlockSection },

  data() {
    return {
      gymBuyingHistory: []
    }
  },

  mounted() {
    axios.get(import.meta.env.VITE_SERVICE_BASE_URL +
    "gimnasios/" + useGymStore().gymSelected.id + "/articulos/compras-del-gimnasio")
      .then(response => {
        this.gymBuyingHistory = response.data
      })
      .catch(() => {

      })
  },

  methods: {
    getDateAndHourFromString,

    markBuyingAsPaid(buyingId, buyingIndex){
      axios.get(import.meta.env.VITE_SERVICE_BASE_URL +
        "gimnasios/" + useGymStore().gymSelected.id + "/articulos/pagar-compra/" + buyingId)
        .then(() => {
          this.gymBuyingHistory.at(buyingIndex).pagada = new Date()
        })
        .catch(() => {

        })
    },

    markBuyingAsDelivered(buyingId, buyingIndex){
      axios.get(import.meta.env.VITE_SERVICE_BASE_URL +
        "gimnasios/" + useGymStore().gymSelected.id + "/articulos/entregar-articulo/" + buyingId)
        .then(() => {
          this.gymBuyingHistory.at(buyingIndex).entregada = new Date()
        })
        .catch(() => {

        })
    },
  },
}
</script>