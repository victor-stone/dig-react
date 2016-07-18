import React                  from 'react';
import Filter                 from '../../models/filters/tags';
import { InputFormItem }      from '../vanilla/InputField';
import currentUserProfile     from '../services/CurrentUserProfile';

class AdminTag extends React.Component
{
  constructor() {
    super(...arguments);
    this.onSave = this.onSave.bind(this);
    this.state = { isAdmin: false };
    currentUserProfile().then( profile => profile && profile.isAdmin && this.setState({isAdmin:true}) );
  }

  onSave(value) {
    const { store } = this.props;
    const filter = store.addProperty(Filter);
    filter.toggle(value,true);
    this.refs.edit.value = '';
  }

  render() {
    if( !this.state.isAdmin ) {
      return null;
    }
    return (
        <InputFormItem ref="edit" autoclear sz="sm" doneIcon="plus" cls="admin-tags" title="admin tag" onDone={this.onSave} />
      );
  }
}

module.exports = AdminTag;

//