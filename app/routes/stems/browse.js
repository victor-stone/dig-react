import React            from 'react';
import qc               from '../../models/query-configs';
import Samples          from '../../stores/samples';
import { mergeParams }  from '../../unicorns';
import Browse           from '../../components/stems/Browse';
import SubNav           from '../../components/stems/SubNav';

function browse(props) {
  return (<Browse {...props} />);
}

browse.store = function(params,queryParams) {
  var opts    = mergeParams( {type: 'any' }, qc.samples, qc.latest );
  var qparams = mergeParams( { }, opts, queryParams );
  return Samples.storeFromQuery(qparams,opts);
};

browse.title = 'Samples Browser';

browse.subnav = SubNav;

browse.path = '/stems';

module.exports = browse;

