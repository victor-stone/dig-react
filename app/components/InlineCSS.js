
import React from 'react';

function InlineCSS(props) {
  /*eslint "react/no-danger":0 */
  var css  = { __html: props.css };
  return (<div dangerouslySetInnerHTML={css} />);
}

module.exports = InlineCSS;

//