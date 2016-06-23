import React    from 'react';
import Glyph    from '../vanilla/Glyph';
import DeadLink from '../vanilla/DeadLink';
import CrossFadeContent from '../vanilla/CrossFadeContent';

import Modal    from '../services/Modal';
import Alert    from '../services/Alert';

import Playlists from '../../stores/playlists';
import Playlist  from '../../stores/playlist';

import { bindAll }            from '../../unicorns';

import { CurrentUserTracker } from '../../mixins';

class AddToPlaylistPopup extends Modal.Popup {

  constructor() {
    super(...arguments);

    this.state = { 
      error: null,
      newPlaylistName: '',
      showList: true,
      selectedValue: '',
      disableSubmit: true
    };

    bindAll(this, ['onChange','onNewPlaylistName','onToggleShow','onSubmit','shouldSubmitDisable']);
  }

  onChange(e){
    var selectedValue = e.target.value;
    if( selectedValue === 'new' ) {
      this.onToggleShow();
      selectedValue = '';
    } 
    this.setState({selectedValue,disableSubmit:!selectedValue});
  }

  onNewPlaylistName(e) {
    var value = e.target.value;
    this.setState({newPlaylistName:value,disableSubmit:!value.trim().length});
  }

  _alertAndClose(msg) {
    Alert.show('success', msg);
    this.manualClose();    
  }

  onSubmit() {
    this.setState( { error: null } );
    var id   = this.props.model.id;

    if( this.state.showList ) {
      var store = this.this.props.store.model.items.findBy('id',this.state.selectedValue);
      store.addTrack(id).then( () => this._alertAndClose('Track added to playlist') );
    } else {
      Playlist.create(this.state.newPlaylistName,id).then( () => this._alertAndClose('New playlist created and track added') );
    }
  }

  onToggleShow() {
    this.setState( {showList: !this.state.showList} );
  }

  shouldSubmitDisable() {
    return this.state.showList || !this.state.newPlaylistName.trim().length;
  }

  render() {
    var sl = this.state.showList;
    var style = !this.state.selectedValue  ? { color: '#ccc'} : {};

    var elem = sl 
          ? <div className="form-group">
              <select defaultValue="placehoder" onChange={this.onChange} className="form-control" style={style}>
                <option value="">{"Select a playlist"}</option>
                <option value="new">{" + Add to new playlist"}</option>
                {this.props.store.model.items.map( (p,i) => <option value={p.id} key={i}>{p.name}</option>)}
              </select>
            </div>
          : <div className="form-group input-group">
              <input
                  type="text"
                  className="form-control"
                  value={this.state.newPlaylistName}
                  placeholder="new playlist name"
                  onChange={this.onNewPlaylistName}
                  ref="newPlaylistName"
                  size="30"
              />
              <span className="input-group-addon">              
                <a href="#" onClick={this.onToggleShow}><Glyph icon="list-ul"/>{' Show list'}</a>
              </span>
            </div>;     
    var name = sl ? 'list' : 'edit';

    return (
      <Modal action={this.onSubmit} 
             subTitle="Add to playlist"
             title={this.props.model.name}  
             icon="plus"
             buttonText="Add" 
             closeText="Cancel" 
             error={this.state.error}
             submitDisabler={this.shouldSubmitDisable}
             {...this.props}
      >
        <CrossFadeContent elem={elem} elemName={name} />
      </Modal>
      );
  }  
}

var AddToPlaylistLink = React.createClass({

  mixins: [CurrentUserTracker],

  showPlaylistPopup() {
    var playlists = new Playlists();
    playlists.autoFilterTags = false;
    var opts = {
      limit: 200,
      dynamic: '-1',
      user: this.state.user.id
    };
    playlists.getModel( opts )
      .then( () => AddToPlaylistPopup.show( AddToPlaylistPopup,{ store: playlists, model: this.props.store.model.upload, user: opts.u } ));
  },

  render() {
    return(
        <DeadLink onClick={this.showPlaylistPopup} icon="music" text=" Add to Playlist" />
      );
  }
});

module.exports = AddToPlaylistLink;

//