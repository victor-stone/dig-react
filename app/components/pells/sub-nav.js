import React            from 'react';
import SubNavBar        from '../bound/sub-nav-bar';
import InlineCss        from '../vanilla/inline-css';
import css              from './style/subnav';
import ReqTagsNavTabs   from '../bound/req-tags-nav-tabs';

const PELL_TYPES = {
  featured:    'featured',
  spoken_word: 'spoken word',
  rap:         'rap',
  melody:      'melody'
};

const PELLS_FILTER = new RegExp( '^' + Object.keys(PELL_TYPES).join('|') + '$');

function PellsSubNav(props) {
  return (
      <SubNavBar search paging store={props.store} >
        <InlineCss css={css} id="stinkin badges css" />
        <ReqTagsNavTabs tab="featured" store={props.store} tabs={PELL_TYPES} filter={PELLS_FILTER} all />
      </SubNavBar>
  );
}

module.exports = PellsSubNav;

//
