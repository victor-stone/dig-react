
import React from 'react';
import LicenseUtils from '../models/licenses';

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
            <a href={this.state.byURL} >{this.state.linkToLic}</a>
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

module.exports = LicenseInfo;
