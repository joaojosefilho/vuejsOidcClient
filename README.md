# vuejsoidcclient

Project vueJs with oidc-client library

## Create the development environment

Npm:  
https://nodejs.org/en/download/

Npm Version Control on Windows:  
https://github.com/felixrieseberg/npm-windows-upgrade

Npm Version Control on Linux:  
https://github.com/creationix/nvm

## Technology Version

Version of npm used in the project: *6.5.0*  
Version of oidc-client: *1.6.1*

## Identity Provider

The configuration for the examples are based on running IdentityServer4 on localhost. A ready-to-go reference implementation for testing purposes can be found at [IdentityServer4AndApi][1].

## Documentation

Oidc-Client:  
https://github.com/IdentityModel/oidc-client-js/wiki


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run prod
```

## Connection with identity provider

Change the parameters of the variable **mgr** of the script [SecurityService.js][2] to the values of your identity provider.
``` bash
var mgr = new Oidc.UserManager({
  userStore: new Oidc.WebStorageStateStore(),  
  authority: 'https://localhost:44321',
  client_id: 'vuejsclient',
  redirect_uri: window.location.origin + '/static/callback.html',
  response_type: 'id_token token',
  scope: 'openid profile address roles identityserver4api country subscriptionlevel offline_access',
  post_logout_redirect_uri: window.location.origin + '/index.html',
  silent_redirect_uri: window.location.origin + '/static/silent-renew.html',
  accessTokenExpiringNotificationTime: 10,
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true
})
```

The script [SecurityService.js][2] contains triggers and methods from the [oidc-client][3] library.

## API

The script [ApiService.js][4] is responsible for making requests to an API using the libraries [oidc-client][3] and [axios][5]

The **baseUrl** constant receives the static part of the API Url.
``` bash
const baseUrl = 'https://localhost:44390/api/';
```

The **defineHeaderAxios()** method appends the access teken to the axios head.
``` bash
async defineHeaderAxios () {
    await user.getAcessToken().then(
      acessToken => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + acessToken
      }, err => {
        console.log(err)
      })  
  }
```

The **getAll()** method makes a get request. It receives as a parameter a string that will be concatenated with the **baseUrl** constant by forming the API Url.
``` bash
async getAll(api){
    await this.defineHeaderAxios() 
    return axios
      .get(baseUrl + api)
      .then(response => response.data)
      .catch(err => {
        console.log(err);
      })
  }
```

## Route protection

The script [index.js][7] is responsible for managing the application routes using the [vue router][6]. Each route has a field called **meta**. **Meta** receives two parameters: **requiresAuth** and **role**.

- **requiresAuth**[Bollean]: Responsible for protecting the route  
- **role**[String]: Users with this role will be allowed to access the route

``` bash
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
}
```

At each transition of routes in the application, the **router.beforeEach()** method of the script [index.js][8] is called. This method checks whether the user who is logged in is allowed to access the route. It does this by comparing the role of the user and the role of the route.
``` bash
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
```

[1]: https://github.com/joaojosefilho/IdentityServer4AndApi
[2]: https://github.com/joaojosefilho/vuejsOidcClient/blob/master/src/services/SecurityService.js
[3]: https://github.com/IdentityModel/oidc-client-js/wiki
[4]: https://github.com/joaojosefilho/vuejsOidcClient/blob/master/src/services/ApiService.js
[5]: https://github.com/axios/axios
[6]: https://router.vuejs.org
[7]: https://github.com/joaojosefilho/vuejsOidcClient/blob/master/src/router/index.js
[8]: https://github.com/joaojosefilho/vuejsOidcClient/blob/master/src/index.js
