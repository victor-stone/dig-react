import React from 'react';
import Link from './Link';

var NavbarHeader = React.createClass({
  render: function() {
    return (
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#dig-collapse" aria-expanded="false">
          <span className="sr-only">{"Toggle navigation"}</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          </button>
          <Link href="/" className="navbar-brand"><img src="/images/logo.png" title={this.props.titles} /></Link>
        </div>
      );
  }
});

module.exports = NavbarHeader;

