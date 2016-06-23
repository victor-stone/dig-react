import React     from 'react';
import Playlists from '../../stores/playlists';
import pages     from '../../components/playlists/pages';
import SubNav    from '../../components/playlists/SubNav';

var tags = pages.Tags;

tags.path = '/playlists/tags/:tags';

tags.title = 'Tags';

tags.subnav = function(props) {
  return (<SubNav store={props.store} tab="" paging/>);
};

tags.store = function(params /*,queryParams */) {
  return Playlists.storeFromQuery( { tags: params.tags, minitems: '0', dynamic: 1 } );
};

module.exports = tags;

//