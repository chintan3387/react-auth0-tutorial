* `auth0-js` is the client side JavaScript tooklit for the Auth0 API and how we connect to the Auth0 service/dashboard.
* `Bootstrap` is a CSS framework and it comes with CSS features that will help in styling the chat app. It's also needed for the `react-bootstrap` module.
* `events` is Node's event emitter for all engines.
* `history` is a Javascript library that lets you easily manage session history anywhere JavaScript runs and we'll be using it in our routes to manage navigation.
* `react-bootstrap` is a library of reusable-frontend components built with Bootstrap.
* `react-router` and `react-router-dom` helps with routing in our React App.

## AuthJS File methods

* `login()` This method calls the authorize function from auth0.js file.
* `handleAuthentication()` This method looks for a result after a successful authentication in the browser URL hash and processes it with the parseHash method from auth0.js.
* `setSession()` This method  sets the user's `access_token`, `id_token`, and a time at which the `access_token` will expire.
* `getAccessToken()` This method checks for an `access_token` in the localStorage and throws an error if there's none.
* `getProfile(cb)` this method utilizes Auth0's `clientInfo` which calls the `/userInfo` endpoint and retrieves the user's information. An `access_token` must be passed into the method as the first argument, and the second argument should have variables for error handling and to hold the user's profile. We then set the profile information to the `userProfile` variable declared above.

`logout()` This method removes the user's token from browser storage and effectively signs them out.

`isAuthenticated()` This method checks whether the expiry time for the access_token has passed.
