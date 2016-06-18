import QueryBasic       from './query-basic';
import ccmixter         from '../models/ccmixter';
import serialize        from '../models/serialize';
import events           from '../models/events';
import api              from '../services/ccmixter';
import { TagString }    from '../unicorns';
import TagsOwner        from '../mixins/tags-owner';
import Permissions      from '../mixins/permissions';


function _fixFeaturing(model) {
  if( !model.upload.featuring && model.sources && model.upload.setFeatureSources ) {
    model.upload.setFeatureSources(model.sources);
  }
  return model;
}

class Upload extends Permissions(TagsOwner(QueryBasic)) {

  constructor() {
    super(...arguments);
    this.model = {};
  }


  _onCurrentUserReject() {
    return this.nullPermissions;
  }

  getPermissions(model) {
    var success = function(user) {
        return api.upload.permissions(model.upload.id,user).then( results => {
          return( Object.assign( {isOwner:user === model.upload.artist.id}, results ) );
        });
    };

    var me = this;

    var reject = function() {
      return me.nullPermissions;
    };

    var pthen = function( perms ) {
      me.permissions = perms;
      return model;
    };

    return api.user.currentUser()
            .then( success, reject )
            .then( pthen );
  }

  get nullPermissions() {
    return { 
      isOwner: false,
      okToRate: false,
      okToReview: false
    };
  }

  get queryParams() {
    return (this.model && this.model.queryParams) || {};
  }

  get tags() {
    return new TagString(this.model.upload.userTags);
  }

  set tags(t) {
    var tags = t.toString();
    this.applyProperties({tags}).then( () => {
      this.emit(events.TAGS_SELECTED);
    });
  }

  applyProperties(props) {
    return api.upload.update(this.model.upload.id,props).then( this.refresh.bind(this) );
  }

  recommend() {
    return api.user.currentUser()
            .then( user => {
              return api.upload.rate( this.model.upload.id, user );
            }).then( () => this.refresh() );
  }

  review(text) {
    return api.user.currentUser()
            .then( user => {
              return api.upload.review( this.model.upload.id, user, text );
            }).then( () => this.refresh() );
  }

  find(id,userid,_flags) {
    
    var flags = _flags || Upload.ALL;

    var model = null;

    var queries = {
      upload:     this.info(id,'upload'),
      remixes:    flags & Upload.REMIXES    ? this.remixes(id,'remixes')    : [],
      trackbacks: flags & Upload.TRACKBACKS ? this.trackbacks(id,'trackbacks') : [],
      sources:    flags & Upload.SOURCES    ? this.sources(id,'sources')    : [],
      artist:     userid ? this.findUser(userid,'artist') : null,
    };

    this.error = null;

    var _this = this;

    return this.flushDefers(queries)

      .then( record => {
        
        if( !record.upload || !Object.keys(record.upload) ) {
          throw( new Error('No record found') );
        }
        model = _fixFeaturing(record);

        return model.artist ? model.artist : this.findUser(model.upload.artist.id);

      }).then( user => {
        
        model.artist        = 
        model.upload.artist = user;
        model.queryParams   = { ids: id, u: user.id };
        
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
    var trackbacksQ = {
      trackbacksof: forId,
      dataview: 'trackbacks',
      sort: 'date',
      ord: 'desc',
      limit: Upload.MAX_TRACKBACK_FETCH
    };
    return this.query(trackbacksQ,deferName).then( serialize( ccmixter.Trackback ) );
  }
  
  remixes(forId,deferName) {
    var remixesQ = {
      remixes: forId,
      dataview: 'links_u',
      sort: 'date',
      ord: 'desc'
    };
    return this.query(remixesQ,deferName).then( serialize( ccmixter.RemixOf ) );
  }
  
  sources(forId,deferName) {
    var sourcesQ = {
      sources: forId,
      dataview: 'links_u',
      datasource: 'uploads'
    };
    return this.query(sourcesQ,deferName).then( serialize( ccmixter.Source ) );
  }
  
  info(id,deferName) {
    var uploadQ = {
      ids: id,
      dataview: 'default'
    };    
    return this.queryOne(uploadQ,deferName).then( serialize( ccmixter.Detail ) );
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
  var uploadStore = new Upload();
  return uploadStore.find(id,user,flags)
                        .then( model => {
                            uploadStore.model = model;
                            return uploadStore;
                        });
};

Upload.REMIXES    = 0x001;
Upload.TRACKBACKS = 0x002;
Upload.SOURCES    = 0x004;
Upload.ALL        = Upload.REMIXES | Upload.TRACKBACKS | Upload.SOURCES;

module.exports = Upload;

