<template>
  <block-section>
    <section class="flex flex-col justify-center items-center space-y-3 mb-4">
      <section class="text-center">
        <h3 class="font-bold text-2xl">{{ $t("mySubscriptions.subscriptionTitle") }}</h3>
        <ul v-if="getActiveSubscriptionThisMonth.length">
          <li v-for="subscription in getActiveSubscriptionThisMonth" v-bind:key="subscription.id">
            {{ subscription.tarifa_a_la_que_pertenece.nombre }}
            ({{ $tc("mySubscriptions.creditsLeft", subscription.creditos_restantes, {count: subscription.creditos_restantes})}})
          </li>
        </ul>
        <p v-else>
          {{ $t("mySubscriptions.noSubscriptions")}}
        </p>
      </section>

      <section class="text-center">
        <h3 class="text-2xl font-bold">{{ $tc("mySubscriptions.abonoTitle", getActiveAbonos.length)}}</h3>
        <ul v-if="getActiveAbonos.length">
          <li v-for="abono in getActiveAbonos" v-bind:key="abono.id">
            {{ abono.tarifa_a_la_que_pertenece.nombre }}
            ({{ $tc("mySubscriptions.creditsLeft", abono.creditos_restantes, {count: abono.creditos_restantes})}})
          </li>
        </ul>
        <p v-else>
          {{ $t("mySubscriptions.noAbonos")}}
        </p>
      </section>
    </section>
  </block-section>

  <block-section class="space-y-3">
    <p class="font-bold text-center">{{ $tc("mySubscriptions.userSubscribeTitle", getActiveSubscriptionThisMonth.length)}}</p>
    <user-subscribe @user-subscription-created="userSubscriptionCreatedCallback" />
  </block-section>

  <block-section>
    <ul class="space-y-2">
      <li v-for="subscription in mySubscriptions" v-bind:key="subscription.id">
        <section class="grid grid-cols-4">
          <p class="flex flex-row justify-around">
            {{ getMonthLiteralAndTwoNumberYear(subscription.created_at) }}
            <span v-if="!subscription.pagada"><credit-card class="inline-block text-red-300" /></span>
          </p>
          <p class="col-span-2">
            {{ subscription.tarifa_a_la_que_pertenece.nombre }}
          </p>
          <p class="text-end">{{ subscription.tarifa_a_la_que_pertenece.tipo }}</p>
        </section>
      </li>
    </ul>
  </block-section>
</template>

<script>
import UserSubscribe from '@/views/subscription/UserSubscribe.vue'
import BlockSection from '@/components/containers/BlockSection.vue'
import axios from 'axios'
import { useGymStore } from '@/stores/gym.js'
import { getMonthLiteralAndTwoNumberYear } from '@/helpers/Helpers.js'
import CreditCard from '@/components/icons/CreditCard.vue'

export default {
  name: "MySubscriptions",
  components: { CreditCard, BlockSection, UserSubscribe },

  data() {
    return {
      mySubscriptions: [],
    }
  },

  computed: {
    getActiveSubscriptionThisMonth(){
      return this.mySubscriptions.filter(item => new Date(item.created_at).getMonth() === new Date().getMonth() && item.pagada)
    },

    getActiveAbonos() {
      return this.mySubscriptions.filter(item => item.creditos_restantes > 0 && item.tarifa_a_la_que_pertenece.tipo === "abono" && item.pagada)
    }
  },

  mounted() {
    axios.get(import.meta.env.VITE_SERVICE_BASE_URL +
    "gimnasios/" + useGymStore().gymSelected.id + "/mis-suscripciones")
      .then(response => {
        this.mySubscriptions = response.data
      })
      .catch(() => {})
  },

  methods: {
    getMonthLiteralAndTwoNumberYear,

    userSubscriptionCreatedCallback(subscriptionCreated) {
      this.mySubscriptions.unshift(subscriptionCreated)
    }
  },
}
</script>