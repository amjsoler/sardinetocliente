<template>
  <form class="space-y-4">
    <section class="flex flex-row space-x-3">
      <form-group class="flex-grow">
        <span-label>{{ $t("createMetric.inputWeight") }}</span-label>
        <number-input v-model="metricToCreate.peso" />
        <small-error v-if="errors.peso">
          {{ errors.peso[0]}}
        </small-error>
      </form-group>
      <form-group class="flex-grow">
        <span-label>{{ $t("createMetric.inputFat") }}</span-label>
        <number-input v-model="metricToCreate.porcentaje_graso" />
        <small-error v-if="errors.porcentaje_graso">
          {{ errors.porcentaje_graso[0]}}
        </small-error>
      </form-group>
    </section>
    <form-group>
      <button-submit @button-submit="createNewMetric">
        {{ $t("createMetric.submit") }}
      </button-submit>
    </form-group>
  </form>
</template>

<script>
import FormGroup from '@/components/forms/FormGroup.vue'
import SpanLabel from '@/components/forms/SpanLabel.vue'
import ButtonSubmit from '@/components/forms/ButtonSubmit.vue'
import SmallError from '@/components/forms/SmallError.vue'
import { mapState } from 'pinia'
import { useValidationStore } from '@/stores/validation.js'
import axios from 'axios'
import NumberInput from '@/components/forms/inputs/NumberInput.vue'

export default {
  name: "CreateMetric",
  components: { NumberInput, SmallError, ButtonSubmit, SpanLabel, FormGroup },

  emits: ["metricCreated"],

  data() {
    return {
      metricToCreate: {
        peso: "",
        porcentaje_graso: ""
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
    createNewMetric() {
      axios.post(import.meta.env.VITE_SERVICE_BASE_URL +
        "metricas",
        this.metricToCreate
        )
        .then((response) => {
          this.$emit("metricCreated", response.data)

          this.metricToCreate = {
            peso: "",
            porcentaje_graso: ""
          }
        })
        .catch(() => {
        })
    }
  }
}
</script>