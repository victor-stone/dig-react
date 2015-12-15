import rsvp             from 'rsvp';
import Query            from './query';
import Uploads          from './uploads';
import ccmixter         from '../models/ccmixter';
import serialize        from '../models/serialize';

class PlaylistTracks extends Uploads {
 fetch(queryParams) {
    return this.query(queryParams).then( serialize(ccmixter.Upload) );
  }
}

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
      f: 'js',
      dataview: 'playlist_detail',
      ids: id,
    };

    var pl = {
      playlist: id,
      limit: 10,
    };

    var model = {
      head:    this.queryOne(q).then( serialize( ccmixter.PlaylistHead ) ),
      tracks:  this.uploads.getModel(pl).then( () => this.uploads )
    };

    return this.transaction(rsvp.hash(model)
              .then( model => { 
                  this.model = model; 
                  return this.findUser(model.head.curator.id); 
              }).then( curator => {
                  this.model.head.curator = curator;
                  return this.model;
              }));
  }
}

Playlist.storeFromQuery = function(id) {
  var pl = new Playlist();
  return pl.find(id).then( () => pl );
};

module.exports = Playlist;

