import React       from 'react';
import env         from '../services/env';
import ErrorReport from '../services/error-report';
import events      from '../models/events';

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
    this.setState( {error}, () => {
      var errorReport = new ErrorReport(error);
      errorReport.report()
        .then(  () => this.setState( {reported:true} ) )
        .catch( e => this.setState( {err2: e } ));      
    });
  },

  render: function() {
    if( !this.state.error ) {
      return null;
    }
    if( !this.state.err2 && !this.state.reported ) {
      return null;
    }
    var details = '';

    if( env.debugMode ) {
      details += this.state.error.stack || '';
      if( this.state.err2 ) {
        details += `\n----\n` + this.state.err2.stack || '';
      }
    } 

    return (
        <div className="well error-page">
          <h2>{"oh dude"}</h2>
          <p>{"looks like you hit a thingy with the watchamacallit"}</p>
          {this.state.reported
            ? <p>{"This problem has been reported to the sysadmins. We'll get right on it!"}</p>
            : null
          }
          {this.state.err2
            ? <p>{`Unfortunately we can't seem to reach the servers to report 
                   the error. `}</p>
            : null
          }

          <p><a className="btn btn-warning btn-lg" onClick={this.clear} href="/" >{"Restart the site..."}</a></p>
          <code>
            {details}
          </code>
        </div>
      );
  }
});

module.exports = ErrorDisplay;

