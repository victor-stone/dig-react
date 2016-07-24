/*eslint "react/no-danger":0 */
import React from 'react';

import ToggleEditModeProperty from './ToggleEditMode';

import { TextEditor,
         CollapsingText } from '../../vanilla';

class TextArea extends ToggleEditModeProperty 
{
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
                Element: () => <span dangerouslySetInnerHTML={{__html:this.state.value}} />,
                props: { }
              }; 
  }

  onDone() {
    this.updateValue(this.stateEditValue);
  }
  
  onChange(event) {
    this.stateEditValue = event.target.value;
  }

  get editableElement() {
  
    return { 
      Element: () => <div onChange={this.onChange.bind(this)}><TextEditor initialValue={this.stateEditValue} /></div>,
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