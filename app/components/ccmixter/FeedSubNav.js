import React            from 'react';
import SubNav           from '../SubNav';
import InlineCSS        from '../InlineCSS';
import css              from './style/subnav';
import lookup           from '../../services';
import { CurrentUserTracker,
         QueryParamTracker,
         DirtyParamTracker,
         DefaultParamTracker,
         ModelTracker } from '../../mixins';

const UnseenFilter = React.createClass({

  mixins: [QueryParamTracker, DirtyParamTracker, DefaultParamTracker],

  stateFromParams: function(queryParams) {
    var toggle = queryParams.unseen === '1';
    return { toggle };
  },

  onAreParamsDirty: function(queryParams,defaults,isDirty) {
    if( !isDirty.isDirty) {
      isDirty.isDirty = queryParams.unseen === '1';
    }
  },

  onGetParamsDefault: function(queryParams) {
    queryParams.unseen = '1';
  },

  performQuery: function() {
    this.refreshHard( { unseen: !this.state.toggle ? '1' : '0' });
  },

  render: function() {
    return (
        <label className="form-control input-sm" htmlFor="unseen">{"hide seen items "}<input onChange={this.performQuery} checked={this.state.toggle} type="checkbox" id="unseen" /></label>
      );
  }
});

const FeedOptions = React.createClass({

  render() {
    return (
      <form className="ffeed-query-options form-inline navbar-search pull-right">
      <div className="form-group form-group-sm">
        <UnseenFilter store={this.props.store} />
      </div>
      </form>
    );
  }

});

var FeedTabs = React.createClass({

  mixins: [ CurrentUserTracker, SubNav.TabsMixin, ModelTracker ],

  getDefaultProps() { 
    return { checkActive: function(tab) {
                  return tab === document.location.pathname;
                },
             allowEmptyBadges: true }; 
  },

  getInitialState() {
    return { tab: '#' };
  },

  stateFromStore(store) {
    var okToCheck = this.state && ('userLoading' in this.state) && !this.state.userLoading;
    if( okToCheck ) {      
      this.getBadges(store,this.state.user);
    }
    return { store };
  },

  stateFromUser(user) {
    var store = this.state && this.state.store;
    if( store ) {
      this.getBadges(store,user);
    }
    return { user };
  },

  getBadges(store,user) {
    store.getUnSeenCounts( Object.keys(this.tabs(user)), user && user.id )
      .then( badges => this.setState( {badges} ) );
  },

  tabs(user) {
    var tabs = {
      '/feed': 'site'
    };
    var u = user || this.state.user;
    if( u) {
      tabs['/feed/' +  u.id] = u.name;
    }
    return tabs;    
  },

  onTab(tab) {
    lookup('router').navigateTo(tab);
  }

});

var FeedSubNav = React.createClass({

  render() {
    if( global.IS_SERVER_REQUEST ) {
      return null;
    }
    var props = this.props;
    return (
        <SubNav {...props} options={FeedOptions}>
          <InlineCSS css={css} id="feed-subnav-css" />
          <FeedTabs store={props.store}  />
        </SubNav>
    );
  }
});

module.exports = FeedSubNav;

//
