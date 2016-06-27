// deprecated
import React            from 'react';
import Listing          from './Listing';
import PeopleHeader     from '../models/PeopleHeader';

function NoPeopleSamples() {
  return (<div className="well no-people-samples">{"this artist doesn't have any samples!"}</div>);
}

var StemsPeople = React.createClass({

  render: function() {
    var store = this.props.store;

    return (
      <div>
        <PeopleHeader model={store.model.artist} />
        <div className="container-fluid stems-browser">
          <div className="row">
            <div className="col-md-6 col-md-offset-3 stems-listing-widget">
              <Listing store={store} namesOnly noHitsComp={NoPeopleSamples} />
            </div>
          </div>
        </div>
      </div>
    );      
  },
});

module.exports = StemsPeople;

