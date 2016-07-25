import { mergeParams }  from '../../unicorns';
import qc               from '../../models/query-configs';
import Rmx              from '../../stores/remixes';

import {  People }     from '../../components/dig'; 
import SubNav           from '../../components/dig/sub-nav';

const people = Object.assign(People,{
  path: '/people/:userid',

  title: 'People',

  subnav: SubNav,

  store(params,queryParams) {
    const opts    = mergeParams( {}, qc.remixes );
    const qparams = mergeParams( {}, opts, { user: params.userid }, queryParams );
    return Rmx.storeFromQuery(qparams,opts)
            .then( store => {
              people.title = !this.error && store.model.artist.name;
              return store;
            });
  },

  urlFromStore(store) {
    const { model:{artist:{id}}, queryString } = store;
    return '/people/' + id + queryString;
  }


});
module.exports = people;

