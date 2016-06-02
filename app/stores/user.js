import Remixes     from './remixes';
import ccmixter    from '../models/ccmixter';
import serialize   from '../models/serialize';
import TotalsCache      from './totals';

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
}

User.storeFromQuery = function(params,defaults) {
  var user = new User(defaults);
  return user.getModel(params).then( () => user );  
};

module.exports = User;
