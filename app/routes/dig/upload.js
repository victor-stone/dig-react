import React   from 'react';
import Upload  from '../../components/dig/Upload';
import Uploads from '../../stores/upload';

function uploadNotFound() {
  return (<div className="well"><h1>{"Wups - can't find that music!"}</h1></div>);
}

function uploadRoute(props) {
  if( props.store.error ) {
    return uploadNotFound();
  }
  return (<Upload {...props} />);
}

uploadRoute.title = 'Files';

uploadRoute.path = '/files/:userid/:uploadid';

uploadRoute.store = function(params/*,queryParams*/) {
  return Uploads.storeFromQuery(params.uploadid,params.userid).then( store =>
            { 
                uploadRoute.title = !store.error && store.model.upload.name;
                return store;
            });
};

module.exports = uploadRoute;

