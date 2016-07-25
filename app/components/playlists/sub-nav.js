import React        from 'react';
import SubNavBar    from '../bound/sub-nav-bar';
import UrlNavTabs   from '../services/url-nav-tabs';
import InlineCss    from '../vanilla/inline-css';
import { bgColor }  from './style/browse';
import css          from './style/subnav';

const PLAYLIST_TABS = {
  '/playlists/featured': 'featured',
  '/playlists/browse': 'browse',
  '/playlists/curators': 'curators'
};

function UrlForTab(tab) {
  return '/playlists/' + tab;
}

function SubNavPlaylists(props)
{
  return (
    <SubNavBar paging={props.paging}  store={props.store} >
      <InlineCss css={bgColor + css}  id="playlists-subnav-css"/>
      <UrlNavTabs store={props.store} tab={props.tab} tabs={PLAYLIST_TABS} urlForTab={UrlForTab} />
    </SubNavBar>
  );
}

module.exports = SubNavPlaylists;

//