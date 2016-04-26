import React            from 'react';
import SubNav          from '../SubNav';
import InlineCSS        from '../InlineCSS';
import css              from './style/subnav';

var UPLOAD_TYPES = {
  editorial_pick: 'ed picks',
  remix: 'remixes',
  sample: 'stems',
  acappella: 'pells'
};

const UPLOAD_FILTER  = new RegExp( '^' + Object.keys(UPLOAD_TYPES).join('|') + '$');

function GallerySubNav(props) {
  return (
      <SubNav {...props}>
        <InlineCSS css={css} id="gallery-subnav-css" />
        <SubNav.FilterTabs tabs={UPLOAD_TYPES} filter={UPLOAD_FILTER} store={props.store} all={props.all} />
      </SubNav>
  );
}

module.exports = GallerySubNav;

//
