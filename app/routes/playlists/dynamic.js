import React              from 'react';
import Playlists          from '../../stores/playlists';
import { PlaylistWidget } from '../../components/playlists/Browse';
import { mergeParams }    from '../../unicorns';

import PageHeader         from '../../components/PageHeader';

function dynamic(props) {
  var store = props.store;
  return (        
    <div className="container-fluid playlist-dynamic-page">
      <PageHeader icon="bolt" title="Dynamic Playlists" />
      <PlaylistWidget store={store} />
    </div>
  );
}

dynamic.title = 'Dynamic';

dynamic.store = function(params,queryParams) {
  var qparams = mergeParams( { dynamic: '1' }, queryParams );
  return Playlists.storeFromQuery( qparams );
};

module.exports = dynamic;

//