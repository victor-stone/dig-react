import React     from 'react';
import qc        from '../models/query-configs';
import { TagString } from '../unicorns';

import { QueryParamTracker,
         DirtyParamTracker }  from '../mixins';

const InstrumentalOnlyFilter = React.createClass({

  mixins: [ QueryParamTracker, DirtyParamTracker ],

  stateFromParams: function(queryParams) {
    return { toggle: queryParams.reqtags.includes('instrumental') };
  },

  onAreParamsDirty: function(queryParams,defaults,isDirty) {
    if( !isDirty.isDirty) {
      var wants = defaults.reqtags.includes('instrumental');
      isDirty.isDirty = wants !== queryParams.reqtags.includes('instrumental');
    }
  },

  performQuery: function() {
    var val  = !this.state.toggle;
    var tags = this.props.store.model.queryParams.reqtags;
    var reqtags = (new TagString(tags)).toggle( qc.instrumental.reqtags, val).toString();
    this.props.store.refreshHard( { reqtags } );
  },

  render: function() {
    return (
        <label className="form-control" htmlFor="instrumentalOnly">{"instrumental only "}<input onChange={this.performQuery} checked={this.state.toggle} ref="instrumentalOnly" type="checkbox" id="instrumentalOnly" /></label>
      );
  }
});

 
module.exports = InstrumentalOnlyFilter;

