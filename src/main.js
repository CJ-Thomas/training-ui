import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import LoginPage from './pages/LoginPage.vue';
import RegisterPage from './pages/RegisterPage.vue';
import ForyouPage from './pages/v1/ForyouPage.vue';
import LayoutPage from './pages/LayoutPage.vue';
import CreatePage from './pages/v1/CreatePage.vue';
import ProfilePage from './pages/v1/ProfilePage.vue';

Vue.use(VueRouter);

Vue.config.productionTip = false

const router = new VueRouter({
  mode:"history",
  routes:[
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
        }
      ]
    }
  ]
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')