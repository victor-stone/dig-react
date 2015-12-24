import React             from 'react';

import { mergeParams }   from '../../unicorns';

import Playlist          from '../../stores/playlist';
import { DynamicForm }   from '../../components/playlists/Edit';
import PageHeader        from '../../components/PageHeader';
import env               from '../../services/env';

var Edit = React.createClass({

  componentWillMount: function() {
    env.disableAutoScroll = true;
  },

  componentWillUnmount: function() {
    env.disableAutoScroll = false;
  },
  
  onSave: function() {

  },

  render: function() {
    var store = this.props.store.model.tracks;
    return (
        <div className="edit-playlist-widget">
          <PageHeader icon="edit" title={this.props.store.model.head.name} />
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8 col-md-offset-2">
                <DynamicForm store={store} onSave={this.onSave} />
              </div>
            </div>
          </div>
        </div>
      );
  }
});

Edit.path = '/playlist/browse/:id/edit';

Edit.store = function(params) {
  var _store = null;
  return Playlist.storeFromQuery(params.id).then( store => {
    _store = store;
    var m = store.model;
    delete m.tracks.model.queryParams['playlist'];
    var qp = mergeParams( {}, m.tracks.model.queryParams, m.head.queryParams );
    if( 'user' in qp ) {
      qp.u = qp.user;
      delete qp['user'];
    }
    delete qp['playlist'];
    return store.model.tracks.applyHardParams( qp );
  }).then( () => _store );
};

module.exports = Edit;

