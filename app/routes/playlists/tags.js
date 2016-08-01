import React     from 'react';
import Playlists from '../../stores/playlists';
import pages     from '../../components/playlists/pages';
import SubNav    from '../../components/playlists/sub-nav';

var tags = Object.assign(pages.Tags,{

  path: '/playlists/tags/:tags',

  title: 'Tags',

  subnav({ store }) {
    return (<SubNav store={store} tab="" paging/>);
  },

  store({ tags }) {
    
    return Playlists.fromQuery({ 
                        tags, 
                        minitems: '0', 
                        dynamic: 1 
                      });
  },

  urlFromStore(store) {

    const tags = store.getProperty('tags').serialize();
    
    return '/playlists/tags/' + tags;
  }
});


module.exports = tags;

//