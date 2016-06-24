import React      from 'react';
import qc         from '../../models/query-configs';
import Store      from '../../stores/remixes';

import { mergeParams, 
         oassign }    from '../../unicorns';

import Gallery from '../../components/RemixTree/Gallery';
import SubNav  from '../../components/RemixTree/SubNav';

const tree = Gallery;

tree.title = 'Remix Tree';

tree.subnav = function(props) {
  return (<SubNav paging store={props.store} className="tree-subnav" tab="remix" />);
};

tree.store = function(params,queryParams) {
  var defaultOpts = oassign({},qc.remixes);
  if( queryParams && 'reqtags' in queryParams ) {
    defaultOpts.reqtags = queryParams.reqtags;
  }
  mergeParams( defaultOpts, qc.latest );
  var qparams = mergeParams( {}, defaultOpts, queryParams );
  return Store.storeFromQuery(qparams, defaultOpts);
};

module.exports = tree;

