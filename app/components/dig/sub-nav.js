import React        from 'react';
import SubNavBar    from '../bound/SubNavBar';
import InlineCSS    from '../vanilla/InlineCSS';
import css          from './style/subnav';

module.exports = function(props) {
  return <SubNavBar paging store={props.store}><InlineCSS css={css} id="dig-subnav-css" />{" "}</SubNavBar>;
};

