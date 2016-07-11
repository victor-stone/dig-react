import React            from 'react';
import Playlists        from '../../stores/playlists';
import { mergeParams }  from '../../unicorns';
import pages            from '../../components/playlists/pages';
import SubNav           from '../../components/playlists/SubNav';

const browse = Object.assign(pages.Browse,{
  title: 'Browse Playlists',

  path: '/playlists/browse',

  subnav(props) {
    return (<SubNav store={props.store} tab="browse" paging/>);  
  },

  store(params,queryParams) {
      const qparams = mergeParams( { dynamic: 1, minitems: 4 }, queryParams );
      return Playlists.storeFromQuery(qparams);
  },

  urlFromStore(store) {
    return browse.path + store.queryString;
  }
});

module.exports = browse;

