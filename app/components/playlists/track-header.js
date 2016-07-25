import React           from 'react';
import Glyph           from '../vanilla/glyph';
import LinkToPeople    from '../services/link-to-people-route';
import LinkToRemixTree from '../services/link-to-remix-tree';

/*
  A page header for the route that displays the playlists
  a track is in
*/
function TrackHeader(props) {
  var upload  = props.store.model.upload;
  return (
    <div className="page-header">
        <h1 className="center-text">
            <small><Glyph icon="music" /> {"playlists with "}</small> {'"' + upload.name + '"'}
        </h1>
        <div className="track-headinfo center-text">
          <LinkToPeople model={upload.artist} thumb className="btn btn-info" />
          {" "}
          <LinkToRemixTree model={upload} />
        </div>
    </div>
    );
}

module.exports = TrackHeader;

//