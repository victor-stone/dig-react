import React                from 'react';
import EditDynamicPlaylist  from '../EditDynamicPlaylist';
import LinkToPlaylist       from '../../services/LinkToPlaylistRoute';

class EditDynamicPlaylistPage extends React.Component
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

    return (<EditDynamicPlaylist store={store} onSave={this.onSave} title={head.name} prefix="edit" />);
  }
}

module.exports = EditDynamicPlaylistPage;