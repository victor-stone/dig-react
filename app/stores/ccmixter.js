import ccmixter     from '../models/ccmixter';
import serialize    from '../models/serialize';
import RPCAdapter   from '../services/rpc-adapter';
import rsvp         from 'rsvp';

class CCMixter 
{
  constructor() {
    this.adapter = RPCAdapter;
    this._currentUser = null;
  }

  currentUser() {
    if( this._currentUser ) {
      return rsvp.resolve( this._currentUser );
    }
    return this.adapter.callOne('user/current')
              .then( serialize( ccmixter.User) )
              .then( model => this._currentUser = model )
              .catch( () => null );
  }

  saveDynamicPlaylist(name,queryParamsString) {
    var q = queryParamsString + '&title=' + name;
    return this.adapter.callOne('playlist/save?' + q).then( serialize( ccmixter.Playlist ) );
  }

  saveStaticPlaylist(name,description) {
    var q = 'name=' + name + '&cart_description=' + description;
    return this.adapter.callOne('playlist/create?' + q).then( serialize( ccmixter.Playlist ) );
  }
}

module.exports = new CCMixter();
