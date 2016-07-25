import React from 'react';

import LicenseInfo     from '../../license-info'; 

class CCPlus extends React.Component
{
  render() {

    const { isCCPlus, purchaseLicenseURL, purchaseLogoURL } = this.props.model;

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
}

module.exports = CCPlus;

