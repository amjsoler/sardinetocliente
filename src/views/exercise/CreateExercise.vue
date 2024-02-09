<template>
  <block-section>
    <p @click="createFormVisibility = !createFormVisibility"
       class="flex flex-row items-center justify-center cursor-pointer"
    >
      {{ $t("createExercise.buttonCreate")}}
      <caret-down-filled />
    </p>
    <section v-if="createFormVisibility">
      <form class="space-y-3">
        <form-group>
          <span-label>{{ $t("createExercise.nameLabel") }}</span-label>
          <text-input v-model="newExercise.nombre"></text-input>
          <small-error v-if="errors.nombre">{{ errors.nombre[0] }}</small-error>
        </form-group>

        <form-group>
          <span-label>{{ $t("createExercise.descriptionLabel") }}</span-label>
          <text-input v-model="newExercise.descripcion"></text-input>
          <small-error v-if="errors.descripcion">{{ errors.descripcion[0] }}</small-error>
        </form-group>

        <form-group>
          <span-label>{{ $t("createExercise.urlVideoLabel") }}</span-label>
          <text-input v-model="newExercise.demostracion"></text-input>
          <small-error v-if="errors.demostracion">{{ errors.demostracion[0] }}</small-error>
        </form-group>

        <button-submit @button-submit="createExercise">
          {{ $t("createExercise.submit") }}
        </button-submit>
      </form>
    </section>
  </block-section>
</template>
<script>
import BlockSection from '@/components/containers/BlockSection.vue'
import CaretDownFilled from '@/components/icons/CaretDownFilled.vue'
import FormGroup from '@/components/forms/FormGroup.vue'
import SpanLabel from '@/components/forms/SpanLabel.vue'
import TextInput from '@/components/forms/inputs/TextInput.vue'
import SmallError from '@/components/forms/SmallError.vue'
import ButtonSubmit from '@/components/forms/ButtonSubmit.vue'
import { mapState } from 'pinia'
import { useValidationStore } from '@/stores/validation.js'
import { useGymStore } from '@/stores/gym.js'
import axios from 'axios'

export default {
  name: "CreateExercise",
  components: { ButtonSubmit, SmallError, TextInput, SpanLabel, FormGroup, CaretDownFilled, BlockSection },
  emits: ["exerciseCreated"],

  data() {
    return {
      createFormVisibility: false,
      newExercise: {
        nombre: "",
        descripcion: "",
        demostracion: ""
      }
    }
  },

  computed: {
    ...mapState(useValidationStore, {
      message: 'message',
      errors: 'errors'
    })
  },

  methods: {
    createExercise() {
      axios.post(import.meta.env.VITE_SERVICE_BASE_URL + "gimnasios/"+getSelectedGymId()+"/ejercicios",
      this.newExercise)
        .then(response => {
          this.createFormVisibility = false
          this.newExercise = {
            nombre: "",
            descripcion: "",
            demostracion: ""
          }
          this.$emit("exerciseCreated", response.data)
        })
        .catch(() => {

        })
    }
  }
}
</script>