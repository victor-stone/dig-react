import React    from 'react';
import Glyph    from './Glyph';
import DeadLink from './DeadLink';

function InfoButton(props)
{
  const { onInfo, size = 'lg' } = props;
  return <DeadLink onClick={onInfo} className={`btn btn-${size} btn-info`}><Glyph icon="info-circle" /></DeadLink>;
}

module.exports = InfoButton;

//
