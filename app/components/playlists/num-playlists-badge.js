import React        from 'react';

function NumPlaylistsBadge(props)
{
  return <span className="badge">{props.model.numPlaylists}</span>;
}

module.exports = NumPlaylistsBadge;

//