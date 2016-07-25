/* globals $ */
import React    from 'react';
import Glyph    from '../vanilla/glyph';
import DeadLink from '../vanilla/dead-link';
import CrossfadeContent from '../vanilla/crossfade-content';

import Modal    from '../services/modal';
import Alert    from '../services/alert';

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

    bindAll(this, 'onChange','onNewPlaylistName','onToggleShow','onSubmit','shouldSubmitDisable');
  }

  componentDidMount() {
    $('.modal select').css('color', '#ccc');
  }

  componentDidUpdate() {
    !this.state.showList && $('#new-playlist-name').focus();
  }

  onChange(e){
    var selectedValue = e.target.value;
    if( selectedValue === 'new' ) {
      this.onToggleShow();
      selectedValue = '';
    } 
    this.setState({selectedValue,disableSubmit:!selectedValue}, () => {
      $('.modal select').css('color', selectedValue ? 'black' : '#ccc');
    });
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
    const { model:{id}, store } = this.props;
    const { showList, newPlaylistName, selectedValue } = this.state;
    
    this.setState( { error: null } );

    if( showList ) {
      var head = store.model.items.findBy('id',selectedValue);
      Playlist.storeFromModel(head).addTrack(id).then( () => this._alertAndClose('Track added to playlist') );
    } else {
      Playlist.create(newPlaylistName,id).then( () => this._alertAndClose('New playlist created and track added') );
    }
  }

  onToggleShow() {
    this.setState( {showList: !this.state.showList} );
  }

  shouldSubmitDisable() {
    const { showList, selectedValue, newPlaylistName } = this.state;

    return showList ? (!selectedValue) : !newPlaylistName.trim().length;
  }

  render() {
    const { showList, error } = this.state;
    const { store, model:{name} } = this.props;

    var elem = showList
          ? <div className="form-group">
              <select defaultValue="placehoder" onChange={this.onChange} className="form-control">
                <option value="">{"Select a playlist"}</option>
                <option value="new">{" + Add to new playlist"}</option>
                {store.model.items.map( (p,i) => <option value={p.id} key={i}>{p.name}</option>)}
              </select>
            </div>
          : <div className="form-group input-group">
              <input
                  type="text"
                  id="new-playlist-name"
                  className="form-control"
                  onChange={this.onNewPlaylistName}
                  size="30"
              />
              <span className="input-group-addon">              
                <DeadLink onClick={this.onToggleShow}><Glyph icon="list-ul"/>{' Show list'}</DeadLink>
              </span>
            </div>;    

    var slug = showList ? 'list' : 'edit';

    return (
      <Modal action={this.onSubmit} 
             subTitle="Add to playlist"
             title={name}  
             icon="plus"
             buttonText="Add" 
             closeText="Cancel" 
             error={error}
             submitDisabler={this.shouldSubmitDisable}
             {...this.props}
      >
        <CrossfadeContent elem={elem} elemName={slug} />
      </Modal>
      );
  }  
}

class AddToPlaylistLink extends CurrentUserTracker(React.Component) 
{
  constructor() {
    super(...arguments);
    this.showPlaylistPopup = this.showPlaylistPopup.bind(this);
  }

  showPlaylistPopup() {

    var playlists = new Playlists();
    playlists.autoFilterTags = false;

    var model = this.props.store.model.upload;
    var user  = this.state.user.id;

    playlists.getModel( { limit: 200, dynamic: '-1', user } )
      .then( () => AddToPlaylistPopup.show( AddToPlaylistPopup,{ store: playlists, model, user } ));
  }

  render() {
    return(
        <DeadLink onClick={this.showPlaylistPopup} icon="music" text=" Add to Playlist" />
      );
  }
}

module.exports = AddToPlaylistLink;

//