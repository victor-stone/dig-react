import React              from 'react';
import Link               from './LinkToRoute';

function LinkToPlaylistRoute(props)
{
  var model = props.model;
  return <Link href={'/playlist/browse/'+model.id} className="playlist-link">{model.name}{model.count && <span className="badge">{model.count}</span>}</Link>;
}

module.exports = LinkToPlaylistRoute;
