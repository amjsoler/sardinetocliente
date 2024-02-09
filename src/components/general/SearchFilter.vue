<template>
  <variable-input @input="performSearch" input-type="email" v-model="filterToApply" :placeholder="placeholder"></variable-input>
</template>

<script>
import VariableInput from '@/components/forms/inputs/VariableInput.vue'

export default {
  name: "SearchFilter",

  components: { VariableInput },

  props: {
    arrayData: Array,
    searchFields: {
      required: true,
      type: Array
    },
    placeholder: null
  },

  emits: ["searchPerformed"],

  data() {
    return {
      filterToApply: ""
    }
  },

  mounted() {
    this.$emit("searchPerformed", this.arrayData)
  },

  methods: {
    performSearch() {
      if(this.filterToApply){
        this.$emit("searchPerformed",
          this.arrayData.filter(item => this.filterCallback(item))
        )
      }else{
        this.$emit("searchPerformed", this.arrayData)
      }
    },

    filterCallback(item){
      var found = false
      this.searchFields.forEach(field =>
        item[field].toLowerCase().includes(this.filterToApply.toLowerCase()) ? found = true : null
      )

      return found
    }
  }
}
</script>