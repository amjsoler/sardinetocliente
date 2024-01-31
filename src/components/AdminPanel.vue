<template>
  <p @click="adminPanelVisibility = !adminPanelVisibility"
     class="absolute left-3 inline cursor-pointer">
    <span class="small inline-block text-sm">Admin</span>
    <svg xmlns="http://www.w3.org/2000/svg" class="inline-block icon icon-tabler icon-tabler-lock-star" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11 21h-4a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2h9" /><path d="M8 11v-4a4 4 0 1 1 8 0v4" /><path d="M17.8 20.817l-2.172 1.138a.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a.39 .39 0 0 1 -.567 .411l-2.172 -1.138z" /></svg>
  </p>

  <div v-if="adminPanelVisibility"
       class="w-full h-dvh fixed top-0 backdrop-blur pt-20">
    <square-rounded-x-filled @click="adminPanelVisibility = !adminPanelVisibility"
                             class="absolute right-3 top-3 w-12 h-12"
    />
    <block-section>
      <p @click="router().push({name: 'InvitedUsers'})">Invitar usuario</p>
    </block-section>

    <block-section>
      <p @click="router().push({name: 'GymExercises'})">
        {{ $t("adminPanel.gymExercises")}}
      </p>
    </block-section>

    <block-section>
      <p @click="router().push({name: 'AdminGymArticles'})">Admin Gym Articles</p>
    </block-section>
  </div>
</template>
<script>
import SquareRoundedXFilled from '@/components/icons/SquareRoundedXFilled.vue'
import router from '@/router/index.js'
import BlockSection from '@/components/containers/BlockSection.vue'

export default {
  name: "AdminPanel",
  methods: {
    router() {
      return router
    }
  },
  components: { BlockSection, SquareRoundedXFilled },

  data() {
    return {
      adminPanelVisibility: false
    }
  }
}
</script>