import qc        from '../../models/query-configs';
import Remixes   from '../../stores/remixes';

import { Search,
         SubNav } from '../../components/dig';

import { mergeParams }  from 'unicorns';

Object.assign(Search,{

  title: 'Search',

  subnav: SubNav,

  store( params, queryParams ) {

    const { searchp = '' } = queryParams;

    var qparams = mergeParams( { search_type: 'all' }, 
                              qc.remixes,
                              queryParams,
                              { searchp } );

    return Remixes.fromQuery(qparams);
  },

  urlFromStore(store) {
    return '/search' + store.queryString( qc.visibility.search );
  }

});


module.exports = Search;

