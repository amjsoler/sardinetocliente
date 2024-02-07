import filees from './es.json';
import fileen from './en.json';
import { createI18n } from 'vue-i18n'

const messages = {
  en: fileen,
  es: filees
}
export const i18n = createI18n({
  locale: 'es', // set locale
  fallbackLocale: 'es', // set fallback locale
  messages, // set locale messages
})