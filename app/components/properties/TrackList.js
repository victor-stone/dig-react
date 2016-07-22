import React            from 'react';
import Tracklist        from '../models/TrackList';
import TrackListSorting from '../models/TrackListSorting';

import ToggleEditModeProperty from './controls/ToggleEditMode';

import OrderProperty  from '../../models/properties/order';


class OrderedTrackListProperty extends ToggleEditModeProperty
{
  get editableElement() {

    const { model } = this.props.store;
    
    return <TrackListSorting model={model} sorting id="tracks" />;
  }

  get staticFieldElement() {
    
    const { store:{model} } = this.props;
    
    // this.props.canEdit := this playlist is not dynamic so tracks can be deleted
    // this.canEdit       := the current user has permission to do that
    
    return <Tracklist {...this.props} model={model} editing={this.props.canEdit && this.canEdit} />;
  }
}

OrderedTrackListProperty.defaultProps = { 
    property: OrderProperty,
    noTitle: true
};

module.exports = OrderedTrackListProperty;

//