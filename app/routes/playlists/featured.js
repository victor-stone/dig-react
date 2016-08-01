import React            from 'react';
import { mergeParams }  from 'unicorns';
import qc               from '../../models/query-configs';
import Playlists        from '../../stores/playlists';
import pages            from '../../components/playlists/pages';
import SubNav           from '../../components/playlists/sub-nav';

var featured = Object.assign(pages.Featured,{
  title: 'Featured',

  path: '/playlists/featured',

  subnav(props){
    return (<SubNav store={props.store} tab="featured" paging/>);
  },

  store(params,queryParams) {

    var qparams = mergeParams({ 
                    type: 'featured', 
                    minitems: '0' 
                  }, queryParams );

    return Playlists.fromQuery( qparams );
  },

  urlFromStore(store) {
    return featured.path + store.queryString( qc.visibility.featuredPlaylists );
  }
});

module.exports = featured;

//