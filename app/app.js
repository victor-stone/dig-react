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

const App = React.createClass({
  render: function() {
    return (
      <div id="App">
        <Header />
        <div id="outlet">
          {this.props.children}
        </div>
      </div>
    );
  },
});


module.exports = App;

