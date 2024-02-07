<template>
  <div class="flex-grow flex flex-col items-center space-y-6 px-4">
    <logo-and-app-name-horizontal />
    <block-section blur="true">
      <slot />
    </block-section>
  </div>
</template>
<script>
import LogoAndAppNameHorizontal from '@/components/LogoAndAppNameHorizontal.vue'
import BlockSection from '@/components/containers/BlockSection.vue'

export default {
  components: { BlockSection, LogoAndAppNameHorizontal },
  props: {
    blur: {
      default: false
    }
  }
}
</script>