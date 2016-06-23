import React            from 'react';
import Playlists        from '../../stores/playlists';
import { mergeParams }  from '../../unicorns';
import pages            from '../../components/playlists/pages';
import SubNav           from '../../components/playlists/SubNav';

var curator = pages.Curator;

curator.path = '/people/:userid/playlists';

curator.title = 'People';

curator.subnav = function(props) {
  return (<SubNav store={props.store} tab="curators" paging/>);
};

curator.store = function(params,queryParams) {
  var opts = {
    user: params.userid, 
    minitems: '1', 
    dynamic: 1
  };
  var q = mergeParams( opts, queryParams );
  return Playlists.storeFromQuery(q).then( store => {
    curator.title = store.model.curator.name;
    return store;
  });
};

module.exports = curator;

//