import React         from 'react';
import DeadLink      from './dead-link';
import { selectors } from 'unicorns';

class EditButton extends React.Component
{
  render() {
    const { btnType = 'default', className, onEdit } = this.props;

    const cls = selectors( 'edit-button btn btn-' + btnType, className );

    return <DeadLink className={cls} icon="edit" onClick={onEdit} />;
  }
}

module.exports = EditButton;
