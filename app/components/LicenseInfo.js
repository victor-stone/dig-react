import React        from 'react';
import LicenseUtils from '../models/licenses';
import Glyph        from './vanilla/Glyph';
import Modal        from './Modal';

var LicenseInfoLink = React.createClass({

  render: function() {
    return(
        <a href="#" onClick={this.props.onShow}><Glyph icon="question-circle" /></a>
      );
  }
});

var LicenseInfoPopup = React.createClass({

  getInitialState: function() {
    return { view: false };
  },
  
  handleHideModal: function() {
    this.setState({ view: false });
  },

  handleShowModal(e){
    e.stopPropagation();
    e.preventDefault();
    this.setState( { view: true } );
  },

  genPopup: function() {
    return ( <Modal handleHideModal={this.handleHideModal} title={title}>
                <LicenseInfo />
            </Modal> );
  },

  render: function() {

    var popup = this.state.view ? this.genPopup() : null;
    return (
        <span>
          <LicenseInfoLink onShow={this.handleShowModal} />
          {popup}
        </span>
      );
  }

});

var LicenseInfo = React.createClass({

  getInitialState: function() {
    return {
      byLogoURL:     LicenseUtils.logoURLFromAbbr('by-3','big'),
      byncLogoURL:   LicenseUtils.logoURLFromAbbr('by-nc-3','big'),
      ccplusLogoURL: LicenseUtils.logoURLFromAbbr('ccplus'),
      ccplusURL:     'http://tunetrack.net/license/ccmixter.org/files/djlang59/37792',
      byURL:         'http://creativecommons.org/licenses/by/3.0/',
      byncURL:       'http://creativecommons.org/licenses/by-nc/3.0/',
    };
  },

  render: function() {

    return(
      <div className="content">
        <div className="row">
          <div className="col-md-4 center-text license-images">
            <a href={this.state.byURL} ><img src={this.state.byLogoURL} className="licenseLogo" /></a>
            <a href={this.state.byURL} >{"Full CC license"}</a>
          </div>
          <div className="col-md-7">
            <div className="text license-description">
              {"Free to use, even in commercial projects "}<strong>{"but"}</strong>{" you must give credit to the musicians."}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 center-text license-images">
            <a href={this.state.byncURL} ><img src={this.state.byncLogoURL} className="licenseLogo" /></a>
            <a href={this.state.byncURL} >{"Full CC license"}</a>
          </div>
          <div className="col-md-7">
            <div className="text license-description">
              {"Free to use only in non-commercial projects. Again, you must give credit to the musicians."}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 center-text license-images">
            <a href={this.state.ccplusURL} ><img src={this.state.ccplusLogoURL} className="licenseLogo" /></a>
            <a href={this.state.ccplusURL} >{"Example"}</a>
          </div>
          <div className="col-md-7">
            <div className="text license-description">
              {"Available without any restrictions for a sliding scale, royalty free fee."}
            </div>
          </div>
        </div>
      </div>
      );
  },

});

var title = 'Our Licenses Overview';

module.exports = {
    LicenseInfoLink,
    LicenseInfo,
    LicenseInfoPopup,
    title
};
