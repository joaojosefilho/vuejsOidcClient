<template>
  <div v-if="signedIn">
    <div id="app">
      <!--img src="./assets/logo.png"-->
      <router-view/>
    </div>
  </div>
</template>

<script>
import Mgr from './services/SecurityService';

export default {  
  name: 'App',
  data() {
    return {
      mgr: new Mgr(),
      signedIn: true
    };    
  },
  mounted() {    
    this.mgr.getSignedIn().then(
      sucess => {
        this.signedIn = sucess;
      },
      err => {
        console.log(err);
      }
    );    
  }
}
</script>

<style>
  @import 'bootstrap/dist/css/bootstrap.css';
  @import 'bootstrap-vue/dist/bootstrap-vue.css';
</style>
