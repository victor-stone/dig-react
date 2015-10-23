import rsvp        from 'rsvp';
import Query       from './query';
import ccmixter    from '../models/ccmixter';
import serialize   from '../models/serialize';
import { oassign } from '../unicorns/goodies';

var Playlist = Query.extend({

  queryParams: {},

  applyParams: function(params) {
    var newParams = oassign({},this.queryParams,params);
    this.emit('playlist',this.playlist(newParams));
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
    this.queryParams = oassign({},params);

    var modelRequest = {
      playlist: this._playlist( params ),
      total: this.count( params ),
    };
    return rsvp.hash( modelRequest ).then( results => {
      results.store = this;
      results.queryParams = this.queryParams;
      return results;
    });
  },


});


module.exports = Playlist;