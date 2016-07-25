
import React        from 'react';
import LicenseInfo  from '../components/license-info';
import PageHeader   from '../components/vanilla/page-header';

import { Row,
         Column }     from '../components/vanilla/grid';

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
