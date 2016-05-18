import React            from 'react';
import SubNav           from '../SubNav';
import InlineCSS        from '../InlineCSS';
import css              from './style/subnav';
import lookup           from '../../services';
import { CurrentUserTracker,
         ModelTracker } from '../../mixins';

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
        <SubNav {...props}>
          <InlineCSS css={css} id="feed-subnav-css" />
          <FeedTabs store={props.store}  />
        </SubNav>
    );
  }
});

module.exports = FeedSubNav;

//
