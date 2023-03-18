import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import ResetPassword from '@/pages/ResetPassword.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history', // set the router mode to use HTML5 history API
  base: process.env.BASE_URL, // set the base URL of the Vue app
  routes,
  linkActiveClass: "active",
  routes: [
    {
      path: '/resetpassword/:id/:token',
      name: 'resetpassword',
      component: ResetPassword
    }
  ]
})

export default router
