<template>
  <create-article @article-created="articleCreatedCallback"/>

  <full-screen-blur-with-close-btn-container v-if="articleToModify" @close-full-screen-container="articleToModify=null">
    <modify-article @article-modified="articleModified" :article-to-modify="articleToModify">
    </modify-article>
  </full-screen-blur-with-close-btn-container>

  <block-section v-if="gymArticles.length" class="space-y-3">
    <text-input v-model="searchInput" :placeholder="$t('gymArticle.searchPlaceholder')" />
    <ul>
      <li v-for="(article, index) in getFilteredGymArticles" v-bind:key="article.id"
          class="flex flex-row border-b-2 pb-2 border-input-background-400 items-center [&>*]:flex-grow space-y-4">
        <p>
          {{ article.nombre }} ({{article.stock}})
        </p>
        <p class="flex flex-row justify-end space-x-3">
          <edit-icon @click="articleToModify=article" class="text-primary-400 cursor-pointer"></edit-icon>
          <trash-x-icon @click="deleteArticle(article.id, index)" class="text-red-300 cursor-pointer"></trash-x-icon>
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
import CreateArticle from '@/views/articles/CreateArticle.vue'
import ModifyArticle from '@/views/articles/ModifyArticle.vue'

export default {
  name: "AdminGymArticles",
  components: { ModifyArticle, CreateArticle, FullScreenBlurWithCloseBtnContainer, TextInput, EditIcon, TrashXIcon, BlockSection },

  data() {
    return {
      gymArticles: [],
      articleToModify: null,
      searchInput: "",
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
    axios.get(import.meta.env.VITE_SERVICE_BASE_URL+"gimnasios/"+useGymStore().gymSelected.id+"/articulos")
      .then(response => {
        this.gymArticles = response.data
      })
      .catch(() => {

      })
  },

  methods: {
    articleCreatedCallback(createdArticle) {
      console.log("HLI")
      //Push the created exercise into the exercises array
      this.gymArticles.push(createdArticle)

      //Then, sort the exercises array
      this.gymArticles.sort(function(a, b){
        if(a.nombre >= b.nombre){
          return 1
        }else{
          return -1
        }
      })
    },

    deleteArticle(articleId, articleIndex) {
      axios.delete(import.meta.env.VITE_SERVICE_BASE_URL+"gimnasios/"+useGymStore().gymSelected.id+"/articulos/"+articleId)
        .then(() => {
          this.gymArticles.splice(articleIndex, 1)
        })
        .catch(() => {

        })
    },

    articleModified() {
      this.articleToModify = null
    }
  }
}
</script>