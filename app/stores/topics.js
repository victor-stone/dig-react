import Query     from './query';
import serialize from '../models/serialize';
import ccmixter  from '../models/ccmixter';
import rsvp      from 'rsvp';

import { oassign } from '../unicorns';

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
      dataview: 'topics',
      ids: id
    };
    return this.queryOne(args)
      .then( serialize( ccmixter.Topic ) )
      .then( model => this.model = model );
  }

  type(topicType) {
    var args = {
      dataview: 'topics',
      type: topicType,
      limit: 10
    };
    var hash = {
      items: this.query(args).then( serialize( ccmixter.Topic ) ),
      total: this.count(args)
    };

    return rsvp.hash(hash).then( model => {
      this.model = model;
      this.model.queryParams = oassign( {}, args );
    });
  }

  count(queryParams) {
    var qp = oassign( {}, queryParams );
    qp.dataview = 'count_topics';
    return this.queryOne(qp);
  }
}

Topics.namedTopics = {
  digBanner: 223608,
  pellsBanner: 225005,
  stemsBanner: 225957,
  aboutFLAC: 225798,
};

Topics.storeFromTopicName = function( name ) {
  var topics = new Topics();
  return topics.find( name )
          .then( () => { return topics; } );
};

module.exports = Topics;