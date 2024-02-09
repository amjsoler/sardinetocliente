<template>
  <block-section>
    <p @click="createFormVisibility = !createFormVisibility"
       class="flex flex-row items-center justify-center cursor-pointer"
    >
      {{ $t("createArticle.buttonCreate")}}
      <caret-down-filled />
    </p>
    <section v-if="createFormVisibility">
      <form class="space-y-3">
        <form-group>
          <span-label>{{ $t("createArticle.nameLabel") }}</span-label>
          <text-input v-model="newArticle.nombre"></text-input>
          <small-error v-if="errors.nombre">{{ errors.nombre[0] }}</small-error>
        </form-group>

        <form-group>
          <span-label>{{ $t("createArticle.descriptionLabel") }}</span-label>
          <text-input v-model="newArticle.descripcion"></text-input>
          <small-error v-if="errors.descripcion">{{ errors.descripcion[0] }}</small-error>
        </form-group>

        <form-group>
          <span-label>{{ $t("createArticle.stockLabel") }}</span-label>
          <number-input v-model="newArticle.stock"></number-input>
          <small-error v-if="errors.stock">{{ errors.stock[0] }}</small-error>
        </form-group>

        <button-submit @button-submit="createArticle">
          {{ $t("createArticle.submit") }}
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
import NumberInput from '@/components/forms/inputs/NumberInput.vue'

export default {
  name: "CreateArticle",
  components: { NumberInput, ButtonSubmit, SmallError, TextInput, SpanLabel, FormGroup, CaretDownFilled, BlockSection },
  emits: ["articleCreated"],

  data() {
    return {
      createFormVisibility: false,
      newArticle: {
        nombre: "",
        descripcion: "",
        stock: ""
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
    createArticle() {
      axios.post(import.meta.env.VITE_SERVICE_BASE_URL + "gimnasios/"+getSelectedGymId()+"/articulos",
        this.newArticle)
        .then(response => {
          this.createFormVisibility = false
          this.newArticle = {
            nombre: "",
            descripcion: "",
            stock: ""
          }
          this.$emit("articleCreated", response.data)
        })
        .catch(() => {

        })
    }
  }
}
</script>