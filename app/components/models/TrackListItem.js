import React              from 'react';
import UploadLink         from '../services/LinkToUploadRoute';
import { PlayButton }     from '../AudioPlayer';
import People             from '../People';
import DeleteButton       from './DeleteButton';


/*
  Display an Upload reacord as a list item <li>

  props
    model     - object   from [stores/uploads].model.items[]
    editing   - boolean  true means display editing controls 
    skipUser  - boolean  true means do NOT dispay artist link

  sourced events
    onDelete(model)  - user clicked on 'delete' button
    onPlay(model)    - user clicked on 'play' button 
*/
function TrackListItem(props) {
  var model = props.model;
  return (
      <li className="tracklist-item">
        {props.editing && <DeleteButton model={model} onDelete={props.onDelete} />}
        <PlayButton className="play-button" onPlay={props.onPlay} model={model} />
        <UploadLink className="track-name" model={model} />
        {!props.skipUser && <People.Link model={model.artist} className="track-artist" />}
      </li>
    );
}

module.exports = TrackListItem;

//