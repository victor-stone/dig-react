import React              from 'react';

import InfoButton     from '../vanilla/InfoButton';
import Popover        from '../vanilla/Popover';
import UploadOverview from './UploadOverview';

class UploadInfoButton extends Popover(React.Component)
{
  constructor() {
    super(...arguments);
  }

  get popoverContent() {
    return <UploadOverview store={this.props.store} />;
  }

  render() {
    return <InfoButton />;
  }
}

module.exports = UploadInfoButton;

//
