import qc               from '../../models/query-configs';
import Samples          from '../../stores/samples';

import { mergeParams }    from 'unicorns';

import Search               from '../../components/stems/search';

Object.assign(Search,{

  title: 'Samples Browser - Search',

  path: '/stems/search',

  store(params,queryParams) {
    
    var qparams = mergeParams( {}, 
                               qc.samples, 
                               queryParams );

    return Samples.fromQuery( qparams );
  },

  urlFromStore(store) {
    return Search.path + store.queryString( qc.visibility.stems );
  }

});


module.exports = Search;

