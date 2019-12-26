

import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import Home from'./views/Home.vue'
import Forms from'./views/Forms.vue'

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/forms',
            name: 'forms',
            component: Forms
        },
    ]
});


// //router guards
// router.beforeEach((to, from, next) => {
//     next()
// })
    


export default router;