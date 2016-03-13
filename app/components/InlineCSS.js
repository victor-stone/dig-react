/* globals document */
import React from 'react';

var InlineCSS = React.createClass({

  componentDidMount() {
    if( global.IS_SERVER_REQUEST ) {
      return;
    }
    var sheet = document.createElement('style');
    sheet.id = this.props.id;
    sheet.innerHTML = this.props.css;
    document.body.appendChild(sheet);
  },

  componentWillUnmount() {
    if( global.IS_SERVER_REQUEST ) {
      return;
    }
    var sheetToBeRemoved = document.getElementById(this.props.id);
    var sheetParent = sheetToBeRemoved.parentNode;
    sheetParent.removeChild(sheetToBeRemoved);
  },

  render() {
    return null;
  }

});

module.exports = InlineCSS;

//