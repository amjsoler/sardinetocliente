<template>
  <header class="fixed w-full flex flex-row justify-center py-3
   bg-blue-950">
    <p class="flex flex-row items-center">
      <span>
        {{ selectedGym.nombre }}
      </span>
      <span>
      <caret-down-filled width="20px" height="20px"></caret-down-filled>
    </span>
    </p>
  </header>
</template>
<script>
import CaretDownFilled from '@/components/icons/CaretDownFilled.vue'
import { mapState } from 'pinia'
import { useGymStore } from '@/stores/gym.js'

export default {
  name: "GymHeader",
  components: { CaretDownFilled },
  computed: {
    ...mapState(useGymStore, {
      selectedGym: 'gymSelected'
    })
  }
}
</script>