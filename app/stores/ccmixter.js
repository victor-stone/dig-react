import querystring  from 'querystring';
import rsvp         from 'rsvp';
import events       from '../models/events';
import ccmixter     from '../models/ccmixter';
import serialize    from '../models/serialize';
import RPCAdapter   from '../services/rpc-adapter';
import env          from '../services/env';
import Eventer      from '../services/eventer';

const USER_NOT_FETCHED   = -1;
const USER_FETCHING      = -2;
const USER_CACHED        = -3;
const USER_NOT_LOGGED_IN = -4;

class CCMixter extends Eventer
{
  constructor() {
    super(...arguments);
    this.adapter = RPCAdapter;

    this._userState = USER_NOT_FETCHED;
    this._currentUser = null;
    this._userPromises = [ ];
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
    function _debugResult(result) {
      this.emit( events.USER_LOGIN, result );
      return result;
    }
    return this._call('user/login?username=' +  username + '&password=' + password )
      .then( _debugResult );
  }

  logout() {
    return this._call('user/logout')
              .then( result => { 
                  this._userState = USER_NOT_LOGGED_IN; 
                  this.emit( events.USER_LOGIN, null );
                  return result; 
                });
  }

  currentUser() {
    if( global.IS_SERVER_REQUEST || this._userState === USER_NOT_LOGGED_IN ) {
      return rsvp.resolve( null );
    }

    if( this._userState === USER_CACHED ) {
      return rsvp.resolve( this._currentUser );
    }

    if( this._userState === USER_FETCHING ) {
      var deferred = rsvp.defer();
      this._userPromises.push(deferred);
      return deferred.promise;
    }

    this._userState = USER_FETCHING;

    return this._call('user/current')
              .then( this._setCurrentUser.bind(this) );
  }

  profile() {
    return this._call('user/profile').then( serialize( ccmixter.UserProfile ) );
  }

  _setCurrentUser(status) {
    this._userState = status.status === 'ok' ? USER_CACHED : USER_NOT_LOGGED_IN;
    this._currentUser = status.data; // might be 'undefined'
    this._userPromises.forEach( p => p.resolve(this._currentUser) );
    this._userPromises = [ ];
    return this._currentUser;
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
