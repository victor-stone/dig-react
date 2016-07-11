import React   from 'react';
import Upload  from '../../components/dig/Upload';
import Uploads from '../../stores/upload';

function uploadNotFound() {
  return (<div className="well"><h1>{"Wups - can't find that music!"}</h1></div>);
}

function upload(props) {
  if( props.store.error ) {
    return uploadNotFound();
  }
  return (<Upload {...props} />);
}

Object.assign(upload,{
  title: 'Files',

  path: '/files/:userid/:uploadid',

  store(params) {
    return Uploads.storeFromQuery(params.uploadid,params.userid).then( store =>
              { 
                  upload.title = !store.error && store.model.upload.name;
                  return store;
              });
  },

  urlFromStore(store) {
    const { model:{upload:{artist,id}} } = store;
    return '/files/' + artist.id + '/' + id;
  }
});

module.exports = upload;

