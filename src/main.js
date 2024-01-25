import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'

import { useValidationStore } from './stores/validation'

import App from './App.vue'
import router from './router'
const app = createApp(App)

import filees from './lang/es.json';
import fileen from './lang/en.json';
import { createI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user.js'
import { useGymStore } from '@/stores/gym.js'

const messages = {
  en: fileen,
  es: filees
}
const i18n = createI18n({
  locale: 'es', // set locale
  fallbackLocale: 'es', // set fallback locale
  messages, // set locale messages
})

app.use(i18n);
app.use(createPinia())
app.use(router)

const validationStore = useValidationStore()

//Si disponemos de token en el user store, lo metemos en cada request para poder hacer las acciones con autenticación
axios.interceptors.request.use(function(config){
  const userStore = useUserStore();
    if(userStore.user && userStore.user.access_token){
        config.headers.Authorization = "Bearer " + userStore.user.access_token
    }

    //TODO
    /*if(store.state.firebaseToken){
        config.headers.firebasetoken = store.state.firebaseToken
    }*/

    return config;
}, function(error){
    return Promise.reject(error)
});

/*Cosas a comprobar en todas las respuestas:
Si el server responde 200, borro/reseteo el array de errores de validaci�n y el mensaje para que en el formulario al que voy
no se muestre nada extra�o

Si el server responde 401 significa que no hay autenticaci�n, por tanto, o bien el user no est� logueado y ha intentado
acceder a alg�n sitio que no deb�a o el token que ha mandado ya no es v�lido
En ambos casos, borro el token de sesi�n en el store y en el localstorage y redirijo al login

Si el server responde 403 significa que no hay autorizaci�n para acceder al recurso que est� pidiendo. Si es as�,
capturo el error, lo logueo y redirijo a una p�gina de forbidden

Si recibo un c�digo 422, es un error de validaci�n, guardo el array de errores y el mensaje en el global state para mostrarlo

Si recibo un c�digo 460, significa que la cuenta del usuario no est� verificada y redirijo a la vista de verificaci�n
 */

axios.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      //Si recibo 200, borro el array de errores y mensaje para que no afecte a las páginas
      console.log('main.js: Response captured: 200')

      validationStore.errors = []
      validationStore.message = ""
    }

    return response
  },
  (error) => {
     if(error.response.status === 401){
        console.log("main.js: Response error captured: 401. Delete access token and reddirect to login");
       useUserStore().$patch({user: {access_token: null}})

       router.push({name: "LoginUser"})

       //TODO Avisar con alert al usuario de que la sesión ha terminado
    }

    else if(error.response.status === 403){
        console.log("main.js: Response error captured: 403. Forbidden action");

        router.push({name: "ForbiddenResource"});
    }

    else if (error.response.status === 422) {
      console.log('main.js: Response error captured: 422')
      if (
        error.response &&
        error.response.data &&
        error.response.data.errors &&
        error.response.data.message
      ) {
        validationStore.message = error.response.data.message
        validationStore.errors = error.response.data.errors
      }
    }
    else if(error.response.status === 460){
        console.log("main.js: Response error captured: 460. Cuenta no verificada, redirijo a la vista de verificación");
        router.push({name:"AccountVerify"});
    }
    /*else if(error.response.status === 404){
        console.log("main.js: Response error captured: 404. Recurso no encontrado. Muestro la vista 404");

        router.push({name:"NotFoundResource"});
    }
    else {
        //Si no conozco el status del error que se devuelve, lo logueo en servidor y muestro un toast
        globalHelpers.logError("Error con status desconocido", error);

        globalHelpers.mostrarToast("Ha ocurrido un error inesperado. Por favor, intentalo de nuevo m�s tarde y si el problema persiste, ponte en contacto con nosotros");
    }
 */
    // TODOstore.dispatch("procesandoAction", false);

    return Promise.reject(error)
  }
)

/*
//Este c�digo es el que se encarga de capturar los errores y mandar el log al servidor para tenerlo centralizado
app.config.errorHandler = (err, instance, info) => {
    console.log("Manejando error general: " + err + toString(instance) + toString(info))

    globalHelpers.logError("Se ha producido un error general",
        {
            userToken: store.state.tokenAuth,
            error: err,
            instance: instance,
            info: info
        })
}
*/

  //// SUBSCRIBERS ////
const userStore = useUserStore()
userStore.$subscribe((mutation, state) => {
  // persist the whole state to the local storage whenever it changes
  localStorage.setItem('user', JSON.stringify(state.user))
})

const gymStore = useGymStore()
gymStore.$subscribe((mutation, state) => {
  // persist the whole state to the local storage whenever it changes
  console.log("Subscribe gyms fired")
  localStorage.setItem('myGyms', JSON.stringify(state.myGyms))
})

app.mount('#app')