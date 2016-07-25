import React              from 'react';
import TrackListSorting   from '../models/track-list-sorting';
import { ModelTracker }   from '../../mixins';

/*
  Display a static list of tracks, no links, no
  actions possible, etc.
*/

class TrackListPreview extends ModelTracker(React.Component)
{

  render() {
    const { model } = this.state.store;

    const sorting = false;

    // Take advantage of TrackListSorting static-ness but
    // without the sorting glyphs etc.

    return <TrackListSorting {...this.props} model={model} sorting={sorting} />;

  }
}

module.exports = TrackListPreview;

//