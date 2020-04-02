/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import vSelect from 'vue-select'
Vue.component('v-select', vSelect)

import Print from 'vue-print-nb'
Vue.use(Print);

import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
Vue.component('datetime', VueCtkDateTimePicker);

import VueTextareaAutosize from 'vue-textarea-autosize'
Vue.use(VueTextareaAutosize)

const moment = require('moment')
require('moment/locale/fr')
Vue.use(require('vue-moment'), {
    moment
})
window.moment = moment;

Vue.prototype.$userId = parseInt(document.querySelector("meta[name='user-id']").getAttribute('content'));


/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

const files = require.context('./', true, /\.vue$/i)
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

window.Fire = new Vue();

const app = new Vue({
    el: '#app',
});

Vue.directive('focus', {
  inserted(el) {
    // if set, tabindex makes any kind of element focusable
    // if set to -1 it remains unreachable with tab
    const tabIndexAttr = jQuery(el).attr('tabindex');
    const hasTabIndex = _.isNumber(tabIndexAttr);
    if (!hasTabIndex) {
      jQuery(el).attr('tabindex', -1);
    }
    el.focus();
  },
});

require('./custom');