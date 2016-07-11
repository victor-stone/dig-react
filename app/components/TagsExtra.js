import React                  from 'react';
import { InputFormItem }      from './vanilla/InputField';
import currentUserProfile     from './services/CurrentUserProfile';

class TagsExtra extends React.Component
{
  constructor() {
    super(...arguments);
    this.onSave = this.onSave.bind(this);
    this.state = { isAdmin: false };
    currentUserProfile().then( profile => profile && profile.isAdmin && this.setState({isAdmin:true}) );
  }

  onSave(value) {
    this.props.store.toggleTag(value, true);
  }

  render() {
    if( !this.state.isAdmin ) {
      return null;
    }
    return (
        <InputFormItem autoclear sz="sm" doneIcon="plus" cls="admin-tags" title="admin tag" onDone={this.onSave} />
      );
  }
}

module.exports = TagsExtra;

//