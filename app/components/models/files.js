import React            from 'react';
import DownloadPopup    from '../download-popup';
import AudioPlayer      from '../audio-player';
import Glyph            from '../vanilla/glyph';
import DeadLink         from '../vanilla/dead-link';
import css              from './style/files';
import ZIPContentPopup  from './zip-content-popup';

class Files extends React.Component
{

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
  }

  oneFile(f,cls,model,tags) {

      cls = `stem-files-line ${cls}`;

      return (
        <li key={f.id} className={cls} >
          <DownloadPopup fixed btnClass="sm-download" model={model} file={f} />
          {" "}
          {f.isMP3  && <AudioPlayer.PlayButton className="play-button" fixed model={f} />}
          {f.isFLAC && <DeadLink className="btn btn-info btn-lg play-disabled"><Glyph icon="play" fixed /></DeadLink>}
          {f.isZIP  && <ZIPContentPopup model={f} store={this.props.store} tags={tags} />}
          {" "}
          <span className="ext">{f.extension}</span>
          {" "}
          <span className="nic">{f.nicName}</span>
        </li>);
  }

  render() {
    const { model, tags, model:{files} } = this.props;
    
    var highs = this.highlights(tags);

    return(
        <ul className="stems-files">
          {files.map( f => this.oneFile( f, highs[f.id] || '', model, tags ) )}
        </ul>
      );
  }
}

Files.css = css;

module.exports = Files;
