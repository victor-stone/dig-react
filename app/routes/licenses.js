
import React from 'react';
import { PageHeader, LicenseInfo } from '../components';

const Licenses = React.createClass({

  render() {
    return  ( 
      <div className="row">
        <div className="col-md-5 col-md-offset-3">
          <PageHeader title={Licenses.title} icon="creative-commons" />
          <LicenseInfo.LicenseInfo /> 
        </div>
      </div>
    );
  },

});

Licenses.title = 'Our Licenses Overview';

module.exports = Licenses;
