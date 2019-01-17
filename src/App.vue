<template>
  <!--eslint-disable-->
  <div v-if="signedIn">
    <div id="app">
      <router-view/>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Mgr from './services/SecurityService'

export default {
  name: 'App',
  data () {
    return {
      mgr: new Mgr(),
      signedIn: true
    }    
  },
  mounted () {
    this.mgr.getSignedIn().then(
      signIn => {
        this.signedIn = signIn
      },
      err => {
        console.log(err)
      }
    )    
  }
}
</script>
