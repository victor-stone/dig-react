import React             from 'react';
import { Gallery,
         GallerySubNav } from '../../components/ccmixter/';
import qc                from '../../models/query-configs';
import Store             from '../../stores/remixes';

import { mergeParams, 
         oassign }       from '../../unicorns';

function TreePage(props) {
  return <Gallery {...props} />; 
}

TreePage.title = 'Remix Tree';

TreePage.path  = '/tree';

TreePage.subnav = function(props) {
  return (<GallerySubNav paging store={props.store} className="tree-subnav" />);
};

TreePage.store = function(params,queryParams) {
  var defaultOpts = oassign({},qc.remixes);
  if( queryParams && 'reqtags' in queryParams ) {
    defaultOpts.reqtags = queryParams.reqtags;
  }
  mergeParams( defaultOpts, qc.latest );
  var qparams = mergeParams( {}, defaultOpts, queryParams );
  return Store.storeFromQuery(qparams, defaultOpts);
};

module.exports = TreePage;

