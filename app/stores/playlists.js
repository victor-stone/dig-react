import Uploads     from './uploads';
import ccmixter    from '../models/ccmixter';
import serialize   from '../models/serialize';
import rsvp        from 'rsvp';
import { oassign } from '../unicorns';
import events      from '../models/events';

const DEFAULT_LIMIT    = 10;
const DEFAULT_MINITEMS = 10;

class Playlists extends Uploads {

  constructor() {
    super(...arguments);
    this.tagFields = [ 'tags' ];
  }

  get tagFilter() {
    return this.tags.forCategories( ['genre','mood'], '');
  }

  getModel(queryParams) {
    var defaults =  { 
        dataview: 'playlists',
        f:         'js',
        limit:     DEFAULT_LIMIT,
        offset:    0,
      };

    if( !queryParams.dynamic ) {
      defaults.minitems = DEFAULT_MINITEMS;
    }

    var q = oassign( defaults, queryParams || {});
      
    var me = this;

    var model = {
      items: me.fetch(q),
      total: this.count(q.minitems)
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

  count(minitems) {
    var q = {
      f: 'count',
      dataview: 'playlists',
      datasource: 'cart',
      minitems
    };
    return this.queryOne(q);
  }

  tracksForPlaylist(id) {
    var q = {
      f: 'js',
      playlist: id
    };
    return this.query(q).then( serialize( ccmixter.Upload ) );
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