import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { i18n } from '@/lang/index.js'
import App from './App.vue'
import router from './router'
import initSubscribers from '@/stores/initSubscribers.js'

const app = createApp(App)

app.use(createPinia())
app.use(i18n);
app.use(router)

  //// SUBSCRIBERS ////
initSubscribers()

app.mount('#app')