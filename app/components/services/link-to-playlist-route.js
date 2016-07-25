import React              from 'react';
import Link               from './link-to-route';

function LinkToPlaylistRoute(props)
{
  var model = props.model;
  var url = LinkToPlaylistRoute.url(model);
  return <Link href={url} className="playlist-link">{model.name}{model.count && <span className="badge">{model.count}</span>}</Link>;
}

LinkToPlaylistRoute.navigateTo = function(model) {
  var url = LinkToPlaylistRoute.url(model);
  Link.navigateTo(url);
};

LinkToPlaylistRoute.url = function(model,full) {
  const partial = '/playlist/browse/' + model.id;
  if( full && document ) {
    const { protocol, host } = document.location;
    return `${protocol}//${host}${partial}`;
  }
  return partial;
};

module.exports = LinkToPlaylistRoute;
