import React from 'react';
import env   from '../services/env';
import { PageHeader } from '../components';

const ErrorPage = React.createClass({

  shouldComponentUpdate: function() {
    return true;
  },

  mailLink: function() {
    if( global.IS_SERVER_REQUEST ) {
      return '';
    }
    var err = env.err;
    var ua = (navigator && navigator.userAgent) || '(your browser here...)';
    var body = `I'm sharing this error:\n\n${err}\n\nthat I got while using this browser:\n\n${ua}\n\nSigned,\nA cool, thoughtful web citizen\n\n`;

    return 'mailto://?to=mixter@artistechmedia.com&subject=' + 
          'Ouch at the website' +
          '&body=' + encodeURIComponent(body);
  },

  render: function() {
    var href = this.mailLink();
    return (
        <div>
          <PageHeader title="Ouch" icon="ambulance" />
          <div className="well error-page">
            <h2>{"oh dude"}</h2>
            <p>{"looks like you hit a thingy with the watchamacallit"}</p>
            <p>{"OK - if you wouldn't mind: click on the button to notify us, it would be really, really great and then the next time you try this it'll work awesome!"}</p>
            <p><a target="_blank" className="btn btn-warning btn-lg" href={href} >{"OK email us!"}</a></p>
          </div>
        </div>
      );
  }
});

module.exports = ErrorPage;

