import React          from 'react';
import Field          from './FormField';
import {ButtonGroup } from './ButtonGroups';
import EditButton     from './EditButton';

class ToggleEditMode extends React.Component
{
  //----------- Edit State -----------------------//
  
  constructor() {
    super(...arguments);

    this.state = { editing: false };

    const _esh = (name,state=true) => this._onEditState.bind(this,name,state);

    this._addons = {
      done:   { icon: 'check', onClick:_esh('onDone',  false) },
      cancel: { icon: 'times', onClick:_esh('onCancel',false) },
      edit:   { icon: 'edit',  onClick:_esh('onEdit',  true)  }
    };
  }

  /*
    Derived classes should call here first because the user
    has flipped modes so any other state is probably stale.
  */
  shouldComponentUpdate(nextProps,nextState) {
    return this.isSwitchEditMode(nextState);
  }

  isSwitchEditMode(nextState) {
    return this.state.editing ^ nextState.editing;
  }

  _onEditState(meth,editing) {
    this.setState( {editing}, () => {
      this[meth]             && this[meth]();
      this.props[meth]       && this.props[meth]();
      this.onEditState       && this.onEditState(editing);
      this.props.onEditState && this.props.onEditState(editing);
    });
  }
  
  get addons() {
    const { 
      editing = false 
    } = this.state;

    return editing
            ? [ this._addons.done, this._addons.cancel ]
            : [ this._addons.edit ];
  }

  get canEdit() {
    return this._canEdit;
  }

  set canEdit(val) {
    this._canEdit = val;
  }
  
  //----------- wrappers override these -----------------------//

  get editModeElement() { return undefined; }  
  
  get staticModeElement() { return undefined; }

  get title() { return  undefined; }

  //----------- Render -----------------------//
  
  render() {

    const { canEdit = this.canEdit,
            title = this.title, 
            stickyOpen 
          } = this.props;

    const showEdit = stickyOpen || (canEdit && this.state.editing);

    const ElementMeta = showEdit ? this.editModeElement : this.staticModeElement;

    return <ElementMeta.Element {...ElementMeta.props} title={title} addons={this.addons} />;
  }
}

class ToggleEditModeStatic extends ToggleEditMode
{
  get staticModeElement() {
    const { 
      canEdit = this.canEdit, 
      Static = this.staticElement
    } = this.props;

    let meta = null;

    if( canEdit ) {

      meta = {
        props: {},
        Element: () => <div className="can-edit">
                        <EditButton className="pull-right floating-edit" onEdit={this._addons.edit.onClick} />
                        <Static.Element {...Static.props} />
                      </div>
        };

    } else {

        meta = Static;

    }

    return meta;
  }

  get editModeElement() {
    const { 
      Editable = this.editableElement 
    } = this.props;

    return {
        props: {},
        Element: props => <div className="static-edit">
                            <Editable.Element {...Editable.props} />
                            <div className="toolbar"><ButtonGroup addons={props.addons} /></div>
                          </div>      
    };
  }

  get editableElement() { return undefined; }

  get staticElement() { return undefined; }

}

class ToggleEditModeField extends ToggleEditMode
{
  emitElement(Element) {
    const { 
      canEdit = this.canEdit
    } = this.props;

    const postfix = canEdit ? this.addons : undefined;

    return {
      props: {},
      Element: props => <Field title={props.title} className={props.className} postfix={postfix}>
                          <Element.Element {...Element.props} />
                        </Field>
    };

  }

  get staticModeElement() {
    return this.emitElement(this.props.Static || this.staticElement);
  }

  get editModeElement() {
    return this.emitElement(this.props.Editable || this.editableElement);
  }

  get editableElement() { return undefined; }

  get staticElement() { return undefined; }

}

ToggleEditMode.Field = ToggleEditModeField;
ToggleEditMode.Static = ToggleEditModeStatic;
 
module.exports = ToggleEditMode;

