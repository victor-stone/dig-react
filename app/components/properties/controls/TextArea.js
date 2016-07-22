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
            ? <CollapsingText html={this.state.value} /> 
            : <span dangerouslySetInnerHTML={{__html:this.state.value}} />;
  }

  get editableElement() {
    return <TextEditor value={this.state.value} />;
  }  
}

function YouMisspelledCollapsible() {}

TextArea.propTypes = {
  collapsable: React.PropTypes.instanceOf(YouMisspelledCollapsible)
};

module.exports = TextArea;


//