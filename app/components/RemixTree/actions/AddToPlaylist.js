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
      selectedValue: ''
    };

    this.onChange          = this.onChange.bind(this);
    this.onNewPlaylistName = this.onNewPlaylistName.bind(this);
    this.onToggleShow      = this.onToggleShow.bind(this);
    this.onSubmit          = this.onSubmit.bind(this);
  }

  onChange(e){
    var selectedValue = e.target.value;
    if( selectedValue === 'new' ) {
      this.onToggleShow();
      selectedValue = '';
    } 
    this.setState({selectedValue});
  }

  onNewPlaylistName(e) {
    this.setState({newPlaylistName:e.target.value});
  }

  onSubmit() {
    this.setState( { error: null } );
    var id   = this.props.model.id;
    if( this.state.showList ) {
      var pid = this.state.selectedValue;
      api.playlist.addTrack(id,pid).then( ret => {
        ret.status === 'ok' && env.alert('success', 'New playlist created and track added');
        this.handleActionResponse(ret);
      });
    } else {
      api.playlist.createStatic(this.state.newPlaylistName,'',id).then( ret => {
        ret.status === 'ok' && env.alert('success', 'Track added to playlist');
        this.handleActionResponse(ret); 
      });
    }
  }

  onToggleShow() {
    const FADE_DURATION = 250;
    /* globals $ */
    var $e = $('#fade-group');
    $e.fadeOut(FADE_DURATION, () => {
      this.setState({showList: !this.state.showList}, () => { $e.fadeIn(FADE_DURATION); $('#fade-group button').blur(); } );
    });
  }

  render() {
    var title = `Add '${this.props.model.name}'`;
    var sl = this.state.showList;
    var style = !this.state.selectedValue  ? { color: '#ccc'} : {};

    return (
      <Modal action={this.onSubmit} 
             title={title}  
             icon="plus"
             buttonText="Add" 
             closeText="Cancel" 
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
    var playlists = new Playlists();
    playlists.autoFilterTags = false;
    var opts = {
      u: this.props.user.id,
      limit: 200,
      dynamic: '-1'
    };
    playlists.getModel(opts).then( () => {
      AddToPlaylistPopup.show( AddToPlaylistPopup, { store: playlists, model: this.props.store.model.upload, user: this.props.user } );
    });
  },

  render() {
    return(
        <a href="#" onClick={this.showPlaylistPopup}><Glyph fixed icon="music" />{" Add to Playlist"}</a>
      );
  }
});

module.exports = AddToPlaylistLink;

//