import rsvp        from 'rsvp';
import Query       from './query';
import ccmixter    from '../models/ccmixter';
import serialize   from '../models/serialize';

import { oassign,
         TagString } from '../unicorns';


function mergeParams( oldp, newp ) {
  var target = oassign( {}, oldp );
  var tagFields = [ 'tags', 'reqtags', 'oneof' ];
  for( var k in newp ) {
    var isRemoveParam  = k.match(/^--(.*)/);
    if( isRemoveParam ) {
      var realParamName = isRemoveParam[1];
      if( tagFields.contains(realParamName) ) {
        if( realParamName in target ) {
          target[realParamName] = (new TagString(target[realParamName])).remove(newp[k]).toString();
        }
      }
    } else {
      if( tagFields.contains(k) ) {
        if( target[k] ) {
          target[k] = (new TagString(target[k])).add( newp[k]).toString();
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

class Playlist extends Query {

  constructor() {
    super(...arguments);
    this.model = {};
    this.orgParams = null;
  }

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
  applyParams(annotadedParams) {

    var newParams = mergeParams( this.model.queryParams || {}, annotadedParams );

    this.playlist(newParams)
      .then( model => this.emit('playlist', model ) );
  }

  applyOriginalParams() {
    this.applyParams( this.orgParams || {} );
  }

  applyToOriginalParams(annotadedParams) {
    this.orgParams = mergeParams(this.orgParams, annotadedParams);
    this.applyParams( annotadedParams );
  }

  paramsDirty() {
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
  }

  _playlist(params) {
    params.dataview = 'links_by';
    params.f        = 'json';
    return this.query(params).then( serialize(ccmixter.Upload) );
  }

  playlist(params) {
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
  }

}

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
