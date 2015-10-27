'use strict';

import React from 'react';

import { Link, 
        Glyph,
        TrackbackPopup,
        LicenseInfo }  from '../components';

import { service as uploadStore }  from '../stores/upload';

import { SharePopup        as SharePopupButton,
         AddTrackbackPopup as AddTrackbackPopupButton,
         ExternalLink
 } from '../components/ActionButtons';

import DownloadPopup   from '../components/DownloadPopup';
import { PlayButton }  from '../components/AudioPlayer';

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
            <SharePopupButton big fixed upload={model} />
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
        <Link href={'/people/' + model.artist.id}>
          <img className="img-circle" src={model.artist.avatarURL} />
          {model.artist.name}
        </Link>
        <Featuring featuring={model.featuring} />
      </div>
      );
  }
});


var ccPlusLink = React.createClass({

  render: function() {
    var model = this.props.model;
    if( !model.ccPlus ) {
      return null;
    }
    return(
      <li className="license-badge">
        <a href={model.purchaseLicenseURL}><img src={model.purchaseLogoURL} /></a>
        <LicenseInfo.LicenseInfoPopup />
      </li>
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
        <ccPlusLink model={model} />
        <li>
          <Link href={'/morelike/' + model.id} className="btn btn-success"><Glyph icon="exchange" />{" More Like This"}</Link>
        </li>
        <li>
          <ExternalLink className="btn btn-success" href={model.url} text="@ccMixter" />
        </li>
      </ul>
      );
  }
});



var TracbackList = React.createClass({

  render: function() {
    var trackbacks = this.props.model || [];
    var tooManyTBs = trackbacks.length > 25; // see stores/upload.js#trackbacks

    function formatTB(tb) {
      return( 
        <li key={tb.id} className="list-group-item">
          <div>
            {tb.embed 
                ? (<TrackbackPopup trackback={tb} />)
                : (<ExternalLink href={tb.url} subname={tb.type} text={tb.name} />)
            }
            {' '}<span className="light-color">{tb.artist.name}</span>
          </div>
        </li>
      );
    }

    var tbs = trackbacks.length 
      ? trackbacks.map( formatTB )
      : (<li><span className="light-color">{"No trackbacks yet. Add yours!"}</span></li>);

    return (
        <ul className="list-group remix-list">
          {tbs}
          {tooManyTBs ? <li><span className="light-color">{"too many to show here!"}</span></li> : null}
        </ul>
      );

  },
});

var TrackbacksSection = React.createClass({

  render: function() {
    var model = this.props.model;
    return (
      <div>
        <div className="center-text">
          <h3 className="inlined">{"Trackbacks"}</h3>
          <AddTrackbackPopupButton model={model.upload} />
        </div>
        <TracbackList model={model.trackbacks} />
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

const upload = React.createClass({

  render() {
    var model = this.props.store;
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

upload.path = '/files/:userid/:uploadid';

upload.store = function(params/*,queryParams*/) {
  return uploadStore.find(params.uploadid);
};

module.exports = upload;

