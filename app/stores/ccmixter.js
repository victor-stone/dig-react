import querystring  from 'querystring';
import rsvp         from 'rsvp';
import ccmixter     from '../models/ccmixter';
import serialize    from '../models/serialize';
import RPCAdapter   from '../services/rpc-adapter';
import env          from '../services/env';

const CHECK_STATUS = true;

const USER_NOT_FETCHED   = -1;
const USER_FETCHING      = -2;
const USER_CACHED        = -3;
const USER_NOT_LOGGED_IN = -4;

/*
  states 
    not fetched
    current fetching
    fetched/cache
    not_logged in
*/

class CCMixter 
{
  constructor() {
    this.adapter = RPCAdapter;
    this._userState = USER_NOT_FETCHED;
    this._currentUser = null;
    this._userPromises = [ ];
  }

  _call(cmd,checkStatus) {
    return this.adapter.callOne(cmd).then( result => {
      if( checkStatus ) {
        if( typeof result.status === 'undefined' || result.status !== 'ok' ) {
          throw new Error('the request did not go through');
        }
      }
      return result;
    }).catch( e => {
      env.alert('danger', 'wups, that didn\'t work so well because ' + e.message );
    });
  }

  // USER 

  login( username,password ) {
    return this._call('user/login?username=' +  username + '&password=' + password );
  }

  logout() {
    return this._call('user/logout');
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

    return this.adapter.callOne('user/current')
              .then( serialize( ccmixter.User) )
              .then( model => this._setCurrentUser(model) )
              .catch( () => this._setCurrentUser(null) );
  }

  _setCurrentUser(model) {
    this._userState = model ? USER_CACHED : USER_NOT_LOGGED_IN;
    this._currentUser = model;
    this._userPromises.forEach( p => p.resolve(model) );
    this._userPromises = [ ];
    return model;
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
    return this._call('playlist/delete/' + id, CHECK_STATUS);
  }

  removeTrackFromPlaylist(upload,id) {
    return this._call('playlist/removetrack/' + upload + '/' + id, CHECK_STATUS);
  }

  updateDynamicPlaylist(id,queryParamsString) {
    var q = queryParamsString;
    return this._call('playlist/update/dynamic/' + id + '?' + q, CHECK_STATUS);
  }

  toggleFeaturedPlaylist(id) {
    return this._call('playlist/feature/' + id, CHECK_STATUS);
  }

  updatePlaylist(id,fields) {
    var q = querystring.stringify(fields);
    return this._call('playlist/update/' + id + '?' + q).then( serialize(ccmixter.PlaylistHead) );
  }

  reorderPlaylist(id,reorderSpec) {
    return this._call('playlist/reorder/' + id + '?' + reorderSpec, CHECK_STATUS);
  }
}

module.exports = new CCMixter();
