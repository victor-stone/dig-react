
import React             from 'react';
import Upload            from '../../stores/upload';
import { RemixTree }     from '../../components';
import { ModelTracker }  from '../../mixins';

var Tree = React.createClass({

  mixins: [ModelTracker],

  stateFromStore(store) {
    return { store };
  },

  render() {
    return  ( 
      <RemixTree store={this.state.store} />
    );
  },

});

Tree.path = '/files/:user/:id';

Tree.store = function(params/*,queryParams*/) {
  return Upload.storeFromQuery(params.id,params.user,Upload.ALL);
};

module.exports = Tree;
