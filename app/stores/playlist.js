import rsvp        from 'rsvp';
import Query       from './query';
import ccmixter    from '../models/ccmixter';
import serialize   from '../models/serialize';
import { oassign } from '../unicorns';
import TagString   from '../unicorns/tagString';


function mergeParams( oldp, newp ) {
  var target = oassign( {}, oldp );
  var tagFields = [ 'tags', 'reqtags', 'oneof' ];
  for( var k in newp ) {
    var isRemoveParam  = k.match(/^--(.*)/);
    if( isRemoveParam ) {
      var realParamName = isRemoveParam[1];
      if( tagFields.contains(realParamName) ) {
        if( realParamName in oldp ) {
          target[realParamName] = (new TagString(oldp[realParamName])).remove(newp[k]).toString();
        }
      }
    } else {
      if( tagFields.contains(k) ) {
        if( oldp[k] ) {
          target[k] = (new TagString(oldp[k])).add( newp[k]).toString();
        } else {
          target[k] = newp[k];
        }
      } else {
        target[k] = newp[k];
      }
    }
  }
  return target;
}

var Playlist = Query.extend({

  model:       {},
  orgParams:   null,

  /**
    annotadedParams is a JS object that specifies QueryAPI
    parameters with addition of being able to remove items
    during merge. (For now this only really applies to tag
    fields like 'tags', 'reqtags' and 'oneof')

    put a '--' (2 minus signs) before the key name in the
    object

    ```
      {
          'tags':       'hip_hop,jazz',         // these will be merged
          '--reqtags':  'instrumental,-vocals'  // these will be removed
      }
    ```
  */
  applyParams: function(annotadedParams) {

    var newParams = mergeParams( this.model.queryParams || {}, annotadedParams );

    this.playlist(newParams)
      .then( model => this.emit('playlist', model ) );
  },

  applyOriginalParams: function() {
    this.applyParams( this.orgParams || {} );
  },

  applyToOriginalParams: function(annotadedParams) {
    this.orgParams = mergeParams(this.orgParams, annotadedParams);
    var params = mergeParams({}, annotadedParams);
    this.applyParams( params );
  },

  paramsDirty: function() {
    if( this.orgParams && !!this.model.queryParams ) {
      var qp = this.model.queryParams;
      for( var k in qp ) {
        if( k !== 'offset' ) {
          if( !(k in this.orgParams) || (qp[k] !== this.orgParams[k]) ) {
            return true;
          }
        }
      }
    }
    return false;
  },

  _playlist: function(params) {
    params.dataview = 'links_by';
    params.f        = 'json';
    return this.query(params).then( serialize(ccmixter.Upload) );
  },

  playlist: function(params) {
    if( !params.offset ) {
      params.offset = 0;
    }

    if( !this.orgParams ) {
      this.orgParams = oassign( {}, params );
    }

    var paramsCopy = oassign( {}, params );

    this.emit('playlist-loading',params);

    var modelRequest = {
      playlist: this._playlist( params ),
      total: this.count( params ),
    };

    return rsvp.hash( modelRequest ).then( results => {
      results.queryParams = oassign( {}, paramsCopy );
      this.model = results;
      return results;
    });
  },


});

// performs the query but returns the store
// from the promise (which contains the result
// of the query in the .model property )
//
// very handy for routing
//
Playlist.storeFromQuery = function(params) {
  var pl = new Playlist();
  return pl.playlist(params).then( () => pl );  
};

module.exports = Playlist;
