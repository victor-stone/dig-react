
import React             from 'react';
import Upload            from '../../stores/upload';
import { RemixTree }     from '../../components';
import { ModelTracker,
         PopPeruseModel }  from '../../mixins';

var Tree = React.createClass({

  mixins: [ModelTracker,PopPeruseModel],

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
  return Upload.storeFromQuery(params.id,params.user,Upload.ALL).then( store =>
            { 
                Tree.title = !store.error && store.model.upload.name;
                return store;
            });
};

module.exports = Tree;
