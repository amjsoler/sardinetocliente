<template>
  <form class="space-y-3 flex flex-row items-end gap-4">
    <form-group class="flex-grow">
      <span-label>{{ $t("createWeightScore.unormLabel") }}</span-label>
      <number-input v-model="newWeightScore.unorm"></number-input>
      <small-error v-if="errors.unorm">{{ errors.unorm[0] }}</small-error>
    </form-group>

    <save-icon class="h-10 w-10" @click="createWeightScore">

    </save-icon>
  </form>
</template>
<script>
import FormGroup from '@/components/forms/FormGroup.vue'
import SpanLabel from '@/components/forms/SpanLabel.vue'
import SmallError from '@/components/forms/SmallError.vue'
import { mapState } from 'pinia'
import { useValidationStore } from '@/stores/validation.js'
import { useGymStore } from '@/stores/gym.js'
import axios from 'axios'
import NumberInput from '@/components/forms/inputs/NumberInput.vue'
import SaveIcon from '@/components/icons/SaveIcon.vue'

export default {
  name: "CreateWeightScore",
  components: { SaveIcon, NumberInput, SmallError, SpanLabel, FormGroup },
  props: {
    "exerciseId": {
      required: true
    }
  },

  emits: ["weightScoreCreated"],

  data() {
    return {
      createFormVisibility: false,
      newWeightScore: {
        unorm: null
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
    createWeightScore() {
      axios.post(import.meta.env.VITE_SERVICE_BASE_URL +
        "gimnasios/"+useGymStore().gymSelected.id+"/ejercicios/"+ this.exerciseId + "/registros-de-peso",
        this.newWeightScore)
        .then(response => {
          this.newWeightScore = {
            unorm: "",
          }
          this.$emit("weightScoreCreated", response.data)
        })
        .catch(() => {

        })
    }
  }
}
</script>