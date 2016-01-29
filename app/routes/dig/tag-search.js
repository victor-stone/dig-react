import React         from 'react';
import { TagSearch } from '../../components/dig';
import qc            from '../../models/query-configs';
import Remixes      from '../../stores/remixes';

import { mergeParams } from '../../unicorns';

function tagSearch(props) {
  return (<TagSearch {...props}/>);
}

tagSearch.title = 'Tag Search';

tagSearch.path  = '/dig';

tagSearch.store = function(params,queryParams) {
  var opts = mergeParams( { type: 'any' }, qc.remixes, qc.recent );
  var qparams = mergeParams( {}, opts, queryParams );
  return Remixes.storeFromQuery(qparams, opts);
};

module.exports = tagSearch;

