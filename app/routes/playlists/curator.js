import React            from 'react';
import Playlists        from '../../stores/playlists';
import { mergeParams }  from 'unicorns';
import pages            from '../../components/playlists/pages';
import SubNav           from '../../components/playlists/sub-nav';

const curator = Object.assign(pages.Curator,{

  path: '/people/:userid/playlists',

  title: 'People',

  subnav(props) {
    return (<SubNav store={props.store} tab="curators" paging/>);  
  },

  store(params,queryParams) {
    const opts = {
      user: params.userid, 
      minitems: '1', 
      dynamic: 1
    };
    const q = mergeParams( {}, opts, queryParams );
    return Playlists.storeFromQuery(q,opts).then( store => {
      curator.title = store.model.curator.name;
      return store;
    });
  },

  urlFromStore(store) {
    const { model:{curator:{id}} } = store;
    return `/people/${id}/playlists${store.queryString}`;
  }
});


module.exports = curator;

//