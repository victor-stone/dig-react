import React        from 'react';
import SubNavBar    from '../bound/sub-nav-bar';
import InlineCss    from '../vanilla/inline-css';
import css          from './style/subnav';

module.exports = function(props) {
  return <SubNavBar paging store={props.store}><InlineCss css={css} id="dig-subnav-css" />{" "}</SubNavBar>;
};

