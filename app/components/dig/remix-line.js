import React              from 'react';
import DownloadPopup      from '../download-popup';
import LinkToPeople       from '../services/link-to-people-route';
import { PlayButton }     from '../audio-player';
import LinkToUpload       from '../services/link-to-upload-route';

class RemixLine extends React.Component
{
  render() {
    const { upload, skipUser, onPlay, upload:{artist} } = this.props;

    return ( 
      <li className="clearfix" >
        <PlayButton model={upload} onPlay={onPlay}/>{" "}
        <DownloadPopup model={upload} />{" "} 
        <LinkToUpload className="song-title" model={upload} truncate />{" "}
        {!skipUser && <LinkToPeople className="artist-name light-color" model={artist} />}
      </li>
    );
  }

}

module.exports = RemixLine;

