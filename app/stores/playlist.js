import UploadList  from './upload-list';
import ccmixter    from '../models/ccmixter';
import serialize   from '../models/serialize';
import querystring from 'querystring';
import rsvp        from 'rsvp';

var userCache = {

};

class Playlist extends UploadList {

  constructor() {
    super(...arguments);
  }

  /* protected */

  fetch(queryParams) {
    return this.query(queryParams)
              .then( serialize(ccmixter.Upload) )
              .then( model => { 
                if(model.artist) { 
                  this._putUser(model.artist,queryParams.u);
                }
                return model;
              }).catch( e => {
                var str = /*decodeURIComponent*/(querystring.stringify(queryParams));
                throw new Error( `${str} original: ${e.toString()}-${e.stack}`);
              });
  }

  promiseHash( hash, queryParams ) {
    hash.artist = queryParams.u ? this._getUser(queryParams.u) : null;
    return hash;
  }

  /* private */

  _getUser(u) {
    if( userCache[u] ) {
      return rsvp.resolve(userCache[u]);
    }
    return this.findUser(u);
  }

  _putUser(model,u) {
    userCache[u] = model;
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
  return pl.getModel(params).then( () => pl );  
};

module.exports = Playlist;
