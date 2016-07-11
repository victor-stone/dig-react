import React     from 'react';
import Link      from './services/LinkToRoute';
import qc        from '../models/query-configs';

import { CloseButton,
         Glyph }       from './vanilla';

import { ModelTracker,
          QueryParamTracker 
        } from '../mixins';


  // unfortunately popup is broken from this <ul>
  // not sure why, can't care
  // TODO: care

function LicenseInfoPopup() {
  return <Link href="/licenses" className="lic-help"><Glyph icon="question-circle" /></Link>;
}

class LicenseFilter extends QueryParamTracker(React.Component)
{
  constructor() {
    super(...arguments);
    this.performQuery = this.performQuery.bind(this);
  }

  stateFromParams(queryParams) {
    return { lic: queryParams.lic };
  }

  onAreParamsDirty(queryParams,defaults,isDirty) {
    if( !isDirty.isDirty) {
      isDirty.isDirty = queryParams.lic !== defaults.lic;
    }
  }

  performQuery() {
    var lic = this.refs['lic'].value;
    this.props.store.refreshModel( { lic } );
  }

  render() {

    var ccPlusFilter = this.props.ccPlusFilter || 'ccplus';

    return (
      <div>
        <select id="lic" ref="lic" value={this.state.lic} onChange={this.performQuery} className="form-control" >
          <option value="all">{"all licenses"}</option>
          <option value="open">{"free for commercial use"}</option>
          <option value={ccPlusFilter}>{"royalty free ccPlus license"}</option>
        </select>
        <LicenseInfoPopup />
      </div>
      );
  }
}

class SortFilterWrap extends QueryParamTracker(React.Component)
{
  constructor() {
    super(...arguments);
    this.performQuery = this.performQuery.bind(this);
  }

  stateFromParams(queryParams) {
    return { digrank: queryParams.digrank};
  }

  performQuery() {
    var digrank = this.refs['sort'].value;
    this.props.store.refresh( { digrank } );
  }
  
  render() {
    return (
        <select ref="sort" id="sort" value={this.state.digrank} onChange={this.performQuery} className="form-control" >
          {this.props.children}
        </select>
      );
  }

}

function SortFilter(props) {
  return (
      <SortFilterWrap {...props}>
          <option value={qc.magicSort.digrank}>{"magic sort"}</option>
          <option value={qc.recent.digrank}>{"recent"}</option>
          <option value={qc.alltime.digrank}>{"all time"}</option>
          <option value={qc.latest.digrank}>{"latest"}</option>
      </SortFilterWrap>
    );
}


class ResetOptionsButton extends ModelTracker(React.Component)
{
  constructor() {
    super(...arguments);
    this.onReset = this.onReset.bind(this);
  }

  stateFromStore(store) {
    return { dirty: store.paramsDirty() };
  }

  onReset() {
    if( this.state.dirty ) {
      this.props.store.applyDefaults();
    }
  }

  render() {
    var resetCls = 'reset-options btn btn-warning btn-sm' + (this.state.dirty ? '' : ' disabled');

    return <button onClick={this.onReset} className={resetCls}><Glyph icon="power-off" />{" reset"}</button>;
  }

}

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
            {this.props.handleShowOptions
              ? <CloseButton onClick={this.handleShowOptions} />
              : null
            }
          </li>
          <li>{this.props.children}</li>
          <li>
            <ResetOptionsButton store={this.props.store} />
          </li>
        </ul>
      );
  }
});

function QueryOptionsPanel(props)
{
    return (
      <div className="query-options-box open">
        <QueryOptionsBox store={props.store} >
          {props.children}
        </QueryOptionsBox>
      </div>
    );
}

class QueryOptions extends ModelTracker(React.Component)
{
  constructor() {
    super(...arguments);
    this.onShowOptions = this.onShowOptions.bind(this);
  }
  
  onShowOptions(){
    var showOptions = !this.state.showOptions;
    this.setState( { showOptions } );
  }

  stateFromStore(store) {
    var dirty = store.supportsOptions && store.paramsDirty();
    return { dirty };
  }

  render() {

    if( !this.props.store.supportsOptions ) {
      return null;
    }
    
    var showP       = this.state.showOptions || false;
    var buttonColor = this.state.dirty ? { color: 'yellow' } : {};
    var cls         = 'hidden-xs hidden-sm query-options-box' + (showP ? ' open' : '' );
    var cls3        = 'btn btn-primary' + (showP ? ' hidden' : '');

    return (
      <div className={cls}>
        <QueryOptionsBox show={showP} store={this.props.store} handleShowOptions={this.onShowOptions}>
          {this.props.children}
        </QueryOptionsBox>
        <button className={cls3} style={buttonColor} onClick={this.onShowOptions} ><Glyph icon="gear" />{" filters"}</button>
      </div>
    );
  }

}

module.exports = {
  QueryOptions,
  QueryOptionsBox,
  QueryOptionsPanel,
  ResetOptionsButton,
  LicenseInfoPopup,
  LicenseFilter,
  OptionsWrap,
  SortFilter,
  SortFilterWrap
};
