import Uploads     from './uploads';
import Upload      from './upload';
import ccmixter    from '../models/ccmixter';
import serialize   from '../models/serialize';
import rsvp        from 'rsvp';
import events      from '../models/events';
import env         from '../services/env';

import { oassign,
         cleanSearchString }   from '../unicorns';

const DEFAULT_LIMIT           = 10;
const DEFAULT_UPLOAD_MINITEMS = 1;
const DEFAULT_SEARCH_MINITEMS = 1;
const DEFAULT_USER_MINITEMS   = '-1';
const DEFAULT_MINITEMS        = 5;

class Playlists extends Uploads {

  constructor() {
    super(...arguments);
    this.tagFields = [ 'tags' ];
  }

  get tagFilter() {
    return this.tags.forCategories( ['genre','mood'], '');
  }

  get uploadStore() {
    if( !this._uploadStore ) {
      this._uploadStore = new Upload();
    }
    return this._uploadStore;
  }

  getModel(queryParams) {
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

    var q = oassign( defaults, queryParams || {});
      
    if( hasSearch ) {
      q.search = cleanSearchString( q.search );
    }

    var model = {
      items:  this.fetch(q),
      total:  this.count(q),
      upload: q.upload ? this.uploadStore.info(q.upload) : null,
      curator: q.user ? this.findUser(q.user) : null,
      curators: hasSearch ? this.searchUsers( { limit: 40, searchp: q.search, minpl: 1 } ) : null
    };

    return rsvp.hash(model).then( model => {
      this.model = model;
      this.model.queryParams = oassign( {}, q );
      this.emit( events.MODEL_UPDATED, model );
      return model;
    });
  }

  fetch(queryParams) {
    return this.query(queryParams)
              .then( serialize( ccmixter.Playlist ) )
              .then( models => this._filterGenreTags(models) );
  }

  count(queryParams) {
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

    return this.queryOne(q);
  }

  tracksForPlaylist(id) {
    var q = {
      playlist: id
    };
    return this.query(q)
             .then( serialize( ccmixter.PlaylistTrack ) )
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
    return this.tagFilter.then( tags => {
      models.forEach( m => m.tags = m.tags.intersection(tags) );
      return models;
    });
  }
}

Playlists.storeFromQuery = function(queryParams) {
  var playlists = new Playlists();
  return playlists.getModel(queryParams).then( () => { return playlists; } );  
};

module.exports = Playlists;

//