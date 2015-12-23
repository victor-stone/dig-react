/*eslint "react/no-danger":0 */
import React      from 'react';

import { PlaylistOwner,
         EditControls } from '../../mixins';

var EditableDescription = React.createClass({

  mixins: [ PlaylistOwner, EditControls ],

  getInitialState: function() {
    var desc = this.props.store.model.head.description || '';
    if( desc ) {
      desc = desc.replace(/http:\/\/ccmixter.org\/playlist\/browse/g,'/playlist/browse' );
    }    
    return { text: desc, orgText: desc };
  },

  doneEdit: function() {
    this.setState( { text: this.refs.description.value } );
  },

  cancelEdit: function() {
    this.setState( { text: this.state.orgText } );
  },

  render: function() {

    var desc = this.state.text;

    if( !this.state.editing ) {
      desc = { __html: desc };
    }

    return (
        <div className="playlist-description"> 
        {this.state.editing
          ? <textarea ref="description" defaultValue={desc}></textarea>
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