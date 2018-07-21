// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router';
import Mgr from '@/services/SecurityService';

Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(VueRouter);
let mgr = new Mgr();    

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth) {      
      mgr.getRole().then(
        sucess => {
          if (to.meta.role == sucess){
            next();
          }else {
            next('/accessdenied');
          }
        },
        err => {
          console.log(err);
        }
      );    
  } else {
    next();
  }
});