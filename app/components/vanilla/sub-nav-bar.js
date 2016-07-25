import React         from 'react';
import subNavCSS     from './style/subnav';
import InlineCss     from './inline-css';
import { selectors } from '../../unicorns';

/*
  Display a navbar of tabs. The actual tabs are children 
  of this component (derivations of SubNavTabs)

  props (all optional)
    className - for the outer div
    css       - override the default css (this is actual css code, 
                not a class selector or reference to a stylesheet
                file)
    extra[]   - array of components to including in the bar (e.g. Paging, SearchBox)
*/
function SubNavBar(props)
{
  const { className, css = '', extra } = props;

  var cls = selectors('subnav-option-bar',className);

  return(
    <div className={cls}>
      <InlineCss css={subNavCSS + css} id="subnav-option-bar-css" />
      {extra && extra.map( (E,i) => <E key={i} /> )}
      <div className="subnav-wrapper hidden-xs hidden-sm">
        {props.children}
      </div>
    </div>
    );
}

module.exports = SubNavBar;

//
