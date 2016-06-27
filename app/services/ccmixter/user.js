import rsvp         from 'rsvp';
import API          from './api';
import UserStore    from '../../stores/user';
import events       from '../../models/events';
import { cookies }  from '../../unicorns';

import { bindAll }  from '../../unicorns';

const NOT_LOGGED_IN = null;

// TODO: convert all the this._currentUser magic to a 'Set'

class User extends API
{

  constructor() {
    super(...arguments);
    bindAll(this, '_onLoginSuccess','_onLoginReject','_onCurrentUserSuccess','_onCurrentUserReject');
  }

  _onLoginSuccess(username) {
    cookies.create( 'username', username );
    this._setCurrentUser(username);
    return this.currentUserProfile().then( profile => {
      this.emit( events.USER_LOGIN, username );
      return profile;
    });
  }

  _onLoginReject(status) {
    this.emit( events.USER_LOGIN, null );
    throw status;
  }

  login( username,password ) {
    return this.call('user/login?remember=1&username=' +  username + '&password=' + password )
      .then( this._onLoginSuccess, this._onLoginReject );
  }

  logout() {
    return this.call('user/logout')
              .then( result => { 
                  this._currentUser = NOT_LOGGED_IN;
                  this._currentProfile = NOT_LOGGED_IN;
                  cookies.remove('username');
                  this.emit( events.USER_LOGIN, NOT_LOGGED_IN );
                  return result; 
                });
  }

  _onCurrentUserSuccess(username) {
    return this._setCurrentUser(username);
  }

  _onCurrentUserReject(status) {
    this._setCurrentUser(NOT_LOGGED_IN);
    throw status;
  }

  currentUser() {
    if( global.IS_SERVER_REQUEST  ) {
      return rsvp.reject( NOT_LOGGED_IN );
    }

    if( '_currentUser' in this ) {
      return this._currentUser ? rsvp.resolve( this._currentUser ) : rsvp.reject( NOT_LOGGED_IN );
    }

    if( document.cookie ) {
      var id = cookies.value('username');
      if( id ) {
        this._setCurrentUser( id );
        return rsvp.resolve( id );
      }
    }

    if( this._currentUserPromise ) {
      return this._currentUserPromise;
    }

    this._currentUserPromise = this.call('user/current')
                                      .then( this._onCurrentUserSuccess, this._onCurrentUserReject );

    return this._currentUserPromise;                                      
  }

  currentUserProfile() {
    if( '_currentProfile' in this ) {
      return rsvp.resolve(this._currentProfile);
    }

    if( this._currentProfilePromise ) {
      return this._currentProfilePromise;
    }

    var user = new UserStore();
    this._currentProfilePromise = user.findUser(this._currentUser)
                                        .then( profile => {
                                          this._currentProfile = profile || NOT_LOGGED_IN;
                                          this._currentProfilePromise = null;
                                          return profile;
                                        });
    return this._currentProfilePromise;                                  
  }

  follow(type,follower,followee) {
    return this.call(`user/follow/${type}/${follower}/${followee}`);
  }

  _setCurrentUser(username) {
    this._currentUser = username;
    this._currentUserPromise = null;
    return this._currentUser;
  }

}

module.exports = User;
