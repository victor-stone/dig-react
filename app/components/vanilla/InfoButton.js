import React    from 'react';
import Glyph    from './Glyph';

function InfoButton(props)
{
  const { onInfo, size = 'lg' } = props;
  return <button onClick={onInfo} className={`btn btn-${size} btn-info`}><Glyph icon="info-circle" /></button>;
}

module.exports = InfoButton;

//
