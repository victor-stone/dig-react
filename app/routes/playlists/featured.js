import React              from 'react';
import Playlists          from '../../stores/playlists';
import { PlaylistWidget } from '../../components/playlists/Browse';
import { mergeParams }    from '../../unicorns';
import SubNav             from '../../components/playlists/SubNav';

function featured(props) {
  var store = props.store;
  return (        
    <div className="container-fluid playlist-featured-page">
      <PlaylistWidget store={store} />
    </div>
  );
}

featured.title = 'Featured';

featured.subnav = function(props) {
  return (<SubNav store={props.store} tab="featured" paging/>);
};

featured.store = function(params,queryParams) {
  var qparams = mergeParams( { type: 'featured', minitems: '0' }, queryParams );
  return Playlists.storeFromQuery( qparams );
};

featured.path = '/playlists/featured';

module.exports = featured;

//