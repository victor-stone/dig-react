import React from 'react';

import LinkToRemixTree from '../../services/LinkToRemixTree';
import LicenseInfo     from '../../LicenseInfo'; 
import CCPlus          from './CCPlus';

class LicenseSection extends React.Component
{
  render() {
    const { model, model:{license_url,licenseLogoURL} } = this.props;

    return (
      <ul className="actions">
        <li className="license-badge">
          <a href={license_url}><img className="download-license" src={licenseLogoURL} /></a>  
          <LicenseInfo.LicenseInfoPopup />
        </li>
        <li className="license-badge">
          <CCPlus model={model} />
        </li>
        {!global.IS_SERVER_REQUEST &&
          <li>
            <LinkToRemixTree host="http://beta.ccmixter.org" model={model} />
          </li>
        }
      </ul>
    );
}
}

module.exports = LicenseSection;

