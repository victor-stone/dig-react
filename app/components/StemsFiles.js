import React            from 'react';
import DownloadPopup    from './DownloadPopup';
import ZIPContentPopup  from './ZIPContentPopup';
import AudioPlayer      from './AudioPlayer';
import Glyph            from './Glyph';
import env              from '../services/env';
import { DeadLink }     from './ActionButtons';

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

  oneFile: function(f,cls,model) {
      cls = `stem-files-line ${cls}`;

      return (
        <li key={f.id} className={cls} >
          <DownloadPopup fixed btnClass="sm-download" model={model} file={f} />
          {" "}
          {f.isMP3
            ? <AudioPlayer.PlayButton className="play-button" fixed model={f} />
            : null
          }
          {f.isFLAC
            ? (env.supportFLAC
                ? <AudioPlayer.PlayButton className="play-button" fixed model={f} />
                : <DeadLink className="btn btn-info btn-lg play-disabled"><Glyph icon="play" fixed /></DeadLink>
              )
            : null
          }
          {f.isZIP
            ? <ZIPContentPopup model={f} store={this.props.store} />
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


module.exports = StemsFiles;
