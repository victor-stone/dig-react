import React         from 'react';
import css           from './style/subnav';
import InlineCSS     from './InlineCSS';
import Paging        from './Paging';
import lookup        from '../services';
import { ModelTracker } from '../mixins';
import { TagString,
         oassign }      from '../unicorns';

var SubNavTabsMixin = {

  onSelect(tab) {
    return (e) => {
      e.stopPropagation();
      e.preventDefault();
      this.onTab(tab);
    };
  },

  checkActive(tab) {
    return tab === this.state.tab ? 'active' : '';
  },

  render() {

    var tabs = this.tabs();
    var badges = this.state.badges;

    return (
      <ul className="nav nav-tabs subnav-tabs">
      {Object.keys(tabs).map( t => {
        if( badges && !badges[t] ) {
          return null;
        }
        return (
          <li key={t} className={this.checkActive(t)} >
            <a href="#" onClick={this.onSelect(t)}>
              {tabs[t]}
              {badges
                ? <span className="badge">{badges[t]}</span>
                : null
              }
            </a>
          </li>
          );
      })}
      </ul>
      );
  }
};

var FilterNavTabs = React.createClass({

  mixins: [ ModelTracker, SubNavTabsMixin ],

  tabs() { 
    return oassign( this.props.all ? { all: 'all' } : {}, this.props.tabs ); 
  },

  stateFromStore: function(store) {
    var badges = store.model.totals;
    var tags   = store.model.queryParams.reqtags;
    var tab    = (new TagString(tags)).filter(this.props.filter).toString() || 'all';
    return { badges, tab };
  },

  onTab(filter) {
    var tag     = filter === 'all' ? '' : filter;
    var qptags  = this.props.store.queryParams.reqtags;
    var reqtags = qptags.replace( this.state.tab, tag ).toString();
    this.props.store.refreshHard( { reqtags } );    
  }
});

var UrlNavTabs = React.createClass({

  mixins: [SubNavTabsMixin],

  getInitialState() {
    return { tab: this.props.urlForTab(this.props.tab) };
  },

  tabs() {
    return this.props.tabs;
  },

  onTab(tab) {
    lookup('router').navigateTo(tab);
  }

});

var SubNav = React.createClass({

  render() {
    var cls = 'subnav-option-bar ' + (this.props.className || '');
    return(
      <div className={cls}>
        <InlineCSS css={css} id="subnav-option-bar-css" />
        {this.props.paging
          ? <Paging {...this.props} disableBumping />
          : null
        }        
        {this.props.children}
      </div>
      );
  }
});

SubNav.TabsMixin     = SubNavTabsMixin;
SubNav.UrlTabs       = UrlNavTabs;
SubNav.FilterTabs    = FilterNavTabs;

module.exports = SubNav;

//
