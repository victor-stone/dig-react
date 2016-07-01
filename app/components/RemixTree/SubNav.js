import React            from 'react';
import SubNavBar        from '../bound/SubNavBar';
import ReqTagsNavTabs   from '../bound/ReqTagsNavTabs';
import InlineCSS        from '../vanilla/InlineCSS';
import css              from './style/subnav';

var UPLOAD_TYPES = {
  editorial_pick: 'ed picks',
  remix: 'remixes',
  sample: 'stems',
  acappella: 'pells'
};

function GallerySubNav(props) {
  return (
      <SubNavBar {...props}>
        <InlineCSS css={css} id="gallery-subnav-css" />
        <ReqTagsNavTabs tabs={UPLOAD_TYPES} all={props.all} store={props.store} tab="remix" />
      </SubNavBar>
  );
}

module.exports = GallerySubNav;

//
