import Remixes     from './remixes';
import ccmixter    from '../models/ccmixter';
import serialize   from '../models/serialize';
import TotalsCache from './lib/totals-cache';
import events      from 'models/events';

const USER_FILTERS      = [ 'editorial_pick', 'remix', 'acappella', 'sample' ];

class User extends Remixes {

  constructor() {
    super(...arguments);
    this.totalsCache = new TotalsCache(USER_FILTERS);
  }

  profileFor(id,deferName) {
    var queryParams = {
      user: id,
      dataview: 'user_info',
      noarray: 1
    };
    return this.queryOne(queryParams,deferName)
      .then( serialize(ccmixter.User.UserProfile) );
  }

  followers(id) {
    var queryParams = {
      user: id,
      dataview: 'followers'
    };
    return this.queryOne(queryParams)
      .then( serialize(ccmixter.User.Followers) )
      .then( model => {
        if( this.model && this.model.artist ) {
          this.model.artist.social = model;
        }
        this.emit(events.FOLLOW_CHANGED,model);
        return model;
      });
  }

  static fromQuery(params) {
    var user = new User();
    return user.getModel(params).then( () => user );      
  }
}


module.exports = User;
