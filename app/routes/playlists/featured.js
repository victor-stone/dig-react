import React            from 'react';
import { mergeParams }  from '../../unicorns';
import Playlists        from '../../stores/playlists';
import pages            from '../../components/playlists/pages';
import SubNav           from '../../components/playlists/SubNav';

var featured = pages.Featured;

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