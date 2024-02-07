import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
const app = createApp(App)

import filees from './lang/es.json';
import fileen from './lang/en.json';
import { createI18n } from 'vue-i18n'

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

  //// SUBSCRIBERS ////
import initSubscribers from '@/stores/initSubscribers.js'
initSubscribers()

app.mount('#app')