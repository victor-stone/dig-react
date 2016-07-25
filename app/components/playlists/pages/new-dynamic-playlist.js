import React         from 'react';

import EditDynamicPlaylist  from '../edit-dynamic-playlist';
import CreateDynamicPopup   from '../create-dynamic-popup';

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
    return (<EditDynamicPlaylist store={store} onSave={this.onSave} title="New Playlist" prefix="new" />);
  }
}

module.exports = NewDynamicPlaylist;