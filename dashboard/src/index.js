import Vue from 'vue';
import VeeValidate from 'vee-validate';

import { store } from './_store';
import { router } from './_helpers';
import App from './app/App';
import vuetify from './plugins/vuetify.js';
import i18n from './i18n'

Vue.use(VeeValidate);
new Vue({
    el: '#app',
    router,
    store,
    i18n,
    vuetify,
    render: h => h(App)
});