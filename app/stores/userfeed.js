import rsvp            from 'rsvp';
import Collection      from './collection';
import ccmixter        from '../models/ccmixter';
import serialize       from '../models/serialize';

const DEFAULT_STICKY_ITEMS = 4;
const MAX_SITE_FEED_ITEMS = 200;

class UserFeed extends Collection {

  constructor(defaults) {
    var defs = defaults || {};
    defs.dataview = 'userfeed';
    defs.datasource = 'feed';
    super(defs);
    this.autoFetchUser = false;
  }

  fetch(queryParams,deferName) {
    if( 'site' in queryParams ) {
      queryParams.cache = 'sitefeed' + queryParams.offset;
    }
    return this.query(queryParams,deferName).then( serialize(ccmixter.UserFeedItem) );
  }

  getSiteFeed() {
    const args = {
      datasource: 'feed',
      dataview: 'userfeed',
      site: 1,
      offset: 0,
      limit: 40
    };
    return this.getModel(args);
  }

  count(queryArgs,deferName) {
    if( 'site' in queryArgs ) {
      return rsvp.resolve(MAX_SITE_FEED_ITEMS);
    }
    return super.count(queryArgs,deferName);
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
    var params = Object.assign( {}, this.defaultParams, { sinced: 'lastseen', user: userid } );
    return this.count(params);
  }

}

// don't do StoreFromQuery
// get the userfeed from ./services instead

module.exports = UserFeed;
