import React     from 'react';
import SubNav    from '../SubNav';
import InlineCSS from '../InlineCSS';
import { bgColor }   from './style/browse';
import css           from './style/subnav';

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
    <SubNav paging={props.paging}  store={props.store} >
      <InlineCSS css={bgColor}   id="playlists-bgColor-css"/>
      <InlineCSS css={css}       id="playlists-subnav-css"/>
      <SubNav.UrlTabs store={props.store} tab={props.tab} tabs={PLAYLIST_TABS} urlForTab={UrlForTab} />
    </SubNav>
  );
}

module.exports = SubNavPlaylists;

//