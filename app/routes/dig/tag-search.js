import React         from 'react';
import { TagSearch } from '../../components/dig';
import qc            from '../../models/query-configs';
import Playlist      from '../../stores/playlist';

import { mergeParams } from '../../unicorns';

function tagSearch(props) {
  return (<TagSearch {...props}/>);
}

tagSearch.title = 'Tag Search';

tagSearch.path  = '/dig';

tagSearch.store = function(params,queryParams) {
  var opts = mergeParams( { type: 'any' }, qc.remixes );
  var qparams = mergeParams( {}, opts, queryParams );
  return Playlist.storeFromQuery(qparams, opts);
};

module.exports = tagSearch;

