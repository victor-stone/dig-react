import rsvp         from 'rsvp';
import _            from 'underscore';
import API          from './api';
import UserStore    from '../../stores/user';
import events       from '../../models/events';
import { cookies }  from '../../unicorns';

const NOT_LOGGED_IN = null;

class User extends API
{
  login( username,password ) {
    return this._call('user/login?remember=1&username=' +  username + '&password=' + password )
      .then( result => {
        cookies.create( 'username', result.data );
        this.emit( events.USER_LOGIN, this._setCurrentUser(result) );
        return result;
      });
  }

  logout() {
    return this._call('user/logout')
              .then( result => { 
                  this._currentUser = NOT_LOGGED_IN;
                  this._currentProfile = NOT_LOGGED_IN;
                  cookies.remove('username');
                  this.emit( events.USER_LOGIN, NOT_LOGGED_IN );
                  return result; 
                });
  }

  currentUser() {
    if( global.IS_SERVER_REQUEST  ) {
      return rsvp.resolve( NOT_LOGGED_IN );
    }

    if( !_.isUndefined(this._currentUser) ) {
      return rsvp.resolve( this._currentUser );
    }

    if( document.cookie ) {
      var id = cookies.value('username');
      if( id ) {
        this._setCurrentUser( { data: id } );
        return rsvp.resolve( id );
      }
    }

    if( this._currentUserPromise ) {
      return this._currentUserPromise;
    }

    this._currentUserPromise = this._call('user/current')
                                      .then( this._setCurrentUser.bind(this) );

    return this._currentUserPromise;                                      
  }

  currentUserProfile() {
    if( !_.isUndefined(this._currentProfile) ) {
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
    return this._call(`user/follow/${type}/${follower}/${followee}`);
  }

  _setCurrentUser(status) {
    this._currentUser = status.data || NOT_LOGGED_IN; // data might be 'undefined'
    this._currentUserPromise = null;
    return this._currentUser;
  }

}

module.exports = User;
