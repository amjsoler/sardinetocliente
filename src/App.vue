<template>
  <router-view />

  <ul class="mt-28 fixed bottom-0">
    <li>
      <router-link :to='{name: "login"}'>Login de usuario</router-link>
    </li>
    <li>
      <router-link :to='{name: "register"}'>Registro de usuario</router-link>
    </li>
  </ul>
  
</template>

<script>
export default {
  name: "App",
}
</script>