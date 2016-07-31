import qc               from '../../models/query-configs';
import Samples          from '../../stores/samples';
import { mergeParams }  from 'unicorns';
import Browse           from '../../components/stems/browse';
import SubNav           from '../../components/stems/sub-nav';

const stems = Object.assign(Browse,{

  title: 'Samples Browser',

  subnav: SubNav,

  store(params,queryParams) {
    var opts    = mergeParams( {type: 'any' }, qc.samples, qc.latest );
    var qparams = mergeParams( { }, opts, queryParams );
    return Samples.storeFromQuery(qparams,opts);
  },

  urlFromStore(store) {
    return '/stems' + store.queryString;
  }

});


module.exports = stems;

