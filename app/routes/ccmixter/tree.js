import React       from 'react';
import { Remixes } from '../../components';
import qc          from '../../models/query-configs';
import Store       from '../../stores/remixes';

import { mergeParams } from '../../unicorns';

function RemixPage(props) {
  return (<Remixes {...props}/>);
}

RemixPage.title = 'Remix Tree';

RemixPage.path  = '/tree';

RemixPage.store = function(params,queryParams) {
  var opts = mergeParams( {}, qc.remixes, qc.recent );
  var qparams = mergeParams( {}, opts, queryParams );
  return Store.storeFromQuery(qparams, opts);
};

module.exports = RemixPage;

