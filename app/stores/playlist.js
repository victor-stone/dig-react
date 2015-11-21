import UploadList  from './upload-list';
import ccmixter    from '../models/ccmixter';
import serialize   from '../models/serialize';
import querystring from 'querystring';

class Playlist extends UploadList {

  constructor() {
    super(...arguments);
  }

  /* protected */

  fetch(queryParams) {
    return this.query(queryParams)
              .then( serialize(ccmixter.Upload) )
              .catch( e => {
                var str = decodeURIComponent(querystring.stringify(queryParams));
                throw new Error( `error during fetch of ${str} original: ${e.toString()}`);
              });
  }

  promiseHash( hash, queryParams ) {
    hash.artist = queryParams.u ? this.findUser(queryParams.u) : null;
    return hash;
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
