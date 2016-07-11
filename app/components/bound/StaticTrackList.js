import React            from 'react';
import { ModelTracker } from '../../mixins';
import StaticTrackList  from '../models/StaticTrackList';

/*
  Display a "static" playlist - that means no links or 'play' buttons.

  HOWEVER you do have the option to allow sorting of the list. 

  props -
    store    - object from [stores/uploads] assumes model.items[]
    sortable - boolean yes, means show dragging glyphs and allow for 
               jQueryUI 'sortable' to kick in
*/

class BoundStaticTrackList extends ModelTracker(React.Component)
{
  render() {
    return <StaticTrackList model={this.state.store.model} sortable={this.props.sortable} />;
  }

}

module.exports = BoundStaticTrackList;