import React     from 'react';
import Glyph     from './Glyph';
import Link      from './Link';
import qc        from '../models/query-configs';
import env       from '../services/env';

import { oassign }        from '../unicorns';
import { PlaylistUpdater,
         QueryParamEnum } from '../mixins';

var LicenseInfoPopup = React.createClass({

  // unfortunately popup is broken from this <ul>
  // not sure why, can't care
  // TODO: care

  render: function() {
    return(
        <Link href="/licenses"><Glyph icon="question-circle" /></Link>
      );
  }
});

const LicenseFilter = React.createClass({

  mixins: [QueryParamEnum],

  queryParam: {
    name: 'lic',
    initValue: qc.default.lic,
  },

  render: function() {

    return (
      <div>
        <select id="lic" ref={this.queryParam.name} value={this.state[this.queryParam.name]} onChange={this.performQuery} className="form-control" >
          <option value="all">{"all licenses"}</option>
          <option value="open">{"free for commercial use"}</option>
          <option value="ccplus">{"royalty free license"}</option>
        </select>
        <LicenseInfoPopup />
      </div>
      );
  }
});

const LimitFilter = React.createClass({

  mixins: [QueryParamEnum],

  queryParam: {
    name: 'limit',
    initValue: qc.default.limit,
  },

  render: function() {

    return (
        <label className="form-control">{"display "}
          <select id="limit" ref={this.queryParam.name} value={this.state[this.queryParam.name]} onChange={this.performQuery} className="form-control" >
            <option>{"10"}</option>
            <option>{"20"}</option>
            <option>{"40"}</option>
          </select>
        </label>
      );    
  }

});

const SortFilter = React.createClass({

  mixins: [QueryParamEnum],

  queryParam: {
    name: 'digrank',
    initValue: qc.default.digrank,
  },
  
  render: function() {
    return (
        <select id="sort" ref={this.queryParam.name} value={this.state[this.queryParam.name]} onChange={this.performQuery} className="form-control" >
          <option value={qc.magicSort.digrank}>{"magic sort"}</option>
          <option value={qc.recent.digrank}>{"recent"}</option>
          <option value={qc.alltime.digrank}>{"all time"}</option>
        </select>
      );
  }

});

const ResetOptionsButton = React.createClass({

  mixins: [PlaylistUpdater],

  stateFromStore: function(store) {
    return { dirty: store.paramsDirty() };
  },

  onReset: function() {
    if( this.state.dirty ) {
      this.props.store.performClean();
    }
  },

  render: function() {
    var resetCls = 'btn btn-warning btn-sm' + (this.state.dirty ? '' : ' disabled');

    return <button onClick={this.onReset} className={resetCls}><Glyph icon="power-off" />{" reset"}</button>;
  }

});

const QueryOptions = React.createClass({

  mixins: [PlaylistUpdater],

  handleShowOptions: function(){
    var showOptions = !this.state.showOptions;
    this.setState( { showOptions } );
  },

  genOptions: function() {
    var props = oassign( { handleShowOptions: this.handleShowOptions }, this.props);
    return React.createElement( env.AppQueryOptions, props );
  },

  stateFromStore: function(store) {
    var dirty = this.storeSupportsOptions() && store.paramsDirty();
    return { dirty };
  },

  render: function() {

    if( !this.storeSupportsOptions() ) {
      return null;
    }
    
    var showP       = this.state.showOptions;
    var popup       = this.genOptions(showP);
    var cls         = 'hidden-xs hidden-sm filter-box' + (showP ? ' open' : '' );
    var buttonColor = this.state.dirty ? { color: 'yellow' } : {};
    var cls2        = showP ? '' : 'hidden';
    var cls3        = 'btn btn-primary' + (showP ? ' hidden' : '');

    return (
      <div className={cls}>
        <div className={cls2}>{popup}</div>
        <button className={cls3} style={buttonColor} onClick={this.handleShowOptions} ><Glyph icon="gear" />{" filters"}</button>
      </div>
    );
  }

});

QueryOptions.ResetOptionsButton = ResetOptionsButton;
QueryOptions.LicenseInfoPopup   = LicenseInfoPopup;
QueryOptions.LicenseFilter      = LicenseFilter;
QueryOptions.LimitFilter        = LimitFilter;
QueryOptions.SortFilter         = SortFilter;

module.exports = QueryOptions;