import React          from 'react';
import {ModelTracker} from '../../mixins';
import TrackList      from '../models/TrackList';

/*
  Display a list of Upload records. Tracks changes to store.

  props
    store     - object   from [stores/uploads] assumes .model.items[]
    editing   - boolean  true means display editing controls 
    skipUser  - boolean  true means do NOT dispay artist link

  sourced events
    onDelete(model)  - user clicked on 'delete' button
    onPlay(model)    - user clicked on 'play' button 
*/

class BoundTrackList extends ModelTracker.extender(React.Component)
{
  render() {
    <TrackList {...this.props} model={this.state.store.model} />;
  }
}

module.exports = BoundTrackList;

//