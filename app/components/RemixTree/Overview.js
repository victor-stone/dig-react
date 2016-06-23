import React               from 'react';
import { AccordianPanel }  from '../vanilla/Accordian';
import UploadOverview      from '../models/UploadOverview';

var Overview = React.createClass({

  render() {
    return (
      <AccordianPanel title="Overview" id="overview" icon="info-circle" >
        <UploadOverview {...this.props} lineCls="col-md-12" />
      </AccordianPanel>
      );
  }
});

module.exports = Overview;
