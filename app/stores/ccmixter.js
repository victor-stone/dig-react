import querystring  from 'querystring';
import rsvp         from 'rsvp';
import ccmixter     from '../models/ccmixter';
import serialize    from '../models/serialize';
import RPCAdapter   from '../services/rpc-adapter';
import env          from '../services/env';

const CHECK_STATUS = true;
const NOT_FETCHED  = -1;

class CCMixter 
{
  constructor() {
    this.adapter = RPCAdapter;
    this._currentUser = NOT_FETCHED;
  }

  currentUser() {
    if( global.IS_SERVER_REQUEST ) {
      return rsvp.resolve( null );
    }

    if( this._currentUser !== NOT_FETCHED ) {
      return rsvp.resolve( this._currentUser );
    }
    return this.adapter.callOne('user/current')
              .then( serialize( ccmixter.User) )
              .then( model => this._currentUser = model )
              .catch( () => null );
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
