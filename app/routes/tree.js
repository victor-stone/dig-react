
import React                       from 'react';
import Upload                      from '../stores/upload';
import { PageHeader, RemixTree }   from '../components';
import { ModelTracker }            from '../mixins';
import lookup                      from '../services';

var Tree = React.createClass({

  mixins: [ModelTracker],

  componentDidUpdate() {
    if( !global.IS_SERVER_REQUEST ) {
      var router = lookup('router');
      var model = this.props.store.model.upload;
      var url = '/tree/' + model.artist.id + '/' + model.id;
      router.setBrowserAddressBar(url);
    }
  },

  stateFromStore(store) {
    return { model: store.model,
             title: store.model.upload.name };
  },

  render() {
    return  ( 
      <div>
        <PageHeader title={this.state.title} icon="tree" />
        <RemixTree store={this.props.store} />
      </div>
    );
  },

});

Tree.path = '/tree/:user/:id';

Tree.store = function(params/*,queryParams*/) {
  return Upload.storeFromQuery(params.id,params.user,Upload.ALL);
};

module.exports = Tree;
