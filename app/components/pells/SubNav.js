import React            from 'react';
import SubNavBar        from '../bound/SubNavBar';
import InlineCSS        from '../vanilla/InlineCSS';
import css              from './style/subnav';
import ReqTagsNavTabs   from '../bound/ReqTagsNavTabs';

const PELL_TYPES = {
  featured:    'featured',
  spoken_word: 'spoken word',
  rap:         'rap',
  melody:      'melody'
};

const PELLS_FILTER = new RegExp( '^' + Object.keys(PELL_TYPES).join('|') + '$');

function PellsSubNav(props) {
  return (
      <SubNavBar paging store={props.store} >
        <InlineCSS css={css} id="stinkin badges css" />
        <ReqTagsNavTabs tab="featured" store={props.store} tabs={PELL_TYPES} filter={PELLS_FILTER} all />
      </SubNavBar>
  );
}

module.exports = PellsSubNav;

//
