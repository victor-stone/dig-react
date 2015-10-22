import React from 'react';
import Link from './Link';
import Glyph from './Glyph';
import Modal from './Modal';
import { LicensePopup } from './ActionButtons';

// this sucks
import { service as store } from '../stores/upload';

var DownloadPopup = React.createClass({

  getInitialState: function() {
    return {view: {showModal: false}, plainSelected: true };
  },
  
  handleHideModal: function() {
    this.setState({view: {showModal: false}});
  },

  handleShowModal: function(){
    store.info( this.props.model.id )
      .then( r => this.setState( {
                      view: {showModal: true},
                      fullUpload: r,
                    }));
  },

  selectPlain: function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ plainSelected: true });
  },

  selectHTML: function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ plainSelected: false });
  },

  copyToClip: function() {
    window.prompt('Control (or Cmd) + C to copy', this.refs.attributionText.value );
  },

  genPopup: function() {

    var upload         = this.state.fullUpload;
    var plainSelected  = this.state.plainSelected;
    var permission     = upload.isOpen ? "Free to use in commercial projects." : "For noncommercial projects only.";
    var featuring      = upload.featuring ? `Ft: ${upload.featuring}` : '';

    var licenseTextTemplate = {
      plain: `${upload.name} by ${upload.artist.name} (c) ${upload.licenseYear} Licensed under a Creative Commons ${upload.licenseName} license. ${upload.url} ${featuring}`,
      html: `<div class="attribution-block"><a href="${upload.url}">${upload.name}</a> by ${upload.artist.name} (c) ${upload.licenseYear} Licensed under a Creative Commons <a href="${upload.licenseURL}">${upload.licenseName}</a> license. ${featuring}</div>`,
    };

    var licenseText = licenseTextTemplate[ plainSelected ? 'plain' : 'html' ];

    return (
      <Modal handleHideModal={this.handleHideModal} subTitle="Download" title={upload.name} >
        <div className="row download-popup">
          <div className="col-md-5">
            <div className="col-panel">
              <p className="text-primary">To use this music you are <mark>required</mark> to give credit to the musicians.</p>
              <div>
                <ul className="nav nav-tabs">
                  <li className={plainSelected ? "active" : ''}><a href onClick={this.selectPlain}>Plain</a></li>
                  <li className={plainSelected ? '' : 'active'}><a href onClick={this.selectHTML}>HTML</a></li>
                </ul>
                <textarea ref="attributionText" readOnly cols="30" rows="2" value={licenseText}></textarea>
                <div className="text-center">
                  <button className="btn btn-sm btn-info" onClick={this.copyToClip}><Glyph icon="files-o" /> Copy to Clipboard</button>
                </div>
              </div>
            </div>
          </div>          
          <div className="col-md-6">
            <ul className="actions actions-centered">
              <li>
                <a className="btn btn-info btn-lg" href={upload.mediaURL} download><Glyph icon="cloud-download" x2 left/> Download <small>{upload.downloadSize}</small></a>
              </li>
              <li className="license-badge">
                <a href={upload.licenseURL}><img src={upload.licenseLogoURL} /></a> <LicensePopup model={upload}/>
              </li>
              <li> 
                <p>{permission}</p>
              </li>
               {upload.isCCPlus ?
                  <li>
                    <a href={upload.purchaseLicenseURL} className="btn btn-info btn-lg"><img src={upload.purchaseLogoURL} className="pull-left" />  Buy a License </a>
                  </li>
                  : null 
                }
               {upload.isCCPlus ?
                  <li>
                    <p>to remove these restrictions</p>
                  </li> 
                  : null 
                }
            </ul>
          </div>
        </div>
      </Modal>
      );
  },

  render: function() {
    var cls    = "btn btn-warning btn-lg";
    var sz     = this.props.big ? 'x4' : '';
    var fixed  = this.props.fixed || false;
    var upload = this.props.model;

    var popup = this.state.view.showModal ? this.genPopup() : null;

    return (
      <span>
        <button className={cls} onClick={this.handleShowModal} ><Glyph fixed={fixed} sz={sz} icon="cloud-download" /></button>
        { popup }
      </span>
      );
  },

});

module.exports = DownloadPopup;
