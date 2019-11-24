import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';
import home from "./components/home.vue";
import login from "./components/login.vue";
import signup from "./components/signup.vue";

Vue.use(Router)

export default new Router({
    routes: [

        {
            path: '/',
            redirect: '/login'
          },

        {
        path:'/home',
        name:'home',
        component: home
    },
    {
        path:'/login',
        name:'Login',
        component: login
    },

    {
        path:'/signup',
        name:'Sign Up',
        component: signup
    }
    ]
})
router.beforeEach((to, from, next) => {
    let currentUser = firebase.auth().currentUser
    let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  
    if (requiresAuth && !currentUser) next('login')
    else if (!requiresAuth && currentUser) next('comics')
    else next()
  })
  
