import React             from 'react';
import LinkToUpload      from '../services/link-to-upload-route';
import NumPlaylistsBadge from './num-playlists-badge';

function LinkToUploadNumPlaylists(props) {
  return <LinkToUpload model={props.model} ><NumPlaylistsBadge model={props.model}/></LinkToUpload>;
}

module.exports = LinkToUploadNumPlaylists;

//