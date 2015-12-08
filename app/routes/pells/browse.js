import React              from 'react';
import qc                 from '../../models/query-configs';
import Acappellas         from '../../stores/acappellas';
import { mergeParams }    from '../../unicorns';
import { Glyph }          from '../../components';
import { Browse }         from '../../components/pells';

function PellHeader() {
  return (
    <div className="page-header center-text">
      <h1>
        <Glyph icon="microphone" />
        {" Pells"}
      </h1>
    </div>
  );
}

function pells(props) {
  return (<div><PellHeader /><Browse.PellsBrowser {...props} /></div>);
}

pells.title = 'A Cappella Browser';

pells.path = '/pells';

pells.store = function(params,queryParams) {
  
  var featured = ('reqtags' in queryParams) ? {} : qc.pellsFeatured;
  var qparams  = mergeParams( {}, qc.pells, featured, queryParams );

  return Acappellas.storeFromQuery(qparams, qc.pells);
};

module.exports = pells;

