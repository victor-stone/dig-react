import React            from 'react';
import SubNav           from '../SubNav';
import InlineCSS        from '../InlineCSS';
import css              from './style/subnav';
import lookup           from '../../services';
import { CurrentUserTracker } from '../../mixins';


var FeedTabs = React.createClass({

  mixins: [ CurrentUserTracker, SubNav.TabsMixin ],

  getDefaultProps() { 
    return { checkActive: function(tab) {
                  return tab === document.location.pathname;
                },
             allowEmptyBadges: true }; 
  },

  getInitialState() {
    return { tab: '#' };
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
        <SubNav {...props} >
          <InlineCSS css={css} id="feed-subnav-css" />
          <FeedTabs store={props.store}  />
        </SubNav>
    );
  }
});

module.exports = FeedSubNav;

//
