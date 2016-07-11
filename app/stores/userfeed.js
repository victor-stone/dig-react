import rsvp            from 'rsvp';
import Collection      from './collection';
import ccmixter        from '../models/ccmixter';
import serialize       from '../models/serialize';

const DEFAULT_STICKY_ITEMS = 4;
const MAX_SITE_FEED_ITEMS = 200;

class UserFeed extends Collection {

  constructor(defaults = {}) {
    super(Object.assign({},defaults,{dataview:'userfeed',datasource:'feed'}));
    this.autoFetchUser = false;
  }

  fetch(queryParams,deferName) {
    if( 'site' in queryParams ) {
      queryParams.cache = 'sitefeed' + queryParams.offset;
    }
    return this.query(queryParams,deferName).then( serialize(ccmixter.UserFeedItem) );
  }

  count(queryArgs,deferName) {
    if( 'site' in queryArgs ) {
      return rsvp.resolve(MAX_SITE_FEED_ITEMS);
    }
    return super.count(queryArgs,deferName);
  }

  get defaultParams() {
    // Not sure if this is the right thing to do here...
    // When creating a queryString, the 'defaultParams'
    // will be left out of the string. Because the feed
    // urls include user and following (/feed/victor and
    // /feed/victor/following) we don't want the those
    // query parameters in the string like
    // /feed/victor?user=victor
    // so by stuffing user and following into the 
    // defaultParams we can prevent that from happening
    var def = Object.assign({},this._defaultParams);
    const { user, following } = this.queryParams;
    user && (def.user = user);
    following && (def.following = following);
    return def;
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

  getStickyItems(numItems) {
    var params = {
      dataview: 'userfeed',
      datasource: 'feed',
      sticky: 1,
      limit: numItems || DEFAULT_STICKY_ITEMS
    };
    return this.getModel(params);
  }
  
  // FIXME: this is not the right user of defaultParams
  lastSeenCount(userid) {
    var params = Object.assign( {}, this._defaultParams, { sinced: 'lastseen', user: userid } );
    return this.count(params);
  }

}

// don't do StoreFromQuery
// get the userfeed from ./services instead

module.exports = UserFeed;
