import { defineStore } from 'pinia'

export const useValidationStore = defineStore('validation', {
  state: () => {
    return {
      message: '',
      errors: []
    }
  }
})
