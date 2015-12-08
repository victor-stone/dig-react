import React   from 'react';
import Upload  from '../../components/dig';
import Uploads from '../../stores/upload';

function upload(props) {
  return (<Upload {...props} />);
}

upload.title = 'Files';

upload.path = '/files/:userid/:uploadid';

upload.store = function(params/*,queryParams*/) {
  return Uploads.storeFromQuery(params.uploadid).then( store =>
            { 
                upload.title = store.model.upload.name;
                return store;
            });
};

module.exports = upload;

