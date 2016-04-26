import React            from 'react';
import SubNav           from '../SubNav';
import InlineCSS        from '../InlineCSS';
import css              from './style/subnav';

const PELL_TYPES = {
  featured:    'featured',
  spoken_word: 'spoken word',
  rap:         'rap',
  melody:      'melody'
};

const PELLS_FILTER = new RegExp( '^' + Object.keys(PELL_TYPES).join('|') + '$');

function PellsSubNav(props) {
  return (
      <SubNav paging store={props.store} >
        <InlineCSS css={css} id="stinkin badges css" />
        <SubNav.FilterTabs store={props.store} tabs={PELL_TYPES} filter={PELLS_FILTER} all />
      </SubNav>
  );
}

module.exports = PellsSubNav;

//
