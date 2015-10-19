'use strict';

// TODO: put these somewhere

if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}

if( typeof Array.prototype.includes === 'undefined' ) {
  Array.prototype.includes = function(v) { return this.indexOf(v) !== -1; }
}

if( typeof Array.prototype.contains === 'undefined' ) {
  Array.prototype.contains = Array.prototype.includes;
}

import Header from './components/Header';
import React from 'react';
import router from './services/router';

const App = React.createClass({

  getInitialState: function() {
    return { component: null };
  },

  componentWillMount: function() {
    router.on( 'navigateTo', specs => {
      this.setState(specs);
    });
    // 'component' here is actually the outlet component'
    if( !this.state.component ) {
      router.navigateTo('/');
    }
  },

  render: function() {
    if( !this.state.component ) {
      return false;
    }
    return (
      <div id="App">
        <Header />
        <div id="outlet">
          { React.createElement(this.state.component,{model: this.state.model}) }
        </div>
      </div>
    );
  },
});


module.exports = App;

