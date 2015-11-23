import React from 'react';
import env   from '../services/env';

const ErrorDisplay = React.createClass({

  getInitialState: function() {
    return { error: null };
  },

  componentWillMount: function() {
    env.on('error', (error) => this.setState( { error } ) );
  },
  
  mailLink: function() {
    if( global.IS_SERVER_REQUEST ) {
      return '';
    }
    var err = this.state.error;
    var ua = (navigator && navigator.userAgent) || '(your browser here...)';
    var body = `I'm sharing this error:\n\n${err}\n\nthat I got while using this browser:\n\n${ua}\n\nSigned,\nA cool, thoughtful web citizen\n\n`;

    return 'mailto://?to=mixter@artistechmedia.com&subject=' + 
          'Ouch at the website' +
          '&body=' + encodeURIComponent(body);
  },

  render: function() {
    if( !this.state.error ) {
      return null;
    }
    var details = env.debugMode ? this.state.error.stack : '';
    var href = this.mailLink();
    return (
        <div className="well error-page">
          <h2>{"oh dude"}</h2>
          <p>{"looks like you hit a thingy with the watchamacallit"}</p>
          <p>{"OK - if you wouldn't mind: click on the button to notify us, it would be really, really great and then the next time you try this it'll work awesome!"}</p>
          <p><a className="btn btn-warning btn-lg" onClick={this.clear} href={href} >{"OK email us!"}</a></p>
          <code>
            {details}
          </code>
        </div>
      );
  }
});

module.exports = ErrorDisplay;

