import React            from 'react';
import Playlists        from '../../stores/playlists';
import qc               from '../../models/query-configs';
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

    const { userid:user } = params;

    const q = mergeParams( {  user,
                              minitems: '1', 
                              dynamic: 1
                            }, queryParams );

    return Playlists.fromQuery(q).then( store => {
      curator.title = store.model.curator.name;
      return store;
    });
  },

  urlFromStore(store) {

    const { curator:{id} } = store.model;

    return '/people/' + id + '/playlists' + store.queryString( qc.visibility.curator );
  }
});


module.exports = curator;

//