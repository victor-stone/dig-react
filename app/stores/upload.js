import Query            from './query';
import ccmixter         from '../models/ccmixter';
import serialize        from '../models/serialize';
import rsvp             from 'rsvp';
import { Transaction }  from '../services/queryAjaxAdapter';


function _fixFeaturing(model) {
  if( !model.featuring && model.sources && model.upload.setFeatureSources ) {
    model.upload.setFeatureSources(model.sources);
  }
  return model;
}

var Upload = Query.extend({

  find: function(id) {
    
    var model = null;

    var queries = {
      upload: this.info(id),
      remixes: this.remixes(id),
      trackbacks: this.trackbacks(id),
      sources: this.sources(id)
    };

    return rsvp.hash(queries)

      .then( record => {
        
        model = _fixFeaturing(record);

        return this.findUser(model.upload.artist.id);

      }).then( user => {
        
        model.upload.artist = user;

        return model;
      });
  },
  
  trackbacks: function(forId) {
    var trackbacksQ = {
      trackbacksof: forId,
      f: 'json',
      dataview: 'trackbacks',
      sort: 'date',
      ord: 'desc',
      limit: 25 // TODO: get this from ENV or anywhere else!!
    };
    return this.query(trackbacksQ).then( serialize( ccmixter.Trackback ) );
  },
  
  remixes: function(forId) {
    var remixesQ = {
      remixes: forId,
      f: 'json',
      dataview: 'links_u',
      sort: 'date',
      ord: 'desc'
    };
    return this.query(remixesQ).then( serialize( ccmixter.Remix ) );
  },
  
  sources: function(forId) {
    var sourcesQ = {
      sources: forId,
      f: 'json',
      dataview: 'links_u',
      datasource: 'uploads'
    };
    return this.query(sourcesQ).then( serialize( ccmixter.Source ) );
  },
  
  info: function(id) {
    var uploadQ = {
      ids: id,
      f: 'json',
      dataview: 'default'
    };    
    return this.queryOne(uploadQ).then( serialize( ccmixter.Detail ) );
  },
  
});

Upload.service = new Upload();

Upload.findAndReturnStore = function(id) {
  var uploadStore = new Upload();
  return Transaction( uploadStore.find(id)
                        .then( model => {
                            uploadStore.model = model;
                            return uploadStore;
                        }) );
};

module.exports = Upload;

