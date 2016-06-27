import React from 'react';

import Link            from '../services/LinkToRoute';
import LinkToPeople    from '../services/LinkToPeopleRoute';
import TrackbackList   from '../models/TrackbackList';
import SharePopup      from '../SharePopup';
import LicenseInfo     from '../LicenseInfo'; 
import DownloadPopup   from '../DownloadPopup';
import { PlayButton }  from '../AudioPlayer';

import ExternalLink    from '../vanilla/ExternalLink';

var Actions = React.createClass({

  render: function() {
    var model = this.props.model;

    return (
        <ul className="actions">
          <li>
            <PlayButton big fixed model={model} />
          </li>
          <li className="hidden-xs">
            <DownloadPopup big fixed model={model} />
          </li>
          <li>
            <SharePopup big fixed model={model} />
          </li>
        </ul>
      );
  }
});

var Tags = React.createClass({

  render: function() {

    var tags = this.props.tags.map( t => 
      (<Link key={t} href={'/tags/' + t} className="btn-exp btn-tag light-on-hover">{t}</Link>) );

    return( <div>{tags}</div> );
  }
});

var Featuring = React.createClass({

  render: function() {
    var featuring = this.props.featuring;
    if( !featuring ) {
      return null;
    }
    return(
        <p><span className="light-color">{"featuring"}</span>{" "}{featuring}</p>
      );    
  }
});

var UploadHeader = React.createClass({

  render: function() {
    var model = this.props.model;
    return (
      <div>
        <LinkToPeople model={model.artist} avatar />
        <Featuring featuring={model.featuring} />
      </div>
      );
  }
});


var CcPlusLink = React.createClass({

  getInitialState: function() {
    return { model: this.props.model };
  },

  componentWillReceiveProps(props) {
    this.setState( { model: props.model } );
  },

  render: function() {
    var model = this.state.model;
    if( !model.isCCPlus ) {
      return null;
    }
    return(
      <span>
        <a href={model.purchaseLicenseURL}><img src={model.purchaseLogoURL} /></a>
        <LicenseInfo.LicenseInfoPopup />
      </span>
      );
  }

});

var LicenseSection = React.createClass({

  render: function() {
    var model = this.props.model;

    return (
      <ul className="actions">
        <li className="license-badge">
          <a href={model.license_url}><img className="download-license" src={model.licenseLogoURL} /></a>  
          <LicenseInfo.LicenseInfoPopup />
        </li>
        <li className="license-badge">
          <CcPlusLink model={model} />
        </li>
        <li>
          <ExternalLink className="btn btn-success" href={model.url} text="@ccMixter" />
        </li>
      </ul>
      );
  }
});

var TrackbacksSection = React.createClass({

  render: function() {
    var model = this.props.model;
    return (
      <div>
        <div className="center-text">
          <h3 className="inlined">{"Trackbacks"}</h3>
        </div>
        <TrackbackList model={model.trackbacks} />
      </div>
    );
  }
});

var RemixesSection = React.createClass({

  render: function() {
    var remixes = this.props.model.remixes || [];
    
    function formatRemix(rmx) {
      return (<li key={rmx.id} className="list-group-item">
        <ExternalLink href={rmx.url} text={rmx.name} /><span className="light-color">{rmx.artist.name}</span>
      </li>);
    }

    var lines = remixes.length 
          ? remixes.map(formatRemix) 
          : <li><span className="light-color">{"no remixes yet!"}</span></li>;

    return (
        <div>
          <h3 className="center-text">{"Remixes"}</h3>
          <ul className="remix-list">{lines}</ul>
        </div>
      );
  }
});

var Upload = React.createClass({

  render: function() {
    var store  = this.props.store;
    var model  = store.model;
    var upload = model.upload;

    return  (
      <div>

        <div className="page-header">
          <h1 className="center-text">{upload.name}</h1>
        </div>

        <div className="container upload-page">
          <div className="row">
            <div className="col-md-8 col-md-push-4">
              <div className="row">
                <div className="col-md-6 col-sm-6">
                  <UploadHeader model={upload} />
                </div>
                <div className="col-md-6">
                  <LicenseSection model={upload} />
                </div>
              </div>  
              <div className="row">
                <div className="col-md-8 tags">
                  <Tags tags={upload.userTags} />
                </div>  
              </div>
            </div>
            <div className="col-md-2 col-md-offset-2 col-md-pull-8">
              <Actions model={upload} />
            </div>
          </div>
          <div className="row used-in">
            <div className="col-md-5 col-md-offset-1 col-sm-12 trackbacks">
              <TrackbacksSection model={model} />
            </div>
            <div className="col-md-5  col-sm-12 remixes">
              <RemixesSection model={model} />            
            </div>
          </div>
        </div>

      </div>
    );
  },

});

module.exports = Upload;

