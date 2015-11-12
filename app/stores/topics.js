import Query     from './query';
import serialize from '../models/serialize';
import ccmixter  from '../models/ccmixter';
import rsvp      from 'rsvp';

class Topics extends Query {

  constructor() {
    super(...arguments);
  }

  find(id) {
    if( !id ) {
      return rsvp.resolve({});
    }

    var args = {
      f: 'json',
      dataview: 'topics',
      ids: id
    };
    return this.queryOne(args)
      .then( serialize( ccmixter.Topic ) );
  }

}

Topics.namedTopics = {
  digBanner: 223608,
  pellsBanner: 225005
};

module.exports = Topics;