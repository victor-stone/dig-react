import React              from 'react';
import Playlists          from '../../stores/playlists';
import { PlaylistWidget } from '../../components/playlists/Browse';
import { mergeParams }    from '../../unicorns';

import PageHeader         from '../../components/PageHeader';

function featured(props) {
  var store = props.store;
  return (        
    <div className="container-fluid playlist-featured-page">
      <PageHeader icon="star" title="featured" />
      <PlaylistWidget store={store} />
    </div>
  );
}

featured.title = 'Featured';

featured.store = function(params,queryParams) {
  var qparams = mergeParams( { type: 'featured', minitems: '0' }, queryParams );
  return Playlists.storeFromQuery( qparams );
};

module.exports = featured;

//