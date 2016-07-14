/* globals document */
import React from 'react';

var InlineCSS = React.createClass({

  componentDidMount() {
    if( global.IS_SERVER_REQUEST ) {
      return;
    }
    var alreadyHaveIt = document.getElementById(this.props.id);
    if( alreadyHaveIt ) {
      return;
    }
    var css = this.props.css;

    var sheet = document.createElement('style');
    sheet.id = this.props.id;
    sheet.setAttribute('type', 'text/css');

    var target = document.body;
    // var taget = document.getElementsByTagName('head')[0];

    target.appendChild(sheet);

    /*
      if (ss1.styleSheet) {   // IE
          ss1.styleSheet.cssText = css;
      } else {                // the world
          var tt1 = document.createTextNode(css);
          ss1.appendChild(tt1);
      }
    */
    sheet.innerHTML = css;

  },

  shouldComponentUpdate() {
    return false;
  },

  componentWillUnmount() {
    var sheetToBeRemoved = document.getElementById(this.props.id);
    if( sheetToBeRemoved ) {
      var sheetParent = sheetToBeRemoved.parentNode;
      sheetParent.removeChild(sheetToBeRemoved);      
    }
  },

  render() {
    return null;
  }

});

module.exports = InlineCSS;

//