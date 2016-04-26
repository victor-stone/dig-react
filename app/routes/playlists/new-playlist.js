import React from 'react';

import qc                       from '../../models/query-configs';
import { mergeParams }          from '../../unicorns';
import Remixes                  from '../../stores/remixes';
import { DynamicForm }          from '../../components/playlists/Edit';
import PageHeader               from '../../components/PageHeader';
import env                      from '../../services/env';
import InlineCSS         from '../../components/InlineCSS';
import css               from '../../components/playlists/style/edit';

var NewPlaylist = React.createClass({

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
          <InlineCSS css={css} id="new-playlist-css" />
          <PageHeader icon="edit" title="New Playlist" />
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8 col-md-offset-2">
                <DynamicForm store={store} />
              </div>
            </div>
          </div>
        </div>
      );
  }
});

NewPlaylist.path = '/playlists/new';

NewPlaylist.store = function() {
  var opts = mergeParams( { type: 'any' }, qc.remixes, { limit: 10 } );
  var qparams = mergeParams( {}, opts );
  return Remixes.storeFromQuery(qparams, opts);
};

module.exports = NewPlaylist;

