import React        from 'react';
import LicenseUtils from '../models/licenses';
import Glyph        from './vanilla/Glyph';
import DeadLink     from './vanilla/DeadLink';
import Modal        from './services/Modal';
import { Row,
         Container,
         Column }     from './vanilla/Grid';

var LicenseInfoLink = React.createClass({

  render() {
    return(
        <DeadLink onClick={this.props.onShow}><Glyph icon="question-circle" /></DeadLink>
      );
  }
});

var LicenseInfoPopup = React.createClass({

  getInitialState() {
    return { view: false };
  },
  
  handleHideModal() {
    this.setState({ view: false });
  },

  handleShowModal(){
    this.setState( { view: true } );
  },

  genPopup() {
    const LicenseInfo = () => LicenseInfoElement;
    return ( <Modal handleHideModal={this.handleHideModal} title={title}>
                <LicenseInfo />
            </Modal> );
  },

  render() {

    var popup = this.state.view ? this.genPopup() : null;
    return (
        <span>
          <LicenseInfoLink onShow={this.handleShowModal} />
          {popup}
        </span>
      );
  }

});

const urls = {
  byLogoURL:     LicenseUtils.logoURLFromAbbr('by-3','big'),
  byncLogoURL:   LicenseUtils.logoURLFromAbbr('by-nc-3','big'),
  ccplusLogoURL: LicenseUtils.logoURLFromAbbr('ccplus'),
  ccplusURL:     'http://tunetrack.net/license/ccmixter.org/files/djlang59/37792',
  byURL:         'http://creativecommons.org/licenses/by/3.0/',
  byncURL:       'http://creativecommons.org/licenses/by-nc/3.0/',
};

const LicenseInfoElement = (
  <Container className="content">
    <Row>
      <Column cols="4" className="center-text license-images">
        <a href={urls.byURL} ><img src={urls.byLogoURL} className="licenseLogo" /></a>
        <a href={urls.byURL} >{"Full CC license"}</a>
      </Column>
      <Column cols="7">
        <div className="text license-description">
          {"Free to use, even in commercial projects "}<strong>{"but"}</strong>{" you must give credit to the musicians."}
        </div>
      </Column>
    </Row>
    <Row>
      <Column cols="4" className="center-text license-images">
        <a href={urls.byncURL} ><img src={urls.byncLogoURL} className="licenseLogo" /></a>
        <a href={urls.byncURL} >{"Full CC license"}</a>
      </Column>
      <Column cols="7">
        <div className="text license-description">
          {"Free to use only in non-commercial projects. Again, you must give credit to the musicians."}
        </div>
      </Column>
    </Row>
    <Row>
      <Column cols="4" className="center-text license-images">
        <a href={urls.ccplusURL} ><img src={urls.ccplusLogoURL} className="licenseLogo" /></a>
        <a href={urls.ccplusURL} >{"Example"}</a>
      </Column>
      <Column cols="7">
        <div className="text license-description">
          {"Available without any restrictions for a sliding scale, royalty free fee."}
        </div>
      </Column>
    </Row>
  </Container>
);

const title = 'Our Licenses Overview';

module.exports = {
    LicenseInfoLink,
    LicenseInfo() { return LicenseInfoElement; },
    LicenseInfoPopup,
    title
};
