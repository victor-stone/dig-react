import React           from 'react';
import Glyph           from '../vanilla/Glyph';
import LinkToPeople    from '../services/LinkToPeopleRoute';
import LinkToRemixTree from '../services/LinkToRemixTree';

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