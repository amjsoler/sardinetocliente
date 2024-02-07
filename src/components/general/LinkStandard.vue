<template>
  <router-link :to="destination"
     class="font-medium dark:text-primary-500"
  >
    <slot />
  </router-link>
</template>

 <script>
 export default {
   props: {
     destination: {
       type: Object,
       required: true
     }
   }
 }
 </script>