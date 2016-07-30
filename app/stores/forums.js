import Topics     from './topics';
import serialize from '../models/serialize';
import ccmixter  from '../models/ccmixter';

function debugMe( model ) {
  return serialize( model, ccmixter.ThreadHead );
}

class Forums extends Topics {

  constructor() {
    super(...arguments);
    this.model = {};
  }

  thread(id) {
    const args = {
      t: 'topic_thread',
      match: id
    };
    const headArgs = {
      dataview: 'thread_head',
      ids: id
    };

    const hash = {
      head: this.queryOne(headArgs,'head').then( debugMe ),
      items: this.query(args,'items').then( serialize( ccmixter.Topic.ThreadTopic ) )
    };
    return this.flushDefers(hash).then( model => this.model = model );
  }
  
}

Forums.storeFromThread = function( id ) { 
  const forums = new Forums();
  return forums.thread(id)
          .then( () => { return forums; } );  
};


module.exports = Forums;