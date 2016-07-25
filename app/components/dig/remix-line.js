import React              from 'react';
import DownloadPopup      from '../DownloadPopup';
import LinkToPeople       from '../services/LinkToPeopleRoute';
import { PlayButton }     from '../AudioPlayer';
import LinkToUpload       from '../services/LinkToUploadRoute';

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

