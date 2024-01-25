<template>
  <div class="flex-grow flex flex-col items-center
              px-6 py-8 mx-auto md:h-screen md:w-full lg:py-0"
  >
    <logo-and-app-name-horizontal />
    <div class="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-none"
        :class="{'bg-wite dark:bg-container-background-50': !blur,
                 'backdrop-blur': blur}"
    >
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
import LogoAndAppNameHorizontal from '@/components/LogoAndAppNameHorizontal.vue'

export default {
  components: { LogoAndAppNameHorizontal },
  props: {
    blur: {
      default: false
    }
  }
}
</script>