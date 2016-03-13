/* globals $ */
import React from 'react';
import InlineCSS from '../InlineCSS';

var css = `
.outlet-wrap.outlet-gutter {
  padding-top: 140px;
}
`;

var ApplyOutletGutter = React.createClass({

  componentDidMount() {
    if( global.IS_SERVER_REQUEST ) {
      return;
    }
    $('.outlet-wrap').addClass('outlet-gutter');
  },

  componentWillUnmount() {
    if( global.IS_SERVER_REQUEST ) {
      return;
    }    
    $('.outlet-wrap').removeClass('outlet-gutter');
  },

  render() {
    return( <InlineCSS css={css} id="add-gutter" /> );
  }
});

module.exports = ApplyOutletGutter;

