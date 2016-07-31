import React from 'react';
import { selectors } from 'unicorns';
/* eslint "react/no-danger":0 */
function Ribbon(props) {
  const { color = 'orange', className, text } = props;
  const cls  = selectors('ribbon', color, className );
  const html = { __html: text.replace(/\\n/g,'<br />') };
  return <span className={cls} dangerouslySetInnerHTML={html} />;
}

module.exports = Ribbon;