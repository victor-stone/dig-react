import React              from 'react';
import ApplyOutletGutter  from './ApplyOutletGutter';
import { PlayButton }     from '../AudioPlayer';
import InlineCSS          from '../InlineCSS';
import Paging             from '../Paging';

import { SongLink, 
         RemixContainer,
         ArtistLink }     from '../Remixes';

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

.remix-option-bar {
  position: fixed;
  top: 60px;
  background-color: black;
  width: 100%;
  opacity: 0.9;
}
.paging {
  display: inline-block;
  clear: none;
  margin-left: 18px;
}
.paging .pagination {
  float: left;
  margin-right: 8px;
}

.paging-caption {
  display: inline-block;
  margin-right: 8px;
  margin-top: 32px;
  color: white;
  clear: none;
  width: initial;
}

.limit-label {
  color: white;
}
`;

var RemixLine = React.createClass({

  render() {
    var u = this.props.upload;
    return(
      <li className="remix-line">
        <div className="content-wrapper">
          <SongLink model={u} /> 
          <PlayButton btnType="warning" className="play-button" model={u} onPlay={this.props.onPlay}/> 
        </div>
        <ArtistLink model={u.artist} skipUser={this.props.skipUser} />
      </li>
      );
  }
});

var RemixOptionBar = React.createClass({

  render() {
    return(
      <div className="remix-option-bar">
        <ApplyOutletGutter />
        <Paging {...this.props} disableBumping />
      </div>
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
