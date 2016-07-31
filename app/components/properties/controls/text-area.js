/*eslint "react/no-danger":0 */
import React from 'react';

import ToggleEditModeProperty from './toggle-edit-mode';

import { TextEditor,
         CollapsingText } from '../../vanilla';

class TextArea extends ToggleEditModeProperty 
{

  constructor() {
    super(...arguments);

    /*
      Checking 'super' seem to be insanely costly in 
      Babel. We curry the results here so we can
      just do a straight call.
    */
    const superCurry = meth => {
      let mySuperCall = super[meth];
      return mySuperCall 
                ? (a,b,c,d,e) => mySuperCall.apply(this,[a,b,c,d,e]) 
                : () => false;
    };

    this.superShouldComponentUpdateTA = superCurry('shouldComponentUpdate');
  }
  
  shouldComponentUpdate(nextProps,nextState) {
    return this.isSwitchEditMode(nextState) || this.superShouldComponentUpdateTA(nextProps,nextState);
  }

  get staticElement() {

    const { collapsible = false } = this.props;

    return collapsible 
            ? {
                Element: CollapsingText, 
                props: { 
                  html:this.state.value 
                } 
              }
            : { 
                Element: () => <span className="static-text-area" dangerouslySetInnerHTML={{__html:this.state.value}} />,
                props: { }
              }; 
  }

  onDone() {
    this.updateValue(this.scratch);
  }
  
  onChange(event) {
    this.scratch = event.target.value;
  }

  get editableElement() {
  
    return { 
      Element: () => <div onChange={this.onChange.bind(this)}><TextEditor initialValue={this.property.editable} /></div>,
      props: {} 
    };
  }  

}

function YouMisspelledCollapsible() {}

TextArea.propTypes = {
  collapsable: React.PropTypes.instanceOf(YouMisspelledCollapsible)
};

module.exports = TextArea;


//