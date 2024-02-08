<template>
  <p
    class="h-full"
    data-drawer-target="admin-panel-left"
    data-drawer-show="admin-panel-left"
    data-drawer-body-scrolling="false"
    aria-controls="admin-panel-left"
  >
<tool-icon />
  </p>

  <teleport to="body">
    <div id="admin-panel-left"
         class="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform
         -translate-x-full dark:bg-input-background w-56"
         tabindex="-1"
         aria-labelledby="admin-panel-left"
    >
      <h5>{{ $t("adminPanel.title") }}</h5>
      <square-rounded-x-filled
        data-drawer-hide="admin-panel-left"
         aria-controls="drawer-navigation"
         class="absolute top-2.5 end-2.5 size-8"
      />
      <div class="py-4 overflow-y-auto">
        <ul class="space-y-2 font-medium">
          <li>
            <button type="button"
                    class="flex items-center w-full p-2 transition duration-75 rounded-lg group"
                    data-collapse-toggle="admin-gym-dropdown"
            >
              <shop-store-icon />
              <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                {{ $t("adminPanel.gymSectionTitle") }}
              </span>
              <caret-down-filled class="size-4"/>
            </button>
            <ul id="admin-gym-dropdown" class="py-2 space-y-2">
              <li>
                <a class="w-full pl-10"
                   data-drawer-hide="admin-panel-left"
                   @click.prevent="router().push({name: 'GymRates'})">
                  {{ $t("adminPanel.gymRates")}}
                </a>
              </li>
              <li>
                <a class="w-full pl-10"
                   data-drawer-hide="admin-panel-left"
                   @click.prevent="router().push({name: 'GymSubscriptions'})">
                  {{ $t("adminPanel.gymSubscriptions")}}
                </a>
              </li>
              <li>
                <a class="w-full pl-10"
                   data-drawer-hide="admin-panel-left"
                   @click.prevent="router().push({name: 'GymExercises'})">
                  {{ $t("adminPanel.gymExercises")}}
                </a>
              </li>
            </ul>
          </li>


          <li>
            <button type="button"
                    class="flex items-center w-full p-2 transition duration-75 rounded-lg group"
                    data-collapse-toggle="admin-users-dropdown"
            >
              <users-icon />
              <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">{{ $t("adminPanel.usersSectionTitle") }}</span>
              <caret-down-filled class="size-4"/>
            </button>
            <ul id="admin-users-dropdown" class="py-2 space-y-2">
              <li>
                <a class="w-full pl-10"
                   data-drawer-hide="admin-panel-left"
                   @click.prevent="router().push({name: 'InvitedUsers'})">
                  {{ $t("adminPanel.inviteUser")}}
                </a>
              </li>
            </ul>
          </li>

          <li>
            <button type="button"
                    class="flex items-center w-full p-2 transition duration-75 rounded-lg group"
                    data-collapse-toggle="admin-shop-dropdown"
            >
              <shopping-bag-icon />
              <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                {{ $t("adminPanel.shopSectionTitle") }}
              </span>
              <caret-down-filled class="size-4"/>
            </button>
            <ul id="admin-shop-dropdown" class="py-2 space-y-2">
              <li>
                <a class="w-full pl-10"
                   data-drawer-hide="admin-panel-left"
                   @click.prevent="router().push({name: 'AdminGymArticles'})">
                  {{ $t("adminPanel.gymArticles")}}
                </a>
              </li>
              <li>
                <a class="w-full pl-10"
                   data-drawer-hide="admin-panel-left"
                   @click.prevent="router().push({name: 'AdminBuyingArticles'})">
                  {{ $t("adminPanel.articleBuyings")}}
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </teleport>
</template>
<script>
import router from '@/router/index.js'
import SquareRoundedXFilled from '@/components/icons/SquareRoundedXFilled.vue'
import ToolIcon from '@/components/icons/ToolIcon.vue'
import UsersIcon from '@/components/icons/UsersIcon.vue'
import CaretDownFilled from '@/components/icons/CaretDownFilled.vue'
import ShoppingBagIcon from '@/components/icons/ShoppingBagIcon.vue'
import ShopStoreIcon from '@/components/icons/ShopStoreIcon.vue'

export default {
  name: "AdminPanel",
  components: { ShopStoreIcon, ShoppingBagIcon, CaretDownFilled, UsersIcon, ToolIcon, SquareRoundedXFilled },
  methods: {
    router() {
      return router
    }
  },
}
</script>