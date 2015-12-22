import React from 'react';

import Playlist         from '../../stores/playlist';
import { StaticForm }   from '../../components/playlists/Edit';
import PageHeader       from '../../components/PageHeader';
import env              from '../../services/env';

var EditPlaylist = React.createClass({

  componentWillMount: function() {
    env.disableAutoScroll = true;
  },

  componentWillUnmount: function() {
    env.disableAutoScroll = false;
  },
  
  render: function() {
    var store = this.props.store;
    return (
        <div className="new-playlist-widget">
          <PageHeader icon="edit" title="Edit Playlist" />
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8 col-md-offset-2">
                <StaticForm store={store} />
              </div>
            </div>
          </div>
        </div>
      );
  }
});

EditPlaylist.path = '/playlist/browse/:id/edit';

EditPlaylist.store = function(params) {
  return Playlist.storeFromQuery(params.id);
};

module.exports = EditPlaylist;

