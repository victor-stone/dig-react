import React            from 'react';
import SubNavTabs       from '../vanilla/sub-nav-tabs';
import SubNavBar        from '../bound/sub-nav-bar';
import InlineCss        from '../vanilla/inline-css';
import css              from './style/subnav';
import LinkToRoute      from '../services/link-to-route';

import {  CurrentUserTracker } from '../../mixins';


class FeedTabs extends CurrentUserTracker(SubNavTabs)
{
  constructor() {
    super(...arguments);
  }

  get tabs() { 
    var tabs = {
      '/feed': 'site'
    };
    const { user: { id, name } = {}} = this.state;
    if( id ) {
      tabs['/feed/' +  id] = name;
      tabs['/feed/' +  id + '/following'] = 'following';
    }
    return tabs;    
  }

  get tab() {
    return this.props.tab;
  }

  checkActive(tab) {
    return tab === document.location.pathname;
  }


  onTab(tab) {
    LinkToRoute.navigateTo(tab);
  }
}

function FeedSubNav(props)
{
  return (
      <SubNavBar {...props} >
        <InlineCss css={css} id="feed-subnav-css" />
        <FeedTabs   />
      </SubNavBar>
  );
}

module.exports = FeedSubNav;

//
