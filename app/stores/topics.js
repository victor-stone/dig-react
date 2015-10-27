import Query from './query';
import serialize from '../models/serialize';
import ccmixter from '../models/ccmixter';

var nameMap = {
  banner: 223608
};

const Topics = Query.extend({

  find: function(id) {
    if( typeof id === 'string' ) {
      id = nameMap[id];
    }
    var args = {
      f: 'json',
      dataview: 'topics',
      ids: id
    };
    return this.queryOne(args)
      .then( serialize( ccmixter.Topic ) );
  },

});

module.exports = Topics;