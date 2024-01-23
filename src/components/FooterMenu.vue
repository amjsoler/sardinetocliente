<template>
     <ul class="mt-28 fixed bottom-0 w-full flex flex-row text-white gap-4 justify-center h-12 bg-black items-center">
    <li>
      <router-link :to="{ name: 'LoginUser' }">Login de usuario</router-link>
    </li>
    <li>
      <router-link :to="{ name: 'RegisterUser' }">Registro de usuario</router-link>
    </li>
  </ul>
</template>

<script>
export default {
    name: "FooterMenu",
}
</script>