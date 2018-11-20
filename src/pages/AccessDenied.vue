<template>
  <!--eslint-disable-->
  <div>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#/">VueJs</a>    
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" @click="mgr.signOut()">Sign out</a>
        </li>
      </ul>
    </nav>
    <br><br><br><br>
    <div class="container">
      <div class="row">
        <div class="col-sm" align="center" >
          <span style="font-size:30px">Access Denied</span>
          <br>
          <span style="font-size:15px">Click</span>
          <a style="font-size:15px" href="#/">Hear</a>
          <span style="font-size:15px">Return to home page</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'AccessDenied'
}
</script>
