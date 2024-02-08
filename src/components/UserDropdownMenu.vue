<template>
  <p
     class="h-full"
     data-drawer-target="user-drawer-right"
     data-drawer-show="user-drawer-right"
     data-drawer-placement="right"
     data-drawer-body-scrolling="false"
     aria-controls="user-drawer-right"
  >
    <img class="rounded-full size-full" src="@/assets/img.png" />
  </p>

  <teleport to="body">
    <!-- drawer component -->
    <div id="user-drawer-right"
         class="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full dark:bg-input-background w-56"
         tabindex="-1"
         aria-labelledby="drawer-right-label">
      <button type="button" data-drawer-hide="user-drawer-right"
              aria-controls="user-drawer-right"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8
               absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white" >
        <square-rounded-x-filled class="size-14"/>
      </button>

      <div class="mt-6 flex flex-col items-center space-y-6">
        <p class="w-1/2 flex flex-col items-center">
          <img class="rounded-full size-full" src="@/assets/img.png" />
          <span>{{ user.name }}</span>
        </p>
        <ul class="space-y-2">
          <li data-drawer-hide="user-drawer-right"
              @click="router().push({name: 'MyMetrics'})"
              class="flex items-center space-x-2"
          >
            <scale-icon />
            <p>{{ $t("userDropDownMenu.mymetrics") }}</p>
          </li>
          <li data-drawer-hide="user-drawer-right"
              @click="router().push({name: 'MySubscriptions'})"
              class="flex items-center space-x-2"
          >
            <!-- TODO: Cambiar este icono por algo que haga referencia a suscripciones -->
            <scale-icon />
            <p>{{ $t("userDropDownMenu.mySubscriptions") }}</p>
          </li>
        </ul>
      </div>
    </div>

  </teleport>
</template>
<script>
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/user.js'
import router from '@/router/index.js'
import SquareRoundedXFilled from '@/components/icons/SquareRoundedXFilled.vue'
import ScaleIcon from '@/components/icons/ScaleIcon.vue'

export default {
  name: "UserDropDownMenu",
  components: { ScaleIcon, SquareRoundedXFilled },
  methods: {
    router() {
      return router
    }
  },

  computed: {
    ...mapState(useUserStore, {
      user: 'user'
    }),
  }
}
</script>