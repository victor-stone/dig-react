import React     from 'react';
import qc        from '../models/queryConfigs';
import Glyph     from './Glyph';
import { CloseButton }      from './ActionButtons';
//import { LicenseInfoPopup } from './LicenseInfo';
import Link from './Link';

var LicenseInfoPopup = React.createClass({

  // unfortunately popup is broken from this <ul>
  // not sure why, can't care

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
    return {
        view: { showOptions: false },
        filters: this.filtersFromStore(),
        dirty:   this.props.store.paramsDirty()
      };
  },
  
  componentWillMount: function() {
    this.props.store.on('playlist-loading',this.paramsChanged);
  },

  componentWillUnmount: function() {
    this.props.store.removeListener('playlist-loading',this.paramsChanged);
  },

  paramsChanged: function() {
    var filters = this.filtersFromStore();
    var dirty   = this.props.store.paramsDirty();
    this.setState( { filters, dirty } );
  },

  filtersFromStore: function() {
    var qp = this.props.store.queryParams;
    var filters = {
      limit: qp.limit
    };
    filters.lic = qp.lic || 'all';
    filters.instrumentalOnly = !!qp.reqtags; // stupid, dangerous, awesome
    filters.recent = qp.digrank === qc.recent.digrank;
    return filters;
  },

  handleShowOptions: function(){
    var show = !this.state.view.showOptions;
    this.setState({view: {showOptions: show}});
  },

  onRecent: function() {
    var val = !this.state.filters.recent;
    var recent = val ? qc.recent.digrank : qc.default.digrank;
    this.props.store.applyParams( { digrank: recent, offset: 0 } );
  },

  onInstrumentalOnly: function() {
    var val = !this.state.filters.instrumentalOnly;
    var tags = val ? qc.instrumental.reqtags : '';
    this.props.store.applyParams( { reqtags: tags, offset: 0 });
  },

  onLimit: function() {
    var val = this.refs['limit'].value;
    this.props.store.applyParams( { limit: val, offset: 0 } );
  },

  onLic: function() {
    var val = this.refs['lic'].value;
    this.props.store.applyParams( { lic: val, offset: 0 } );
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
        <label className="form-control" htmlFor="recent">{"recent "}<input onChange={this.onRecent} checked={this.state.filters.recent} type="checkbox" id="recent" /></label>
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