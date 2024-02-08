<template>
     <footer class="fixed bottom-0 w-full h-12 bg-container-background flex flex-row
     justify-center [&>p]:flex-grow border-t-2 border-input-background">
      <p class="flex flex-col items-center justify-center">
        <shopping-bag-icon @click="router().push({name: 'GymArticles'})" />
        <span class="text-[10px]">
          {{ $t("footerMenu.shopBtn") }}
        </span>
      </p>
      <p class="flex flex-col items-center justify-center">
        <calendar-time-icon />
        <span class="text-[10px]">
          {{ $t("footerMenu.classesBtn") }}
        </span>
      </p>
      <p class="flex flex-col items-center justify-center">
        <barbell-icon @click="router().push({name: 'UserExercises'})" />
        <span class="text-[10px]">
          {{ $t("footerMenu.userExercises") }}
        </span>
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