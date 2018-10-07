import Vue from "vue";
import VueI18n from 'vue-i18n'

import i18nEN from './i18n-en';
import i18nFR from './i18n-fr';
import i18nAR from './i18n-ar';

Vue.use(VueI18n);


const translations = {
  en: i18nEN,
  fr: i18nFR,
  ar: i18nAR,
}

const lang = localStorage.getItem('localeId') ? localStorage.getItem('localeId') : 'en';

export const i18n = new VueI18n({
  locale: lang,
  messages: translations,
});
