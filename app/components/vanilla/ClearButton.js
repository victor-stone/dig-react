import React    from 'react';
import Glyph    from './Glyph';
import DeadLink from './DeadLink';

import { selectors } from '../../unicorns';

function ClearButton(props)
{
  const { className, onClear } = props;
  const cls = selectors('btn btn-danger',className);
  return (<DeadLink onClick={onClear} className={cls}><Glyph icon="trash" />{" clear"}</DeadLink>);
}


module.exports = ClearButton;