<template>
  <div class="flex items-center text-2xl font-semibold text-gray-900 dark:text-white">
    <app-logo class="w-8 h-8" />
    {{ $t("APP_TITLE")}}
  </div>
</template>
<script>
import AppLogo from '@/components/icons/AppLogo.vue'

export default {
  components: { AppLogo }
}
</script>