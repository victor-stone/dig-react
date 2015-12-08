import React         from 'react';
import { TagSearch } from '../../components/dig';
import qc            from '../../models/query-configs';
import Playlist      from '../../stores/playlist';

import { mergeParams } from '../../unicorns';

function dig(props) {
  return (<TagSearch {...props}/>);
}

dig.title = 'Tag Search';

dig.path  = '/dig';

dig.store = function(params,queryParams) {
  var opts = mergeParams( { type: 'any' }, qc.remixes );
  var qparams = mergeParams( {}, opts, queryParams );
  return Playlist.storeFromQuery(qparams, opts);
};

module.exports = dig;

