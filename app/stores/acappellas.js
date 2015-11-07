import Query            from './query';
import ccmixter         from '../models/ccmixter';
import serialize        from '../models/serialize';
import rsvp             from 'rsvp';
import { oassign }      from '../unicorns';

var MAX_CACHE_KEYS = 50;

class ACappellas extends Query {

  constructor() {
    super(...arguments);

    this.filters     = [ 'featured', 'spoken_word', 'melody', 'rap' ];
    this._totals     = {};
    this._keys_count = 0;
    this.model       = {};
    this.orgParams   = null;
    this._selected   = null;
  }

  _stringized(p) {
    var str = '';
    Object.keys(p).forEach( k => { if( p[k] ) { str += p[k]; } } );
    return str;
  }

  get selected() {
    return this._selected;
  }

  set selected(id) {
    var uploadQ = {
      ids: id,
      f: 'json',
      dataview: 'default'
    };    
    this.queryOne(uploadQ)
          .then( serialize( ccmixter.Detail ) )
          .then( pell => {
            this._selected = pell;
            this.emit('selected',pell);
          });
  }

  getTotals(params) {

    var p = oassign( {}, params );

    p.reqtags = null; 

    var paramsKey = this._stringized(p);

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

  applyParams(params) {

    var newParams = oassign( {}, this.model.params || {}, params );

    this.acappellas(newParams)
      .then( model => this.emit('playlist', model ) );
  }

  applyOriginalParams() {
    this.applyParams( this.orgParams || {} );
  }

  _acappellas(params) {
    params.f = 'json';
    return this.query(params).then( serialize( ccmixter.ACappella ) );
  }

  acappellas(params) {

    var args = {
      lic:    params.lic,
      limit:  params.limit,
      offset: params.offset,
      sort:   'date',
      ord:    'DESC'
    };

    if( params.bpm && params.bpm.match(/^bpm_[0-9]{3}_[0-9]{3}$/) ) {
      args.tags = params.bpm;
    }
    
    if( params.filter && this.filters.contains(params.filter) ) {
      args.reqtags = params.filter + ',acappella';
    } else {
      args.reqtags = 'acappella';
    }

    if( params.unmixed  ) {
      args.remixmax = '0';
    }

    var artist = null;
    if( params.artist && params.artist !== '-' ) {
      args.u = params.artist;
      artist = this.findUser(params.artist);
    }

    if( !this.orgParams ) {
      this.orgParams = oassign( {}, params );
    }

    this.emit('playlist-loading',params);

    var hash = {
      artist:   artist,
      playlist: this._acappellas(args),
      total:    this.count(args),
      totals:   this.getTotals(args),
    };

    return rsvp.hash(hash).then( model => {
      model.params = oassign({},params);
      model.queryParams = oassign({},args);
      this.model = model;
    });
  }
}

ACappellas.storeFromQuery = function(params) {
  var pells = new ACappellas();
  return pells.acappellas(params).then( () => pells );  
};

module.exports = ACappellas;

