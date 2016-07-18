import React       from 'react';

import { InputFormField,
         InputText       }  from '../vanilla/InputField';

/*
  Note: the parent component is assumed to be tracking store
        updates and passing new props down to these controls

        class SomeComponent extends ModelTracker(React.Component) {

          render() {
            <BoundInputText store={this.state.store} propName="hooya" />
          }
        }
*/
const BoundInputControlMixin = target => class extends target {
  constructor() {
    super(...arguments);
    this.state = this._inputStateFromProps(this.props);
    this.onDone = this.onDone.bind(this);
  }

  // TODO: should implement shouldComponentUppdate
  
  componentWillReceiveProps(nextProps) {
    this.setState( this._inputStateFromProps(nextProps) );
  }

  _inputStateFromProps(props) {
    var storeProps = props.store.getProperties([props.propName]);
    return { text: storeProps[props.propName] };    
  }

  onDone(text) {
    this.props.store.applyProperties({ [this.props.propName]: text });
    this.setState( { text: InputText.LoadingText } );
  }
};

/*
  Emit static text wrapped in bootstrap 'form-group' structure that is bound
  to a property in a store, optionally editable by user

  props
    propName = name of the store's property
    title - form field title
*/

class BoundInputFormField extends BoundInputControlMixin(React.Component)
{
  render() {
    const { title, store: { permissions: {canEdit = false} = {}  } } = this.props;
    const { text } = this.state;
    return <InputFormField text={text} title={title} canEdit={canEdit} onDone={this.onDone} />;
  }
}

/*
  Emit static html text bound to a store's property optionally editable by user

  props
    propName = name of the store's property
*/
class BoundInputText extends BoundInputControlMixin(React.Component)
{
  render() {
    const { store: { permissions: {canEdit = false} = {}  } } = this.props;
    const { text } = this.state;
    return <InputText text={text} canEdit={canEdit} onDone={this.onDone} />;
  }
}

module.exports = {
  BoundInputFormField,
  BoundInputText,
  BoundInputControlMixin
};

//