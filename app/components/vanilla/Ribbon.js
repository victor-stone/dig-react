import React from 'react';
import { selectors } from '../../unicorns';

function Ribbon(props) {
  const { color = 'orange', className, text } = props;
  const cls  = selectors('ribbon', color, className );
  return <span className={cls}>{text}</span>;
}

module.exports = Ribbon;