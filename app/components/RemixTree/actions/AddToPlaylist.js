import React  from 'react';
import Glyph  from '../../Glyph';
import Modal  from '../../Modal';
import Alert  from '../../Alert';
import api    from '../../../services/ccmixter';
import env    from '../../../services/env';

import Playlists from '../../../stores/playlists';

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

    this.onChange            = this.onChange.bind(this);
    this.onNewPlaylistName   = this.onNewPlaylistName.bind(this);
    this.onToggleShow        = this.onToggleShow.bind(this);
    this.onSubmit            = this.onSubmit.bind(this);
    this.shouldSubmitDisable = this.shouldSubmitDisable.bind(this);
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

  onSubmit() {
    this.setState( { error: null } );
    var id   = this.props.model.id;
    if( this.state.showList ) {
      var pid = this.state.selectedValue;
      api.playlist.addTrack(id,pid).then( ret => {
        env.alert('success', 'Track added to playlist');
        this.handleActionResponse(ret);
      });
    } else {
      api.playlist.createStatic(this.state.newPlaylistName,'',id).then( ret => {
        env.alert('success', 'New playlist created and track added');
        this.handleActionResponse(ret); 
      });
    }
  }

  onToggleShow() {
    const FADE_DURATION = 250;
    /* globals $ */
    var $e = $('#fade-group');
    $e.fadeOut(FADE_DURATION, () => {
      var disableSubmit =  !this.state.showList || !this.state.newPlaylistName.trim().length;
      this.setState({showList: !this.state.showList,disableSubmit}, () => { $e.fadeIn(FADE_DURATION); $('#fade-group button').blur(); } );
    });
  }

  shouldSubmitDisable() {
    return this.state.disableSubmit;
  }

  render() {
    var sl = this.state.showList;
    var style = !this.state.selectedValue  ? { color: '#ccc'} : {};

    return (
      <Modal action={this.onSubmit} 
             subTitle="Add to playlist"
             title={this.props.model.name}  
             icon="plus"
             buttonText="Add" 
             closeText="Cancel" 
             submitDisabler={this.shouldSubmitDisable}
             {...this.props}
      >
        <Alert type="danger" text={this.state.error} />
        <div id="fade-group">
        {sl
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
            </div>      
        }
        </div>
      </Modal>
      );
  }  
}

var AddToPlaylistLink = React.createClass({

  showPlaylistPopup(e) {
    e.preventDefault();
    e.stopPropagation();
    var playlists = new Playlists();
    playlists.autoFilterTags = false;
    var opts = {
      limit: 200,
      dynamic: '-1'
    };
    api.user.currentUser()
      .then( u => playlists.getModel(Object.assign(opts,{u})))
      .then( () => AddToPlaylistPopup.show( AddToPlaylistPopup,{ store: playlists, model: this.props.store.model.upload, user: opts.u } ));
  },

  render() {
    return(
        <a href="#" onClick={this.showPlaylistPopup}><Glyph fixed icon="music" />{" Add to Playlist"}</a>
      );
  }
});

module.exports = AddToPlaylistLink;

//