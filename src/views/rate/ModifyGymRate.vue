<template>
  <block-section>
    <form class="space-y-3">
      <form-group>
        <span-label>{{ $t("createGymRate.nameLabel") }}</span-label>
        <text-input v-model ="localModelValue.nombre"></text-input>
        <small-error v-if="errors.nombre">{{ errors.nombre[0] }}</small-error>
      </form-group>

      <form-group>
        <span-label>{{ $t("createGymRate.precioLabel") }}</span-label>
        <text-input v-model="localModelValue.precio"></text-input>
        <small-error v-if="errors.precio">{{ errors.precio[0] }}</small-error>
      </form-group>

      <form-group>
        <span-label>{{ $t("createGymRate.creditosLabel") }}</span-label>
        <text-input v-model="localModelValue.creditos"></text-input>
        <small-error v-if="errors.creditos">{{ errors.creditos[0] }}</small-error>
      </form-group>

      <button-submit @button-submit="modifyRate">
        {{ $t("createGymRate.submit") }}
      </button-submit>
    </form>
  </block-section>

</template>

<script>
import SmallError from '@/components/forms/SmallError.vue'
import TextInput from '@/components/forms/inputs/TextInput.vue'
import FormGroup from '@/components/forms/FormGroup.vue'
import SpanLabel from '@/components/forms/SpanLabel.vue'
import ButtonSubmit from '@/components/forms/ButtonSubmit.vue'
import axios from 'axios'
import { useGymStore } from '@/stores/gym.js'
import { mapState } from 'pinia'
import { useValidationStore } from '@/stores/validation.js'
import BlockSection from '@/components/containers/BlockSection.vue'

export default {
  name: "ModifyGymRate",
  components: { BlockSection, ButtonSubmit, SpanLabel, FormGroup, TextInput, SmallError },
  props: {
    rateToModify: {
      required: true
    }
  },
  emits: ["rateModified"],
  data() {
    return {
      localModelValue: this.rateToModify
    }
  },

  computed: {
    ...mapState(useValidationStore, {
      message: 'message',
      errors: 'errors'
    })
  },
  methods: {
    modifyRate() {
      axios.put(import.meta.env.VITE_SERVICE_BASE_URL+
        "gimnasios/"+useGymStore().gymSelected.id+"/tarifas/"+this.localModelValue.id,
        this.localModelValue)
        .then(() => {
          this.$emit("rateModified", this.localModelValue);
        })
        .catch(() => {
        })
    }
  }
}
</script>