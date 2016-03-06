import Query     from './query';
import serialize from '../models/serialize';
import ccmixter  from '../models/ccmixter';
import rsvp      from 'rsvp';

//import { oassign } from '../unicorns';

class Ratings extends Query {

  constructor() {
    super(...arguments);
    this.model = {};
  }

  recommendedBy(id) {
    // ?f=jsex&t=recc&match=53148
    if( !id ) {
      return rsvp.resolve({});
    }

    var args = {
      t: 'recc',
      match: id
    };
    return this.query(args)
      .then( serialize( ccmixter.UserBasic ) )
      .then( model => this.model = model );
  }

  count(/*queryParams*/) {
    /*
    var qp = oassign( {}, queryParams );
    qp.dataview = 'count_topics';
    return this.queryOne(qp);
    */
  }
}

module.exports = Ratings;