import React               from 'react';
import { AccordionPanel }  from '../vanilla/accordion';
import UploadOverview      from '../bound/upload-overview';

function Overview(props) {
  return(
      <AccordionPanel title="Overview" id="overview" icon="info-circle" >
        <UploadOverview {...props} lineCls="col-md-12" />
      </AccordionPanel>
      );
}

module.exports = Overview;
