import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home'
import PayingUser from '../pages/PayingUser'
import FreeUser from '../pages/FreeUser'
import AccessDenied from '../pages/AccessDenied'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/payinguser',
      name: 'PayingUser',
      component: PayingUser,
      meta: {
        requiresAuth: true,
        role: ['PayingUser']
      }
    },
    {
      path: '/freeuser',
      name: 'FreeUser',
      component: FreeUser,
      meta: {
        requiresAuth: true,
        role: ['FreeUser']
      }
    },
    {
      path: '/accessdenied',
      name: 'AccessDenied',
      component: AccessDenied,
      meta: {
        requiresAuth: false
      }
    }
  ]
})
