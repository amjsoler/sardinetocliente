<template>
  <block-section>
    <form class="space-y-3">
      <form-group>
        <span-label>{{ $t("createExercise.nameLabel") }}</span-label>
        <text-input v-model ="localModelValue.nombre"></text-input>
        <small-error v-if="errors.nombre">{{ errors.nombre[0] }}</small-error>
      </form-group>

      <form-group>
        <span-label>{{ $t("createExercise.descriptionLabel") }}</span-label>
        <text-input v-model="localModelValue.descripcion"></text-input>
        <small-error v-if="errors.descripcion">{{ errors.descripcion[0] }}</small-error>
      </form-group>

      <form-group>
        <span-label>{{ $t("createExercise.urlVideoLabel") }}</span-label>
        <text-input v-model="localModelValue.demostracion"></text-input>
        <small-error v-if="errors.demostracion">{{ errors.demostracion[0] }}</small-error>
      </form-group>

      <button-submit @button-submit="modifyExercise">
        {{ $t("createExercise.submit") }}
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
  name: "ModifyExercise",
  components: { BlockSection, ButtonSubmit, SpanLabel, FormGroup, TextInput, SmallError },
  props: ["exerciseToModify"],
  emits: ["exerciseModified"],
  data() {
    return {
      localModelValue: this.exerciseToModify
    }
  },

  computed: {
    ...mapState(useValidationStore, {
      message: 'message',
      errors: 'errors'
    })
  },
  methods: {
    modifyExercise() {
      axios.put(import.meta.env.VITE_SERVICE_BASE_URL+
        "gimnasios/"+getSelectedGymId()+"/ejercicios/"+this.localModelValue.id,
        this.localModelValue)
        .then(() => {
          this.$emit("exerciseModified", this.localModelValue);
        })
        .catch(() => {
        })
    }
  }
}
</script>