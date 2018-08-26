//import EventEmitter
import { EventEmitter } from 'events';

//import the Auth0 JS Library
import auth0 from 'auth0-js';

//import Auth0 credentials from the auth0-variables.js file.
import { AUTH_CONFIG } from './auth0-variables';

//imports the history module, which will be created later.
import history from '../history';

export default class Auth extends EventEmitter {
  // An instance of Auth0 is instantiated using Auth0 credentials retrieved from auth0-variables.js file

  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    //Telling Auth0what to return after a successful authentication, in this case, the token and the id_token.
    responseType: 'token id_token',
    //To retrive a user's profile after authentication, we need to add openid profile to the scope.
    scope: 'openid profile'
  });

  //Local variable to hold a user's profile after authentication
  userProfile;

  //The methods below are bound in the constructor with 'this'
  constructor() {
    super();
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if(authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace('/home');
      } else if(err) {
        history.replace('/home')
        console.log(err);
        alert(`Error ${err.error}. Check the console for further details`);
      }
    });
  }

  setSession(authResult) {
    if(authResult && authResult.accessToken && authResult.idToken) {
      // Set the time that the access token will expire at
      let expiresAt = JSON.stringify(
        authResult.expiresIn * 1000 + new Date().getTime()
      );

      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);
      //naviage to the home route
      history.replace('/home');
    }
  }

  getAccessToken() {
    const accessToken = localStorage.getItem('access_token');

    if(!accessToken) {
      throw new Error('No access token found!!!!');
    }
    return accessToken;
  }

  getProfile(cb) {
    let accessToken = this.getAccessToken();
    this.auth0.client.userInfo(accessToken, (err,profile) => {
      if(profile) {
        this.userProfile = profile;
        localStorage.username = profile.nickname;
      }
      cb(err, profile);
    });
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.userProfile = null;
    //navigate to the home route
    history.replace('/home');
  }

  isAuthenticated() {
    //Check whether the current time is past the access token's expiry time.
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
