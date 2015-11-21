import Query     from './query';
import serialize from '../models/serialize';
import ccmixter  from '../models/ccmixter';
import rsvp      from 'rsvp';

class Topics extends Query {

  constructor() {
    super(...arguments);
    this.model = {};
  }

  find(id) {
    if( !id ) {
      return rsvp.resolve({});
    }

    id = Number(id) || Topics.namedTopics[id];
    
    var args = {
      f: 'json',
      dataview: 'topics',
      ids: id
    };
    return this.queryOne(args)
      .then( serialize( ccmixter.Topic ) )
      .then( model => this.model = model );
  }

}

Topics.namedTopics = {
  digBanner: 223608,
  pellsBanner: 225005,
  aboutFLAC: 225798,
};

Topics.storeFromTopicName = function( name ) {
  var topics = new Topics();
  return topics.find( Topics.namedTopics[name] )
          .then( () => { return topics; } );
};

module.exports = Topics;