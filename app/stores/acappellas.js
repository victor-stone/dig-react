import UploadList       from './upload-list';
import ccmixter         from '../models/ccmixter';
import serialize        from '../models/serialize';
import rsvp             from 'rsvp';
import { oassign }      from '../unicorns';

var MAX_CACHE_KEYS = 50;

class ACappellas extends UploadList {

  constructor() {
    super(...arguments);

    this.filters     = [ 'featured', 'spoken_word', 'melody', 'rap' ];
    this._totals     = {};
    this._keys_count = 0;
    this._selected   = null;
  }

  get selected() {
    return this._selected;
  }

  set selected(id) {
    
    var uploadQ = {
      ids:      id,
      f:        'json',
      dataview: 'default'
    };    

    this.queryOne(uploadQ)
          .then( serialize( ccmixter.Detail ) )
          .then( pell => {
            this._selected = pell;
            this.emit('selected',pell);
          });
  }

  /* protected */

  fetch(queryParams) {
    queryParams.dataview = 'default'; // links_by doesn't have bpm
    return this.query(queryParams).then( serialize( ccmixter.ACappella ) );
  }

  promiseHash( hash, queryParams ) {
    hash.artist = queryParams.u ? this.findUser(queryParams.u) : null;
    hash.totals = this._getTotals(queryParams);
    return hash;
  }


  /* private */

  _getTotals(params) {

    var p = oassign( {}, params );

    p.reqtags = null; 

    var paramsKey = JSON.stringify(p);

    if( paramsKey in this._totals ) {
      return rsvp.resolve(this._totals[paramsKey]);
    }

    p.reqtags = 'acappella';

    var counts = { 
        all: this.count(p),
      };

    this.filters.forEach( f => {
      p.reqtags = 'acappella,' + f;
      counts[f] = this.count(p);
    });

    return rsvp.hash(counts)
            .then( r => {
              if( this._keys_count++ > MAX_CACHE_KEYS ) {
                this._keys_count = 0;
                this._totals = { };
              }
              ++this._keys_count;
              this._totals[ paramsKey ] = r;
              return r;
            });
  }

}

ACappellas.storeFromQuery = function(params) {
  var pells = new ACappellas();
  return pells.getModel(params).then( () => pells );  
};

module.exports = ACappellas;

