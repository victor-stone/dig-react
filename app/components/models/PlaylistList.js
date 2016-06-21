import React              from 'react';
import PlaylistListItem   from './PlaylistListItem';

function PlaylistList(props)
{
  return (
    <ul className="playlists-list">
      {props.model.items.map( p => <PlaylistListItem key={p.id} model={p} /> )}
    </ul>
    );
}


module.exports = PlaylistList;

