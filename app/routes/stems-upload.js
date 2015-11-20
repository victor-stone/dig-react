import React            from 'react';
import Samples          from '../stores/samples';
import { mergeParams }  from '../unicorns';
import { StemsList,
         ZIPContentViewer,
         PageHeader }    from '../components';

var stems = React.createClass({

  render() {
    var store = this.props.store;
    var upload = store.model.playlist[0];
    return (
      <div>
        <PageHeader icon="music" title={upload.name} subTitle={upload.artist.name} />
        <div className="container-fluid stems-browser">
          <div className="row">
            <div className="col-md-6 col-md-offset-3 stems-listing-widget">
              <StemsList store={store} filesOnly />   
            </div>
            <div className="col-md-2">
              <ZIPContentViewer store={store} />
            </div>
          </div>
        </div>
      </div>
    );      
  },
});

stems.title = 'Samples Browser';

stems.path = '/files/:user/:fileid';

stems.store = function(params,queryParams) {
  var qparams = mergeParams( {}, queryParams, { ids: params.fileid } );
  return Samples.storeFromQuery(qparams).then( function(store) {
    var upload = store.model.playlist[0];
    if( upload ) {
      stems.title = upload.name;
    }
    return store;
  });
};

module.exports = stems;

