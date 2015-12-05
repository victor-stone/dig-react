import React            from 'react';
import DownloadPopup    from './DownloadPopup';
import ZIPContentViewer from './ZIPContentViewer';
import AudioPlayer      from './AudioPlayer';
import People           from './People';
import Glyph            from './Glyph';
import Link             from './Link';
import env              from '../services/env';
import { NoTagHits }    from './Tags';
import { TagString }    from '../unicorns';
import events           from '../models/events';
import {  ModelTracker,
          SelectedTagsTracker  } from '../mixins';
import { DeadLink }     from './ActionButtons';

//const SLIDE_DELAY = 1700;

const StemsFiles = React.createClass({

  highlights(tags) {
    if( !tags || tags.isEmpty() ) {
      return {};
    }
    var highlights = {};
    var files = this.props.model.files;
    if( files.length === 1 ) {
      highlights[files[0].id] = 'hi-hi';
      return highlights;
    }
    
    var atLeastOneHit = false;
    files.forEach( f => {
      var found = (f.nicName && tags.anyInString(f.nicName)) ||
                  (f.zipContents && tags.anyInArray(f.zipContents) );

      atLeastOneHit = atLeastOneHit || (found !== null);
      highlights[f.id] = found ? 'hi-hi' : 'lo-hi';
    });

    if( !atLeastOneHit ) {
      return {};
    }

    return highlights;
  },

  onZIPClick: function(file) {
    // the exsiting 'upload' property
    // is bare-bones so let's fill it out
    file.upload = this.props.model;
    this.props.store.emit(events.INSPECT_ZIP,file,this.props.store);
  },

  oneFile: function(f,cls,model) {
      cls = `stem-files-line ${cls}`;

      return (
        <li key={f.id} className={cls} >
          <DownloadPopup fixed btnClass="sm-download" model={model} file={f} />
          {" "}
          {f.isMP3
            ? <AudioPlayer.PlayButton fixed model={f} />
            : null
          }
          {f.isFLAC
            ? (env.supportFLAC
                ? <AudioPlayer.PlayButton fixed model={f} />
                : <DeadLink className="btn btn-info btn-lg disabled"><Glyph icon="play" fixed /></DeadLink>
              )
            : null
          }
          {f.isZIP
            ? <ZIPContentViewer.ZIPLink model={f} onClick={this.onZIPClick} />
            : null
          }
          {" "}
          <span className="ext">{f.extension}</span>
          {" "}
          <span className="nic">{f.nicName}</span>
        </li>);
  },

  render: function() {
    var files = this.props.model.files;
    var highs = this.highlights(this.props.searchTerms || this.props.tags);

    return(
        <ul className="stems-files">
          {files.map( f => this.oneFile(f,highs[f.id]||'',this.props.model) )}
        </ul>
      );
  }
});

function StemDetailTags(props) {
  var tags = props.tags.map( t => 
      (<Link key={t} 
             href={'/stems?tags=' + t} 
             className="btn btn-success btn-xs btn-tag light-on-hover"
       >
          <Glyph icon="tag" />
          {" "}
          {t}
       </Link>) );
  return( <div className="upload-tags" >{tags}</div> );
}

const StemDetail = React.createClass({

  getInitialState: function() {
    return { model: this.props.model };
  },

  componentDidMount: function() {
   var $e = $('#upload-detail-' + this.state.model.id );
   $e.slideDown('slow');
  },

  render: function() {
    var model = this.state.model;
    var id    = 'upload-detail-' + model.id;

    return (<div className="stems-detail" id={id} >
        <StemDetailTags tags={model.userTags} />
      </div>);
  }
});

const StemsList = React.createClass({

  mixins: [ ModelTracker, SelectedTagsTracker],

  getDefaultProps: function() {
    return { skipUser: false,
             noHitsComp: NoTagHits };
  },
 
  stateFromStore: function(store) {
    var model       = store.model;
    var queryParams = model.queryParams;
    var expanded    = 0;
    var searchTerms = null;
    if( queryParams.searchp ) {
      searchTerms = new TagString(queryParams.searchp.replace(/\s/g,','));
    }

    return { model, expanded, searchTerms };
  },

  /* globals $ */
  onNameClick: function(id) {
    var _this = this;

    return function(e) {
      e.preventDefault();
      e.stopPropagation();
      if( _this.state.expanded ) {
        var $e = $('#upload-detail-' + _this.state.expanded );
        if( _this.state.expanded === id ) {
          if ($e.is(':hidden')) {
            $e.slideDown('slow');
          } else {
            $e.slideUp('fast');
          }
          return;
        } else {
          $e.slideUp('fast', function() {
            _this.setState( { expanded: id } );
          });
          return;
        }
      }
      _this.setState( { expanded: id } );
    };
  },

  render: function() {
    var store = this.props.store;
    var model = this.state.model;

    if( !model || !model.total ) {
      if( this.props.noHitsComp ) {
        return (React.createElement(this.props.noHitsComp, { store }));
      }
      return (<h2>{"didn't catch that"}</h2>);
    }
    
    var fo = this.props.filesOnly;
    var nn = fo || this.props.namesOnly;

    var tags    = this.state.selectedTags;
    var searchp = this.state.searchTerms;

    return (
        <ul className="stems-listing">
          {model.playlist.map( (u,i) => {
            return (<li key={i}>
                      {u.bpm ? <span className="bpm">{u.bpm}</span> : null}
                      {fo ? null : <a href="#" onClick={this.onNameClick(u.id)}>{u.name}</a>}
                      {nn ? null : <People.Link model={u.artist} className="stem-artist" />}
                      <StemsFiles 
                        model={u} 
                        store={store} 
                        tags={tags} 
                        searchTerms={searchp} 
                      />
                      {this.state.expanded === u.id
                        ? <StemDetail model={u} />
                        : null
                      }
                  </li>); })
          }
        </ul>
      );
    }
});

module.exports = StemsList;
