import Uploads         from './uploads';
import ccmixter        from '../models/ccmixter';
import serialize       from '../models/serialize';
import { oassign }     from '../unicorns';

const DEFAULT_STICKY_ITEMS = 4;

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

  getStickyItems(numItems) {
    var params = {
      dataview: 'userfeed',
      datasource: 'feed',
      sticky: 1,
      limit: numItems || DEFAULT_STICKY_ITEMS
    };
    return this.getModel(params);
  }
  
  lastSeenCount(userid) {
    var params = oassign( {}, this.defaultParams, { sinced: 'lastseen', user: userid } );
    return this.count(params);
  }

}

// don't do StoreFromQuery
// get the userfeed from ./services instead

module.exports = UserFeed;
