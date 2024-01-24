<template>
  <router-link :to="destination"
     class="font-medium text-primary-600 hover:underline dark:text-primary-500"
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