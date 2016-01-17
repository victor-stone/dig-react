import Query            from './query';
import ccmixter         from '../models/ccmixter';
import serialize        from '../models/serialize';
import events           from '../models/events';
//import rsvp             from 'rsvp';

function _fixFeaturing(model) {
  if( !model.upload.featuring && model.sources && model.upload.setFeatureSources ) {
    model.upload.setFeatureSources(model.sources);
  }
  return model;
}

class Upload extends Query {

  constructor() {
    super(...arguments);
    this.model = {};
  }

  get queryParams() {
    return (this.model && this.model.queryParams) || {};
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
        
        this.model = model;

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
    return this.query(remixesQ,deferName).then( serialize( ccmixter.Remix ) );
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
  
}

Upload.service = new Upload();

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

