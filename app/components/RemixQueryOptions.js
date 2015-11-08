import React     from 'react';
import qc        from '../models/query-configs';
import Glyph     from './Glyph';

import { LicenseInfoPopup,
         ResetOptionsButton } from './QueryOptions';
import { CloseButton }        from './ActionButtons';
import { TagString }          from '../unicorns';
import PlaylistUpdater        from '../mixins/playlist-updater';


const RemixQueryOptions = React.createClass({

  mixins: [PlaylistUpdater],

  stateFromStore: function(store) {
    var filters = this.filtersFromStore(store);
    var dirty   = store.paramsDirty();
    return { filters, dirty };
  },

  filtersFromStore: function(store) {
    var qp = store.model.queryParams;
    var filters = {
      limit: qp.limit
    };
    filters.lic              = qp.lic || 'all';
    filters.instrumentalOnly = TagString.contains(qp.reqtags,qc.instrumental.reqtags);
    filters.sort             = qp.digrank || qc.recent.digrank;
    return filters;
  },

  onSort: function() {
    var digrank = this.refs['sort'].value;
    this.props.store.applyParams( { digrank, offset: 0 } );
  },

  onInstrumentalOnly: function() {
    var val    = !this.state.filters.instrumentalOnly;
    var key    = (val ? '' : '--') + 'reqtags';
    var params = { offset: 0 };
    params[key] = qc.instrumental.reqtags;
    this.props.store.applyParams( params );
  },

  onLimit: function() {
    var limit = this.refs['limit'].value;
    this.props.store.applyParams( { limit, offset: 0 } );
  },

  onLic: function() {
    var lic = this.refs['lic'].value;
    this.props.store.applyParams( { lic, offset: 0 } );
  },

  render: function() {

    var hso = this.props.handleShowOptions;

    return ( <ul>
      <li className="btn-primary title" onClick={hso} >
        <Glyph icon="gear" />{" filters"}
        <CloseButton onClick={hso} />
      </li>
      <li>
        <select id="lic" ref="lic" value={this.state.filters.lic} onChange={this.onLic} className="form-control" >
          <option value="all">{"all licenses"}</option>
          <option value="open">{"free for commercial use"}</option>
          <option value="ccplus">{"royalty free license"}</option>
        </select>
        <LicenseInfoPopup />
      </li>
      <li>
        <select id="sort" ref="sort" value={this.state.filters.sort} onChange={this.onSort} className="form-control" >
          <option value={qc.magicSort.digrank}>{"magic sort"}</option>
          <option value={qc.recent.digrank}>{"recent"}</option>
          <option value={qc.alltime.digrank}>{"all time"}</option>
        </select>
      </li>
      <li>
        <label className="form-control" htmlFor="instrumentalOnly">{"instrumental only "}<input onChange={this.onInstrumentalOnly} checked={this.state.filters.instrumentalOnly} type="checkbox" id="instrumentalOnly" /></label>
      </li>
      <li>
        <label className="form-control">{"display "}
          <select id="limit" ref="limit" value={this.state.filters.limit} onChange={this.onLimit} className="form-control" >
            <option>{"10"}</option>
            <option>{"20"}</option>
            <option>{"50"}</option>
          </select>
        </label>
      </li>
      <li>
        <ResetOptionsButton store={this.props.store} />
      </li>
    </ul>
    );
  },
});
  
module.exports = RemixQueryOptions;