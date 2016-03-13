import React             from 'react';

import { mergeParams }   from '../../unicorns';

import Playlist          from '../../stores/playlist';
import CCMixter          from '../../stores/ccmixter';
import { DynamicForm }   from '../../components/playlists/Edit';
import PageHeader        from '../../components/PageHeader';
import env               from '../../services/env';
import lookup            from '../../services';

var Edit = React.createClass({

  componentWillMount: function() {
    env.disableAutoScroll = true;
  },

  componentWillUnmount: function() {
    env.disableAutoScroll = false;
  },
  
  onSave: function() {
    var qstring = this.props.store.model.tracks.queryStringWithDefaults;
    var id      = this.props.store.model.head.id;
    CCMixter.updateDynamicPlaylist(id,qstring).then( () => {
        var router = lookup('router');
        router.navigateTo( '/playlist/browse/' + id );
    });
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
    return store.model.tracks.refreshHard( qp );
  }).then( () => _store );
};

module.exports = Edit;

