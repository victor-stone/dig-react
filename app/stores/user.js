import Remixes     from './remixes';
import ccmixter    from '../models/ccmixter';
import serialize   from '../models/serialize';
import TotalsCache from './totals';
import events      from '../models/events';

const USER_FILTERS      = [ 'editorial_pick', 'remix', 'acappella', 'sample' ];

class User extends Remixes {

  constructor() {
    super(...arguments);
    this.totalsCache = new TotalsCache(USER_FILTERS);
  }

  findUser(id,deferName) {
    var queryParams = {
      u: id,
      dataview: 'user_info',
    };
    return this.queryOne(queryParams,deferName)
      .then( serialize(ccmixter.UserProfile) );
  }

  followers(id) {
    var queryParams = {
      u: id,
      dataview: 'followers'
    };
    return this.queryOne(queryParams)
      .then( serialize(ccmixter.Followers) )
      .then( model => {
        if( this.model && this.model.artist ) {
          this.model.artist.social = model;
        }
        this.emit(events.FOLLOW_CHANGED,model);
        return model;
      });
  }
}

User.storeFromQuery = function(params,defaults) {
  var user = new User(defaults);
  return user.getModel(params).then( () => user );  
};

module.exports = User;
