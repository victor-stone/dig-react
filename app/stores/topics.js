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
    
    const args = {
      dataview: 'topics_dig',
      ids: id
    };
    return this.queryOne(args)
      .then( serialize( ccmixter.Topic.Topic ) )
      .then( model => this.model = model );
  }

  reviewsFor(id) {
    const args = {
      t: 'reviews_upload',
      match: id
    };
    return this.query(args).then( serialize( ccmixter.Topic.Review ) );
  }

  type(topicType) {
    const args = {
      dataview: 'topics_dig',
      type: topicType,
      limit: 10
    };
    const hash = {
      items: this.query(args).then( serialize( ccmixter.Topic.Topic ) ),
      total: this.count(args)
    };

    return rsvp.hash(hash).then( model => {
      this.model = model;
      this.model.queryParams = Object.assign( {}, args );
    });
  }

  page(topicType) {
    const args = {
      dataview: 'topics_dig',
      type: topicType,
      limit: 1
    };
    
    return this.queryOne(args)
                .then( serialize( ccmixter.Topic ) )
                .then( model => {
                  this.model = model;
                  this.model.queryParams = Object.assign( {}, args );
                }, error => {
                  this.model = {};
                  this.error = error;
                });
  }
  
  count(queryParams) {
    const qp = Object.assign( {}, queryParams );
    qp.dataview = 'count_topics';
    return this.queryOne(qp);
  }
}

Topics.namedTopics = {
  digBanner: 223608,
  pellsBanner: 225005,
  stemsBanner: 225957,
  playlistsBanner: 226823,
  aboutFLAC: 225798,
};


Topics.storeFromPage = function( name ) { 
  const topics = new Topics();
  return topics.page(name)
          .then( () => { return topics; } );  
};

Topics.storeFromTopicName = function( name ) { 
  const topics = new Topics();
  return topics.find(name)
          .then( () => { return topics; } );  
};

module.exports = Topics;