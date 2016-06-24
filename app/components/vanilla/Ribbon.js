import React from 'react';
import { selectors } from '../../unicorns';
// TODO: ribbon text is horked
function Ribbon(props) {
  const { color = 'orange', className, text } = props;
  const cls  = selectors('ribbon', color, className );
  return <span className={cls}>{text}</span>;
}

module.exports = Ribbon;