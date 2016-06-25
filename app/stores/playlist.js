import rsvp             from 'rsvp';
import QueryBasic       from './query-basic';
import QueryWithTags    from './query-with-tags';
import ccmixter         from '../models/ccmixter';
import serialize        from '../models/serialize';
import env              from '../services/env';
import { TagString,
         mergeParams }  from '../unicorns';
import api              from '../services/ccmixter';
import events           from '../models/events';
import TagsOwner        from '../mixins/tags-owner';
import Permissions      from '../mixins/permissions';

class PlaylistTracks extends QueryWithTags {
  fetch(queryParams,deferName) {
    return this.query(queryParams,deferName)
              .then( serialize(ccmixter.PlaylistTrack) );
  }
}

PlaylistTracks.storeFromQuery = function(params,defaults) {
  var pl = new PlaylistTracks(defaults);
  return pl.getModel(params).then( () => pl );  
};

class Playlist extends Permissions(TagsOwner(QueryBasic)) {

  constructor() {
    super(...arguments);
    this.model = {};
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
                  this.model = model; 
                  this.emit(events.MODEL_UPDATED);
              });
  }

  getPermissions(head) {
    return api.user.currentUser()
      .then( user => {
        this.permissions = { canEdit: user === head.curator.id };
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
    var pl = {
      playlist: id,
      limit: 10,
    };
    return this.uploads.getModel(pl)
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

Playlist.create = function(name,track,qstring) {
  if( qstring ) {
    return api.playlists.createDynamic(name,qstring);
  } else {
    return api.playlists.createStatic(name,'',track);
  }
};

Playlist.PlaylistTracks = PlaylistTracks;

Playlist.storeFromQuery = function(id) {
  var pl = new Playlist();
  return pl.find(id).then( () => pl );
};

Playlist.storeFromUploadsQuery = function(qparams, opts) {
  var pl = new Playlist();
  return pl._tracksStore(opts).getModel(qparams).then( () => {
    pl.model = { head: {}, tracks: pl.uploads };
    return pl;
  });
};

module.exports = Playlist;

