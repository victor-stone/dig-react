import rsvp        from 'rsvp';
import Query       from './query';
import ccmixter    from '../models/ccmixter';
import serialize   from '../models/serialize';
import { oassign } from '../unicorns/goodies';

var Playlist = Query.extend({

  queryParams: {},
  model: {},
  originalParams: null,

  applyParams: function(params) {
    var newParams = oassign({},this.queryParams,params);
    this.playlist(newParams)
      .then( model => this.emit('playlist', model ) );
  },

  applyOriginalParams: function() {
    this.queryParams = {}; // we have to forget these
    this.applyParams( this.originalParams || {} );
  },

  paramsDirty: function() {
    if( this.originalParams ) {
      for( var k in this.queryParams ) {
        if( k !== 'offset' ) {
          if( !(k in this.originalParams) || (this.queryParams[k] !== this.originalParams[k]) ) {
            return true;
          }
        }
      }
    }
    return false;
  },

  _playlist: function(params) {
    params.dataview = 'links_by';
    params.f = 'json';
    return this.query(params).then( serialize(ccmixter.Upload) );
  },

  playlist: function(params) {
    if( !params.offset ) {
      params.offset = 0;
    }

    if( !this.originalParams ) {
      this.originalParams = oassign( {}, params );
    }
    this.queryParams = oassign( {}, params );

    this.emit('playlist-loading');


    var modelRequest = {
      playlist: this._playlist( params ),
      total: this.count( params ),
    };
    return rsvp.hash( modelRequest ).then( results => {
      //results.store = this;
      results.queryParams = this.queryParams;
      results.fullQueryParams = params;
      this.model = results;
      return results;
    });
  },


});


module.exports = function(params) {
  var pl = new Playlist();
  return pl.playlist(params).then( () => pl );
};