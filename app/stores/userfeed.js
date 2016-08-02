import rsvp            from 'rsvp';
import Collection      from './collection';
import ccmixter        from '../models/ccmixter';
import serialize       from '../models/serialize';

const DEFAULT_STICKY_ITEMS = 4;
const MAX_SITE_FEED_ITEMS = 200;

class UserFeed extends Collection {

  constructor() {
    super(...arguments);
    this.autoFetchUser = false;
  }

  fetch(queryParams,batchName) {
    const { site, following = '' } = queryParams;
    site && (queryParams.cache = 'sitefeed' + queryParams.offset);
    queryParams.following = following;
    return this.query(queryParams,batchName).then( serialize(ccmixter.Feed.UserFeedItem) );
  }

  count(queryArgs,batchName) {
    if( 'site' in queryArgs ) {
      return rsvp.resolve(MAX_SITE_FEED_ITEMS);
    }
    return super.count(queryArgs,batchName);
  }

  getSiteFeed() {
    const params = {
      datasource: 'feed',
      dataview: 'userfeed',
      site: 1,
      offset: 0,
      limit: 40,
      following: ''
    };
    return this.getModel(params);
  }

  getStickyItems(numItems) {
    var params = {
      dataview: 'userfeed',
      datasource: 'feed',
      sticky: 1,
      limit: numItems || DEFAULT_STICKY_ITEMS,
      following: ''
    };
    return this.getModel(params);
  }
  
  lastSeenCount(userid) {
    const params = {
      datasource: 'feed',
      dataview: 'userfeed',
      sinced: 'lastseen',
      user: userid
    };
    return this.count(params);
  }

}

// don't do StoreFromQuery
// get the userfeed from ./services instead

module.exports = UserFeed;
