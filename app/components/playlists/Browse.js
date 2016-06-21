import React                   from 'react';
import PlaylistList            from '../bround/PlaylistList';
import InlineCSS               from '../InlineCSS';
import { browse as browseCSS,
         tags   as tagsCSS }   from './style/browse';


function BrowsePlaylists(props)
{
    var store = props.store;
    return (
      <div className="container playlist-browser">
        <InlineCSS css={browseCSS + tagsCSS} id="playlists-browse-css"/>
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <PlaylistList store={store} skipUser={this.props.skipUser} />
          </div>
        </div>
      </div>
    );      
}

module.exports = BrowsePlaylists;
