<template>
  <block-section class="space-y-5">
    <text-input v-model="searchInput" :placeholder="$t('gymArticle.searchPlaceholder')" />
    <div v-for="(subscription, index) in getFilteredGymSubscriptions"
         v-bind:key="subscription.id"
         class="bg-input-background-400 rounded-lg p-4 relative"
    >
      <section class="flex flex-row justify-around items-center">
        <section class="flex flex-col items-center justify-center text-sm">
          <p>
            {{ getDateFromString(subscription.created_at) }}
          </p>
          <p>
            {{ getHourFromString(subscription.created_at) }}
          </p>
        </section>
        <p class="">
          {{ subscription.usuario_que_se_suscribe.name }}
          <span>
          ({{ subscription.usuario_que_se_suscribe.email}})
        </span>
        </p>
      </section>
      <p class="text-center">
        {{ subscription.tarifa_a_la_que_pertenece.nombre }}
      </p>
      <p @click="markSubscriptionAsPaid(subscription.id, index)"
         class="flex flex-row justify-center pt-4" v-if="!subscription.pagada">
        <credit-card class="text-red-300" />
      </p>
      <p @click="deleteSubscription(subscription.id, index)"
      class="absolute right-1 bottom-1 text-red-300">
        <trash-x-icon />
      </p>
    </div>
  </block-section>
</template>

<script>
import axios from 'axios'
import { useGymStore } from '@/stores/gym.js'
import BlockSection from '@/components/containers/BlockSection.vue'
import { getDateAndHourFromString, getDateFromString, getHourFromString } from '@/helpers/Helpers.js'
import TextInput from '@/components/forms/inputs/TextInput.vue'
import CreditCard from '@/components/icons/CreditCard.vue'
import TrashXIcon from '@/components/icons/TrashXIcon.vue'

export default {
  name: "GymSubscriptions",
  components: { TrashXIcon, CreditCard, TextInput, BlockSection },

  data() {
    return {
      gymSubscriptions: [],
      searchInput: ""
    }
  },

  computed: {
      getFilteredGymSubscriptions() {
        if(this.searchInput) {
          return this.gymSubscriptions.filter(item =>
            item.usuario_que_se_suscribe.name.toLowerCase().includes(this.searchInput.toLowerCase()) ||
            item.usuario_que_se_suscribe.email.toLowerCase().includes(this.searchInput.toLowerCase()) ||
            item.tarifa_a_la_que_pertenece.nombre.toLowerCase().includes(this.searchInput.toLowerCase())
          )
        } else {
          return this.gymSubscriptions
        }
      }
  },
  mounted() {
    axios.get(import.meta.env.VITE_SERVICE_BASE_URL +
    "gimnasios/" + useGymStore().gymSelected.id + "/suscripciones")
      .then(response => {
        this.gymSubscriptions = response.data
      })
      .catch(() => {})
  },

  methods: { getHourFromString, getDateFromString, getDateAndHourFromString,
    markSubscriptionAsPaid(subscriptionId, subscriptionIndex) {
      axios.get(import.meta.env.VITE_SERVICE_BASE_URL +
      "gimnasios/" + useGymStore().gymSelected.id + "/suscripciones/" + subscriptionId + "/marcar-pagada")
        .then(() => {
          this.gymSubscriptions[subscriptionIndex].pagada = new Date()
        })
        .catch(() => {})
    },

    deleteSubscription(subscriptionId, subscriptionIndex) {
      axios.delete(import.meta.env.VITE_SERVICE_BASE_URL +
        "gimnasios/" + useGymStore().gymSelected.id + "/suscripciones/" + subscriptionId)
        .then(() => {
          this.gymSubscriptions.splice(subscriptionIndex,1)
        })
        .catch(() => {})
    }
  },
}
</script>