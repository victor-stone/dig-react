import React            from 'react';
import { FeaturedPage } from '../components';
import { oassign }      from '../unicorns';
import qc               from '../models/queryConfigs';

import TagStore         from '../stores/tags';
import UploadStore      from '../stores/upload';
import Playlist         from '../stores/playlist';
import { Transaction }  from '../services/queryAjaxAdapter';

const morelike = React.createClass({

  render() {
    var title = this.props.store.trackTitle;
    return (
      <FeaturedPage {...this.props} icon="exchange" subTitle="More like" title={title} />
    );      
  },
});

morelike.path = '/morelike/:id';

morelike.title = 'More Like';

morelike.store = function(params,queryParams) {

  var id          = params.id;
  var tagStore    = new TagStore();
  var playlist    = new Playlist();
  var uploadStore = new UploadStore();

  var _tags;
  var trackTitle;

  return Transaction( tagStore.remixGenres().then( function(tags)  {
      
      _tags = tags;

      return uploadStore.info(id);

    }).then( function(upload) {
      
      trackTitle   = upload.name;
      var userTags = upload.userTags;
      var tags     = userTags.intersection(_tags);

      if( tags.isEmpty() ) {
        tags = userTags;
      }
      
      var p = {
                tags: tags.toString(),
                type: 'any'
              };

      var qparams = oassign( {}, qc.default, p, queryParams );

      return playlist.playlist(qparams);

    }).then( function( model ) {

        playlist.trackTitle = trackTitle;
        model.playlist = model.playlist.rejectBy('id',Number(id));

        return playlist;
    }));  
};

module.exports = morelike;

