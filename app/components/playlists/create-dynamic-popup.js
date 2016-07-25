import React   from 'react';
import Modal   from '../services/modal';
import LinkToPlaylist    from '../services/link-to-playlist-route';

// <span className="save-playlist-form">

class CreateDynamicPopup extends Modal.Popup
{
  constructor() {
    super(...arguments);
    this.onSave = this.onSave.bind(this);
    this.state = { error: null };
  }

  onSave() {
    var name = this.refs['playlist-name'].value;
    this.props.store.create(name)
        .then( (playlist) => {
            this.manualClose();
            LinkToPlaylist.navigateTo( playlist );
          })
        .catch( () => this.setState( { error: 'ccmixter service did not create a playlist' } ) );
  }

  render() {
    return (  <Modal title={"Save Dynamic Playlist"}
                     action={this.onSave}
                     error={this.state.error}
                     icon="cloud-upload"
                     buttonText="Save"
              >              
                <label className="control-label playlist-save-label" htmlFor="playlist-name">{"Save as"}</label>                  
                <input ref="playlist-name" name="playlist-name" type="text" placeholder="playlist name..." className="form-control input-md" />
              </Modal> );
  }
}


module.exports = CreateDynamicPopup;
