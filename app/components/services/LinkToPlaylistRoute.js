import React              from 'react';
import Link               from './LinkToRoute';

function LinkToPlaylistRoute(props)
{
  var model = props.model;
  return <Link href={'/playlist/browse/'+model.id} className="playlist-link">{model.name}{model.count && <span className="badge">{model.count}</span>}</Link>;
}

LinkToPlaylistRoute.navigateTo = function(model) {
  Link.navigateTo('/playlist/browse/'+model.id);
};
module.exports = LinkToPlaylistRoute;
