import React         from 'react';
import DynamicPlaylistForm  from '../DynamicPlaylistForm';
import CreateDynamicPopup    from '../CreateDynamicPopup';

class NewDynamicPlaylist extends React.Component
{
  constructor() {
    super(...arguments);
    this.onSave = this.onSave.bind(this);
  }

  onSave() {
    CreateDynamicPopup.show( CreateDynamicPopup, { store: this.props.store } );
  }

  render() {
    var store = this.props.store;
    return (<DynamicPlaylistForm store={store} onSave={this.onSave} title="New Playlist" prefix="new" />);
  }
}

module.exports = NewDynamicPlaylist;