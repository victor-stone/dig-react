import qc                 from '../../models/query-configs';
import Acappellas         from '../../stores/acappellas';
import { mergeParams }    from 'unicorns';
import Browse             from '../../components/pells/browse';
import SubNav             from '../../components/pells/sub-nav';

const pells = Object.assign(Browse.PellsBrowser,{

  title: 'A Cappella Browser',

  path: [ '/pells', '/pells/:reqtags'],

  subnav: SubNav,

  store(params,queryParams) {

    const { reqtags = 'featured' } = params;
    
    const qparams = mergeParams( {reqtags}, 
                                 qc.pells,
                                 queryParams );

    return Acappellas.fromQuery(qparams);
  },

  urlFromStore(store) {
    const reqtag = store.getProperty('reqtags').serialize();
    let path = '/pells';
    reqtag !== 'featured' && (path += '/' + reqtag);
    return path + store.queryString( qc.visibility.pells );
  }

});

module.exports = pells;

