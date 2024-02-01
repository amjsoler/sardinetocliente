<template>
  <block-section>
    <p @click="createFormVisibility = !createFormVisibility"
       class="flex flex-row items-center justify-center cursor-pointer"
    >
      {{ $t("createGymRate.buttonCreate")}}
      <caret-down-filled />
    </p>
    <section v-if="createFormVisibility">
      <form class="space-y-3">
        <form-group>
          <span-label>{{ $t("createGymRate.nameLabel") }}</span-label>
          <text-input v-model="newRate.nombre"></text-input>
          <small-error v-if="errors.nombre">{{ errors.nombre[0] }}</small-error>
        </form-group>

        <form-group>
          <span-label>{{ $t("createGymRate.precioLabel") }}</span-label>
          <number-input v-model="newRate.precio"></number-input>
          <small-error v-if="errors.precio">{{ errors.precio[0] }}</small-error>
        </form-group>

        <form-group>
          <span-label>{{ $t("createGymRate.creditosLabel") }}</span-label>
          <number-input v-model="newRate.creditos"></number-input>
          <small-error v-if="errors.creditos">{{ errors.creditos[0] }}</small-error>
        </form-group>

        <form-group>
          <span-label>{{ $t("createGymRate.tipoLabel") }}</span-label>
          <text-input v-model="newRate.tipo"></text-input>
          <small-error v-if="errors.tipo">{{ errors.tipo[0] }}</small-error>
        </form-group>

        <button-submit @button-submit="createRate">
          {{ $t("createGymRate.submit") }}
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
  name: "CreateRate",
  components: { NumberInput, ButtonSubmit, SmallError, TextInput, SpanLabel, FormGroup, CaretDownFilled, BlockSection },
  emits: ["rateCreated"],

  data() {
    return {
      createFormVisibility: false,
      newRate: {
        nombre: "",
        precio: "",
        creditos: "",
        tipo: ""
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
    createRate() {
      axios.post(import.meta.env.VITE_SERVICE_BASE_URL + "gimnasios/"+useGymStore().gymSelected.id+"/tarifas",
        this.newRate)
        .then(response => {
          this.createFormVisibility = false
          this.newRate = {
            nombre: "",
            precio: "",
            creditos: "",
            tipo: ""
          }
          this.$emit("rateCreated", response.data)
        })
        .catch(() => {

        })
    }
  }
}
</script>