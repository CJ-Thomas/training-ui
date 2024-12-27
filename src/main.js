import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import LoginPage from './pages/LoginPage.vue';
import RegisterPage from './pages/RegisterPage.vue';
import ForyouPage from './pages/v1/ForyouPage.vue';
import LayoutPage from './pages/LayoutPage.vue';
import CreatePage from './pages/v1/CreatePage.vue';
import ProfilePage from './pages/v1/ProfilePage.vue';
import HomePage from './pages/HomePage.vue';
import store from './store/store';
import SettingsPage from './pages/v1/SettingsPage.vue';

Vue.use(VueRouter);
Vue.config.productionTip = false


const router = new VueRouter({
  mode:"history",
  routes:[
    {
      path:'/',
      component:HomePage
    },
    {
      path:'/login',
      component:LoginPage
    },
    {
      path:'/register',
      component:RegisterPage
    },
    {
      path: '/v1',
      component:LayoutPage,
      children: [
        {
          path:'for-you',
          component: ForyouPage
        },
        {
          path:'create-post',
          component: CreatePage
        },
        {
          path:'profile',
          component: ProfilePage
        },
        {
          path:'settings',
          component: SettingsPage
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next)=>{
  
  if(to.path !== '/login' && to.path !== '/' && to.path !== '/register' && !store.getters.stateIsAuth)
    next({ path:'/login'})
  else if(to.path === '/login' && store.getters.stateIsAuth)
    next({path: from.path})
  else
    next()

})

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
