import React   from 'react';

import { Row,
         Column }     from './vanilla/grid';
import DeadLink       from './vanilla/dead-link';

import Glyph   from './vanilla/glyph';
import Modal   from './services/modal';
import Upload  from '../stores/upload';
import env     from '../services/env';
import events  from '../models/events';

import { LicenseInfoLink, 
         LicenseInfo } from './license-info';

var DownloadPopup = React.createClass({

  getInitialState() {
    return {view: {showModal: false}, plainSelected: true };
  },
  
  handleHideModal() {
    this.setState({view: {showModal: false}});
  },

  handleShowModal(){
    if( this.props.fullUpload ) {
      this.setState( { fullUpload: this.props.fullUpload,
                       view:      { showModal: true } } );
    } else {
      var store = new Upload();
      store.info( this.props.model.id )
        .then( r => this.setState( {
                        view:       {showModal: true},
                        fullUpload: r,
                      }));
    }
  },

  selectPlain() {
    this.setState({ plainSelected: true });
  },

  selectHTML() {
    this.setState({ plainSelected: false });
  },

  copyToClip() {
    window.prompt('Control (or Cmd) + C to copy', this.refs.attributionText.value );
  },

  showLicense() {
    this.setState( { showLicense: true } );
  },

  showDownload() {
    this.setState( { showLicense: false, showYTVideo: false } );
  },

  showYTVideo() {
    this.setState( { showYTVideo: true } );
  },

  onDownloadClick() {
    env.emit( events.DOWNLOAD, this.state.fullUpload );
  },

  genYTVideo() {
    var html = { __html: '<iframe width="560" height="315" src="https://www.youtube.com/embed/FZ9KcU9lUQQ" frameborder="0" allowfullscreen></iframe>' };
    /*eslint "react/no-danger":0 */
    return (
      <div ref="yt-video" className="yt-video">
        <DeadLink className="pull-left" onClick={this.showDownload}><Glyph icon="chevron-left" />{" back"}</DeadLink>
        <div dangerouslySetInnerHTML={html} />
      </div>
      );
  },

  genPopup() {
    var upload = this.state.fullUpload;

    return (
        <Modal handleHideModal={this.handleHideModal} subTitle="Download" title={upload.name} >
        {this.state.showLicense
          ? <div ref="license">
              <a href="#" className="pull-left" onClick={this.showDownload}><Glyph icon="chevron-left" />{" back"}</a>
              <div className="text-center"><strong>{LicenseInfo.title}</strong></div>
              <div className="clearfix" />
              <LicenseInfo />
            </div>
          : this.state.showYTVideo 
              ? this.genYTVideo()
              : this.genDLPopup()
        }
        </Modal>
      );
  },

  genDLPopup() {

    var upload         = this.state.fullUpload;
    var plainSelected  = this.state.plainSelected;
    var featuring      = upload.featuring ? `Ft: ${upload.featuring}` : '';
    var permission     = upload.isOpen ? 'Free to use in commercial projects.' : 'For noncommercial projects only.';

    var url = upload.url.replace(/ccmixter\.org/, 'dig.ccmixter.org');

    var licenseTextTemplate = {
      plain: `${upload.name} by ${upload.artist.name} (c) copyright ${upload.licenseYear} Licensed under a Creative Commons ${upload.licenseName} license. ${url} ${featuring}`,
      html: `<div class="attribution-block"><a href="${url}">${upload.name}</a> by ${upload.artist.name} (c) copyright ${upload.licenseYear} Licensed under a Creative Commons <a href="${upload.licenseURL}">${upload.licenseName}</a> license. ${featuring}</div>`,
    };

    var licenseText = licenseTextTemplate[ plainSelected ? 'plain' : 'html' ];

    var dlRec = this.props.file || upload;

    return (
        <Row className="download-popup" ref="download-content">
          <Column cols="5">
            <div className="col-panel">
              <p className="text-primary">{"To use this music you are "}<mark>{"required"}</mark>{" to give credit to the musicians."}</p>
              <div>
                <ul className="nav nav-tabs">
                  <li className={plainSelected ? 'active' : ''}><DeadLink onClick={this.selectPlain} text="Plain" /></li>
                  <li className={plainSelected ? '' : 'active'}><DeadLink onClick={this.selectHTML} text="HTML" /></li>
                </ul>
                <textarea ref="attributionText" readOnly cols="30" rows="2" value={licenseText}></textarea>
                <div className="text-center">
                  <button className="btn btn-sm btn-info copy-to-clip" onClick={this.copyToClip}><Glyph icon="files-o" />{" Copy to Clipboard"}</button>
                </div>
              </div>
            </div>
            <div className="watch-a-yt-video">
              <DeadLink className="btn-sm" onClick={this.showYTVideo}>{"use this music at "}<Glyph x2 icon="youtube" /></DeadLink>
            </div>
          </Column>
          <Column cols="6">
            <ul className="actions actions-centered">
              <li>
                <a className="btn btn-info btn-lg" href={dlRec.mediaURL} onClick={this.onDownloadClick} download><Glyph icon="cloud-download" x2 left/>{" Download "}<small>{dlRec.downloadSize}</small></a>
              </li>
              <li className="license-badge">
                <a href={upload.licenseURL}><img src={upload.licenseLogoURL} /></a> <LicenseInfoLink onShow={this.showLicense} />
              </li>
              <li><p>{permission}</p></li>
              {upload.isSpecialLic && <li><p>{"(This is an older license that "}<br />{"has "}<a href={upload.licenseURL}>{"special restrictions"}</a>{".)"}</p></li>}
              {dlRec.isCCPlus && <li><a href={upload.purchaseLicenseURL} className="btn btn-info btn-lg"><img src={upload.purchaseLogoURL} className="pull-left" />{"  Buy a License "}</a></li>}
              {dlRec.isCCPlus && <li><p>{"to remove these restrictions"}</p></li>}
            </ul>
          </Column>
        </Row>
      );
  },

  render() {
    var cls    = 'btn btn-warning ' + (this.props.btnClass || '');
    var sz     = this.props.big ? 'x4' : '';
    var fixed  = this.props.fixed || false;

    if( !this.props.sm ) {
      cls += ' btn-lg';
    }
    
    var popup = this.state.view.showModal ? this.genPopup() : null;

    return (
      <span className="download-button-container hidden-sm hidden-xs">
        <button className={cls} onClick={this.handleShowModal} ><Glyph fixed={fixed} sz={sz} icon="cloud-download" />{this.props.children}</button>
        {popup}
      </span>
      );
  },

});

module.exports = DownloadPopup;
