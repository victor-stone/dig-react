/* globals $ */
import React              from 'react';
import ReactDOM           from 'react-dom';
import ApplyOutletGutter  from './ApplyOutletGutter';
import { PlayButton }     from '../AudioPlayer';
import InlineCSS          from '../InlineCSS';
import Paging             from '../Paging';
import Glyph              from '../Glyph';

import { SongLink, 
         RemixContainer,
         ArtistLink }     from '../Remixes';

import { ModelTracker } from '../../mixins';
import { TagString }    from '../../unicorns';
import Upload           from '../../stores/upload';
import Overview         from '../RemixTree/Overview';

var css = `
.remix-page ul.play-list {
  padding: 0px;
}

.remix-page .play-list li.remix-line {
  margin: 10px;
  width: 150;
  padding: 4px;
  display: inline-table;
}

.remix-page .play-list li.remix-line {
  background-image: -webkit-linear-gradient(top, #276C28 0%, #3FB040 100%);
  background-image: -o-linear-gradient(top, #276C28 0%, #3FB040 100%);
  background-image: -webkit-gradient(linear, left top, left bottom, from(#276C28), to(#3FB040));
  background-image: linear-gradient(to bottom, #276C28 0%, #3FB040 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff3FB040', endColorstr='#ff3FB040', GradientType=0);
  filter: progid:DXImageTransform.Microsoft.gradient(enabled = false);
  background-repeat: repeat-x;

  border-radius: 8px;
  box-shadow: 2px 2px #3FB040;;
}      

.remix-page .play-list li.remix-line .content-wrapper {
  min-height: 120px;
}

.remix-page .play-list li .song-title {
  font-size: 18px;
  display: block;
  text-align: right;
  min-height: 110px;
  margin-top: 8px;
  margin-right: 8px;
  margin-left: 20%;
}

.remix-page .play-list li .artist-name {
  display: block;
  text-align: center;
  margin-top: 8px;
}

.remix-page .play-list li .song-title a {
  color: white;
}

.remix-page .play-list li .artist-name a {
  font-weight: 100;
  color: yellow;
}

.remix-page .play-list li.remix-line .play-button {
  display: block;
  width: 50px;
  margin: 0 auto;
}

.remix-page  .remix-popover .form-control {
  height: initial;
}

.remix-option-bar {
  position: fixed;
  top: 60px;
  background-color: black;
  width: 100%;
  opacity: 0.9;
}
.paging {
  display: inline-block;
  margin-left: 18px;
  float: right;
}
.paging .pagination {
  margin-right: 8px;
  margin-top: 3px;
  margin-bottom: 3px;
  font-size: 10px;
  float: left;
}

.paging-caption {
  display: inline-block;
  margin-right: 8px;
  margin-top: 12px;
  color: white;
  clear: none;
  width: initial;
}

.limit-label {
  color: white;
}
`;

const REMIX_FILTER    = /^(editorial_pick|remix|sample|acappella)$/;

var RemixTreeTabs = React.createClass({

  mixins: [ModelTracker],

  stateFromStore: function(store) {
    var tags   = store.model.queryParams.reqtags;
    var tag    = (new TagString(tags)).filter(REMIX_FILTER).toString();
    return { tag };
  },

  onFilter: function(filter) {
    return (e) => {
      e.stopPropagation();
      e.preventDefault();
      this.applyFilter(filter);
    };
  },

  applyFilter: function(filter) {
    var qptags  = this.props.store.queryParams.reqtags;
    var reqtags = qptags.replace( this.state.tag, filter ).toString();
    this.props.store.refreshHard( { reqtags } );    
  },

  checkActive: function(filter) {
    return filter === this.state.tag ? 'active' : '';
  },

  render: function() {

    return (
      <ul className="nav nav-tabs remix-tree-tabs">
        <li className={this.checkActive('editorial_pick')} ><a href="#" onClick={this.onFilter('editorial_pick')}>{"ed picks"}</a></li>
        <li className={this.checkActive('remix')}><a href="#" onClick={this.onFilter('remix')}>{"remixes"}</a></li>
        <li className={this.checkActive('sample')}><a href="#" onClick={this.onFilter('sample')}>{"stems"}</a></li>
        <li className={this.checkActive('acappella')}><a href="#" onClick={this.onFilter('acappella')}>{"pells"}</a></li>
      </ul>
      );
  }
});

var RemixOptionBar = React.createClass({

  render() {
    return(
      <div className="remix-option-bar">
        <ApplyOutletGutter />
        <Paging {...this.props} disableBumping />
        <RemixTreeTabs {...this.props} />
      </div>
      );
  }
});

var RemixLine = React.createClass({

  componentDidMount() {
    if( global.IS_SERVER_REQUEST ) {
      return;
    }
    var u = this.props.upload;
    var id = '#remix-line-' + u.id;
    var contentID = id + '-content';
     $(id).popover({
            content : `<div class="remix-popover" id=${contentID}></div>`,
            html: true,
            trigger: 'focus',
            placement: 'auto'
        }).on('show.bs.popover', () => {
          var upload = new Upload();
          upload.info(u.id).then( model =>
            ReactDOM.render( React.createElement(Overview.OverviewForm,{model}),  document.getElementById(contentID) )
            );
        });
  },

  render() {
    var u = this.props.upload;
    return(
      <li className="remix-line" >
        <div className="content-wrapper">
          <SongLink model={u} /> 
          <button id={'remix-line-' + u.id} className="pull-right btn-info"><Glyph icon="info-circle" /></button>
          <PlayButton btnType="warning" className="play-button" model={u} onPlay={this.props.onPlay}/> 
        </div>
        <ArtistLink model={u.artist} skipUser={this.props.skipUser} />
      </li>
      );
  }
});


var Remixes = React.createClass({

  render() {
    return (
      <div className="remix-page">
        <InlineCSS css={css} id="remix-page"/>
        <RemixOptionBar {...this.props} />
        <RemixContainer {...this.props} remixLine={RemixLine} />
      </div>
    );
  }
});

module.exports = Remixes;

//
