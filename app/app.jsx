'use strict';

var React    = require('react');
var ReactDOM = require('react-dom');
var Header   = require('./components/Header');

var Glyph = require('./components/Glyph');

ReactDOM.render(
  <Header /> ,
  document.getElementById('content')
);
