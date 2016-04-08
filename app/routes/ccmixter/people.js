import React            from 'react';
import User             from '../../stores/user';
import People           from '../../components/ccmixter/People';
import { mergeParams }  from '../../unicorns';
import qc               from '../../models/query-configs';

function people(props) {
  return (<People store={props.store} />);
}

people.path = '/people/:userid';

people.title = 'People';

people.store = function(params,queryParams) {
  var qparams = mergeParams( {}, qc.people, { u: params.userid }, queryParams );
  return User.storeFromQuery(qparams, qc.people)
          .then( store => {
            people.title = !this.error && store.model.artist.name;
            return store;
          });
};

module.exports = people;

