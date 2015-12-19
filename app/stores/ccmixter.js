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
      return rsvp.resolve( this.currentUser );
    }
    return this.adapter.callOne('user/current')
              .then( serialize( ccmixter.User) )
              .then( model => this._currentUser = model )
              .catch( () => null );
  }
}

module.exports = new CCMixter();
