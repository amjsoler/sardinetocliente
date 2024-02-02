<template>
  <block-section>
    <section>
      Suscripción activa:

      Abonos activos:
    </section>
    <user-subscribe />
  </block-section>

  <block-section>
    <ul>
      <li v-for="subscription in mySubscriptions" v-bind:key="subscription.id">
        <section class="grid grid-cols-4">
          <p>{{ getMonthLiteralAndTwoNumberYear(subscription.created_at) }}</p>
          <p class="col-span-2">{{ subscription.tarifa_a_la_que_pertenece.nombre }}</p>
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

export default {
  name: "MySubscriptions",
  components: { BlockSection, UserSubscribe },

  data() {
    return {
      mySubscriptions: []
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

  methods: { getMonthLiteralAndTwoNumberYear },
}
</script>