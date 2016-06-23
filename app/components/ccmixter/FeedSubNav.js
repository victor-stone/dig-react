import React            from 'react';
import SubNavTabs       from '../vanilla/SubNavTabs';
import SubNavBar        from '../bound/SubNavBar';
import InlineCSS        from '../vanilla/InlineCSS';
import css              from './style/subnav';
import LinkToRoute      from '../services/LinkToRoute';

import {  CurrentUserTracker } from '../../mixins';


class FeedTabs extends CurrentUserTracker.extender(SubNavTabs)
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
        <InlineCSS css={css} id="feed-subnav-css" />
        <FeedTabs   />
      </SubNavBar>
  );
}

module.exports = FeedSubNav;

//
