import React            from 'react';
import Samples          from '../../stores/samples';
import qc               from '../../models/query-configs';
import { mergeParams }  from '../../unicorns';
import { StemsList,
         ZIPContentViewer,
         Paging,
         People }    from '../../components';

var stemsPeople = React.createClass({

  render() {
    var store = this.props.store;

    return (
      <div>
        <People.Header model={store.model.artist} />
        <div className="container-fluid stems-browser">
          <div className="row">
            <div className="col-md-6 col-md-offset-3 stems-listing-widget">
              <Paging store={store} ref="paging" disableBumping />
              <StemsList store={store} namesOnly />   
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

stemsPeople.title = 'Samples Browser';

stemsPeople.path = '/people/:userid';

stemsPeople.store = function(params,queryParams) {
  var qparams = mergeParams( {}, qc.samples, queryParams, { u: params.userid } );
  return Samples.storeFromQuery(qparams).then( function(store) {
    stemsPeople.title = store.model.artist.name;
    return store;
  });
};

module.exports = stemsPeople;

