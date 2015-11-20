import React            from 'react';
import DownloadPopup    from './DownloadPopup';
import ZIPContentViewer from './ZIPContentViewer';
import AudioPlayer      from './AudioPlayer';

import {  PlaylistUpdater  } from '../mixins';

const StemsFiles = React.createClass({

  onZIPClick: function(file) {
    file.upload = this.props.model;
    this.props.store.emit('inspectZIP',file);
  },

  render: function() {
    var model = this.props.model;
    var files = model.files;
    return(
        <ul className="stems-files">
          {files.map( f => {
            return (
              <li className="stem-files-line" key={f.id}>
                <DownloadPopup fixed btnClass="sm-download" model={model} file={f} /> 
                {" "}
                {f.isPlayableSample
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
            })
          }
        </ul>
      );
  }
});

const StemsList = React.createClass({

  mixins: [PlaylistUpdater],

  getDefaultProps: function() {
    return { skipUser: false };
  },
 
  stateFromStore: function(store) {
    return { model: store.model };
  },

  render: function() {
    var model = this.state.model;

    if( !model || !model.total ) {
      return (<div className="well"><h2>{"wups - nothing matches that combination of tags"}</h2></div>);
    }
    var fo = this.props.filesOnly;
    var nn = fo || this.props.namesOnly;

    return (
        <ul className="stems-listing">
          {model.playlist.map( (u,i) => {
            return (<li key={i}>
                      {u.bpm ? <span className="bpm">{u.bpm}</span> : null}
                      {fo ? null : <span className="stem-name">{u.name}</span>}
                      {" "}
                      {nn ? null : <span className="stem-artist">{u.artist.name}</span>}
                      <StemsFiles model={u} store={this.props.store} />
                  </li>); })
          }
        </ul>
      );
    }
});

module.exports = StemsList;
