import React            from 'react';
import SubNavBar        from '../bound/SubNavBar';
import ReqTagsNavTabs   from '../bound/ReqTagsNavTabs';
import InlineCSS        from '../vanilla/InlineCSS';
import css              from './style/subnav';
import { TagString }    from '../../unicorns';

function TilesSubNav(props) {
  return (
      <SubNavBar {...props}>
        <InlineCSS css={css} id="tile-subnav-css" />
        <ReqTagsNavTabs tabs={TilesSubNav.tabs} all={props.all} store={props.store} tab="remix" />
      </SubNavBar>
  );
}

TilesSubNav.tabs = {
  editorial_pick: 'ed picks',
  remix: 'remixes',
  sample: 'stems',
  acappella: 'pells'
};

const tagFilter = new RegExp('^' + Object.keys(TilesSubNav.tabs).join('|') + '$' );

TilesSubNav.isTab = function(tags) {
  return (new TagString(tags)).filter(tagFilter).toString();
};

module.exports = TilesSubNav;

//
