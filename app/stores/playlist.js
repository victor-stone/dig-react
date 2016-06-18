import rsvp             from 'rsvp';
import QueryBasic       from './query-basic';
import Query            from './query';
import ccmixter         from '../models/ccmixter';
import serialize        from '../models/serialize';
import env              from '../services/env';
import { TagString }    from '../unicorns';
import api              from '../services/ccmixter';
import events           from '../models/events';
import TagsOwner        from '../mixins/tags-owner';
import Permissions      from '../mixins/permissions';

class PlaylistTracks extends Query {
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
    return { isOwner: false };
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

  applyQuery(props) {
    var id = this.model.head.id;
    return api.playlist.updateDynamic(id,props)
      .then( () => this._fetchHead(id) )
      .then( head => {
          this.model.head = head;
          this.emit(events.MODEL_UPDATED);
      });
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

  get uploads() {
    if( !this._uploads ) {
      this._uploads = new PlaylistTracks();
      this._uploads.gotCache = true;
    }

    return this._uploads;
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
        this.permssions = { isOwner: user === head.curator.id };
        return head;
      }, () => {
        this.permssions = this.nullPermissions;
        return head;
      });
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

Playlist.PlaylistTracks = PlaylistTracks;

Playlist.storeFromQuery = function(id) {
  var pl = new Playlist();
  return pl.find(id).then( () => pl );
};

module.exports = Playlist;

