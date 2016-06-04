import querystring  from 'querystring';
import rsvp         from 'rsvp';
import _            from 'underscore';
import User         from './user';
import events       from '../models/events';
import ccmixter     from '../models/ccmixter';
import serialize    from '../models/serialize';
import RPCAdapter   from '../services/rpc-adapter';
import env          from '../services/env';
import Eventer      from '../services/eventer';
import { cookies }  from '../unicorns';

/*
  TODO: Move this to ./services and refactor
*/

const NOT_LOGGED_IN = null;

class CCMixter extends Eventer
{
  constructor() {
    super(...arguments);
    this.adapter = RPCAdapter;
  }

  _call(cmd) {
    return this.adapter.callOne(cmd).then( result => {
      if( typeof result.status === 'undefined' || result.status === 'error' ) {
        throw new Error('the request did not go through ' + (result.errmsg || 'because error'));
      }
      return (result.data && Array.isArray(result.data) && result.data.length && result.data[0]) || result;
    }).catch( e => {
      env.alert('danger', 'wups, that didn\'t work so well: ' + e.message );
    });
  }

  // USER 

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

    var user = new User();
    this._currentProfilePromise = user.findUser(this._currentUser)
                                        .then( profile => {
                                          this._currentProfile = profile || NOT_LOGGED_IN;
                                          this._currentProfilePromise = null;
                                          return profile;
                                        });
    return this._currentProfilePromise;                                  
  }

  _setCurrentUser(status) {
    this._currentUser = status.data || NOT_LOGGED_IN; // might be 'undefined'
    this._currentUserPromise = null;
    return this._currentUser;
  }

  follow(type,follower,followee) {
    return this._call(`user/follow/${type}/${follower}/${followee}`);
  }

  // USER FEED

  markFeedAsSeen(userid) {
    return this._call('feed/lastseen/' + userid);
  }

  // PLAYLISTS 

  createDynamicPlaylist(name,queryParamsString) {
    var q = queryParamsString + '&title=' + name;
    return this._call('playlist/create/dynamic?' + q).then( serialize( ccmixter.Playlist ) );
  }

  /* not used here (yet) */
  createStaticPlaylist(name,description) {
    var q = 'name=' + name + '&cart_description=' + description;
    return this._call('playlist/create?' + q).then( serialize( ccmixter.Playlist ) );
  }

  deletePlaylist(id) {
    return this._call('playlist/delete/' + id);
  }

  removeTrackFromPlaylist(upload,id) {
    return this._call('playlist/removetrack/' + upload + '/' + id);
  }

  updateDynamicPlaylist(id,queryParamsString) {
    var q = queryParamsString;
    return this._call('playlist/update/dynamic/' + id + '?' + q);
  }

  toggleFeaturedPlaylist(id) {
    return this._call('playlist/feature/' + id);
  }

  updatePlaylist(id,fields) {
    var q = querystring.stringify(fields);
    return this._call('playlist/update/' + id + '?' + q).then( serialize(ccmixter.PlaylistHead) );
  }

  reorderPlaylist(id,reorderSpec) {
    return this._call('playlist/reorder/' + id + '?' + reorderSpec);
  }
}

module.exports = new CCMixter();
