import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import PayingUser from '@/components/PayingUser'
import FreeUser from '@/components/FreeUser'
import AccessDenied from '@/components/AccessDenied'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
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
      component: AccessDenied
    }
  ]
})
