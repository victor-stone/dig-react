import React from 'react';
import qc    from '../models/query-configs';
import Query from '../stores/query';

import { commaize }     from '../unicorns';
import { ExternalLink } from '../components/ActionButtons';
import Link             from '../components/Link';

var index = React.createClass({
  render: function() {
    var numSamples = commaize(this.props.store.model);

    return (
      <div>
        <div className="stems-img container">
          <div className="row">
            <div className="col-md-8 col-md-offset-1 col-sm-11 col-sm-offset-1 col-xs-12">
              <h1>{"The Premier Site for Free and Royalty Free Samples"}</h1>
              <h3>{"Now serving "}{numSamples}{" Creative Commons samples "}</h3>
            </div>
          </div>
        </div>      
        <div className="row gso-links panel-group">
          <div className="col-md-4">
            <div className="panel">
              <div className="panel-heading">
                <h1 className="panel-title">{"For Remixers and Producers"}</h1>
              </div>
              <div className="panel-body">
                {"Find that perfect samples for your audio project, download into your DAW and get mixing!"}
              </div>
              <div className="panel-footer center-text">
                <Link href="/stems" className="btn btn-default">{"Go!"}</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="panel">
              <div className="panel-heading">
                <h1 className="panel-title">{"Free for Commerical Projects"}</h1>
              </div>
              <div className="panel-body">
                {"Thousands of hours of amazing stems - all you have to do is give credit to the musicians."}
              </div>
              <div className="panel-footer center-text">
                <Link href="/stems" className="btn btn-default">{"Go!"}</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="panel">
              <div className="panel-heading">
                <h1 className="panel-title">{"For Musicians and Beat Makers: Join Us!"}</h1>
              </div>
              <div className="panel-body">
                {"Create an account at ccMixter, start uploading and get remixed in great productions!"}
              </div>
              <div className="panel-footer center-text">
                <ExternalLink href="http://ccmixter.org" className="btn btn-default" text="ccMixter" />
              </div>
            </div>
          </div>
        </div>
      </div>
      );
  }

});

index.title = 'stems.ccMixter Home';

index.path = '/';

index.store = function() {
  var query = new Query();
  return query.count( qc.samplesCount ).then( (c) => {
    query.model = c;
    return query;
  });
};

module.exports = index;
