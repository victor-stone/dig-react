'use strict';

import React from 'react';
//import router from '../services/router';

// prevent require() recursion
var router = null;

var Link = React.createClass({
  
  handleClick: function(e) {
    e.preventDefault();
    if( !router ) {
      router = require('../services/router');
    }
    if( typeof this.props.href === 'string' && this.props.href !== '#') {
      router.navigateTo( this.props.href );
    }
    return true;
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

