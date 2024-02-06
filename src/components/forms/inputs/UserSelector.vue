<template>
  <p v-if="!userSelected" @click="selectingUser=!selectingUser" class="">Selecciona un usuario</p>
  <p v-else @click="userSelected=null;selectingUser=true">{{userSelected.nombre}} ({{userSelected.email}})Cambiar Usuario</p>
  <full-screen-blur-with-close-btn-container v-if="selectingUser">
    <block-section class="space-y-3">
        <text-input v-model="inputSearch" placeholder="Filtra por nombre o correo"/>
        <ul>
          <li v-for="user in getFilteredGymUsers" v-bind:key="user.id"
          @click="$emit('update:modelValue', user.id);selectingUser=!selectingUser;userSelected=user">
            {{ user.name }} ({{ user.email }})
          </li>
        </ul>
    </block-section>
  </full-screen-blur-with-close-btn-container>
</template>

<script>
import axios from 'axios'
import { useGymStore } from '@/stores/gym.js'
import FullScreenBlurWithCloseBtnContainer from '@/components/containers/FullScreenBlurWithCloseBtnContainer.vue'
import BlockSection from '@/components/containers/BlockSection.vue'
import TextInput from '@/components/forms/inputs/TextInput.vue'

export default {
  name: "UserSelector",
  components: { TextInput, BlockSection, FullScreenBlurWithCloseBtnContainer },

  props: ["modelValue"],
  emits: ["update:modelValue"],

  data() {
    return {
      gymUsers: [],
      inputSearch: "",
      selectingUser: false,
      userSelected: null
    }
  },

  computed: {
    getFilteredGymUsers() {
      return this.gymUsers.filter(item =>
      item.name.toLowerCase().includes(this.inputSearch.toLowerCase()) ||
      item.email.toLowerCase().includes(this.inputSearch.toLowerCase()))
    }
  },

  mounted() {
    console.log("Montando user selector")
    axios.get(import.meta.env.VITE_SERVICE_BASE_URL +
    "gimnasios/" + useGymStore().gymSelected.id + "/usuarios-invitados")
      .then(response => this.gymUsers = response.data)
      .catch(() => {})
  }
}
</script>