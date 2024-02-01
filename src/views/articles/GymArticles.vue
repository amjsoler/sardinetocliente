<template>

  <block-section>
    <user-buying-history />
  </block-section>

  <full-screen-blur-with-close-btn-container v-if="viewingArticle" @close-full-screen-container="viewingArticle=null">
    <block-section class="flex flex-col items-center flex-wrap space-y-3">
        <p class="text-2xl">{{ viewingArticle.nombre}}</p>
        <img alt="imagen de un artículo del gimnasio" class="flex-grow" src="@/assets/img.png">
        <p>{{ viewingArticle.stock}} uds.</p>
      <p>{{ viewingArticle.descripcion}}</p>
      <p>
        <credit-card-pay-icon @click="buyArticle(viewingArticle.id)" />
      </p>
    </block-section>
  </full-screen-blur-with-close-btn-container>
  <block-section v-if="gymArticles.length" class="space-y-3">
    <text-input v-model="searchInput" :placeholder="$t('gymArticle.searchPlaceholder')" />
    <div class="flex flex-row flex-wrap gap-3">
      <article v-for="(article) in getFilteredGymArticles" v-bind:key="article.id"
          @click="viewingArticle = article"
         class="overflow-hidden h-28 relative flex flex-col items-center justify-end
          bg-input-background-400 rounded-xl px-3 pt-3 pb-1 flex-grow">
        <img alt="imagen de un artículo del gimnasio" src="@/assets/img.png"
             class="absolute top-0 left-0 object-fill w-full h-auto
                    after:bg-gradient-to-t after:from-red-800 after:to-transparent">
        <div class="absolute inset-0 bg-gradient-to-t from-input-background-400 from-20% to-transparent to-40%" />
        <p class="z-10">
          {{ article.nombre }} ({{article.stock}})
        </p>
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
import CreditCardPayIcon from '@/components/icons/CreditCardPayIcon.vue'
import UserBuyingHistory from '@/views/articles/UserBuyingHistory.vue'

export default {
  name: "GymArticles",
  components: { UserBuyingHistory, CreditCardPayIcon, FullScreenBlurWithCloseBtnContainer, BlockSection, TextInput },

  data() {
    return {
      gymArticles: [],
      searchInput: "",
      viewingArticle: null
    }
  },

  computed: {
    getFilteredGymArticles(){
      if(this.searchInput){
        return this.gymArticles.filter(item => item.nombre.toLowerCase().includes(this.searchInput))
      }
      else{
        return this.gymArticles
      }
    }
  },

  mounted() {
    axios.get(import.meta.env.VITE_SERVICE_BASE_URL +
    "gimnasios/" + useGymStore().gymSelected.id+"/articulos")
      .then(response => {
        this.gymArticles = response.data
      })
      .catch(() => {

      })
  },

  methods: {
    buyArticle(articleId){
      axios.get(import.meta.env.VITE_SERVICE_BASE_URL +
      "gimnasios/"+useGymStore().gymSelected.id+"/articulos/"+articleId+"/comprar")
        .then(() => {

        })
        .catch(() => {
        })
    }
  }
}
</script>