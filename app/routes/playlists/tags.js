import React     from 'react';
import Playlists from '../../stores/playlists';
import pages     from '../../components/playlists/pages';
import SubNav    from '../../components/playlists/SubNav';

var tags = Object.assign(pages.Tags,{

  path: '/playlists/tags/:tags',

  title: 'Tags',

  subnav(props) {
    return (<SubNav store={props.store} tab="" paging/>);
  },

  store(params) {
    return Playlists.storeFromQuery( { tags: params.tags, minitems: '0', dynamic: 1 } );
  },

  urlFromStore(store) {
    const tags = store.model.queryParams.tags.toString();
    return `/playlists/tags/${tags}`;
  }
});


module.exports = tags;

//