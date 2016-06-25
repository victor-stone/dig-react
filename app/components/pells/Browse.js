import React              from 'react';
import QueryOptions       from './QueryOptions';
import Glyph              from '../vanilla/Glyph';
import DownloadPopup      from '../DownloadPopup';
import Link               from '../services/LinkToRoute';
import LinkToUpload       from '../services/LinkToUploadRoute';
import { PlayButton }     from '../AudioPlayer';
import { ModelTracker,
         NowPlayingTracker } from '../../mixins';

import InlineCSS          from '../vanilla/InlineCSS';
import browserCSS         from './style/browser';

var PellsListing = React.createClass({

  mixins: [ModelTracker],

  stateFromStore(store) {
    return { model: store.model };
  },

  selectLine(pell) {
    return (e) => {
      e.stopPropagation();
      e.preventDefault();
      this.props.onSelectedPell(pell);
    };
  },

  render: function() {

    function pellLine(pell) {

      return (<li className="pell" key={pell.id}>        
                  {pell.bpm
                    ? <span className="bpm">{'bpm: ' + pell.bpm}</span>
                    : null
                  }
                  <span className="title" onClick={this.selectLine(pell)}>{pell.name}</span>
                  <PlayButton model={pell} className="pell-play btn-sm" />
                  {artist
                    ? null
                    : <span className="artist"><Link href={'/people/' + pell.artist.id}>{pell.artist.name}</Link></span>
                  }
              </li>);
    }

    var items    = this.state.model.items;
    var artist   = this.state.model.artist;
    var lines    = items.map(pellLine.bind(this));

    return React.createElement( 'ul', null, lines );
    }
});

var PellDetail = React.createClass({

  getInitialState: function() {
    return { 
      model: this.props.model,
      show: 'listing'};
  },

  componentWillReceiveProps(newProps) {
    this.setState( { model: newProps.model } );
  },

  render: function() {
    var model       = this.state.model;

    if( !model ) {
      return null;
    }

    var treeURL = LinkToUpload.url(model);

    return (
        <div className="pell-detail">
          <ul className="download-list">
            <li>
              <span className="name">{model.name}</span>
            </li>
            <li>
              <Link className="artist" href={'/people/'+model.artist.id}>{model.artist.name}</Link>
            </li>
            {model.files.map( file => {
              return (
                <li className="dl-list" key={file.id} >
                    <DownloadPopup btnClass="sm-download" 
                                   model={model} 
                                   file={file} 
                    /> 
                    {" "}
                    <span className="ext">{file.extension}</span> 
                    {" "}
                    {file.playTime 
                      ? <span className="playtime">{file.playTime}</span>
                      : null
                    }                      
                    {" "}
                    <span className="nic">{file.nicName}</span>
                </li>
                );})
            }
            <li>
              
            </li>
            <li>
              <Link className="ccm-link pell-detail-foot" href={treeURL}>
                <Glyph icon="arrow-left" />
                {" Remix Tree "}
                <Glyph icon="arrow-right" />
              </Link>
            </li>
          </ul>
        </div>
      );
  }
});

var  PellsBrowser = React.createClass({

  mixins: [NowPlayingTracker],

  onNowPlayingState(selected) {
    this.setState( { selected } );
  },

  onSelectedPell(selected) {
    this.setState( { selected });
  },

  render: function() {
    var store = this.props.store;
    return (
      <div className="container pells-page">
        <InlineCSS css={browserCSS} id="pell-browser-css" />
        <div className="row">
          <div className="col-md-3">
            <PellDetail store={store} model={this.state.selected} />
          </div>
          <div className="col-md-7 pell-browser">
            <PellsListing store={store} onSelectedPell={this.onSelectedPell} />
          </div>
          <div className="col-md-2">
            <QueryOptions store={store} />
          </div>
        </div>
      </div>
    );      
  }

});

module.exports = {
  PellDetail,
  PellsListing,
  PellsBrowser
};

