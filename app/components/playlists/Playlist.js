import React          from 'react';
import Info           from './Info';
import EditableTitle  from './EditableTitle';
import EditableTracks from './EditableTracks';

import InlineCSS   from '../InlineCSS';
import playlistCSS from './style/playlist';
import { bgColor } from './style/browse';

var PlaylistPage = React.createClass({

  render: function() {
    var store = this.props.store;
    
    return (
        <div className="container-fluid playlist-detail-page">
          <InlineCSS css={playlistCSS} id="playlist-detail-css" />
          <InlineCSS css={bgColor} id="playlists-bgColor-css"/>
          <EditableTitle store={store} />
          <div className="row">
            <div className="col-md-3 col-md-offset-1">
              <Info store={store} />
            </div>
            <div className="col-md-6">
              <EditableTracks store={store} />
            </div>
          </div>
        </div>
      );
  }
});

module.exports = PlaylistPage;

//