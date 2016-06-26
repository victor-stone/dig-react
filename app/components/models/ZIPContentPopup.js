import React      from 'react';
import Modal      from '../services/Modal';
import InfoButton from '../vanilla/InfoButton';
import ZIPFile    from './ZIPFile';

class ZIPFilesPopup extends Modal.Popup
{
  render() {
    const { model, tags } = this.props;
    let   { nicName, mediaTags: {name} } = model;

    if( nicName ) {
      nicName = ` [${nicName}]`;
    }
    
    const title  = `${name} ${nicName}`;

    return (
      <Modal title={title} subTitle="ZIP contents">
        <ZIPFile model={model} tags={tags} />
      </Modal>
    );    
  }
}


class ZIPContentPopup extends React.Component
{
  onShow() {
    const { model, tags } = this.props;
    ZIPFilesPopup.show( ZIPFilesPopup, {model,tags} );
  }

  render() {
    return (
        <span className="zip-link-container">
          <InfoButton onShow={this.onShow} fixed className="zip-link" size="lg" />
        </span>
      );
  }
}

module.exports = ZIPContentPopup;

//