import Query       from './query';
import ccmixter    from '../models/ccmixter';
import serialize   from '../models/serialize';


class User extends Query {

  profile(id) {
    var queryParams = {
      u: id,
      t: 'user_profile',
      f: 'fsex'
    };
    return this.queryOne(queryParams).then( serialize(ccmixter.UploadProfile) );
  }
}

User.storeFromQuery = function(params/*,defaults*/) {
  var user = new User();
  return user.profile(params.user);
};

module.exports = User;
