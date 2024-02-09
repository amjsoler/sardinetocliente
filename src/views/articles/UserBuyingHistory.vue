<template>
  <button-submit class="flex flex-row items-center justify-center" @button-submit="buyingHistoryVisibility = !buyingHistoryVisibility">
    {{ $t("userBuyingHistory.viewBuyingHistory") }}
  </button-submit>

  <full-screen-blur-with-close-btn-container @close-full-screen-container="buyingHistoryVisibility=!buyingHistoryVisibility" v-if="buyingHistoryVisibility">
    <block-section>
      <div class="flex flex-row flex-wrap gap-3">
        <article v-for="(article) in myBuyings" v-bind:key="article.id"
                  class="flex flex-col items-center justify-center flex-grow space-y-2 bg-input-background
rounded-lg py-3"
        >
            <p>{{ article.nombre }}</p>
          <p>{{ getFullDate(article.pivot.created_at) }}</p>
          <p class="flex flex-row gap-3">
            <credit-card :class="{'text-red-300':!article.pivot.pagada, 'text-green-300':article.pivot.pagada}"></credit-card>
            <deliver-truck :class="{'text-red-300':!article.pivot.entregada, 'text-green-300':article.pivot.entregada}"></deliver-truck>
          </p>
        </article>
      </div>
    </block-section>
  </full-screen-blur-with-close-btn-container>
</template>

<script>
import axios from 'axios'
import { useGymStore } from '@/stores/gym.js'
import ButtonSubmit from '@/components/forms/ButtonSubmit.vue'
import CaretDownFilled from '@/components/icons/CaretDownFilled.vue'
import FullScreenBlurWithCloseBtnContainer from '@/components/containers/FullScreenBlurWithCloseBtnContainer.vue'
import BlockSection from '@/components/containers/BlockSection.vue'
import CreditCard from '@/components/icons/CreditCard.vue'
import DeliverTruck from '@/components/icons/Delivertruck.vue'
import { getSelectedGymId } from '@/helpers/Helpers.js'

export default {
  name: "UserBuyingHistory",
  components: { DeliverTruck, CreditCard, BlockSection, FullScreenBlurWithCloseBtnContainer, CaretDownFilled, ButtonSubmit },

  data() {
    return {
      buyingHistoryVisibility: false,
      myBuyings: []
    }
  },

  mounted() {
    axios.get(import.meta.env.VITE_SERVICE_BASE_URL+
    "gimnasios/" + getSelectedGymId() + "/articulos/historial-compras")
      .then(response => {
        this.myBuyings = response.data
      })
      .catch(() => {
      })
  },

  methods: {
    getFullDate(stringDate){
      const date = new Date(stringDate)

      return date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()
    },
  }
}
</script>