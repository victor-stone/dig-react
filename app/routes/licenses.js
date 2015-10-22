
import React from 'react';
import { PageHeader, LicenseInfo } from '../components';

const Licenses = React.createClass({

  render() {
    return  ( 
      <div>
        <PageHeader title="Our Licenses Overview" icon="creative-commons" />
        <LicenseInfo /> 
      </div>
    );
  },

});

module.exports = Licenses;
