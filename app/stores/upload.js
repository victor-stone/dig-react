import Query            from './query';
import ccmixter         from '../models/ccmixter';
import serialize        from '../models/serialize';
import rsvp             from 'rsvp';


function _fixFeaturing(model) {
  if( !model.featuring && model.sources && model.upload.setFeatureSources ) {
    model.upload.setFeatureSources(model.sources);
  }
  return model;
}

class Upload extends Query {

  constructor() {
    super(...arguments);
  }

  find(id) {
    
    var model = null;

    var queries = {
      upload: this.info(id),
      remixes: this.remixes(id),
      trackbacks: this.trackbacks(id),
      sources: this.sources(id)
    };

    return this.transaction(rsvp.hash(queries)

      .then( record => {
        
        if( !record.upload || !Object.keys(record.upload) ) {
          throw( new Error('No record found') );
        }
        model = _fixFeaturing(record);

        return this.findUser(model.upload.artist.id);

      }).then( user => {
        
        model.upload.artist = user;

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

Upload.storeFromQuery = function(id) {
  var uploadStore = new Upload();
  return uploadStore.find(id)
                        .then( model => {
                            uploadStore.model = model;
                            return uploadStore;
                        });
};

module.exports = Upload;

