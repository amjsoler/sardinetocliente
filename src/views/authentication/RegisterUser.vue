<template>
  <section>
    <h3>Registro de usuario</h3>

    <form class="max-w-sm mx-auto">
      <div class="mb-5">
        <label for="nombre" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
        <input type="nombre" id="nombre" v-model="newUser.name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <small v-show="validationStore.errors.name" class="text-red-700">asfdasdf</small>
      </div>
      <div class="mb-5">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo electrónico</label>
        <input type="email" id="email" v-model="newUser.email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      </div>
      <div class="mb-5">
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
        <input type="password" id="password" v-model="newUser.password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      </div>
      <div class="mb-5">
        <label for="passwordr" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repite la contraseña</label>
        <input type="password" id="passwordr" v-model="newUser.password_confirmation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      </div>
      <button type="submit" @click.prevent="registrarUsuario" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>
  </section>
</template>

<script>
//TODO:
/* 
  - Errores de validation
  - Estilos de formulario
  - implementar dark y light mode a la vez
  - implementar subscriber para almacenar datos en local storage
*/
import axios from "axios";
import { useValidationStore } from '@/stores/validation';
import { useUserStore } from "@/stores/user";
import { mapActions, mapStores } from 'pinia';

export default {
    name: "RegisterUser",

    data() {
        return {
            newUser: {
              name:"",
              email:"",
              password:"",
              password_confirmation:""
            },
        }
    },

    computed: {
      ...mapStores(useValidationStore)
    },
    methods: {
      ...mapActions(useUserStore, ["registrarUsuarioOk"]),

        registrarUsuario() {
          //TODO Externalizar la URL del servicio en una variable de entorno
            axios.post("http://192.167.1.112:8765/api/registrarse", this.newUser)
            .then(response => {
                this.registrarUsuarioOk(response.data)

                //TODO Redirijo a otra ruta después de la acción
                //TODO vaciar las validaciones para que no interferencie con la siguiente petición
                //TODO Muestro un alert informándo del resultado de la operación
            })
            .catch(() => {})
        }
    }
}
</script>