<template>
     <footer class="fixed bottom-0 w-full h-12 bg-input-background-400 flex flex-row justify-center [&>p]:flex-grow">
      <p class="flex flex-col items-center justify-center">
        <shopping-bag-icon @click="router().push({name: 'GymArticles'})"></shopping-bag-icon>
      </p>
      <p class="flex flex-col items-center justify-center">
        <calendar-time-icon ></calendar-time-icon>
      </p>
      <p class="flex flex-col items-center justify-center">
        <barbell-icon @click="router().push({name: 'UserExercises'})"></barbell-icon>
      </p>
     </footer>
</template>

<script>
import ShoppingBagIcon from '@/components/icons/ShoppingBagIcon.vue'
import CalendarTimeIcon from '@/components/icons/CalendarTimeIcon.vue'
import router from '@/router/index.js'
import BarbellIcon from '@/components/icons/BarbellIcon.vue'

export default {
    name: "FooterMenu",
  methods: {
    router() {
      return router
    }
  },
  components: { BarbellIcon, CalendarTimeIcon, ShoppingBagIcon }
}
</script>