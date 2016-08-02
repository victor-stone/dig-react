import React       from 'react';
import env         from 'services/env';
import events      from 'models/events';

const ErrorDisplay = React.createClass({

  getInitialState: function() {
    return { error: null };
  },

  componentWillMount: function() {
    if( !global.IS_SERVER_REQUEST ) {
      env.on( events.ERROR, this.doReport);
    }
  },
  
  componentWillUnmount: function() {
    if( !global.IS_SERVER_REQUEST ) {
      env.removeListener(events.ERROR, this.doReport);
    }
  },

  doReport(error) {
    this.setState({ error });
  },

  render: function() {
    if( !this.state.error ) {
      return null;
    }
    var details = '';

    return (
        <div className="well error-page">
          <h2>{"oh dude"}</h2>
          <p>{"looks like you hit a thingy with the watchamacallit"}</p>
          <p><a className="btn btn-warning btn-lg" onClick={this.clear} href="/" >{"Restart the site..."}</a></p>
          <code>
            {details}
          </code>
        </div>
      );
  }
});

module.exports = ErrorDisplay;

