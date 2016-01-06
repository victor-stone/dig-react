import rsvp             from 'rsvp';
import Query            from './query';
import Uploads          from './uploads';
import ccmixter         from '../models/ccmixter';
import serialize        from '../models/serialize';
import env              from '../services/env';

class PlaylistTracks extends Uploads {
  fetch(queryParams) {
    return this.query(queryParams).then( serialize(ccmixter.PlaylistTrack) );
  }
}

PlaylistTracks.storeFromQuery = function(params,defaults) {
  var pl = new PlaylistTracks(defaults);
  return pl.getModel(params).then( () => pl );  
};


class Playlist extends Query {

  constructor() {
    super(...arguments);
    this.model = {};
  }

  get uploads() {
    if( !this._uploads ) {
      this._uploads = new PlaylistTracks();
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

