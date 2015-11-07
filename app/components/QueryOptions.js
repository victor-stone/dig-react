import React     from 'react';
import qc        from '../models/query-configs';
import Glyph     from './Glyph';
import Link      from './Link';

import { TagString }   from '../unicorns';
import { CloseButton } from './ActionButtons';

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

const ResetOptionsButton = React.createClass({

  getInitialState: function() {
    return {
        dirty: this.props.store.paramsDirty()
      };
  },

  componentWillMount: function() {
    this.props.store.on('playlist-loading',this.paramsChanged);
  },

  componentWillUnmount: function() {
    this.props.store.removeListener('playlist-loading',this.paramsChanged);
  },

  paramsChanged: function() {
    var dirty = this.props.store.paramsDirty();
    this.setState( { dirty } );
  },

  onReset: function() {
    if( this.state.dirty ) {
      this.props.store.applyOriginalParams();
    }
  },

  render: function() {
    var resetCls = 'btn btn-warning btn-sm' + (this.state.dirty ? '' : ' disabled');

    return <button onClick={this.onReset} className={resetCls}><Glyph icon="power-off" />{" reset"}</button>;
  }

});

const QueryOptions = React.createClass({

  getInitialState: function() {
    if( !this.props.store.paramsDirty ) {
      return { filterSupport: false };
    }
    return {
        filterSupport: true,
        view: { showOptions: false },
        filters: this.filtersFromStore(),
        dirty:   this.props.store.paramsDirty()
      };
  },
  
  componentWillMount: function() {
    this.props.store.on('playlist',this.paramsChanged);
  },

  componentWillUnmount: function() {
    this.props.store.removeListener('playlist',this.paramsChanged);
  },

  paramsChanged: function() {
    var filters = this.filtersFromStore();
    var dirty   = this.props.store.paramsDirty();
    this.setState( { filters, dirty } );
  },

  filtersFromStore: function() {
    var qp = this.props.store.model.queryParams;
    var filters = {
      limit: qp.limit
    };
    filters.lic              = qp.lic || 'all';
    filters.instrumentalOnly = TagString.contains(qp.reqtags,qc.instrumental.reqtags);
    filters.sort             = qp.digrank || qc.recent.digrank;
    return filters;
  },

  handleShowOptions: function(){
    var showOptions = !this.state.view.showOptions;
    this.setState({view: {showOptions}});
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

  genOptions: function() {

    return ( <ul>
      <li className="btn-primary title" onClick={this.handleShowOptions} >
        <Glyph icon="gear" />{" filters"}
        <CloseButton onClick={this.handleShowOptions} />
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

  render: function() {

    if( !this.state.filterSupport ) {
      return null;
    }
    
    var showP       = this.state.view.showOptions;
    var popup       = showP ? this.genOptions() : null;
    var cls         = 'hidden-xs hidden-sm filter-box' + (showP ? ' open' : '' );
    var buttonColor = this.state.dirty ? { color: 'yellow' } : {};

    return (
      <div className={cls}>
        {showP 
          ? popup 
          : <button className="btn btn-primary" style={buttonColor} onClick={this.handleShowOptions} ><Glyph icon="gear" />{" filters"}</button>
        }
      </div>
    );
  }

});

QueryOptions.ResetOptionsButton = ResetOptionsButton;

module.exports = QueryOptions;