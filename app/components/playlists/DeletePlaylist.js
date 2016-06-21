import React         from 'react';
import DeleteButton  from '../../components/vanilla/DeleteButton';
import Modal         from '../../services/Modal';

class DeletePlaylistPopup extends Modal.Popup
{
  constructor() {
    super(...arguments);
    this.doDelete = this.doDelete.bind(this);
  }

  doDelete() {
    this.props.store.deletePlaylist().then( () => window.history.back() );
  }

  render() {
    return (  <Modal icon="trash" 
                     subTitle="confirm delete" 
                     error={this.state.error}
                     title={this.props.store.model.head.name} 
                     action={this.doDelete} 
                     buttonText="Delete"
              >
                {"are you sure you want to delete this playlist? (there's no undo)"}
              </Modal> );
  }

}

class DeletePlaylist extends React.Component
{
  constructor() {
    super(...arguments);
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete() {
    DeletePlaylistPopup.show( DeletePlaylistPopup.show, { store: this.props.store } );    
  }

  render() {
    return this.props.store.permissions.canEdit && <DeleteButton onDelete={this.onDelete} />;
  }
}


module.exports = DeletePlaylist;

//