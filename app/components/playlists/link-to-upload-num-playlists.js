import React             from 'react';
import LinkToUpload      from '../services/LinkToUploadRoute';
import NumPlaylistsBadge from './NumPlaylistsBadge';

function LinkToUploadNumPlaylists(props) {
  return <LinkToUpload model={props.model} ><NumPlaylistsBadge model={props.model}/></LinkToUpload>;
}

module.exports = LinkToUploadNumPlaylists;

//