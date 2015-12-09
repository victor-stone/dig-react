import React     from 'react';
import qc        from '../../models/query-configs';
import { TagString } from '../../unicorns';
import { LicenseFilter,
         SortFilter,
         QueryOptions,
         OptionsWrap }    from '../QueryOptions';
         
import { QueryParamTracker,
         DirtyParamTracker }  from '../../mixins';

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
    this.props.store.applyHardParams( { reqtags } );
  },

  render: function() {
    return (
        <label className="form-control" htmlFor="instrumentalOnly">{"instrumental only "}<input onChange={this.performQuery} checked={this.state.toggle} ref="instrumentalOnly" type="checkbox" id="instrumentalOnly" /></label>
      );
  }
});

const _RemixQueryOptions = React.createClass({

  render: function() {
    
    var store = this.props.store;

    return ( 
        <OptionsWrap>
          <li>
            <LicenseFilter store={store} />
          </li>
          <li>
            <SortFilter store={store} />
          </li>
          <li>
            <InstrumentalOnlyFilter store={store} />
          </li>
      </OptionsWrap>
    );
  },
});

function RemixQueryOptions(props) {
  return ( <QueryOptions store={props.store}>
              <_RemixQueryOptions store={props.store} />
          </QueryOptions> );
}

module.exports = RemixQueryOptions;

