import React    from 'react';
import Glyph    from './Glyph';
import DeadLink from './DeadLink';
import { selectors } from '../../unicorns';

function InfoButton(props)
{
  const { onInfo, className, size = 'lg', fixed } = props;
  const cls = selectors(`btn btn-${size} btn-info`,className);
  return <DeadLink onClick={onInfo} className={cls}><Glyph fixed={fixed} icon="info-circle" /></DeadLink>;
}

module.exports = InfoButton;

//
