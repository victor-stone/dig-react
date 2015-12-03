import Query            from './query';
import ccmixter         from '../models/ccmixter';
import serialize        from '../models/serialize';
import rsvp             from 'rsvp';


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
      upload:     this.info(id),
      remixes:    flags & Upload.REMIXES    ? this.remixes(id)    : [],
      trackbacks: flags & Upload.TRACKBACKS ? this.trackbacks(id) : [],
      sources:    flags & Upload.SOURCES    ? this.sources(id)    : [],
      artist:     userid ? this.findUser(userid) : null,
    };

    return this.transaction(rsvp.hash(queries)

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
      }));
  }
  
  trackbacks(forId) {
    var trackbacksQ = {
      trackbacksof: forId,
      f: 'js',
      dataview: 'trackbacks',
      sort: 'date',
      ord: 'desc',
      limit: Upload.MAX_TRACKBACK_FETCH
    };
    return this.query(trackbacksQ).then( serialize( ccmixter.Trackback ) );
  }
  
  remixes(forId) {
    var remixesQ = {
      remixes: forId,
      f: 'js',
      dataview: 'links_u',
      sort: 'date',
      ord: 'desc'
    };
    return this.query(remixesQ).then( serialize( ccmixter.Remix ) );
  }
  
  sources(forId) {
    var sourcesQ = {
      sources: forId,
      f: 'js',
      dataview: 'links_u',
      datasource: 'uploads'
    };
    return this.query(sourcesQ).then( serialize( ccmixter.Source ) );
  }
  
  info(id) {
    var uploadQ = {
      ids: id,
      f: 'js',
      dataview: 'default'
    };    
    return this.queryOne(uploadQ).then( serialize( ccmixter.Detail ) );
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

