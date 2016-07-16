import qc        from '../../models/query-configs';
import Remixes   from '../../stores/remixes';

import { Search,
         SubNav } from '../../components/dig';

import { mergeParams }  from '../../unicorns';

Object.assign(Search,{

  title: 'Search',

  subnav: SubNav,

  store( params, queryParams ) {
    if( ! ('searchp' in queryParams) ) {
      queryParams.searchp = '';
    }

    var opts    = mergeParams( { search_type: 'all' }, qc.remixes );
    var qparams = mergeParams( {}, opts, queryParams );

    return Remixes.storeFromQuery(qparams,opts);
  },

  urlFromStore(store) {
    return '/search' + store.queryString;
  }

});


module.exports = Search;

