import Collection from './collection';
import serialize  from '../models/serialize';
import ccmixter   from '../models/ccmixter';
import rsvp       from 'rsvp';

class Ratings extends Collection {

  constructor() {
    super(...arguments);
    this.model = {};
  }

  recommendedBy(id) {
    if( !id ) {
      return rsvp.resolve({});
    }

    // ?f=jsex&t=recc&match=53148
    
    var args = {
      t: 'recc',
      match: id
    };
    return this.query(args)
      .then( serialize( ccmixter.User.UserBasic ) )
      .then( model => this.model = model );
  }

  count(/*queryParams*/) {
    /*
    var qp = Object.assign( {noarray:1}, queryParams );
    qp.dataview = 'count_topics';
    return this.query(qp);
    */
  }
}

module.exports = Ratings;