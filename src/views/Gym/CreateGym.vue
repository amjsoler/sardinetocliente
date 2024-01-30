<template>
    <container-v-align-no-background>
      <h1 class="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        {{$t("createGym.title")}}
      </h1>
      <form class="space-y-5 md:space-y-6">
        <form-group>
          <span-label>{{$t("createGym.form.name")}}</span-label>
          <text-input v-model="newGym.nombre" />
          <small-error v-if="errors.nombre">
            {{ errors.nombre[0] }}
          </small-error>
        </form-group>

        <form-group>
          <span-label>{{$t("createGym.form.direccion")}}</span-label>
          <text-input v-model="newGym.direccion" />
          <small-error v-if="errors.direccion">
            {{ errors.direccion[0] }}
          </small-error>
        </form-group>

        <form-group>
          <span-label>{{$t("createGym.form.descripcion")}}</span-label>
          <text-input v-model="newGym.descripcion" />
          <small-error v-if="errors.descripcion">
            {{ errors.descripcion[0] }}
          </small-error>
        </form-group>

        <form-group>
          <span-label>{{$t("createGym.form.logo")}}</span-label>
          <text-input v-model="newGym.logo" />
          <small-error v-if="errors.logo">
            {{ errors.logo[0] }}
          </small-error>
        </form-group>


        <button-submit @button-submit="crearGimnasio">
          {{$t("createGym.form.submit")}}
        </button-submit>
      </form>
    </container-v-align-no-background>
</template>

<script>
import ContainerVAlignNoBackground from '@/components/containers/ContainerVAlignNoBackground.vue'
import FormGroup from '@/components/forms/FormGroup.vue'
import SpanLabel from '@/components/forms/SpanLabel.vue'
import TextInput from '@/components/forms/inputs/TextInput.vue'
import SmallError from '@/components/forms/SmallError.vue'
import { mapState } from 'pinia'
import { useValidationStore } from '@/stores/validation.js'
import ButtonSubmit from '@/components/forms/ButtonSubmit.vue'
import axios from 'axios'
import { useGymStore } from '@/stores/gym.js'
import router from '@/router/index.js'

export default {
  name: "CreateGym",
  components: { ButtonSubmit, SmallError, TextInput, SpanLabel, FormGroup, ContainerVAlignNoBackground },
  data() {
    return {
      newGym: {
        nombre: "",
        direccion: "",
        descripcion: "",
        logo: ""
      }
    }
  },

  computed: {
    ...mapState(useValidationStore, {
      message: "message",
      errors: 'errors'
    })
  },

  methods: {
    crearGimnasio() {
      axios.post(import.meta.env.VITE_SERVICE_BASE_URL+"gimnasios", this.newGym)
        .then(response => {
          useGymStore().$patch({gymSelected: response.data})
          router.push({name: "GymClasses"})
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>