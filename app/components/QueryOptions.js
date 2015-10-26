import React     from 'react';
import qc        from '../models/queryConfigs';
import Glyph     from './Glyph';

const QueryOptions = React.createClass({

  getInitialState: function() {
    return {
        view: { showOptions: false },
        filters: this.filtersFromStore()
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
    this.setState( { filters } );
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
    this.props.store.applyParams( { digrank: recent } );
  },

  onInstrumentalOnly: function() {
    var val = !this.state.filters.instrumentalOnly;
    var tags = val ? qc.instrumental.reqtags : '';
    this.props.store.applyParams( { reqtags: tags });
  },

  onLimit: function() {
    var val = this.refs['limit'].value;
    this.props.store.applyParams( { limit: val } );
  },

  onLic: function() {
    var val = this.refs['lic'].value;
    this.props.store.applyParams( { lic: val } );
  },

  genOptions: function() {
    return ( <ul>
      <li>
        <select ref="lic" value={this.state.filters.lic} onChange={this.onLic} className="form-control" >
          <option value="all">{"all licenses"}</option>
          <option value="open">{"free for commercial use"}</option>
          <option value="ccplus">{"royalty free license"}</option>
        </select>
      </li>
      <li>
        <label className="btn btn-info" htmlFor="recent">{"recent "}<input onChange={this.onRecent} checked={this.state.filters.recent} type="checkbox" id="recent" /></label>
      </li>
      <li>
        <label className="btn btn-info" htmlFor="instrumentalOnly">{"instrumental only "}<input onChange={this.onInstrumentalOnly} checked={this.state.filters.instrumentalOnly} type="checkbox" id="instrumentalOnly" /></label>
      </li>
      <li>
        <label>{"display"}</label>
        <select id="limit" ref="limit" value={this.state.filters.limit} onChange={this.onLimit} className="form-control" >
          <option>{"10"}</option>
          <option>{"20"}</option>
          <option>{"50"}</option>
        </select>
      </li>
    </ul>
 );
  },

  render: function() {

    var popup = this.state.view.showOptions ? this.genOptions() : null;
    var cls   = 'filter-box' + (this.state.view.showOptions ? ' open' : '' );

    return (
      <div className={cls}>
        <button className="btn btn-primary" onClick={this.handleShowOptions} ><Glyph icon="gear" />{" filters"}</button>
        {popup}
      </div>
    );
  }

});

module.exports = QueryOptions;