import rsvp             from 'rsvp';
import Query            from './query';
import TaggedCollection from './tagged-collection';
import ccmixter         from '../models/ccmixter';
import serialize        from '../models/serialize';
import env              from '../services/env';
import { TagString,
         mergeParams }  from '../unicorns';
import api              from '../services/ccmixter';
import events           from '../models/events';
import TagsOwner        from '../mixins/tags-owner';
import Permissions      from '../mixins/permissions';

class PlaylistTracks extends TaggedCollection {
  fetch(queryParams,deferName) {
    return this.query(queryParams,deferName)
              .then( serialize(ccmixter.PlaylistTrack) );
  }
}

PlaylistTracks.storeFromQuery = function(params,defaults) {
  var pl = new PlaylistTracks(defaults);
  return pl.getModel(params).then( () => pl );  
};

class Playlist extends Permissions(TagsOwner(Query)) {

  constructor() {
    super(...arguments);
    this.model = {};
    this._updateForwarder = this._updateForwarder.bind(this);
    this._prevTracks = null;
  }

  get nullPermissions() {
    return { canEdit: false };
  }

  get isDynamic() {
    return this.model.head.isDynamic;
  }

  get tags() {
    var h = this.model.head;
    return new TagString(h.isDynamic ? h.queryParams.tags : h.tags);
  }

  set tags(t) {
    var tags = t.toString();
    ( this.isDynamic ? this.applyQuery({tags}) : this.applyProperties({tags}) ).then( () => {
        this.emit(events.TAGS_SELECTED);
      });
  }

  // TODO: make this a property
  applyQuery(props) {
    var id = this.model.head.id;
    return api.playlist.updateDynamic(id,props)
      .then( () => this._fetchHead(id) )
      .then( head => {
          this.model.head = head;
          this.emit(events.MODEL_UPDATED);
      });
  }

  getProperties(propNames) {
    var props = {};
    propNames.forEach( n => props[n] = this.model.head[n] );
    return props;
  }

  applyProperties(props) {
    var id = this.model.head.id;
    return api.playlist.update(id,props)
      .then( () => this._fetchHead(id) )
      .then( head => {
          this.model.head = head;
          this.emit(events.MODEL_UPDATED);
      });
  }

  // TODO: make this a property
  reorder(sortkeys) {
    return api.playlist.reorder(this.model.head.id,sortkeys).then( () => {
        this._fetchTracks(this.model.head.id);
      });
  }

  // create a dynamic playlist based on the query in
  // tracks
  create(name) {
    var qstring = this.model.tracks.queryStringWithDefaults;
    return Playlist.create(name,'',qstring);
  }

  addTrack(track) {
    return api.playlist.addTrack(track,this.model.head.id);
  }

  deletePlaylist() {
    return api.playlist.deletePlaylist(this.model.head.id);
  }
  
  find(id) {
    var model = {
      head:    this._fetchHead(id),
      tracks:  this._fetchTracks(id)
    };

    return rsvp.hash(model)
              .then( model => { 
                  this._wireTracks(model);
                  this.model = model; 
                  this.emit(events.MODEL_UPDATED);
              });
  }

  // In order to keep the browser URL and other states in sync
  // we forward the model update event from model.tracks to
  // event listeners of this store
  _wireTracks(newModel) {
    this._prevTracks && this._prevTracks.removeListener(events.MODEL_UPDATED,this._updateForwarder);
    newModel.tracks.on(events.MODEL_UPDATED,this._updateForwarder);
    this._prevTracks = newModel.tracks;
  }

  _updateForwarder() {
    this.emit(events.MODEL_UPDATED);
  }

  getPermissions(head) {
    // TODO: this should be on at the server 
    return api.user.currentUserProfile()
      .then( profile => {
        this.permissions = { canEdit: profile.isAdmin || profile.id === head.curator.id };
        return head;
      }, () => {
        this.permissions = this.nullPermissions;
        return head;
      });
  }

  /*
    The default query for the tracks is simply
      playliist=<some-playlist-id>
    But sometimes (like when editing the underlying
    query) you want the tracks store to use the
    actual query in the playlist head.
  */
  useUnderlyingQuery() {
    const qp = this.underlyingQuery;
    return this.model.tracks.refreshModel( qp ).then( () => this );
  }
  
  get underlyingQuery() {
    let m = this.model;
    delete m.tracks.model.queryParams['playlist'];
    let qp = mergeParams( {}, m.tracks.model.queryParams, m.head.queryParams );
    // a hack to remove the .artist fetch in Uploads
    if( 'user' in qp ) {
      qp.u = qp.user;
      delete qp['user'];
    }
    delete qp['playlist'];
    return qp;
  }

  get uploads() {
    return this._tracksStore();
  }

  _tracksStore(opts) {
    if( !this._uploads ) {
      this._uploads = new PlaylistTracks(opts);
      this._uploads.gotCache = true;
    }

    return this._uploads;
  }

  _fetchHead(id) {
    var q = {
      dataview: 'playlist_head',
      ids: id,
    };
    return this.queryOne(q)
      .then( serialize( ccmixter.PlaylistHead ) )
      .then( this.getPermissions.bind(this) );
  }

  _fetchTracks(id) {
    const pl = {
      playlist: id,
      limit: 10,
    };
    return this._tracksStore(pl).getModel(pl)
                            .then( model => {
                                model.items.forEach( t => {
                                  try {                                      
                                    t.mediaTags.playlist = id;
                                  } catch(e) {
                                    env.log( 'could not set media tags for ', t.id);
                                  }
                                });
                                return this.uploads;
                            });
  }
}

// TODO: this should return a Playlist store (no?)
Playlist.create = function(name,track,qstring) {
  if( qstring ) {
    return api.playlists.createDynamic(name,qstring);
  } else {
    return api.playlists.createStatic(name,'',track);
  }
};

Playlist.PlaylistTracks = PlaylistTracks;

Playlist.storeFromID = function(id) {
  var pl = new Playlist();
  return pl.find(id).then( () => pl );
};

Playlist.storeFromModel = function(model) {
  const pl = new Playlist();
  pl.model = {head:model};
  return pl;
};

Playlist.storeFromUploadsQuery = function(qparams, opts) {
  var pl = new Playlist();
  return pl._tracksStore(opts).getModel(qparams).then( () => {
    pl.model = { head: {}, tracks: pl.uploads };
    return pl;
  });
};

module.exports = Playlist;

