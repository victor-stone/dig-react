import rsvp             from 'rsvp';
import QueryBasic       from './query-basic';
import Query            from './query';
import ccmixter         from '../models/ccmixter';
import serialize        from '../models/serialize';
import env              from '../services/env';

class PlaylistTracks extends Query {
  fetch(queryParams,deferName) {
    return this.query(queryParams,deferName).then( serialize(ccmixter.PlaylistTrack) );
  }
}

PlaylistTracks.storeFromQuery = function(params,defaults) {
  var pl = new PlaylistTracks(defaults);
  return pl.getModel(params).then( () => pl );  
};

class Playlist extends QueryBasic {

  constructor() {
    super(...arguments);
    this.model = {};
  }

  get uploads() {
    if( !this._uploads ) {
      this._uploads = new PlaylistTracks();
      this._uploads.gotCache = true;
    }

    return this._uploads;
  }

  find(id) {

    var q = {
      dataview: 'playlist_head',
      ids: id,
    };

    var pl = {
      playlist: id,
      limit: 10,
    };

    var model = {
      head:    this.queryOne(q).then( serialize( ccmixter.PlaylistHead ) ),
      tracks:  this.uploads.getModel(pl)
                              .then( model => {
                                  model.items.forEach( t => {
                                    try {                                      
                                      t.mediaTags.playlist = id;
                                    } catch(e) {
                                      env.log( 'could not set media tags for ', t.id);
                                    }
                                  });
                                  return this.uploads;
                              })
    };

    return rsvp.hash(model)
              .then( model => { 
                  this.model = model; 
              });
  }
}

Playlist.PlaylistTracks = PlaylistTracks;

Playlist.storeFromQuery = function(id) {
  var pl = new Playlist();
  return pl.find(id).then( () => pl );
};

module.exports = Playlist;

