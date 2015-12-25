/*eslint "react/no-danger":0 */
import React      from 'react';
import CCMixter   from '../../stores/ccmixter';

import { PlaylistOwner,
         EditControls } from '../../mixins';

var EditableDescription = React.createClass({

  mixins: [ PlaylistOwner, EditControls ],

  getInitialState: function() {
    function cleanLinks(str) {
      return str.replace(/http:\/\/ccmixter.org\/playlist\/browse/g,'/playlist/browse' );
    }

    var desc = this.props.store.model.head.description || '';
    var raw  = this.props.store.model.head.descriptionRaw || '';
    if( desc ) {
      desc = cleanLinks(desc);
    }
    if( raw ) {
      raw = cleanLinks(raw);
    }
    return { text: desc, orgText: desc, raw };
  },

  doneEdit: function() {
    this.setState( { raw: this.refs.description.value }, () => {
      var id = this.props.store.model.head.id;
      CCMixter.updatePlaylist( id, { description: this.state.raw } ).then( model => {
        this.setState( { text: model.description } );
      });
    });
  },

  cancelEdit: function() {
    this.setState( { text: this.state.orgText } );
  },

  render: function() {

    var desc = this.state.text;

    if( !this.state.editing ) {
      if( !desc && !this.state.isOwner ) {
        return null;
      }
      desc = { __html: desc };
    }

    return (
        <div className="playlist-description playlist-bg-color"> 
        {this.state.editing
          ? <textarea ref="description" defaultValue={this.state.raw}></textarea>
          : <span dangerouslySetInnerHTML={desc}></span>
        }
        {this.state.isOwner
          ? this.editControls( {title: 'edit description'} )
          : null
        }
        </div>
      );
  }
});

module.exports = EditableDescription;

//