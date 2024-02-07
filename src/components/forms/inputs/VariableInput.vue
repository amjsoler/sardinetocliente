<template>
  <input :value="modelValue"
         @input="$emit('update:modelValue', $event.target.value)"
         :type="inputType"
         :placeholder="placeholder"
         class="border rounded-lg block w-full p-2.5 dark:bg-input-background dark:border-gray-600
         dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue- dark:focus:border-blue-500"
  >
</template>
<script>
export default {
  name: "VariableInput",

  props: {
    'modelValue': {},
    "placeholder": {},
    "inputType": {
      default: "text"
    }
  },

  emits: ['update:modelValue']
}
</script>