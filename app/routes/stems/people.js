import React            from 'react';
import Samples          from '../../stores/samples';
import qc               from '../../models/query-configs';
import { mergeParams }  from '../../unicorns';
import People           from '../../components/stems/People';

function stemsPeople(props) {
  return (<People {...props} />);
}

stemsPeople.title = 'People';

stemsPeople.path = '/people/:userid';

stemsPeople.store = function(params,queryParams) {
  var qparams = mergeParams( {}, qc.samples, queryParams, { u: params.userid } );
  return Samples.storeFromQuery(qparams).then( function(store) {
    stemsPeople.title = store.model.artist.name;
    return store;
  });
};

module.exports = stemsPeople;

//