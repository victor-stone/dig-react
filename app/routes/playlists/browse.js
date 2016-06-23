import React            from 'react';
import Playlists        from '../../stores/playlists';
import { mergeParams }  from '../../unicorns';
import pages            from '../../components/playlists/pages';
import SubNav           from '../../components/playlists/SubNav';

var browse = pages.Browse;

browse.title = 'Browse Playlists';

browse.subnav = function(props) {
  return (<SubNav store={props.store} tab="browse" paging/>);
};

browse.store = function(params,queryParams) {
  var qparams = mergeParams( { dynamic: 1, minitems: 4 }, queryParams );
  return Playlists.storeFromQuery(qparams);
};

browse.path = '/playlists/browse';

module.exports = browse;

