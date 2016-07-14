
import React        from 'react';
import LicenseInfo  from '../components/LicenseInfo';
import PageHeader   from '../components/vanilla/PageHeader';

import { Row,
         Column }     from '../components/vanilla/Grid';

var Licenses = React.createClass({

  render() {
    return  ( 
      <Row>
        <Column cols="5" offset="3">
          <PageHeader title={Licenses.title} icon="creative-commons" />
          <LicenseInfo.LicenseInfo /> 
        </Column>
      </Row>
    );
  },

});

Licenses.title = 'Our Licenses Overview';

module.exports = Licenses;
