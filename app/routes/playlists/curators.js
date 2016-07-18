import React      from 'react';
import UserSearch from '../../stores/user-search';
import Blobs      from '../../stores/blobs';
import SubNav     from '../../components/playlists/SubNav';
import pages      from '../../components/playlists/pages';

const CURATORS_BLOB = 226312;

const curators = Object.assign(pages.Curators, {
  title: 'Featured Curators',

  path: '/playlists/curators',

  subnav(props) {
    return (<SubNav store={props.store} tab="curators"/>);  
  },

  // TODO: this is too much code for here

  store() {
    var blobs = new Blobs();
    return blobs.find( CURATORS_BLOB ).then( blob => {
      var ids = blob.text;
      var query = new UserSearch();
      return query.findUsers( ids ).then( curators =>{
        query.model = curators;
        return query;
      });
    });
  }
});

module.exports = curators;

//