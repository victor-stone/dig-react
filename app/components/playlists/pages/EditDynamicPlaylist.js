import React                from 'react';
import DynamicPlaylistForm  from '../DynamicPlaylistForm';
import LinkToPlaylist       from '../../services/LinkToPlaylistRoute';

class EditDynamicPlaylist extends React.Component
{
  constructor() {
    super(...arguments);
    this.onSave = this.onSave.bind(this);
  }

  onSave() {
    const { store } = this.props;

    store.applyQuery(store.underlyingQuery)
      .then( () => LinkToPlaylist.navigateTo( store.model.head ));
  }

  render() {
    const { store, store: {model:{head}} } = this.props;

    return (<DynamicPlaylistForm store={store} onSave={this.onSave} title={head.name} prefix="edit" />);
  }
}

module.exports = EditDynamicPlaylist;