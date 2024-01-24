<template>
  <div class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
    <app-logo width="35px" height="35px" />
    {{ $t("APP_TITLE")}}
  </div>
</template>
<script setup>
import AppLogo from '@/components/icons/AppLogo.vue'
</script>