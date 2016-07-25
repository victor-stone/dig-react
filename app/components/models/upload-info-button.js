import React              from 'react';

import InfoButton     from '../vanilla/info-button';
import Popover        from '../vanilla/popover';
import UploadOverview from '../bound/upload-overview';

import Upload         from '../../stores/upload';

class UploadInfoButton extends Popover(React.Component)
{
  constructor() {
    super(...arguments);
    this._elem = null;
    this.onShow = this.onShow.bind(this);
  }

  get popoverContent() {
    return this._elem;
  }

  onShow() {
    if( this.hasPopover ) {
      return;
    }
    const { model: { id } } = this.props;
    let store = new Upload();
    return store.find(id,0,Upload.BARE)
            .then( () => {
              this._elem = <UploadOverview store={store} />;
              this.showPopover();
            });
  }

  render() {
    return <InfoButton onInfo={this.onShow} />;
  }
}

module.exports = UploadInfoButton;

//
