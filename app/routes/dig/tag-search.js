import React         from 'react';
import { TagSearch } from '../../components/dig';
import qc            from '../../models/query-configs';
import Remixes      from '../../stores/remixes';
import SubNav           from '../../components/dig/sub-nav';

import { mergeParams } from '../../unicorns';

function tagSearch(props) {
  return (<TagSearch {...props}/>);
}

tagSearch.title = 'Tag Search';

tagSearch.path  = '/dig';

tagSearch.subnav = SubNav;

tagSearch.store = function(params,queryParams) {
  var opts = mergeParams( { type: 'any', reqtags: '-autoplay' }, qc.remixes, qc.magicSort );
  var qparams = mergeParams( {}, opts, queryParams );
  return Remixes.storeFromQuery(qparams, opts);
};

module.exports = tagSearch;

