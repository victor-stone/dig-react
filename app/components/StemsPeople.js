import React            from 'react';
import StemsList        from './StemsList';
import ZIPContentViewer from './ZIPContentViewer';
import Paging           from './Paging';
import People           from './People';

function NoPeopleSamples() {
  return (<div className="well no-people-samples">{"this artist doesn't have any samples!"}</div>);
}

var StemsPeople = React.createClass({

  render: function() {
    var store = this.props.store;

    return (
      <div>
        <People.Header model={store.model.artist} />
        <div className="container-fluid stems-browser">
          <div className="row">
            <div className="col-md-6 col-md-offset-3 stems-listing-widget">
              <Paging store={store} ref="paging" disableBumping />
              <StemsList store={store} namesOnly noHitsComp={NoPeopleSamples} />
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

module.exports = StemsPeople;

