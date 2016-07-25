import React              from 'react';
import PlaylistListItem   from './playlist-list-item';

function PlaylistList(props)
{
  return (
    <ul className="playlists-list">
      {props.model.items.map( p => <PlaylistListItem key={p.id} model={p} /> )}
    </ul>
    );
}


module.exports = PlaylistList;

