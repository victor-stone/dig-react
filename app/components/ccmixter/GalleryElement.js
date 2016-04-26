/* globals $ */
import React              from 'react';
import ReactDOM           from 'react-dom';

import { SongLink, 
         ArtistLink }   from '../Remixes';
import Overview         from '../RemixTree/Overview';
import { PlayButton }   from '../AudioPlayer';
import Glyph            from '../Glyph';

import UploadStore      from '../../stores/upload';
import lookup           from '../../services';

var GalleryElement = React.createClass({

  _showInfo(id,html) {
    html = `<div class="gallery-element-popover">${html}</div>`;
     $('#' + id).popover({
            content : html,
            html: true,
            trigger: 'focus',
            placement: 'bottom'
        }).popover('show');
  },

  showInfo(e) {
    e.stopPropagation();
    e.preventDefault();
    var u = this.props.upload;
    var id = 'gallery-element-' + u.id;
    if( !$('#'+id).data('bs.popover') ) {
      var contentID = 'popover-placeholder-' + u.id;
      var upload = new UploadStore();
      var me = this;
      upload.info(u.id).then( model =>
            ReactDOM.render( React.createElement(Overview.OverviewForm,{model}),  
                             document.getElementById(contentID),
                             function() { me._showInfo(id,ReactDOM.findDOMNode(this).innerHTML); } )
        );
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
