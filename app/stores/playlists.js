import Collection   from './collection';
import Upload       from './upload';
import UserSearch   from './user-search';
import ccmixter     from '../models/ccmixter';
import serialize    from '../models/serialize';
import events       from '../models/events';
import env          from '../services/env';
import rsvp         from 'rsvp';

import { cleanSearchString }   from 'unicorns';

const DEFAULT_LIMIT           = 10;
const DEFAULT_UPLOAD_MINITEMS = 1;
const DEFAULT_SEARCH_MINITEMS = 1;
const DEFAULT_USER_MINITEMS   = '-1';
const DEFAULT_MINITEMS        = 5;

class Playlists extends Collection {

  constructor() {
    super(...arguments);
    this.tagFields = [ 'tags' ];
    this._autoFilterTags = true;
    this._prevQueryParams = {};
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
    Object.assign(this._prevQueryParams,queryParams);

    var defaults =  { 
        dataview:  'playlists',
        limit:     DEFAULT_LIMIT,
        offset:    0,
      };

    var hasSearch = 'search' in queryParams;

    if( !queryParams.dynamic ) {
      if( queryParams.upload ) {
        defaults.minitems = DEFAULT_UPLOAD_MINITEMS;
      } else if( queryParams.user ) {
        defaults.minitems = DEFAULT_USER_MINITEMS;
        defaults.dynamic  = 1;
      } else if( hasSearch ) {
        defaults.minitems = DEFAULT_SEARCH_MINITEMS;
        defaults.dynamic  = 1;
      } else {
        defaults.minitems = DEFAULT_MINITEMS;
      }
    }

    var q = Object.assign( defaults, queryParams || {});
      
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

    return this.flushDefers(model).then( model => {
      this.model = model;
      this.model.queryParams = Object.assign( {}, q );
      this.notifyPaging();
      this.emit( events.MODEL_UPDATED, model );
      return model;
    });
  }

  fetch(queryParams,deferName) {
    return this.query(queryParams,deferName)
              .then( serialize( ccmixter.Playlist.Playlist ) )
              .then( models => this._filterGenreTags(models) );
  }

  count(queryParams,deferName) {
    var q = {
      f: 'count',
      dataview: 'playlists',
      datasource: 'cart',
    };

    [ 'minitems', 'upload', 'tags', 'user', 'type', 'dynamic', 'search'].forEach( p => {
      if( queryParams[p] ) {
        q[p] = queryParams[p];
      }
    });

    return this.queryOne(q,deferName);
  }

  refresh(queryParams = this._prevQueryParams) {
    return this.getModel(queryParams);
  }
  
  tracksForPlaylist(id,deferName) {
    var q = {
      playlist: id
    };
    return this.query(q,deferName)
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
}

Playlists.storeFromQuery = function(queryParams,defaults) {
  var playlists = new Playlists(defaults);
  return playlists.getModel(queryParams).then( () => playlists );  
};

module.exports = Playlists;

//