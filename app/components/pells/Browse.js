import React              from 'react';
import QueryOptions       from './QueryOptions';
import Glyph              from '../Glyph';
import DownloadPopup      from '../DownloadPopup';
import Link               from '../Link';
import ActionButtons      from '../ActionButtons';
import Paging             from '../Paging';
import { PlayButton }     from '../AudioPlayer';
import { TagString }      from '../../unicorns'; 
import { ModelTracker,
         NowPlayingTracker } from '../../mixins';

var ExternalLink = ActionButtons.ExternalLink;

//const NOMINAL_TIMEOUT = 40;
const PELLS_FILTER    = /^(featured|spoken_word|rap|melody)$/;

var PellsTabs = React.createClass({

  mixins: [ModelTracker],

  stateFromStore: function(store) {
    var totals = store.model.totals;
    var tags   = store.model.queryParams.reqtags;
    var tag    = (new TagString(tags)).filter(PELLS_FILTER).toString();
    return { totals, tag };
  },

  onFilter: function(filter) {
    return (e) => {
      e.stopPropagation();
      e.preventDefault();
      this.applyFilter(filter);
    };
  },

  applyFilter: function(filter) {
    var tag     = filter === 'all' ? '' : filter;
    var qptags  = this.props.store.queryParams.reqtags;
    var reqtags = qptags.replace( this.state.tag, tag ).toString();
    this.props.store.applyHardParams( { reqtags } );    
  },

  checkActive: function(filter) {
    var tag = this.state.tag || 'all';
    return filter === tag ? 'active' : '';
  },

  render: function() {
    var totals = this.state.totals;

    return (
      <ul className="nav nav-tabs">
        {totals.featured
          ? <li className={this.checkActive('featured')} ><a href="#" onClick={this.onFilter('featured')}>{"featured "}<span className="badge">{totals.featured}</span></a></li>
          : null
        }
        <li className={this.checkActive('all')}><a href="#" id="allpellstab" onClick={this.onFilter('all')}>{"all "}<span className="badge">{totals.all}</span></a></li>
        {totals.spoken_word 
          ? <li className={this.checkActive('spoken_word')}><a href="#" onClick={this.onFilter('spoken_word')}>{"spoken "}<span className="badge">{totals.spoken_word}</span></a></li>
          : null
        }
        {totals.rap
          ? <li className={this.checkActive('rap')}><a href="#" onClick={this.onFilter('rap')}>{"rap "}<span className="badge">{totals.rap}</span></a></li>
          : null
        }  
        {totals.melody
          ? <li className={this.checkActive('melody')}><a href="#" onClick={this.onFilter('melody')}>{"melody "}<span className="badge">{totals.melody}</span></a></li>
          : null
        }
      </ul>
      );
  }
});

var PellsListing = React.createClass({

  mixins: [ModelTracker],

  stateFromStore: function(store) {
    return { model: store.model };
  },

  selectLine: function(pell) {
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

  componentWillReceiveProps: function(newProps) {
    this.setState( { model: newProps.model } );
  },

  showListing: function(e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState( {show: 'listing'} );
  },

  showDetails: function(e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState( {show: 'details'} );    
  },

  checkActive: function(mode) {
    return( this.state.show === mode ? 'active' : '' );
  },

  renderListing: function(model) {
    if( !model ) {
      return null;
    }
    
    return (<ul className="download-list">
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
          <ExternalLink className="ccm-link pell-detail-foot" href={model.url} text="@ccMixter" />
        </li>
      </ul>);
  },

  renderDetail: function(model) {
    return (<pre className="pell-detail-description">{model.description}</pre>);
  },

  render: function() {

    var model       = this.state.model;
    var cls         = 'pell-detail' + (model ? '' : ' hidden');
    var showListing = this.state.show === 'listing';
    var element     = model ? (showListing ? this.renderListing(model) : this.renderDetail(model)) : null;

    return (
        <div className={cls}>
        {model
          ? <div> 
              <ul className="nav nav-tabs">
                <li className={this.checkActive('listing')} >
                  <a href="#"  onClick={this.showListing}><Glyph icon="folder" />{" files"}</a>
                </li>
                <li className={this.checkActive('details')} >
                  <a href="#" onClick={this.showDetails}><Glyph icon="info-circle" />{" details"}</a>
                </li>
              </ul>
              <div className="tab-content">
              {element}
              </div>
            </div>
          : null
        }
        </div>
      );
  }
});

var  PellsBrowser = React.createClass({

  mixins: [NowPlayingTracker],

  onNowPlayingState: function(selected) {
    this.setState( { selected } );
  },

  onSelectedPell: function(selected) {
    this.setState( { selected });
  },

  render: function() {
    var store = this.props.store;
    return (
      <div className="container pells-page">
        <QueryOptions store={store} />
        <div className="row">
          <div className="col-md-2 pell-paging">
            <Paging store={store} disableBumping />
          </div>
          <div className="col-md-7 pell-browser">
            <PellsTabs store={store} />
            <div className="tab-content">
              <PellsListing store={store} onSelectedPell={this.onSelectedPell} />
            </div>
          </div>
          <div className="col-md-3">
            <PellDetail store={store} model={this.state.selected} />
          </div>
        </div>
      </div>
    );      
  }

});


module.exports = {
  PellDetail,
  PellsListing,
  PellsTabs,
  PellsBrowser
};

