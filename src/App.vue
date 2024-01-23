<template>
  <router-view />

  <ul class="mt-28 fixed bottom-0">
    <li>
      <router-link :to='{name: "LoginUser"}'>Login de usuario</router-link>
    </li>
    <li>
      <router-link :to='{name: "RegisterUser"}'>Registro de usuario</router-link>
    </li>
  </ul>
  
</template>

<script>
export default {
  name: "App",
}
</script>