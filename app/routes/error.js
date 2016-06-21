import React from 'react';
import { PageHeader } from '../components';

import ErrorDisplay from '../components/services/ErrorDisplay';

const ErrorPage = React.createClass({

  render: function() {
    return (
        <div>
          <PageHeader title="Ouch" icon="ambulance" />
          <ErrorDisplay />
        </div>
      );
  }
});

module.exports = ErrorPage;

