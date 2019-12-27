require('./bootstrap');

import Vue from 'vue';
window.Vue = require('vue');
import Router from 'vue-router'
import AxiosAjaxDetect from './common/AxiosAjaxDetect';
import router from './router';
import store from './common/Store';
Vue.use(Router)


//third party components
import VueProgressBar from 'vue-progressbar'
import Spinner from 'vue-simple-spinner'
import Notifications from 'vue-notification'
Vue.use(Notifications)
Vue.use(VueProgressBar, {
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

//custom components
Vue.component('v-table', require('./components/VTable.vue').default);


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
