<template>
  <block-section>
    <form class="space-y-3">
      <form-group>
        <span-label>{{ $t("createArticle.nameLabel") }}</span-label>
        <text-input v-model ="localModelValue.nombre"></text-input>
        <small-error v-if="errors.nombre">{{ errors.nombre[0] }}</small-error>
      </form-group>

      <form-group>
        <span-label>{{ $t("createArticle.descriptionLabel") }}</span-label>
        <number-input v-model="localModelValue.descripcion"></number-input>
        <small-error v-if="errors.descripcion">{{ errors.descripcion[0] }}</small-error>
      </form-group>

      <form-group>
        <span-label>{{ $t("createArticle.stockLabel") }}</span-label>
        <text-input v-model="localModelValue.stock"></text-input>
        <small-error v-if="errors.stock">{{ errors.stock[0] }}</small-error>
      </form-group>

      <button-submit @button-submit="modifyArticle">
        {{ $t("createArticle.submit") }}
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
import NumberInput from '@/components/forms/inputs/NumberInput.vue'

export default {
  name: "ModifyArticle",
  components: { NumberInput, BlockSection, ButtonSubmit, SpanLabel, FormGroup, TextInput, SmallError },
  props: ["articleToModify"],
  emits: ["articleModified"],
  data() {
    return {
      localModelValue: this.articleToModify
    }
  },

  computed: {
    ...mapState(useValidationStore, {
      message: 'message',
      errors: 'errors'
    })
  },
  methods: {
    modifyArticle() {
      axios.put(import.meta.env.VITE_SERVICE_BASE_URL+
        "gimnasios/"+getSelectedGymId()+"/articulos/"+this.localModelValue.id,
        this.localModelValue)
        .then(() => {
          this.$emit("articleModified", this.localModelValue);
        })
        .catch(() => {
        })
    }
  }
}
</script>