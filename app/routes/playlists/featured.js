import React            from 'react';
import { mergeParams }  from 'unicorns';
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
    var opts = { type: 'featured', minitems: '0' };
    var qparams = mergeParams( {}, opts, queryParams );
    return Playlists.storeFromQuery( qparams, opts );
  },

  urlFromStore(store) {
    return featured.path + store.queryString;
  }
});

module.exports = featured;

//