import React from 'react';

import { ExternalLink } from '../../components/ActionButtons';
import Link             from '../../components/Link';

var index = React.createClass({
  render: function() {

    return (
      <div>
        <div className="playlists-img container">
          <div className="row">
            <div className="col-md-8 col-md-offset-1 col-sm-11 col-sm-offset-1 col-xs-12">
              <h1>{"Pithy Playlists"}</h1>
              <h3>{"Now serving a bunch Creative Commons playlists "}</h3>
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
                {"Find that perfect 'pell for your audio project, download into your DAW and get mixing!"}
              </div>
              <div className="panel-footer center-text">
                <Link href="/playlists" className="btn btn-default">{"Go!"}</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="panel">
              <div className="panel-heading">
                <h1 className="panel-title">{"Free for Commerical Projects"}</h1>
              </div>
              <div className="panel-body">
                {"Thousands of hours of amazing playlists - all you have to do is give credit to the singer."}
              </div>
              <div className="panel-footer center-text">
                <Link href="/playlists" className="btn btn-default">{"Go!"}</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="panel">
              <div className="panel-heading">
                <h1 className="panel-title">{"For Singers, Rappers, Poets: Join Us!"}</h1>
              </div>
              <div className="panel-body">
                {"Create an account at ccMixter, start uploading and watch what happens!"}
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

index.title = 'Home';

index.path = '/';

module.exports = index;
