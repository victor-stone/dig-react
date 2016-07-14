import React from 'react';

import Link            from '../services/LinkToRoute';
import LinkToRemixTree from '../services/LinkToRemixTree';
import LinkToPeople    from '../services/LinkToPeopleRoute';
import TrackbackList   from '../models/TrackbackList';
import SharePopup      from '../SharePopup';
import LicenseInfo     from '../LicenseInfo'; 
import DownloadPopup   from '../DownloadPopup';
import { PlayButton }  from '../AudioPlayer';

import ExternalLink    from '../vanilla/ExternalLink';
import { Row,
         Container,
         FluidContainer,
         Column }      from '../vanilla/Grid';

var Actions = React.createClass({

  render() {
    const { model } = this.props;

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

  render() {

    var tags = this.props.tags.map( t => 
      (<Link key={t} href={'/tags/' + t} className="btn-exp btn-tag light-on-hover">{t}</Link>) );

    return( <div>{tags}</div> );
  }
});

var Featuring = React.createClass({

  render() {
    const {featuring} = this.props;

    if( !featuring ) {
      return null;
    }

    return(
        <p><span className="light-color">{"featuring"}</span>{" "}{featuring}</p>
      );    
  }
});

var UploadHeader = React.createClass({

  render() {
    const { artist, featuring } = this.props.model;
    return (
      <div>
        <LinkToPeople model={artist} avatar />
        <Featuring featuring={featuring} />
      </div>
      );
  }
});


var CcPlusLink = React.createClass({

  getInitialState() {
    return { model: this.props.model };
  },

  componentWillReceiveProps(props) {
    this.setState( { model: props.model } );
  },

  render() {

    const { isCCPlus, purchaseLicenseURL, purchaseLogoURL } = this.state.model;

    if( !isCCPlus ) {
      return null;
    }
    return(
      <span>
        <a href={purchaseLicenseURL}><img src={purchaseLogoURL} /></a>
        <LicenseInfo.LicenseInfoPopup />
      </span>
      );
  }

});

var LicenseSection = React.createClass({

  render() {
    const { model, model:{license_url,licenseLogoURL} } = this.props;

    return (
      <ul className="actions">
        <li className="license-badge">
          <a href={license_url}><img className="download-license" src={licenseLogoURL} /></a>  
          <LicenseInfo.LicenseInfoPopup />
        </li>
        <li className="license-badge">
          <CcPlusLink model={model} />
        </li>
        {!global.IS_SERVER_REQUEST &&
          <li>
            <LinkToRemixTree host="http://beta.ccmixter.org" model={model} />
          </li>
        }
      </ul>
      );
  }
});

var TrackbacksSection = React.createClass({

  render() {
    const { model:{trackbacks} } = this.props;
    return (
      <div>
        <div className="center-text">
          <h3 className="inlined">{"Trackbacks"}</h3>
        </div>
        <TrackbackList model={trackbacks} />
      </div>
    );
  }
});

var RemixesSection = React.createClass({

  render() {
    const { remixes = [] } = this.props.model;

    function formatRemix(rmx) {
      const { id, url, name, artist:{name:artistName} } = rmx;

      return (<li key={id} className="list-group-item">
        <ExternalLink href={url} text={name} /><span className="light-color">{artistName}</span>
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

  render() {
    const store       = this.props.store;
    const model       = store.model;
    const upload      = model.upload;
    const { name, 
            userTags } = upload;

    return  (
      <div>

        <div className="page-header">
          <h1 className="center-text">{name}</h1>
        </div>

        <Container className="upload-page">
          <Row>
            <Column cols="8" push="4">
              <Row>
                <Column md="6" sm="6">
                  <UploadHeader model={upload} />
                </Column>
                <Column cols="6">
                  <LicenseSection model={upload} />
                </Column>
              </Row>  
              <Row>
                <Column cols="8" className="tags">
                  <Tags tags={userTags} />
                </Column>  
              </Row>
            </Column>
            <Column cols="2" offset="2" pull="8">
              <Actions model={upload} />
            </Column>
          </Row>
          <Row className="used-in">
            <Column md={{cols:5,offset:1}} sm="12" className="trackbacks">
              <TrackbacksSection model={model} />
            </Column>
            <Column md="5" sm="12" className="remixes">
              <RemixesSection model={model} />            
            </Column>
          </Row>
        </Container>

      </div>
    );
  },

});

module.exports = Upload;

