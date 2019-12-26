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

import AxiosAjaxDetect from './common/AxiosAjaxDetect';


//third party components
import VueProgressBar from 'vue-progressbar'
Vue.use(VueProgressBar,{
    color: '#42629c',
    failedColor: '#b71c1c',
    thickness: '5px',
    transition: {
        speed: '0.2s',
        opacity: '0.6s',
        termination: 300
    },
    autoRevert: true,
    inverse: false
});
import Spinner from 'vue-simple-spinner'
import Notifications from 'vue-notification'
Vue.use(Notifications)



import router from './router';
import store from './common/Store';

const app = new Vue({
    el: '#app',
    router,
    store,
    components: {
        'vue-simple-spinner' : Spinner
    },
    mounted(){
        // init progress bar 
        AxiosAjaxDetect.init(()=>{
            this.$Progress.start();
        },()=>{
            this.$Progress.finish();
        });
    },
    computed: {
        showLoader() {
            return store.getters.showLoader;
        },
    }
});
