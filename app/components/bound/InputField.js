import React       from 'react';

import { ModelTracker }     from '../../mixins';
import { InputFormField,
         InputText       }  from '../vanilla/InputField';


const BoundInputControlMixin = target => class extends target {
  constructor() {
    super(...arguments);
    this.onDone = this.onDone.bind(this);
  }

  stateFromStore(store) {
    var props = {};
    props[this.props.propName] = '';
    props = store.getProperties(props);
    return { text: props[this.props.propName] };
  }

  onDone(text) {
    var props = {};
    props[this.props.name] = text;
    this.state.store.applyProperties(props);
  }
};

/*
  Emit static text wrapped in bootstrap 'form-group' structure that is bound
  to a property in a store, optionally editable by user

  props
    propName = name of the store's property
    title - form field title
*/

class BoundInputFormField extends BoundInputControlMixin(ModelTracker.extender(React.Component))
{
  render() {
    const { title, staticOnly = false, store: { permissions: {canEdit = false} = {}  } } = this.props;
    const { text } = this.state;
    return <InputFormField text={text} title={title} canEdit={!staticOnly && canEdit} />;
  }
}

/*
  Emit static html text bound to a store's property optionally editable by user

  props
    propName = name of the store's property
*/
class BoundInputText extends BoundInputControlMixin(ModelTracker.extender(React.Component))
{
  render() {
    const { staticOnly = false, store: { permissions: {canEdit = false} = {}  } } = this.props;
    const { text } = this.state;
    return <InputText text={text} canEdit={!staticOnly && canEdit} />;
  }
}



module.exports = {
  InputFormField: BoundInputFormField,
  InputText:      BoundInputText,
  BoundInputControlMixin
};

//