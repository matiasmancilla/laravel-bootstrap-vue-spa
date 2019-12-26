import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


export default new Vuex.Store({
    state: {
        // loader
        showLoader: false,
    },
    mutations: {

        // loader
        showLoader(state) {
            state.showLoader = true
        },
        hideLoader(state) {
            state.showLoader = false
        },

    },
    getters: {

        // loader
        showLoader: state => {
            return state.showLoader
        },

    }
});