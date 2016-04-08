import Remixes     from './remixes';
import ccmixter    from '../models/ccmixter';
import serialize   from '../models/serialize';


class User extends Remixes {

  findUser(id,deferName) {
    var queryParams = {
      u: id,
      datasource: 'user',
      t: 'user_profile',
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
