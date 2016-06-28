import React              from 'react';
import qc                 from '../../models/query-configs';
import Acappellas         from '../../stores/acappellas';
import { mergeParams }    from '../../unicorns';
import Browse             from '../../components/pells/Browse';
import SubNav             from '../../components/pells/SubNav';

function pells(props) {
  return (<Browse.PellsBrowser {...props} />);
}

pells.title = 'A Cappella Browser';

pells.path = '/pells';

pells.subnav = SubNav;

pells.store = function(params,queryParams) {
  
  var featured = ('reqtags' in queryParams) ? {} : qc.pellsFeatured;
  var qparams  = mergeParams( {}, qc.pells, featured, queryParams );

  return Acappellas.storeFromQuery(qparams, qc.pells);
};

module.exports = pells;

