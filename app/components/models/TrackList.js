import React              from 'react';
import TrackListItem      from './TrackListItem';

/*
  Display a list of Upload reacords

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
     {props.model.items.map( t => <TrackListItem key={t.id} model={t} {...this.props} /> )}
    </ul>
  );
}

module.exports = TrackList;

//