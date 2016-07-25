import React              from 'react';
import TrackListItem      from './track-list-item';

/*
  Display a list of Upload record, optionally with delete buttons
  for playlist owner.

  props
    model     - object   from [stores/uploads].model (assumed to have item[])
    editing   - boolean  true means display editing controls 
    skipUser  - boolean  true means do NOT dispay artist link

  sourced events
    onDelete(model)  - user clicked on 'delete' button
    onPlay(model)    - user clicked on 'play' button 
*/

function TrackList(props)
{
  return (
    <ul className="track-list">
     {props.model.items.map( t => <TrackListItem key={t.id} {...props} model={t} /> )}
    </ul>
  );
}

module.exports = TrackList;

//