import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import {store} from './store.js'
import VueFire from 'vuefire'
import firebase from 'firebase'

//import styling
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


import profile from './components/profile.vue'
import home from './components/home.vue'
import login from './components/login.vue'
import signup from './components/signup.vue'
import owner from './components/owner.vue'


Vue.use(VueRouter)
Vue.use(BootstrapVue)
// connect Firebase to Vue
Vue.use(VueFire);

// turn off the console note about switching to production mode
Vue.config.productionTip = false

//routes and url path
const routes = [
    { path:'/', component:home, props: true},
    { path:'*', redirection: "/"},
    { path:'/login/', component:login, props: true},
    { path:'/signup/', component:signup, props: true},
    { path:'/profile/', component:profile ,
      props:{
        header: true,
        content: true
      },
   },
   {
      path: '/owner/',
      component: owner,
      meta: { 
          requiresAuth: true
      },
},
]

//creation of router
const router = new VueRouter({
    routes,
    mode: 'history'
})

//manages the authenticated views behavior of the router.
router.beforeEach((to, from, next) => {
  const currentUser =  firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('/');
  else if (!requiresAuth && currentUser) next('/owner/')
  else next();
});

//creating vue
new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
})
