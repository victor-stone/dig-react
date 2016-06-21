/* globals $ */
import React              from 'react';
import ReactDOM           from 'react-dom';

import { SongLink, 
         ArtistLink }   from '../Remixes';
import Overview         from '../RemixTree/Overview';
import { PlayButton }   from '../AudioPlayer';
import Glyph            from '../vanilla/Glyph';

import UploadStore      from '../../stores/upload';
import lookup           from '../../services';

var GalleryElement = React.createClass({

  getInitialState() {
    return { popupShowing: false };
  },

  shouldComponentUpdate(nextProps) {
    return this.props.upload.id !== nextProps.upload.id;
  },

  componentWillUnmount() {
    var u = this.props.upload;
    var id = 'gallery-element-' + u.id;
    if( !$('#'+id).data('bs.popover') ) {
      $('#'+id).popover('destroy');
    }
  },

  _showInfo(id,html) {
    html = `<div class="gallery-element-popover">${html}</div>`;
     $('#' + id).popover({
            content : html,
            html: true,
            trigger: 'focus',
            placement: 'bottom'
        })
        .on('shown.bs.popover', () => this.setState({popupShowing: true}))
        .on('hidden.bs.popover', () => this.setState({popupShowing: false}))
        .popover('show');
  },

  showInfo(e) {
    e.stopPropagation();
    e.preventDefault();
    var u = this.props.upload;
    var id = 'gallery-element-' + u.id;
    if( this.state.popupShowing ) {
      $('#'+id).popover('hide') ;
    }
    if( !$('#'+id).data('bs.popover') ) {
      var contentID = 'popover-placeholder-' + u.id;
      var store = new UploadStore();
      var me = this;
      store.info(u.id).then( model =>
        {
          store.model.upload = model;
          ReactDOM.render( React.createElement(Overview.OverviewForm,{store}),  
                           document.getElementById(contentID),
                           function() { me._showInfo(id,ReactDOM.findDOMNode(this).innerHTML); } );
        });
    }
  },

  onClick(e) {
    e.preventDefault();
    e.stopPropagation();
    var id = this.props.upload.id;
    var a  = this.props.upload.artist.id;
    var href = `/files/${a}/${id}`;
    lookup('router').navigateTo(href);
  },

  render() {
    var u = this.props.upload;
    return(
      <li className="gallery-element" >
        <div className="content-wrapper" onClick={this.onClick} >
          <SongLink model={u} truncate /> 
          <div className="tools">
            <div id={'popover-placeholder-' + u.id} className="hidden" />
            <a id={'gallery-element-' + u.id} tabIndex={this.props.index} onClick={this.showInfo} className="btn btn-lg btn-info"><Glyph icon="info-circle" /></a>
            {u.fileInfo && u.fileInfo.isMP3
              ? <PlayButton btnType="warning" className="play-button" model={u} onPlay={this.props.onPlay}/> 
              : null
            }            
          </div>
        </div>
        {this.props.skipUser
          ? null
          : <ArtistLink model={u.artist} skipUser={this.props.skipUser} />
        }
      </li>
      );
  }
});

module.exports = GalleryElement;

//
