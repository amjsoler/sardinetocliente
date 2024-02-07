import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

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
  localStorage.setItem('myGyms', JSON.stringify(state.myGyms))
  localStorage.setItem('gymSelected', JSON.stringify(state.gymSelected))
})

app.mount('#app')