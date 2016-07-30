import Query            from './query';
import UserSearch       from './user-search';
import ccmixter         from '../models/ccmixter';
import serialize        from '../models/serialize';
import events           from '../models/events';
import api              from '../services/ccmixter';
import Properties       from './lib/properties';
import Permissions      from '../mixins/permissions';


function _fixFeaturing(model) {
  if( !model.upload.featuring && model.sources && model.upload.setFeatureSources ) {
    model.upload.setFeatureSources(model.sources);
  }
  return model;
}

class Upload extends Permissions(Properties(Query)) {

  constructor() {
    super(...arguments);
    this.model = {};
  }

  _onCurrentUserReject() {
    return this.nullPermissions;
  }

  getPermissions(model) {
    const success = function(user) {
        return api.upload.permissions(model.upload.id,user).then( results => {
          return( Object.assign( {canEdit:user === model.upload.artist.id}, results ) );
        });
    };

    const me = this;

    const reject = function() {
      return me.nullPermissions;
    };

    const pthen = function( perms ) {
      me.permissions = perms;
      return model;
    };

    return api.user.currentUser()
            .then( success, reject )
            .then( pthen );
  }

  get nullPermissions() {
    return { 
      canEdit: false,
      okToRate: false,
      okToReview: false
    };
  }

  get nativeProperties() {
    const { 
      upload, 
      upload:{userTags:tags} 
    } = this.model;
    
    return Object.assign({},upload,{tags});
  }

  get queryParams() {
    return this.model.queryParams || {};
  }

  get userSearch() {
    !this._userSearch && (this._userSearch = new UserSearch());
    return this._userSearch;
  }

  getProperties(propNames) {
    let props = {};
    propNames.forEach( n => props[n] = this.model.upload[n] );
    return props;
  }

  applyProperties(props,callback = m => m ) {
    const { id } = this.model.upload;
    return api.upload.update(id,props)
              .then( () => this.info(id) )
              .then( info => this.model.upload = info )
              .then( callback );
  }

  recommend() {
    return api.user.currentUser()
            .then( user => api.upload.rate( this.model.upload.id, user ) )
            .then( () => this.getPermissions( this.model ) )
            .then( () => this.refresh() );
  }

  review(text) {
    return api.user.currentUser()
            .then( user => api.upload.review( this.model.upload.id, user, text ) )
            .then( () => this.getPermissions( this.model ) )
            .then( () => this.refresh() );
  }

  find( id, userid, flags = Upload.ALL ) {
    
    let model = null;

    const queries = {
      upload:     this.info(id,'upload'),
      remixes:    flags & Upload.REMIXES    ? this.remixes(id,'remixes')    : [],
      trackbacks: flags & Upload.TRACKBACKS ? this.trackbacks(id,'trackbacks') : [],
      sources:    flags & Upload.SOURCES    ? this.sources(id,'sources')    : [],
      artist:     userid ? this.userSearch.findUser(userid,'artist',this) : null,
    };

    this.error = null;

    const _this = this;

    return this.flushDefers(queries)

      .then( record => {
        
        if( !record.upload || !Object.keys(record.upload) || record.upload.length === 0 ) {
          throw( new Error('No record found') );
        }
        model = _fixFeaturing(record);

        // TODO: check if artist is really needed!
        
        return model.artist ? model.artist : this.userSearch.findUser(model.upload.artist.id);

      }).then( user => {
        
        model.artist        = 
        model.upload.artist = user;
        model.queryParams   = { ids: id, user: user.id };
        
        return this.getPermissions(model);

      }).then( model => {

        this.model = model;
        this.emit( events.MODEL_UPDATED, model );
        return model;

      }).catch( e => {
        if( e.message === events.ERROR_IN_JSON ) {
          model = {
            upload: {},
            remixes: [],
            trackbacks: [],
            sources: [],
            artist: {}
          };
          _this.model = model;
          _this.error = this.model.error = e;
          return model;
        } else { 
          throw e;
        }
      });
  }
  
  trackbacks(forId,deferName) {
    const trackbacksQ = {
      trackbacksof: forId,
      dataview: 'trackbacks',
      sort: 'date',
      ord: 'desc',
      limit: Upload.MAX_TRACKBACK_FETCH
    };
    return this.query(trackbacksQ,deferName).then( serialize( ccmixter.Upload.Trackback ) );
  }
  
  remixes(forId,deferName) {
    const remixesQ = {
      remixes: forId,
      dataview: 'links_u',
      sort: 'date',
      ord: 'desc'
    };
    return this.query(remixesQ,deferName).then( serialize( ccmixter.Upload.RemixOf ) );
  }
  
  sources(forId,deferName) {
    const sourcesQ = {
      sources: forId,
      dataview: 'links_u',
      datasource: 'uploads'
    };
    return this.query(sourcesQ,deferName).then( serialize( ccmixter.Upload.Source ) );
  }
  
  info(id,deferName) {
    const uploadQ = {
      ids: id,
      dataview: 'default'
    };    
    return this.queryOne(uploadQ,deferName).then( serialize( ccmixter.Upload.Detail ) );
  }
  
  refresh() {
    return this.info( this.model.upload.id )
            .then( info => {
              this.model.upload = info;
              this.emit( events.MODEL_UPDATED, this.model );
              return info;
            });
  }
}

Upload.MAX_TRACKBACK_FETCH = 25;

Upload.storeFromQuery = function(id,user,flags) {
  const uploadStore = new Upload();
  return uploadStore.find(id,user,flags)
                        .then( model => {
                            uploadStore.model = model;
                            return uploadStore;
                        });
};


Upload.BARE       = 0x000;
Upload.REMIXES    = 0x001;
Upload.TRACKBACKS = 0x002;
Upload.SOURCES    = 0x004;
Upload.ALL        = Upload.REMIXES | Upload.TRACKBACKS | Upload.SOURCES;

module.exports = Upload;

