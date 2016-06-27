
import React        from 'react';
import LicenseInfo  from '../components/LicenseInfo';
import PageHeader   from '../components/vanilla/PageHeader';

var Licenses = React.createClass({

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
