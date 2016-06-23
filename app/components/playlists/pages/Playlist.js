import React             from 'react';
import EditableTrackList from '../EditableTrackList';
import EditableTitle     from '../../bound/EditableTitle';
import Info              from '../Info';
import InlineCSS         from '../../vanilla/InlineCSS';
import playlistCSS       from '../style/playlist';
import { bgColor }       from '../style/browse';


function Playlist(props)
{
  var store = props.store;    
  return (
      <div className="container-fluid playlist-detail-page">
        <InlineCSS css={playlistCSS + bgColor} id="playlist-detail-css" />
        <EditableTitle store={store} />
        <div className="row">
          <div className="col-md-3 col-md-offset-1">
            <Info store={store} />
          </div>
          <div className="col-md-6">
            <EditableTrackList store={store} />
          </div>
        </div>
      </div>
    );
}

module.exports = Playlist;

//