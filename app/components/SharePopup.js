import React        from 'react';
import Glyph        from './vanilla/Glyph';
import Modal        from './services/Modal';
import env          from '../services/env';
import { bindAll }  from '../unicorns';

class SharePopup extends Modal.Popup {

  constructor() {
    super(...arguments);
    bindAll(this, 'modelLink','fbLink','twitterLink','mailLink' );
  }

  modelLink() {
    const { modelLink, model } = this.props;

    if( modelLink ) {
      return modelLink(model);
    }

    const { id, artist:{id:artistId} } = model;
    
    return 'http://dig.ccmixter.org/files/' + artistId + '/' + id;
  }
  
  fbLink() {
    return 'http://www.facebook.com/share.php?u=' + 
          this.modelLink() + '&t=' + this.props.model.name;
  }
  
  twitterLink() {
    const { model: {name} } = this.props;
    return 'http://twitter.com/home?status=' + name  + ' ' +
           this.modelLink() + '&t=' + name;
  }
  
  mailLink() {
    var appName = env.appName === 'ccmixter' ? '' : env.appName + '.';
    return 'mailto://?subject=' + 'Dig the sounds' +
          '&body=' + 'I\'m sharing some sounds I found at '+appName+'ccmixter:  ' +
          this.modelLink();
  }

  render() {
    var title = this.props.model.name;
    return (
      <Modal subTitle="Share" title={title}>
      <ul className="actions actions-centered">
        <li>
          <a href={this.fbLink()} className="btn btn-success"><Glyph icon="facebook" />{" facebook"}</a>            
        </li>
        <li>
          <a href={this.twitterLink()} className="btn btn-success"><Glyph icon="twitter" />{" Twitter"}</a>            
        </li>
        <li>
          <a href={this.mailLink()} className="btn btn-success"><Glyph icon="envelope-o" />{" e-mail"}</a>
        </li>
      </ul>
      </Modal>
    );
  }


}

class SharePopupLink extends React.Component {

  constructor() {
    super(...arguments);
    this.showSharePopup = this.showSharePopup.bind(this);
  }

  showSharePopup(e) {
    e.preventDefault();
    const { model, modelLink } = this.props;
    SharePopup.show( SharePopup, { modelLink, model } );
  }

  render() {
    var sz    = this.props.big ? 'x4' : '';
    var cls   = this.props.bare ? '' : (this.props.med ? 'btn btn-success' : 'btn btn-lg btn-success');
    var fixed = this.props.fixed || false;
    var text  = this.props.caption ? ' Share' : null;
    var link  = <a className={cls} href="#" onClick={this.showSharePopup}><Glyph fixed={fixed} icon="share-alt" sz={sz} />{text}</a>;
    return this.props.bare ? link : <span>{link}</span>;
  }
}

module.exports = SharePopupLink;

//