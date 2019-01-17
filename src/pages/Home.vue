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
    <div class="container-fluid">
      <div class="row">
        <nav class="col-md-2 d-none d-md-block bg-light sidebar">
          <div class="sidebar-sticky">
            <ul class="nav flex-column">
              <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>Call API with Axios</span>
                <a class="d-flex align-items-center text-muted">
                  <span data-feather="plus-circle"></span>
                </a>
              </h6>
              <li class="nav-item">
                <a class="nav-link" @click="getAll('values')" href="#">
                  GetAll
                </a>
              </li>
            </ul>
            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>Token Information</span>
              <a class="d-flex align-items-center text-muted">
                <span data-feather="plus-circle"></span>
              </a>
            </h6>
            <ul class="nav flex-column mb-2">
              <li class="nav-item">
                <a class="nav-link"  @click="getToken()" href="#">
                  Token
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link"  @click="getTokenProfile()" href="#">
                  Token Profile
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link"  @click="getTokenId()" href="#">
                  Id Token
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link"  @click="getTokenSessionState()" href="#">
                  Session State
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link"  @click="getAccessToken()" href="#">
                  Access Token
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link"  @click="getTokenScopes()" href="#">
                  Scopes
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link"  @click="renewToken()" href="#">
                  Force Access Token Renewal
                </a>
              </li>
            </ul>
            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>Router Protection</span>
              <a class="d-flex align-items-center text-muted">
                <span data-feather="plus-circle"></span>
              </a>
            </h6>
            <ul class="nav flex-column mb-2">
              <li class="nav-item">
                <a class="nav-link" href="#/payinguser">
                  PayingUser
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#/freeuser">
                  FreeUser
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 class="h2">API</h1>
            </div>
            <pre id="resultsApi"></pre>

            <br>

            <h2>Information of Token</h2>
            <div class="table-responsive">
              <pre id="resultsToken"></pre>
            </div>
          </main>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Mgr from '../services/SecurityService'
import Api from '../services/ApiService'
export default {
  name: 'Home',
  data () {
    return {
      mgr: new Mgr(),
      api: new Api()
    }
  },
  methods: {
    async getAll(api){
      let self = this
      let result = await this.api.getAll(api)
      self.logApi(result)
    },
    getToken(){
      let self = this
      this.mgr.getUser().then(
        token => {
          self.logToken(token)
        },
        err => {
          console.log(err)
      })
    },
    getTokenId(){
      let self = this
      this.mgr.getIdToken().then(
        tokenId => {
          self.logToken(tokenId)
        },
        err => {
          console.log(err)
      })
    },
    getTokenSessionState(){
      let self = this
      this.mgr.getSessionState().then(
        sessionState => {
          self.logToken(sessionState)
        },
        err => {
          console.log(err)
      })
    },
    getAccessToken(){
      let self = this
      this.mgr.getAcessToken().then(
        acessToken => {
          self.logToken(acessToken)
        },
        err => {
          console.log(err)
      })
    },
    getTokenScopes(){
      let self = this
      this.mgr.getScopes().then(
        scopes => {
          self.logToken(scopes)
        },
        err => {
          console.log(err)
      })
    },
    getTokenProfile(){
      let self = this
      this.mgr.getProfile().then(
        tokenProfile => {
          self.logToken(tokenProfile)
        },
        err => {
          console.log(err)
      }) 
    },
    renewToken(){
      let self = this
      this.mgr.renewToken().then(
        newToken => {
          self.logToken(newToken)
        },
        err => {
          console.log(err)
      }) 
    },
    logApi(){
      document.getElementById('resultsApi').innerText = ''

      Array.prototype.forEach.call(arguments, function (msg) {
        if (msg instanceof Error) {
          msg = 'Error: ' + msg.message
        } else if (typeof msg !== 'string') {
          msg = JSON.stringify(msg, null, 2)
        }
        document.getElementById('resultsApi').innerHTML += msg + '\r\n'
      })
    },
    logToken(){
      document.getElementById('resultsToken').innerText = ''

      Array.prototype.forEach.call(arguments, function (msg) {
        if (msg instanceof Error) {
          msg = 'Error: ' + msg.message
        } else if (typeof msg !== 'string') {
          msg = JSON.stringify(msg, null, 2)
        }
        document.getElementById('resultsToken').innerHTML += msg + '\r\n'
      })

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  body {
  font-size: .875rem;
}

.feather {
  width: 16px;
  height: 16px;
  vertical-align: text-bottom;
}

/*
 * Sidebar
 */
.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100; /* Behind the navbar */
  padding: 48px 0 0; /* Height of navbar */
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: .5rem;
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}

@supports ((position: -webkit-sticky) or (position: sticky)) {
  .sidebar-sticky {
    position: -webkit-sticky;
    position: sticky;
  }
}

.sidebar .nav-link {
  font-weight: 500;
  color: #333;
}

.sidebar .nav-link .feather {
  margin-right: 4px;
  color: #999;
}

.sidebar .nav-link.active {
  color: #007bff;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
  color: inherit;
}

.sidebar-heading {
  font-size: .75rem;
  text-transform: uppercase;
}

/*
 * Content
 */
[role="main"] {
  padding-top: 48px; /* Space for fixed navbar */
}

/*
 * Navbar
 */
.navbar-brand {
  padding-top: .75rem;
  padding-bottom: .75rem;
  font-size: 1rem;
  background-color: rgba(0, 0, 0, .25);
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .25);
}

.navbar .form-control {
  padding: .75rem 1rem;
  border-width: 0;
  border-radius: 0;
}

.form-control-dark {
  color: #fff;
  background-color: rgba(255, 255, 255, .1);
  border-color: rgba(255, 255, 255, .1);
}

.form-control-dark:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, .25);
}

/*
 * Utilities
 */
.border-top { border-top: 1px solid #e5e5e5; }
.border-bottom { border-bottom: 1px solid #e5e5e5; }
</style>
