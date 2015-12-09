import React   from 'react';
import Upload  from '../../components/dig/Upload';
import Uploads from '../../stores/upload';

function uploadRoute(props) {
  return (<Upload {...props} />);
}

uploadRoute.title = 'Files';

uploadRoute.path = '/files/:userid/:uploadid';

uploadRoute.store = function(params/*,queryParams*/) {
  return Uploads.storeFromQuery(params.uploadid).then( store =>
            { 
                uploadRoute.title = store.model.upload.name;
                return store;
            });
};

module.exports = uploadRoute;

