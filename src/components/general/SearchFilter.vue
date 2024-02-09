<template>
  <variable-input @change="performSearch" input-type="email" v-model="filterToApply" :placeholder="placeholder"></variable-input>
</template>

<script>
import VariableInput from '@/components/forms/inputs/VariableInput.vue'

export default {
  name: "SearchFilter",

  components: { VariableInput },

  emits: ["update:modelValue"],

  props: {
    modelValue: Array,
    searchFields: {
      required: true,
      type: Array
    },
    placeholder: null
  },

  data() {
    return {
      filterToApply: ""
    }
  },

  mounted() {
    this.$emit("performSearch", this.arrayData)
  },

  methods: {
    performSearch() {

      console.log("asdf")
      this.emit("update:modelValue",
        this.modelValue.filter(item => item.name === this.filterToApply)
      )
    }
  }
}
</script>