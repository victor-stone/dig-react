import React            from 'react';
import { safeSetState } from '../../unicorns';
import Tracklist        from '../models/TrackList';
import TrackListSorting from '../models/TrackListSorting';
import { FormControl }  from '../vanilla/Form';

import ToggleEditModeProperty from './controls/ToggleEditMode';

import OrderProperty  from '../../models/properties/order';

function EditWrapper(props) {
    return (<FormControl className="track-sort-control">
              <TrackListSorting model={props.model} sorting onUpdate={props.onUpdate} id="tracks" />
            </FormControl>);
}

class OrderedTrackListProperty extends ToggleEditModeProperty
{
  constructor() {
    super(...arguments);
    safeSetState( this, { sortkey: '' } );
    this.props.store.model.tracks.onModelUpdated( this.onTracksUpdated.bind(this) );
  }

  onTracksUpdated() {
    if( !this.state.editing ) {
      this.forceUpdate();
    }
  }
  
  onSortUpdate(sortkeys) {
    this.setState({sortkeys});
  }

  onDone() {
    this.property.value = this.state.sortkeys;
  }

  get editableElement() {
    return { Element: EditWrapper, 
             props:   { model: this.tracksModel, 
                        onUpdate: this.onSortUpdate.bind(this) 
                      } 
            };
  }

  get staticElement() {
    
    // this.props.canEdit := this playlist is not dynamic so tracks can be deleted
    // this.canEdit       := the current user has permission to do that
    
    return { Element: Tracklist,
             props:   Object.assign( {}, this.props, { model: this.tracksModel,
                                                       editing: this.props.canEdit && this.canEdit })
           };
  }

  get tracksModel() {
    return this.props.store.model.tracks.model;
  }

  get title() {
    return this.state.editing ? 'sort' : '';
  }
}

OrderedTrackListProperty.defaultProps = { 
    property: OrderProperty,
    noTitle: true
};

module.exports = OrderedTrackListProperty;

//