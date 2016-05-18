import rsvp            from 'rsvp';
import Uploads         from './uploads';
import ccmixter        from '../models/ccmixter';
import serialize       from '../models/serialize';
import { mergeParams } from '../unicorns';

class UserFeed extends Uploads {

  constructor() {
    super(...arguments);
    this.autoFetchUser = false;
  }

  fetch(queryParams,deferName) {
    return this.query(queryParams,deferName).then( serialize(ccmixter.UserFeedItem) );
  }

  getUnSeenCounts(names,user) {
    if( !this.model.queryParams ) {
      return rsvp.resolve(null);
    }
    var params = mergeParams( {}, this.model.queryParams );
    var hash = { };
    hash[names[0]] = this.count(mergeParams({},params,{sticky:1,unseen:1}));
    if( names[1] ) {
      hash[names[1]] = this.count(mergeParams({},params,{user,unseen:1}));
    }
    return rsvp.hash(hash);
  }
}

UserFeed.storeFromQuery = function(params,defaults) {
  var pl = new UserFeed(defaults);
  return pl.getModel(params).then( () => pl );  
};

module.exports = UserFeed;
