import qc                 from '../../models/query-configs';
import Acappellas         from '../../stores/acappellas';
import { mergeParams }    from '../../unicorns';
import Browse             from '../../components/pells/Browse';
import SubNav             from '../../components/pells/SubNav';

const pells = Object.assign(Browse.PellsBrowser,{

  title: 'A Cappella Browser',

  path: [ '/pells', '/pells/:reqtags'],

  subnav: SubNav,

  store(params,queryParams) {
    const { reqtags = 'featured' } = params;
    const opts = mergeParams( {reqtags}, qc.pells );
    const qparams  = mergeParams( {}, opts, queryParams );
    return Acappellas.storeFromQuery(qparams, opts);
  },

  urlFromStore(store) {
    const reqtag = store.currentReqtag;
    let path = '/pells';
    if( reqtag !== 'featured' ) {
      path += '/' + reqtag;
    }
    return path + store.queryString;
  }

});

module.exports = pells;

