import Uploads         from './uploads';
import ccmixter        from '../models/ccmixter';
import serialize       from '../models/serialize';

class UserFeed extends Uploads {

  constructor() {
    super(...arguments);
    this.autoFetchUser = false;
  }

  fetch(queryParams,deferName) {
    return this.query(queryParams,deferName).then( serialize(ccmixter.UserFeedItem) );
  }

}

UserFeed.storeFromQuery = function(params,defaults) {
  var pl = new UserFeed(defaults);
  return pl.getModel(params).then( () => pl );  
};

module.exports = UserFeed;
