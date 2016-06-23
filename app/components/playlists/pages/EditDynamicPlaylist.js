import React         from 'react';
import DynamicPlaylistForm  from '../DynamicPlaylistForm';
import Link                 from '../../services/LinkToRoute';

class EditDynamicPlaylist extends React.Component
{
  constructor() {
    super(...arguments);
    this.onSave = this.onSave.bind(this);
  }

  onSave() {
    this.props.store.applyQuery().then( () => Link.navigateTo( `/playlist/browse/${this.props.store.model.head.id}`));
  }

  render() {
    var store = this.props.store;
    var title = this.props.store.model.head.name;
    return (<DynamicPlaylistForm store={store} onSave={this.onSave} title={title} prefix="edit" />);
  }
}

module.exports = EditDynamicPlaylist;