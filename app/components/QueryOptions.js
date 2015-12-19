import React     from 'react';
import Glyph     from './Glyph';
import Link      from './Link';
import qc        from '../models/query-configs';

import { CloseButton }    from './ActionButtons';

import { ModelTracker,
          DirtyParamTracker,
          QueryParamTracker 
        } from '../mixins';


  // unfortunately popup is broken from this <ul>
  // not sure why, can't care
  // TODO: care

function LicenseInfoPopup() {
  return <Link href="/licenses" className="lic-help"><Glyph icon="question-circle" /></Link>;
}

const LicenseFilter = React.createClass({

  mixins: [QueryParamTracker,DirtyParamTracker],

  stateFromParams: function(queryParams) {
    return { lic: queryParams.lic };
  },

  onAreParamsDirty: function(queryParams,defaults,isDirty) {
    if( !isDirty.isDirty) {
      isDirty.isDirty = queryParams.lic !== defaults.lic;
    }
  },

  performQuery: function() {
    var lic = this.refs['lic'].value;
    this.props.store.applyHardParams( { lic } );
  },

  render: function() {

    return (
      <div>
        <select id="lic" ref="lic" value={this.state.lic} onChange={this.performQuery} className="form-control" >
          <option value="all">{"all licenses"}</option>
          <option value="open">{"free for commercial use"}</option>
          <option value="ccplus">{"royalty free license"}</option>
        </select>
        <LicenseInfoPopup />
      </div>
      );
  }
});

const SortFilter = React.createClass({ 

  mixins: [QueryParamTracker],

  stateFromParams: function(queryParams) {
    return { digrank: queryParams.digrank};
  },

  performQuery: function() {
    var digrank = this.refs['sort'].value;
    this.props.store.applySoftParams( { digrank } );
  },
  
  render: function() {
    return (
        <select ref="sort" id="sort" value={this.state.digrank} onChange={this.performQuery} className="form-control" >
          <option value={qc.magicSort.digrank}>{"magic sort"}</option>
          <option value={qc.recent.digrank}>{"recent"}</option>
          <option value={qc.alltime.digrank}>{"all time"}</option>
        </select>
      );
  }

});

const ResetOptionsButton = React.createClass({

  mixins: [ModelTracker],

  stateFromStore: function(store) {
    return { dirty: store.paramsDirty() };
  },

  onReset: function() {
    if( this.state.dirty ) {
      this.props.store.applyDefaults();
    }
  },

  render: function() {
    var resetCls = 'reset-options btn btn-warning btn-sm' + (this.state.dirty ? '' : ' disabled');

    return <button onClick={this.onReset} className={resetCls}><Glyph icon="power-off" />{" reset"}</button>;
  }

});

function OptionsWrap(props) {
  return <ul className="query-options-elements">{props.children}</ul>;
}

const QueryOptionsBox = React.createClass({

  getDefaultProps: function() {
    return { 
      handleShowOptions: this.noop,
       show: true 
     };
  },

  noop: function() {

  },

  render: function() {
    var cls  = 'query-options ' + (this.props.show ? 'open' : 'hidden');

    return (
        <ul className={cls}>
          <li className="btn-primary title" onClick={this.props.handleShowOptions} >
            <Glyph icon="gear" />{" filters"}
            <CloseButton onClick={this.handleShowOptions} />
          </li>
          <li>{this.props.children}</li>
          <li>
            <ResetOptionsButton store={this.props.store} />
          </li>
        </ul>
      );
  }
});

const QueryOptions = React.createClass({

  mixins: [ModelTracker],

  handleShowOptions: function(){
    var showOptions = !this.state.showOptions;
    this.setState( { showOptions } );
  },

  stateFromStore: function(store) {
    var dirty = store.supportsOptions && store.paramsDirty();
    return { dirty };
  },

  render: function() {

    if( !this.props.store.supportsOptions ) {
      return null;
    }
    
    var showP       = this.state.showOptions || false;
    var buttonColor = this.state.dirty ? { color: 'yellow' } : {};
    var cls         = 'hidden-xs hidden-sm query-options-box' + (showP ? ' open' : '' );
    var cls3        = 'btn btn-primary' + (showP ? ' hidden' : '');

    return (
      <div className={cls}>
        <QueryOptionsBox show={showP} store={this.props.store} handleShowOptions={this.handleShowOptions}>
          {this.props.children}
        </QueryOptionsBox>
        <button className={cls3} style={buttonColor} onClick={this.handleShowOptions} ><Glyph icon="gear" />{" filters"}</button>
      </div>
    );
  }

});

module.exports = {
  QueryOptions,
  QueryOptionsBox,
  ResetOptionsButton,
  LicenseInfoPopup,
  LicenseFilter,
  OptionsWrap,
  SortFilter
};
