import React            from 'react';
import DownloadPopup    from './DownloadPopup';
import ZIPContentViewer from './ZIPContentViewer';
import AudioPlayer      from './AudioPlayer';
import People           from './People';
import ActionButtons    from './ActionButtons';
import env              from '../services/env';
import {  PlaylistUpdater,
          SelectedTagsTracker  } from '../mixins';

const UploadLink = ActionButtons.UploadLink;

const StemFile = React.createClass({

  getInitialState: function() {
    return { cls: this.props.cls };
  },

  componentWillReceiveProps: function(props) {
    this.setState( { cls: props.cls } );
  },

  render: function() {
      var f        = this.props.file;
      var playable = f.isMP3 || (f.isFLAC && env.supportFLAC);

      return (
        <li className={'stem-files-line ' + this.state.cls} >
          <DownloadPopup fixed btnClass="sm-download" model={this.props.model} file={f} /> 
          {" "}
          {playable
            ? <AudioPlayer.PlayButton fixed model={f} />
            : null
          }
          {f.isZIP
            ? <ZIPContentViewer.ZIPLink model={f} onClick={this.props.onZIPClick} />
            : null
          }
          {" "}
          <span className="ext">{f.extension}</span>
          {" "}
          <span className="nic">{f.nicName}</span>
        </li>);
  }
});

const StemsFiles = React.createClass({

  getInitialState: function() {

    return { selectedTags: this.props.tags,
              highlights: this.highlights(this.props.tags) };
  },

  componentWillReceiveProps: function(props) {
    this.setState( { selectedTags: props.tags,
                     highlights: this.highlights(props.tags) } );
  },

  highlights(tags) {
    var files = this.store.model.files;
    if( files.length === 1 || !tags || tags.isEmpty() ) {
      return {};
    }
    var highlights = {};
    var atLeastOneHit = false;
    files.forEach( f => {
      var found = (f.nicName && tags.anyInString(f.nicName.toLowerCase())) ||
                  (f.zipContents && f.zipContents
                                       .map( s => s.toLowerCase())
                                       .find( tags.anyInString.bind(tags) ));
      atLeastOneHit |= found;
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
    this.props.store.emit('inspectZIP',file,this.props.store.tags);
  },

  render: function() {
    var model = this.props.model;
    var files = model.files;

    return(
        <ul className="stems-files">
          {files.map( f => <StemFile key={f.id} 
                                     model={model} 
                                     cls={this.state.highlights[f.id]}
                                     file={f} 
                                     onZIPClick={this.onZIPClick} 
                           />)
          }
        </ul>
      );
  }
});

const StemsList = React.createClass({

  mixins: [PlaylistUpdater,SelectedTagsTracker],

  getDefaultProps: function() {
    return { skipUser: false };
  },
 
  stateFromStore: function(store) {
    return { store };
  },

  render: function() {
    var model = this.state.store.model;

    if( !model || !model.total ) {
      return (<div className="well"><h2>{"wups - nothing matches that combination of tags"}</h2></div>);
    }
    var fo = this.props.filesOnly;
    var nn = fo || this.props.namesOnly;

    var store = this.props.store;
    var tags  = this.state.selectedTags;

    return (
        <ul className="stems-listing">
          {model.playlist.map( (u,i) => {
            return (<li key={i}>
                      {u.bpm ? <span className="bpm">{u.bpm}</span> : null}
                      {fo ? null : <UploadLink model={u} className="stem-name" />}
                      {nn ? null : <People.Link model={u.artist} className="stem-artist" />}
                      <StemsFiles model={u} store={store} tags={tags} />
                  </li>); })
          }
        </ul>
      );
    }
});

module.exports = StemsList;
