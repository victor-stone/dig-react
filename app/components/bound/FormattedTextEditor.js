import React from 'react';
import { BoundInputControlMixin }   from './InputField';
import { InlineFormattedTextEditor }from '../vanilla/FormattedTextEditor';
import { ModelTracker }             from '../../mixins';

/*
  Emit inline html with unformatted text backing that is optionally 
  editable by user and bound to a store's property 

  props
    propName := name of the store's property for the unformatted text [read/write]
    htmlProp := name of the store's property for the formatted html [read only]
*/
class BoundInlineFormattedTextEditor extends BoundInputControlMixin(ModelTracker.extender(React.Component))
{
  stateFromStore(store) {
    var state = super.stateFromStore(store);
    var props = {};
    props[this.props.htmlProp] = '';
    props = store.getProperties(props);
    state.html = props[this.props.htmlProp];
    return state;
  }

  render() {
    return <InlineFormattedTextEditor html={this.state.html} text={this.state.text} canEdit={this.props.store.permissions.canEdit} />;
  }
}

module.exports = BoundInlineFormattedTextEditor;


//