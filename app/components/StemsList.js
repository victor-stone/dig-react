import React            from 'react';
import DownloadPopup    from './DownloadPopup';
import ZIPContentViewer from './ZIPContentViewer';
import AudioPlayer      from './AudioPlayer';
import People           from './People';
import env              from '../services/env';
import { NoTagHits }    from './Tags';
import events           from '../models/events';
import {  ModelTracker,
          SelectedTagsTracker  } from '../mixins';

const StemsFiles = React.createClass({

  mixins: [SelectedTagsTracker],

  highlights(tags) {
    var highlights = {};
    var files = this.props.model.files;
    if( !tags || tags.isEmpty() ) {
      return {};
    }
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
      var playable = f.isMP3 || (f.isFLAC && env.supportFLAC);
      cls = `stem-files-line ${cls}`;

      return (
        <li key={f.id} className={cls} >
          <DownloadPopup fixed btnClass="sm-download" model={model} file={f} />
          {" "}
          {playable
            ? <AudioPlayer.PlayButton fixed model={f} />
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
    var model = this.props.model;
    var files = model.files;
    var highs = this.highlights(this.state.selectedTags);

    return(
        <ul className="stems-files">
          {files.map( f => this.oneFile(f,highs[f.id]||'',model) )}
        </ul>
      );
  }
});

const StemsList = React.createClass({

  mixins: [ModelTracker,SelectedTagsTracker],

  getDefaultProps: function() {
    return { skipUser: false };
  },
 
  stateFromStore: function(store) {
    return { store };
  },

  render: function() {
    var model = this.state.store.model;

    if( !model || !model.total ) {
      return (<NoTagHits store={this.state.store} />);
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
                      {fo ? null : <span className="stem-name">{u.name}</span>}
                      {nn ? null : <People.Link model={u.artist} className="stem-artist" />}
                      <StemsFiles model={u} store={store} tags={tags} />
                  </li>); })
          }
        </ul>
      );
    }
});

module.exports = StemsList;
