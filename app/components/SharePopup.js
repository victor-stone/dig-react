import React        from 'react';
import Glyph        from './Glyph';
import Modal        from './Modal';
import env          from '../services/env';

const SharePopup = React.createClass({

  getInitialState: function() {
    return {view: {showModal: false} };
  },
  
  handleHideModal: function() {
    this.setState({view: {showModal: false}});
  },

  handleShowModal(e){
    e.stopPropagation();
    e.preventDefault();
    this.setState( { view: {showModal: true} } );
  },

  modelLink: function() {
    if( this.props.modelLink ) {
      return this.props.modelLink(this.props.model);
    }
    return 'http://dig.ccmixter.org/files/' +
          this.props.model.artist.id +
          '/' + this.props.model.id;
  },
  
  fbLink: function() {
    return 'http://www.facebook.com/share.php?u=' + 
          this.modelLink() + '&t=' + this.props.model.name;
  },
  
  twitterLink: function() {
    return 'http://twitter.com/home?status=' +
           this.props.model.name + ' ' +
           this.modelLink() + '&t=' + this.props.model.name;
  },
  
  mailLink: function() {
    return 'mailto://?subject=' + 'Dig the sounds' +
          '&body=' + 'I\'m sharing some sounds I found at '+env.appName+'.ccmixter:  ' +
          this.modelLink();
  },

  genPopup: function() {
    var title = this.props.model.name;
    return (
      <Modal handleHideModal={this.handleHideModal} subTitle="Share" title={title}>
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
  },

  render: function() {
    var popup = this.state.view.showModal ? this.genPopup() : null;
    var sz    = this.props.big ? 'x4' : '';
    var cls   = this.props.med ? 'btn btn-success' : 'btn btn-lg btn-success';
    var fixed = this.props.fixed || false;
    return (
        <span>
          <a className={cls} href="#" onClick={this.handleShowModal}><Glyph fixed={fixed} icon="share-alt" sz={sz} /></a>
          {popup}
        </span>
      );  
  }
});

module.exports = SharePopup;