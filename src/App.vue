<template>
  <router-view />

  <system-alert></system-alert>
</template>

<script>
import SystemAlert from '@/components/SystemAlert.vue'

export default {
  name: 'App',
  components: { SystemAlert }
}

</script>

    FooterMenu