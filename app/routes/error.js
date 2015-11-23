import React from 'react';
import { PageHeader,
          ErrorDisplay } from '../components';

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

