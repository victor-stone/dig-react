import Collection   from './collection';
import Upload       from './upload';
import UserSearch   from './user-search';
import ccmixter     from '../models/ccmixter';
import serialize    from '../models/serialize';
import events       from 'models/events';
import env          from 'services/env';
import rsvp         from 'rsvp';

import { cleanSearchString }   from 'unicorns';

const DEFAULT_LIMIT           = 10;
const DEFAULT_UPLOAD_MINITEMS = 1;
const DEFAULT_SEARCH_MINITEMS = 1;
const DEFAULT_USER_MINITEMS   = '-1';
const DEFAULT_MINITEMS        = 5;

class Playlists extends Collection {

  constructor() {
    super({ 
        dataview:  'playlists',
        limit:     DEFAULT_LIMIT,
        offset:    0,
      });
    this.tagFields = [ 'tags' ];
    this._autoFilterTags = true;
  }

  get autoFilterTags() {
    return this._autoFilterTags;
  }

  set autoFilterTags(value) {
    this._autoFilterTags = value;
  }

  get tagFilter() {
    return this.tagStore.forCategories( ['genre','mood'], '');
  }

  get uploadStore() {
    !this._uploadStore && (this._uploadStore = new Upload());
    return this._uploadStore;
  }

  get userSearch() {
    !this._userSearch && (this._userSearch = new UserSearch());
    return this._userSearch;
  }

  getModel(queryParams) {

    const { 
      dynamic, 
      search, 
      upload, 
      user } = queryParams;

    const defaults = {}; 

    const hasSearch = !!search;

    if( !dynamic ) {
      if( upload ) {
        defaults.minitems = DEFAULT_UPLOAD_MINITEMS;
      } else if( user ) {
        defaults.minitems = DEFAULT_USER_MINITEMS;
        defaults.dynamic  = 1;
      } else if( hasSearch ) {
        defaults.minitems = DEFAULT_SEARCH_MINITEMS;
        defaults.dynamic  = 1;
      } else {
        defaults.minitems = DEFAULT_MINITEMS;
      }
    }

    Object.assign( defaults, queryParams || {});
    
    const q = this.queryParamsNative(defaults);  

    if( hasSearch ) {
      q.search = cleanSearchString( q.search );
    }

    var model = {
      items:    this.fetch(q,'items'),
      total:    this.count(q,'total'),
      upload:   q.upload ? this.uploadStore.info(q.upload) : null,
      curator:  q.user ? this.userSearch.findUser(q.user) : null,
      curators: hasSearch ? this.userSearch.searchUsers( { limit: 40, searchp: q.search, minpl: 1 } ) : null
    };

    return this.flushBatch(model).then( model => {
      this.model = model;
      this.model.queryParams = Object.assign( {}, q );
      this.notifyPaging();
      this.emit( events.MODEL_UPDATED, model );
      return model;
    });
  }

  fetch(queryParams,batchName) {
    return this.query(queryParams,batchName)
              .then( serialize( ccmixter.Playlist.Playlist ) )
              .then( models => this._filterGenreTags(models) );
  }

  count(queryParams,batchName) {
    var q = {
      f: 'count',
      dataview: 'playlists',
      datasource: 'cart',
      noarray: 1
    };

    [ 'minitems', 'upload', 'tags', 'user', 'type', 'dynamic', 'search'].forEach( p => {
      if( queryParams[p] ) {
        q[p] = queryParams[p];
      }
    });

    return this.query(q,batchName);
  }

  tracksForPlaylist(id,batchName) {
    var q = {
      playlist: id
    };
    return this.query(q,batchName)
             .then( serialize( ccmixter.Playlist.PlaylistTrack ) )
             .then( tracks => {
                tracks.forEach( t => {
                  try {
                    t.mediaTags.playlist = id;
                  } catch(e) {
                    env.log( 'failed to set playlist on mediaTags for ', t.id );
                  }
                });
                return tracks;
              });
  }
  
  _filterGenreTags( models ) {
    if( this._autoFilterTags ) {
      return this.tagFilter.then( tags => {
        models.forEach( m => m.tags = m.tags.intersection(tags) );
        return models;
      });
    }
    return rsvp.resolve(models);
  }

  static fromQuery(queryParams) {
    
    var playlists = new Playlists();

    return playlists.getModel(queryParams).then( () => playlists );  

  }
}


module.exports = Playlists;

//