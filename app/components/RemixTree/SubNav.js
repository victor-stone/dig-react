import React            from 'react';
import SubNavBar        from '../bound/SubNavBar';
import ReqTagsNavTabs   from '../bound/ReqTagsNavTabs';
import InlineCSS        from '../vanilla/InlineCSS';
import css              from './style/subnav';
import { TagString }    from '../../unicorns';

function GallerySubNav(props) {
  return (
      <SubNavBar {...props}>
        <InlineCSS css={css} id="gallery-subnav-css" />
        <ReqTagsNavTabs tabs={GallerySubNav.tabs} all={props.all} store={props.store} tab="remix" />
      </SubNavBar>
  );
}

GallerySubNav.tabs = {
  editorial_pick: 'ed picks',
  remix: 'remixes',
  sample: 'stems',
  acappella: 'pells'
};

const tagFilter = new RegExp('^' + Object.keys(GallerySubNav.tabs).join('|') + '$' );

GallerySubNav.isTab = function(tags) {
  return (new TagString(tags)).filter(tagFilter).toString();
};

module.exports = GallerySubNav;

//
