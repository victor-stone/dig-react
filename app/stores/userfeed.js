import Uploads         from './uploads';
import ccmixter        from '../models/ccmixter';
import serialize       from '../models/serialize';
import { oassign }     from '../unicorns';

class UserFeed extends Uploads {

  constructor(defaults) {
    var defs = defaults || {};
    defs.dataview = 'userfeed';
    defs.datasource = 'feed';
    super(defs);
    this.autoFetchUser = false;
  }

  fetch(queryParams,deferName) {
    return this.query(queryParams,deferName).then( serialize(ccmixter.UserFeedItem) );
  }

  lastSeenCount(userid) {
    var params = oassign( {}, this.defaultParams, { sinced: 'lastseen', user: userid } );
    return this.count(params);
  }

}

// don't do StoreFromQuery
// get the userfeed from ./services instead

module.exports = UserFeed;
