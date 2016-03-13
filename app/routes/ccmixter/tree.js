import React       from 'react';
import { Remixes } from '../../components/ccmixter/';
import qc          from '../../models/query-configs';
import Store       from '../../stores/remixes';

import { mergeParams, oassign } from '../../unicorns';

function RemixPage(props) {
  return (<Remixes {...props} />);
}

RemixPage.title = 'Remix Tree';

RemixPage.path  = '/tree';

RemixPage.store = function(params,queryParams) {
  var qopts = oassign({},qc.remixes);
  if( queryParams && 'reqtags' in queryParams ) {
    qopts.reqtags = queryParams.reqtags;
  }
  var opts = mergeParams( {}, qopts, qc.latest );
  var qparams = mergeParams( {}, opts, queryParams );
  return Store.storeFromQuery(qparams, opts);
};

module.exports = RemixPage;

