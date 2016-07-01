import React         from 'react';
import subNavCSS     from './style/subnav';
import InlineCSS     from './InlineCSS';
import { selectors } from '../../unicorns';

/*
  Display a navbar of tabs. The actual tabs are children 
  of this component (derivations of SubNavTabs)

  props (all optional)
    className - for the outer div
    css       - override the default css (this is actual css code, 
                not a class selector or reference to a stylesheet
                file)
    extra     - component to including in the bar (e.g. Paging)
*/
function SubNavBar(props)
{
  const { className, css = subNavCSS, extra:Extra } = props;

  var cls = selectors('subnav-option-bar',className);

  return(
    <div className={cls}>
      <InlineCSS css={css} id="subnav-option-bar-css" />
      {Extra && <Extra />}
      <div className="subnav-wrapper hidden-xs hidden-sm">
        {props.children}
      </div>
    </div>
    );
}

module.exports = SubNavBar;

//
