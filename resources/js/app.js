/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import Vue from 'vue';
window.Vue = require('vue');
import Router from 'vue-router'
Vue.use(Router)




import router from './router';
import store from './common/Store';

const app = new Vue({
    el: '#app',
    router,
    store,
});
