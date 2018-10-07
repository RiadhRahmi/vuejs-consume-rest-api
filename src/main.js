import Vue from 'vue'
import Vue2Crumbs from 'vue-2-crumbs'
import App from './App.vue'
import VTooltip from 'v-tooltip';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(Vue2Crumbs);
Vue.use(VTooltip);
Vue.directive('tooltip', VTooltip);
Vue.use(BootstrapVue);


/**
 * Jquery and jqueryUi
 */
import jQuery from 'jquery'
import $ from 'jquery'

global.jQuery = jQuery
global.$ = $
// require('jquery-ui');
let jqueryUi = require('jquery-ui/ui/widgets/datepicker.js');


/**
 * global filters
 */
import './filters/Prefix.js';

/**
 * global directives
 */
import './directives/Color.js';

/**
 * global mixins
 */
// import './mixins/Hello.js';


/**
 * router and vuex
 */
import {store} from "./store/index";
import {router} from './routes';

/**
 * i18n settings
 */
import {i18n} from "./i18n/index";


new Vue({
  el: '#app',
  router,
  render: h => h(App),
  i18n,
  store,

})
