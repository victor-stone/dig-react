import React from 'react';

var NavbarHeader = React.createClass({
  render: function() {
    var HomeLink = this.props.homeLink;
    return (
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#dig-collapse" aria-expanded="false">
          <span className="sr-only">{"Toggle navigation"}</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          </button>
          <HomeLink />
        </div>
      );
  }
});

module.exports = NavbarHeader;

