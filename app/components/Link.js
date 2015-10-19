'use strict';

import React from 'react';
import router from '../services/router';

var Link = React.createClass({
  
  handleClick: function(e) {
    e.preventDefault()
    router.navigateTo( this.props.href );
  },

  render: function() {

    return (
      <a {...this.props} onClick={this.handleClick} >
        {this.props.children}
      </a>
    );
  }
});

module.exports = Link;

