/*eslint "react/no-danger":0 */
import React      from 'react';
import Tags       from './Tags';
import { Link }   from '../People';
import SharePopup from '../SharePopup';
import Glyph      from '../../components/Glyph';
import RLink      from '../../components/Link';

import { PlaylistOwner } from '../../mixins';

var DeleteLink = React.createClass({

  mixins: [PlaylistOwner],

  render: function() {
    if( !this.state.isOwner ) {
      return null;
    }

    var model = this.props.model;    
    var href  = '/playlist/browse/' + model.id + '/delete';

    return (
        <RLink className="btn btn-danger" href={href}><Glyph icon="trash" />{" delete"}</RLink>
      );
  }
});

function ShareLink(model) {
  return 'http://playlists.ccmixter.org/playlist/browse/' + model.id;
}

var EditableDescription = React.createClass({

  mixins: [ PlaylistOwner ],

  getInitialState: function() {
    var desc = this.props.store.model.head.description || '';
    if( desc ) {
      desc = desc.replace(/http:\/\/ccmixter.org\/playlist\/browse/g,'/playlist/browse' );
    }    
    return { text: desc, orgText: desc };
  },

  startEdit: function() {
    this.setState( { editing: true } );
  },

  doneEdit: function() {
    this.setState( { editing: false }, () => {

    });
  },

  cancelEdit: function() {
    this.setState( { editing: false, text: this.state.orgText } );
  },

  render: function() {

    var desc = this.state.text;

    if( !this.state.editing ) {
      desc = { __html: desc };
    } else if( !desc && this.state.isOwner ) {
      desc = 'Add a description...';
    }    

    return (
        <div className="playlist-description"> 
        {this.state.editing
          ? <textarea ref="description" defaultValue={desc}></textarea>
          : <span dangerouslySetInnerHTML={desc}></span>
        }
        {this.state.isOwner
          ? <div className="btn-group btn-group-sm edit-controls">
              <button className="btn btn-default" disabled={this.state.editing}  onClick={this.startEdit} ><Glyph icon="edit"  /></button>
              <button className="btn btn-default" disabled={!this.state.editing} onClick={this.doneEdit}  ><Glyph icon="check" /></button>
              <button className="btn btn-default" disabled={!this.state.editing} onClick={this.cancelEdit}><Glyph icon="times" /></button>              
            </div>
          : null
        }
        </div>
      );
  }
});

var Info = React.createClass({

  render: function() {
    var model = this.props.store.model.head;

    return (
        <div className="playlist-info hidden-xs hidden-sm">
          <div className="playlist-curator">
            <span>{"curator: "}</span>
            <Link model={model.curator} avatar />
          </div>
          <div className="action-btn-toolbar">
            <SharePopup model={model} modelLink={ShareLink} med />
            <DeleteLink model={model} />
          </div>
          <Tags.Editor store={this.props.store} />
          <EditableDescription store={this.props.store} />
        </div>
      );
  }
});

module.exports = Info;

//