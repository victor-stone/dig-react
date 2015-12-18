import ccmixter         from '../models/ccmixter';
import serialize        from '../models/serialize';
import RPCAdapter   from '../services/rpc-adapter';

class CCMixter 
{
  constructor() {
    this.adapter = RPCAdapter;
  }

  currentUser() {
    return this.adapter.callOne('user/current')
              .then( serialize( ccmixter.User) )
              .catch( () => null );
  }
}

module.exports = CCMixter;
