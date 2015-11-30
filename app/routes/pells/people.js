import React              from 'react';
import qc                 from '../../models/query-configs';
import Acappellas         from '../../stores/acappellas';
import { mergeParams }    from '../../unicorns';
import { People }         from '../../components';
import { PellsBrowser }   from '../../components/PellsBrowser';


function people(props) {
  var artist = props.store.model.artist;
  return (<div><People.Header model={artist} /><PellsBrowser {...props} /></div>);
}

people.title = 'People';

people.path = '/people/:userid';

people.store = function(params,queryParams) {
  
  var featured = ('reqtags' in queryParams) ? {} : qc.pellsFeatured;
  var opts     = mergeParams( { u: params.userid }, qc.pells, featured );
  var qparams  = mergeParams( {}, opts, featured, queryParams );

  return Acappellas.storeFromQuery(qparams, opts).then( store => {
    people.title = store.model.artist.name;
    return store;
  });
};

module.exports = people;

