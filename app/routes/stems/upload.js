import React            from 'react';
import Upload           from '../../stores/upload';
import { StemsUpload }  from '../../components';


function upload(props) {
  return (<StemsUpload {...props} />);
}

upload.title = 'File Browser';

upload.path = '/files/:user/:fileid';

upload.store = function(params /*,queryParams*/) {
  return Upload.storeFromQuery(params.fileid,params.user,Upload.REMIXES|Upload.SOURCES)
            .then( store => {
                upload.title = store.model.upload.name;
                return store;
            });
};

module.exports = upload;

