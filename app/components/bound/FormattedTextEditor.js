import React from 'react';

import { BoundInputControlMixin }   from './InputField';
import { InlineFormattedTextEditor }from '../vanilla/FormattedTextEditor';

/*
  Emit inline html with unformatted text backing that is optionally 
  editable by user and bound to a store's property 

  props
    propName := name of the store's property for the unformatted text [read/write]
    htmlProp := name of the store's property for the formatted html [read only]
*/
class BoundInlineFormattedTextEditor extends BoundInputControlMixin(React.Component)
{
  _inputStateFromProps(props) {
    const state      = super._inputStateFromProps(props);
    const storeProps = props.store.getProperties([props.htmlName]);
    state.html = storeProps[props.htmlName];
    return state;
  }

  render() {
    return (<InlineFormattedTextEditor 
              html={this.state.html} 
              text={this.state.text} 
              canEdit={this.props.store.permissions.canEdit} 
              onDone={this.onDone}
            />);
  }
}

module.exports = BoundInlineFormattedTextEditor;


//