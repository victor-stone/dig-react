import React            from 'react';
import Playlists        from '../../stores/playlists';
import qc               from '../../models/query-configs';
import { mergeParams }  from 'unicorns';
import pages            from '../../components/playlists/pages';
import SubNav           from '../../components/playlists/sub-nav';

const browse = Object.assign(pages.Browse,{
  title: 'Browse Playlists',

  path: '/playlists/browse',

  subnav(props) {
    return (<SubNav store={props.store} tab="browse" paging/>);  
  },

  store(params,queryParams) {

      const qparams = mergeParams( {}, 
                                   qc.browsePlaylists, 
                                   queryParams );

      return Playlists.fromQuery(qparams);
  },

  urlFromStore(store) {
    return browse.path + store.queryString( qc.visibility.browsePlaylists );
  }
});

module.exports = browse;

