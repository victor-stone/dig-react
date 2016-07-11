import React         from 'react';
import qc            from '../models/query-configs';
import { TagString } from '../unicorns';

import { QueryParamTracker }  from '../mixins';

class InstrumentalOnlyFilter extends QueryParamTracker(React.Component)
{
  constructor() {
    super(...arguments);
    this.performQuery = this.performQuery.bind(this);
  }

  stateFromParams(queryParams) {
    return { toggle: queryParams.reqtags.includes('instrumental') };
  }

  onAreParamsDirty(queryParams,defaults,isDirty) {
    if( !isDirty.isDirty) {
      var wants = defaults.reqtags.includes('instrumental');
      isDirty.isDirty = wants !== queryParams.reqtags.includes('instrumental');
    }
  }

  performQuery() {
    var val  = !this.state.toggle;
    var tags = this.props.store.model.queryParams.reqtags;
    var reqtags = (new TagString(tags)).toggle( qc.instrumental.reqtags, val).toString();
    this.props.store.refreshModel( { reqtags } );
  }

  render() {
    return (
        <label className="form-control" htmlFor="instrumentalOnly">{"instrumental only "}<input onChange={this.performQuery} checked={this.state.toggle} ref="instrumentalOnly" type="checkbox" id="instrumentalOnly" /></label>
      );
  }
}

 
module.exports = InstrumentalOnlyFilter;

